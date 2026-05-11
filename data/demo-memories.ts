import type { GeneratedNarrativeFresco, MemoryContribution } from "@/types/memory";

export const demoMemories: MemoryContribution[] = [
  {
    id: "m-1948-letters",
    title: "Letters from the first workshop",
    contributor: "Mira A.",
    year: "1948",
    location: "Harbor District",
    mediaKind: "photo",
    transcript:
      "My grandfather kept every sketch and handwritten receipt from the workshop. He said the building was small, but everyone knew it was a place where futures were repaired.",
    tags: ["craft", "origin", "family"],
  },
  {
    id: "m-1973-song",
    title: "A song at the community table",
    contributor: "Jon R.",
    year: "1973",
    location: "Old Assembly Hall",
    mediaKind: "audio",
    transcript:
      "The room would go quiet when the first verse began. The song was not official, but it carried the feeling of belonging better than any speech.",
    tags: ["music", "community", "ritual"],
  },
  {
    id: "m-1996-bridge",
    title: "Crossing the winter bridge",
    contributor: "Samira L.",
    year: "1996",
    location: "North River",
    mediaKind: "video",
    transcript:
      "We crossed together after the storm damaged the road. The bridge became our proof that the archive was not only what we saved, but how we kept showing up.",
    tags: ["resilience", "place", "transition"],
  },
  {
    id: "m-2024-tablet",
    title: "Scanning the fragile albums",
    contributor: "Eden T.",
    year: "2024",
    location: "ADAMIC Lab",
    mediaKind: "photo",
    transcript:
      "The young volunteers handled each page like it was breathing. By the end, the old albums were not replaced by technology; they were given another doorway.",
    tags: ["digitization", "future", "care"],
  },
];

export const demoFresco: GeneratedNarrativeFresco = {
  narrativeSummary:
    "Across generations, the archive reveals a community that turns craft, music, recovery, and technology into rituals of continuity.",
  themes: [
    {
      name: "Continuity",
      confidence: 0.94,
      description: "Memories repeatedly frame inheritance as an active, shared practice.",
    },
    {
      name: "Gathering",
      confidence: 0.88,
      description: "Tables, halls, bridges, and labs become emotional anchors for belonging.",
    },
    {
      name: "Careful Renewal",
      confidence: 0.85,
      description: "Modern tools are presented as extensions of human care, not replacements.",
    },
  ],
  storyline: [
    {
      id: "s-origin",
      title: "The Workshop Becomes a Promise",
      period: "1948",
      summary:
        "A modest workshop anchors the first layer of trust, where repair becomes a metaphor for shared futures.",
      theme: "Continuity",
      relatedContributionIds: ["m-1948-letters"],
    },
    {
      id: "s-ritual",
      title: "The Song Finds the Room",
      period: "1973",
      summary:
        "A recurring song transforms ordinary gatherings into a memory ritual that everyone can carry.",
      theme: "Gathering",
      relatedContributionIds: ["m-1973-song"],
    },
    {
      id: "s-resilience",
      title: "The Bridge Holds",
      period: "1996",
      summary:
        "A difficult crossing reframes the archive as an act of collective resilience and presence.",
      theme: "Careful Renewal",
      relatedContributionIds: ["m-1996-bridge"],
    },
    {
      id: "s-doorway",
      title: "Another Doorway Opens",
      period: "2024",
      summary:
        "Digitization becomes a warm handoff between generations, preserving texture while expanding access.",
      theme: "Careful Renewal",
      relatedContributionIds: ["m-2024-tablet"],
    },
  ],
};
