import type {
  GeneratedNarrativeFresco,
  MemoryContribution,
  NarrativeStorylineNode,
  NarrativeTheme,
} from "@/types/memory";

type NarrativeInput = Pick<
  MemoryContribution,
  "id" | "title" | "year" | "location" | "transcript" | "tags"
>;

type AiProvider = "openai" | "anthropic";

const systemInstruction = [
  "You are the narrative intelligence for Rex-Archives, a trustworthy memory archive for ADAMIC.",
  "Extract emotional and historical themes from testimonials, then create a chronological or thematic storyline.",
  "Respond with strict JSON only using keys: themes, storyline, narrativeSummary.",
  "Keep the tone modern heritage: warm, precise, grounded, and never fictionalized beyond supplied evidence.",
].join(" ");

export async function generateNarrativeFresco(
  testimonials: NarrativeInput[],
): Promise<GeneratedNarrativeFresco> {
  if (testimonials.length === 0) {
    return {
      themes: [],
      storyline: [],
      narrativeSummary: "No testimonials have been contributed yet.",
    };
  }

  const provider = resolveProvider();
  const prompt = buildNarrativePrompt(testimonials);
  const raw = provider === "anthropic" ? await callAnthropic(prompt) : await callOpenAi(prompt);

  return normalizeFresco(JSON.parse(extractJson(raw)));
}

function resolveProvider(): AiProvider {
  if (process.env.AI_PROVIDER === "anthropic") {
    return "anthropic";
  }

  if (process.env.AI_PROVIDER === "openai") {
    return "openai";
  }

  return process.env.ANTHROPIC_API_KEY ? "anthropic" : "openai";
}

function buildNarrativePrompt(testimonials: NarrativeInput[]) {
  return `Create an AI Narrative Fresco from these testimonials:

${JSON.stringify(testimonials, null, 2)}

Return JSON matching this TypeScript shape:
{
  "themes": [{ "name": string, "confidence": number, "description": string }],
  "storyline": [{
    "id": string,
    "title": string,
    "period": string,
    "summary": string,
    "theme": string,
    "relatedContributionIds": string[]
  }],
  "narrativeSummary": string
}`;
}

async function callOpenAi(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required to generate the narrative fresco with OpenAI.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      input: [
        {
          role: "system",
          content: systemInstruction,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI narrative request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string }> }>;
  };

  return payload.output_text ?? payload.output?.[0]?.content?.[0]?.text ?? "";
}

async function callAnthropic(prompt: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required to generate the narrative fresco with Anthropic.");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
      max_tokens: 1800,
      system: systemInstruction,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic narrative request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  return payload.content?.find((block) => block.type === "text")?.text ?? "";
}

function extractJson(raw: string) {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI response did not include a JSON object.");
  }

  return raw.slice(start, end + 1);
}

function normalizeFresco(value: unknown): GeneratedNarrativeFresco {
  if (!isRecord(value)) {
    throw new Error("AI response was not a JSON object.");
  }

  return {
    themes: Array.isArray(value.themes) ? value.themes.map(normalizeTheme) : [],
    storyline: Array.isArray(value.storyline) ? value.storyline.map(normalizeNode) : [],
    narrativeSummary:
      typeof value.narrativeSummary === "string" ? value.narrativeSummary : "Narrative generated.",
  };
}

function normalizeTheme(value: unknown): NarrativeTheme {
  const theme = isRecord(value) ? value : {};

  return {
    name: typeof theme.name === "string" ? theme.name : "Untitled theme",
    confidence: typeof theme.confidence === "number" ? Math.min(Math.max(theme.confidence, 0), 1) : 0,
    description: typeof theme.description === "string" ? theme.description : "",
  };
}

function normalizeNode(value: unknown): NarrativeStorylineNode {
  const node = isRecord(value) ? value : {};

  return {
    id: typeof node.id === "string" ? node.id : crypto.randomUUID(),
    title: typeof node.title === "string" ? node.title : "Untitled moment",
    period: typeof node.period === "string" ? node.period : "Undated",
    summary: typeof node.summary === "string" ? node.summary : "",
    theme: typeof node.theme === "string" ? node.theme : "Memory",
    relatedContributionIds: Array.isArray(node.relatedContributionIds)
      ? node.relatedContributionIds.filter((id): id is string => typeof id === "string")
      : [],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
