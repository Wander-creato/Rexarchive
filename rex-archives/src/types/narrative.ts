export type MediaType = "photo" | "video" | "audio";

export interface MemoryContribution {
  id: string;
  createdAt: string;
  type: MediaType;
  url: string;
  title: string | null;
  description: string | null;
  category: string | null;
  isOptimistic?: boolean;
}

export interface NarrativeChapter {
  id: string;
  title: string;
  body: string;
  mediaIds: string[];
}

export interface NarrativeFresco {
  title: string;
  fullNarrative: string;
  chapters: NarrativeChapter[];
}
