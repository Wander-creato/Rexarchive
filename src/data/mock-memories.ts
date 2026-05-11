import type { GeneratedNarrative, MemoryContribution } from "@/types/memory";

export const featuredMemories: MemoryContribution[] = [
  {
    id: "atelier-1968",
    title: "Atelier du soir",
    contributor: "Mina Laurent",
    year: "1968",
    location: "Tunis",
    mediaKind: "photo",
    theme: "Craft and belonging",
    description:
      "A warm workshop gathering where family members restored archival frames after closing hours.",
    accent: "amber",
  },
  {
    id: "harbor-1977",
    title: "Voices at the harbor",
    contributor: "Samir Haddad",
    year: "1977",
    location: "Marseille",
    mediaKind: "audio",
    theme: "Migration",
    description:
      "An audio recollection of first arrivals, sea air, and the improvised rituals that made a new city feel familiar.",
    accent: "teal",
  },
  {
    id: "garden-1984",
    title: "The courtyard feast",
    contributor: "Leila Benali",
    year: "1984",
    location: "Casablanca",
    mediaKind: "video",
    theme: "Celebration",
    description:
      "A short film preserving a shared meal, the choreography of care, and songs carried across generations.",
    accent: "blue",
  },
  {
    id: "school-1996",
    title: "Classroom archive",
    contributor: "Noah Perez",
    year: "1996",
    location: "Lyon",
    mediaKind: "photo",
    theme: "Transmission",
    description:
      "Children annotate family photos, turning private fragments into a community map of names and dates.",
    accent: "amber",
  },
];

export const demoNarrative: GeneratedNarrative = {
  title: "A lineage of luminous thresholds",
  synopsis:
    "The first Rex-Archives fresco follows families as they transform workshops, harbors, courtyards, and classrooms into places of continuity.",
  segments: [
    {
      id: "origin-craft",
      era: "1960s",
      title: "Hands make memory durable",
      summary:
        "Early contributions cluster around repair, craft, and evening rituals that kept heritage visible in everyday rooms.",
      themes: [
        { label: "Craft", confidence: 0.92 },
        { label: "Family labor", confidence: 0.86 },
      ],
      memoryIds: ["atelier-1968"],
    },
    {
      id: "crossing",
      era: "1970s",
      title: "Crossings become anchors",
      summary:
        "Testimonies from ports and stations reveal arrival as both rupture and invention: a new geography built from familiar voices.",
      themes: [
        { label: "Migration", confidence: 0.94 },
        { label: "Adaptation", confidence: 0.82 },
      ],
      memoryIds: ["harbor-1977"],
    },
    {
      id: "public-joy",
      era: "1980s",
      title: "Joy enters the public archive",
      summary:
        "Videos and photos show celebration as infrastructure, binding neighbors through meals, music, and collective care.",
      themes: [
        { label: "Celebration", confidence: 0.9 },
        { label: "Community", confidence: 0.88 },
      ],
      memoryIds: ["garden-1984"],
    },
    {
      id: "transmission",
      era: "1990s",
      title: "The archive learns to teach",
      summary:
        "Later memories emphasize children, classrooms, and captions, showing heritage becoming a shared civic language.",
      themes: [
        { label: "Transmission", confidence: 0.91 },
        { label: "Education", confidence: 0.79 },
      ],
      memoryIds: ["school-1996"],
    },
  ],
};
