import { create } from "zustand";
import type { MediaKind } from "@/types/memory";

type UploadVaultState = {
  step: number;
  mediaKind: MediaKind;
  title: string;
  description: string;
  files: string[];
  consent: boolean;
  setStep: (step: number) => void;
  setMediaKind: (mediaKind: MediaKind) => void;
  setField: (field: "title" | "description", value: string) => void;
  setFiles: (files: string[]) => void;
  setConsent: (consent: boolean) => void;
};

export const useUploadVaultStore = create<UploadVaultState>((set) => ({
  step: 0,
  mediaKind: "photo",
  title: "",
  description: "",
  files: [],
  consent: false,
  setStep: (step) => set({ step }),
  setMediaKind: (mediaKind) => set({ mediaKind }),
  setField: (field, value) => set({ [field]: value }),
  setFiles: (files) => set({ files }),
  setConsent: (consent) => set({ consent }),
}));
