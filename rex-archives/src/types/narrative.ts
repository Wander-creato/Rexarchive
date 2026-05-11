export type MediaType = "image" | "video" | "audio";

export interface MemoryContribution {
  id: string;
  createdAt: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl: string | null;
  transcript: string | null;
  userTextTestimonial: string | null;
  metadata: Record<string, unknown>;
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
