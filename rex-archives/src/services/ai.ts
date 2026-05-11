import "server-only";

import { getSupabaseServerClient } from "@/lib/supabase/supabase-server";
import type { Database } from "@/types/database";
import type { NarrativeFresco } from "@/types/narrative";

type AIProvider = "openai" | "anthropic";

interface GenerateNarrativeOptions {
  provider?: AIProvider;
  model?: string;
  limit?: number;
}

interface TestimonialRow {
  id: string;
  user_text_testimonial: string | null;
  transcript: string | null;
  created_at: string;
}

const OPENAI_URL = "https://api.openai.com/v1/responses";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

function safeJsonParse(payload: string): NarrativeFresco | null {
  try {
    return JSON.parse(payload) as NarrativeFresco;
  } catch {
    return null;
  }
}

function localFallback(rows: TestimonialRow[]): NarrativeFresco {
  const snippets = rows.slice(0, 3).map((entry) => entry.user_text_testimonial ?? entry.transcript ?? "");
  const chapterTitles = ["Les Origines", "L'Âge d'Or", "La Renaissance"];
  const chapters = chapterTitles.map((title, index) => ({
    id: `chapitre-${index + 1}`,
    title,
    body:
      snippets[index]?.slice(0, 240) ||
      "Les souvenirs de la communauté continuent d'alimenter une mémoire commune en perpétuelle évolution.",
    mediaIds: [rows[index]?.id].filter(Boolean),
  }));

  return {
    title: "La fresque vivante du Rex",
    fullNarrative:
      "Du premier atelier aux nouveaux dépôts, les archives du Rex racontent une mémoire collective qui se construit, se transmet et se réinvente. Chaque témoignage ajoute une voix à ce patrimoine vivant.",
    chapters,
  };
}

async function fetchRecentTestimonials(limit: number) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("memories")
    .select("id,user_text_testimonial,transcript,created_at")
    .or("user_text_testimonial.not.is.null,transcript.not.is.null")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Impossible de récupérer les témoignages : ${error.message}`);
  }

  return (data ?? []) as TestimonialRow[];
}

function buildPrompt(rows: TestimonialRow[]) {
  const entries = rows
    .map((row, index) => {
      const text = row.user_text_testimonial ?? row.transcript ?? "";
      return `${index + 1}. id=${row.id} | ${text}`;
    })
    .join("\n");

  return [
    "Tu es le moteur narratif IA d'une archive de mémoire vivante.",
    "Raconte l'histoire du Rex en tissant ensemble les témoignages fournis. Divise le récit en 3 chapitres : Les Origines, L'Âge d'Or, et La Renaissance.",
    "Le récit global doit être poétique, cohérent et d'environ 200 mots.",
    "Réponds exclusivement en français.",
    "Chaque chapitre doit contenir : id, title, body, mediaIds (choisis des identifiants pertinents depuis les entrées).",
    "Retourne strictement du JSON avec cette forme :",
    "{ title: string, fullNarrative: string, chapters: [{ id: string, title: string, body: string, mediaIds: string[] }] }",
    "Entrées :",
    entries,
  ].join("\n");
}

async function generateWithAnthropic(
  prompt: string,
  model: string,
  apiKey: string,
): Promise<NarrativeFresco> {
  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1300,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Échec de la requête narrative Anthropic (${response.status}).`);
  }

  const payload = await response.json();
  const parsed = safeJsonParse(payload?.content?.[0]?.text ?? "");
  if (!parsed) {
    throw new Error("Impossible d'interpréter la réponse narrative Anthropic.");
  }
  return parsed;
}

async function generateWithOpenAI(
  prompt: string,
  model: string,
  apiKey: string,
): Promise<NarrativeFresco> {
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "fresco_chapters",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              fullNarrative: { type: "string" },
              chapters: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    title: { type: "string", enum: ["Les Origines", "L'Âge d'Or", "La Renaissance"] },
                    body: { type: "string" },
                    mediaIds: { type: "array", items: { type: "string" } },
                  },
                  required: ["id", "title", "body", "mediaIds"],
                  additionalProperties: false,
                },
              },
            },
            required: ["title", "fullNarrative", "chapters"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Échec de la requête narrative OpenAI (${response.status}).`);
  }

  const payload = await response.json();
  const parsed = safeJsonParse(payload?.output_text ?? "");
  if (!parsed) {
    throw new Error("Impossible d'interpréter la réponse narrative OpenAI.");
  }
  return parsed;
}

export async function generateNarrativeFresco(
  options: GenerateNarrativeOptions = {},
): Promise<{ fresco: NarrativeFresco; sourceRows: TestimonialRow[] }> {
  const provider =
    options.provider ?? (process.env.AI_PROVIDER === "anthropic" ? "anthropic" : "openai");
  const model =
    options.model ??
    (provider === "anthropic"
      ? process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514"
      : process.env.OPENAI_MODEL ?? "gpt-4o");
  const limit = Math.min(Math.max(options.limit ?? 15, 10), 20);

  const rows = await fetchRecentTestimonials(limit);
  if (rows.length === 0) {
    return { fresco: localFallback([]), sourceRows: [] };
  }

  const prompt = buildPrompt(rows);

  try {
    if (provider === "anthropic") {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY n'est pas configurée.");
      }
      const fresco = await generateWithAnthropic(prompt, model, apiKey);
      return { fresco, sourceRows: rows };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY n'est pas configurée.");
    }
    const fresco = await generateWithOpenAI(prompt, model, apiKey);
    return { fresco, sourceRows: rows };
  } catch {
    return { fresco: localFallback(rows), sourceRows: rows };
  }
}

export type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];
