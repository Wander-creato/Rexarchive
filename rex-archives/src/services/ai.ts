import type { NarrativeFresco } from "@/types/narrative";

type AIProvider = "openai" | "anthropic";

interface GenerateNarrativeOptions {
  provider?: AIProvider;
  model?: string;
}

const OPENAI_URL = "https://api.openai.com/v1/responses";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

function buildPrompt(testimonials: string[]) {
  return [
    "You are a historical narrative engine for a memory archive product.",
    "Task:",
    "1) Extract up to 5 major narrative themes with confidence scores from 0 to 1.",
    "2) Build a concise storyline where each segment has an anchorYear, title, summary, and linkedMemoryIds.",
    "Return strict JSON with shape { themes: [...], storyline: [...] }.",
    "Testimonials:",
    testimonials.map((entry, index) => `${index + 1}. ${entry}`).join("\n"),
  ].join("\n");
}

function safeJsonParse(payload: string): NarrativeFresco | null {
  try {
    return JSON.parse(payload) as NarrativeFresco;
  } catch {
    return null;
  }
}

export async function generateNarrativeFresco(
  testimonials: string[],
  options: GenerateNarrativeOptions = {},
): Promise<NarrativeFresco> {
  if (testimonials.length === 0) {
    return { themes: [], storyline: [] };
  }

  const provider = options.provider ?? "openai";
  const model =
    options.model ??
    (provider === "anthropic" ? "claude-sonnet-4-20250514" : "gpt-4o-mini");
  const prompt = buildPrompt(testimonials);

  if (provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured.");
    }

    const response = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic narrative request failed (${response.status}).`);
    }

    const payload = await response.json();
    const text = payload?.content?.[0]?.text ?? "";
    const parsed = safeJsonParse(text);
    if (!parsed) {
      throw new Error("Unable to parse Anthropic narrative response.");
    }
    return parsed;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

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
          name: "narrative_fresco",
          strict: true,
          schema: {
            type: "object",
            properties: {
              themes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    label: { type: "string" },
                    confidence: { type: "number" },
                  },
                  required: ["id", "label", "confidence"],
                  additionalProperties: false,
                },
              },
              storyline: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    anchorYear: { type: "number" },
                    title: { type: "string" },
                    summary: { type: "string" },
                    linkedMemoryIds: { type: "array", items: { type: "string" } },
                  },
                  required: ["id", "anchorYear", "title", "summary", "linkedMemoryIds"],
                  additionalProperties: false,
                },
              },
            },
            required: ["themes", "storyline"],
            additionalProperties: false,
          },
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI narrative request failed (${response.status}).`);
  }

  const payload = await response.json();
  const text = payload?.output_text ?? "";
  const parsed = safeJsonParse(text);
  if (!parsed) {
    throw new Error("Unable to parse OpenAI narrative response.");
  }
  return parsed;
}
