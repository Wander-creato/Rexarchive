import type { MemoryContribution } from "@/types/narrative";

export const mockContributions: MemoryContribution[] = [
  {
    id: "m-001",
    createdAt: "1962-06-14T10:15:00.000Z",
    mediaType: "image",
    userTextTestimonial:
      "Un cliché du premier atelier où l'équipe fondatrice a esquissé la charte d'archives d'ADAMIC.",
    mediaUrl:
      "https://images.unsplash.com/photo-1473447198193-3d4cf0ec7da1?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1473447198193-3d4cf0ec7da1?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Noura A.", title: "L'atelier fondateur" },
  },
  {
    id: "m-002",
    createdAt: "1974-09-05T18:45:00.000Z",
    mediaType: "audio",
    userTextTestimonial:
      "Un témoignage oral qui raconte comment les quartiers se rassemblaient pour préserver leurs récits en période d'incertitude.",
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    thumbnailUrl: null,
    transcript:
      "Les habitants se réunissaient autour des radios et des cassettes pour sauver les histoires quand l'avenir semblait fragile.",
    metadata: { contributor: "Elias M.", title: "Bande du témoignage radio" },
  },
  {
    id: "m-003",
    createdAt: "1997-11-20T14:10:00.000Z",
    mediaType: "video",
    userTextTestimonial:
      "Un court extrait documentaire montrant des bénévoles en pleine restauration de documents fragiles et d'archives sur cassette.",
    mediaUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Mariam H.", title: "Moments forts de la restauration" },
  },
  {
    id: "m-004",
    createdAt: "2012-03-08T08:20:00.000Z",
    mediaType: "image",
    userTextTestimonial:
      "Grands-parents et étudiants se retrouvent pour un cercle de mémoire, entre récits et albums familiaux annotés.",
    mediaUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=48&q=10",
    transcript: null,
    metadata: { contributor: "Sami R.", title: "Cercle intergénérationnel" },
  },
];
