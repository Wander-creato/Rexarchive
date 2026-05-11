import type {
  MemoryContribution,
  NarrativeTheme,
  StorylineSegment,
} from "@/types/narrative";

export const mockContributions: MemoryContribution[] = [
  {
    id: "m-001",
    title: "The Founding Workshop",
    contributor: "Noura A.",
    mediaType: "photo",
    submittedAt: "1962-06-14T10:15:00.000Z",
    description:
      "A candid shot of the first workshop where the founding team drafted ADAMIC's archival charter.",
    mediaUrl:
      "https://images.unsplash.com/photo-1473447198193-3d4cf0ec7da1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "m-002",
    title: "Radio Testimony Reel",
    contributor: "Elias M.",
    mediaType: "audio",
    submittedAt: "1974-09-05T18:45:00.000Z",
    description:
      "An oral testimony describing how local neighborhoods gathered to preserve stories during uncertain times.",
    mediaUrl:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "m-003",
    title: "Restoration Day Highlights",
    contributor: "Mariam H.",
    mediaType: "video",
    submittedAt: "1997-11-20T14:10:00.000Z",
    description:
      "A short documentary clip capturing volunteers restoring fragile documents and early cassette archives.",
    mediaUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "m-004",
    title: "Intergenerational Circle",
    contributor: "Sami R.",
    mediaType: "photo",
    submittedAt: "2012-03-08T08:20:00.000Z",
    description:
      "Grandparents and students gather for a memory-sharing circle, exchanging stories and annotated family albums.",
    mediaUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
  },
];

export const seededThemes: NarrativeTheme[] = [
  { id: "t-heritage", label: "Living Heritage", confidence: 0.96 },
  { id: "t-resilience", label: "Community Resilience", confidence: 0.92 },
  { id: "t-transmission", label: "Intergenerational Transmission", confidence: 0.89 },
];

export const seededStoryline: StorylineSegment[] = [
  {
    id: "s-1960",
    anchorYear: 1962,
    title: "Foundation of Shared Memory",
    summary:
      "The earliest artifacts reveal a deliberate effort to protect local identity through collective archiving.",
    linkedMemoryIds: ["m-001"],
  },
  {
    id: "s-1970",
    anchorYear: 1974,
    title: "Voices Become Testimony",
    summary:
      "Audio records transformed personal stories into communal evidence, preserving nuance and emotion.",
    linkedMemoryIds: ["m-002"],
  },
  {
    id: "s-1990",
    anchorYear: 1997,
    title: "Restoration and Renewal",
    summary:
      "A restoration wave modernized preservation practices while keeping analog authenticity intact.",
    linkedMemoryIds: ["m-003"],
  },
  {
    id: "s-2010",
    anchorYear: 2012,
    title: "Memory as a Living Network",
    summary:
      "Intergenerational rituals reframed archiving as an active social practice rather than a static repository.",
    linkedMemoryIds: ["m-004"],
  },
];
