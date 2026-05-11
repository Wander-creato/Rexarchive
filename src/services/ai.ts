import type { GeneratedNarrative, MemoryContribution } from "@/types/memory";

type AiProvider = "openai" | "anthropic";

type GenerateNarrativeOptions = {
  provider?: AiProvider;
  apiKey?: string;
};

const narrativeSystemPrompt = `You are the narrative intelligence behind Rex-Archives for ADAMIC.
Extract recurring themes from memory testimonials, then synthesize them into a trustworthy chronological or thematic fresco.
Return concise JSON with a title, synopsis, and ordered segments. Each segment needs an era, title, summary, themes, and memoryIds.`;

export async function generateNarrativeFresco(
  memories: MemoryContribution[],
  options: GenerateNarrativeOptions = {},
): Promise<GeneratedNarrative> {
  if (memories.length === 0) {
    return {
      title: "Awaiting the first memory",
      synopsis:
        "Upload testimonials to let Rex-Archives reveal shared themes and a living storyline.",
      segments: [],
    };
  }

  const provider = options.provider ?? inferProvider();
  const apiKey = options.apiKey ?? getProviderKey(provider);

  if (!apiKey) {
    return buildLocalNarrative(memories);
  }

  // The concrete provider calls live behind this seam so the UI can ship safely
  // before production credentials are provisioned in the deployment platform.
  switch (provider) {
    case "anthropic":
      return requestAnthropicNarrative(memories, apiKey);
    case "openai":
    default:
      return requestOpenAiNarrative(memories, apiKey);
  }
}

function inferProvider(): AiProvider {
  if (process.env.ANTHROPIC_API_KEY) {
    return "anthropic";
  }

  return "openai";
}

function getProviderKey(provider: AiProvider) {
  return provider === "anthropic"
    ? process.env.ANTHROPIC_API_KEY
    : process.env.OPENAI_API_KEY;
}

async function requestOpenAiNarrative(
  memories: MemoryContribution[],
  apiKey: string,
): Promise<GeneratedNarrative> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_NARRATIVE_MODEL ?? "gpt-4o",
      input: [
        { role: "system", content: narrativeSystemPrompt },
        { role: "user", content: JSON.stringify(memories) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "rex_archives_narrative",
          schema: narrativeSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI narrative request failed: ${response.status}`);
  }

  const payload = await response.json();
  const jsonText =
    payload.output_text ??
    payload.output?.[0]?.content?.find(
      (part: { type?: string }) => part.type === "output_text",
    )?.text;

  return parseNarrative(jsonText);
}

async function requestAnthropicNarrative(
  memories: MemoryContribution[],
  apiKey: string,
): Promise<GeneratedNarrative> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_NARRATIVE_MODEL ?? "claude-3-5-sonnet-latest",
      max_tokens: 1400,
      system: narrativeSystemPrompt,
      messages: [
        {
          role: "user",
          content: `Create the Rex-Archives fresco JSON for these memories: ${JSON.stringify(
            memories,
          )}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic narrative request failed: ${response.status}`);
  }

  const payload = await response.json();
  const jsonText = payload.content
    ?.map((part: { text?: string }) => part.text)
    .filter(Boolean)
    .join("\n");

  return parseNarrative(jsonText);
}

function parseNarrative(jsonText: string | undefined): GeneratedNarrative {
  if (!jsonText) {
    throw new Error("AI narrative response did not include JSON text.");
  }

  return JSON.parse(jsonText) as GeneratedNarrative;
}

function buildLocalNarrative(memories: MemoryContribution[]): GeneratedNarrative {
  const sorted = [...memories].sort((a, b) => Number(a.year) - Number(b.year));

  return {
    title: "A living archive in formation",
    synopsis:
      "This preview narrative is generated locally until AI credentials are configured.",
    segments: sorted.map((memory) => ({
      id: `local-${memory.id}`,
      era: memory.year,
      title: memory.theme,
      summary: memory.description,
      themes: [{ label: memory.theme, confidence: 0.72 }],
      memoryIds: [memory.id],
    })),
  };
}

const narrativeSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "synopsis", "segments"],
  properties: {
    title: { type: "string" },
    synopsis: { type: "string" },
    segments: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "era", "title", "summary", "themes", "memoryIds"],
        properties: {
          id: { type: "string" },
          era: { type: "string" },
          title: { type: "string" },
          summary: { type: "string" },
          themes: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["label", "confidence"],
              properties: {
                label: { type: "string" },
                confidence: { type: "number" },
              },
            },
          },
          memoryIds: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};
