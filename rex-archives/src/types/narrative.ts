export type MediaType = "photo" | "video" | "audio";

export interface MemoryContribution {
  id: string;
  title: string;
  contributor: string;
  mediaType: MediaType;
  submittedAt: string;
  description: string;
  mediaUrl: string;
}

export interface NarrativeTheme {
  id: string;
  label: string;
  confidence: number;
}

export interface StorylineSegment {
  id: string;
  anchorYear: number;
  title: string;
  summary: string;
  linkedMemoryIds: string[];
}

export interface NarrativeFresco {
  themes: NarrativeTheme[];
  storyline: StorylineSegment[];
}
