export type MediaKind = "photo" | "video" | "audio";

export type MemoryContribution = {
  id: string;
  title: string;
  contributor: string;
  year: string;
  location: string;
  mediaKind: MediaKind;
  theme: string;
  description: string;
  accent: "amber" | "teal" | "blue";
};

export type NarrativeTheme = {
  label: string;
  confidence: number;
};

export type NarrativeSegment = {
  id: string;
  era: string;
  title: string;
  summary: string;
  themes: NarrativeTheme[];
  memoryIds: string[];
};

export type GeneratedNarrative = {
  title: string;
  synopsis: string;
  segments: NarrativeSegment[];
};
