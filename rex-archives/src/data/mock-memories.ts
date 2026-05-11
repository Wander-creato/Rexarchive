import type { MemoryContribution } from "@/types/narrative";

export const mockContributions: MemoryContribution[] = [
  {
    id: "m-001",
    createdAt: "1962-06-14T10:15:00.000Z",
    mediaType: "image",
    userTextTestimonial:
      "A candid shot of the first workshop where the founding team drafted ADAMIC's archival charter.",
    mediaUrl:
      "https://images.unsplash.com/photo-1473447198193-3d4cf0ec7da1?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1473447198193-3d4cf0ec7da1?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Noura A.", title: "The Founding Workshop" },
  },
  {
    id: "m-002",
    createdAt: "1974-09-05T18:45:00.000Z",
    mediaType: "audio",
    userTextTestimonial:
      "An oral testimony describing how local neighborhoods gathered to preserve stories during uncertain times.",
    mediaUrl:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl: null,
    transcript:
      "Neighborhoods gathered around radios and tapes, preserving stories when certainty felt fragile.",
    metadata: { contributor: "Elias M.", title: "Radio Testimony Reel" },
  },
  {
    id: "m-003",
    createdAt: "1997-11-20T14:10:00.000Z",
    mediaType: "video",
    userTextTestimonial:
      "A short documentary clip capturing volunteers restoring fragile documents and early cassette archives.",
    mediaUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Mariam H.", title: "Restoration Day Highlights" },
  },
  {
    id: "m-004",
    createdAt: "2012-03-08T08:20:00.000Z",
    mediaType: "image",
    userTextTestimonial:
      "Grandparents and students gather for a memory-sharing circle, exchanging stories and annotated family albums.",
    mediaUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Sami R.", title: "Intergenerational Circle" },
  },
];
