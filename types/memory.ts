export type MediaKind = "photo" | "video" | "audio";

export type MemoryContribution = {
  id: string;
  title: string;
  contributor: string;
  year: string;
  location: string;
  mediaKind: MediaKind;
  mediaUrl?: string;
  transcript: string;
  tags: string[];
};

export type NarrativeTheme = {
  name: string;
  confidence: number;
  description: string;
};

export type NarrativeStorylineNode = {
  id: string;
  title: string;
  period: string;
  summary: string;
  theme: string;
  relatedContributionIds: string[];
};

export type GeneratedNarrativeFresco = {
  themes: NarrativeTheme[];
  storyline: NarrativeStorylineNode[];
  narrativeSummary: string;
};
