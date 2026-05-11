import { create } from "zustand";

import type { MemoryContribution } from "@/types/narrative";

interface UploadStatus {
  phase: "idle" | "uploading" | "success" | "error";
  progress: number;
  message?: string;
}

interface MemoryStore {
  memories: MemoryContribution[];
  isHydrated: boolean;
  uploadStatus: UploadStatus;
  setMemories: (items: MemoryContribution[]) => void;
  addOptimisticMemory: (item: MemoryContribution) => void;
  reconcileMemory: (temporaryId: string, item: MemoryContribution) => void;
  removeMemory: (id: string) => void;
  setUploadStatus: (status: UploadStatus) => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  isHydrated: false,
  uploadStatus: { phase: "idle", progress: 0 },
  setMemories: (items) => set({ memories: items, isHydrated: true }),
  addOptimisticMemory: (item) =>
    set((state) => ({
      memories: [item, ...state.memories],
    })),
  reconcileMemory: (temporaryId, item) =>
    set((state) => ({
      memories: state.memories.map((entry) => (entry.id === temporaryId ? item : entry)),
    })),
  removeMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((entry) => entry.id !== id),
    })),
  setUploadStatus: (status) => set({ uploadStatus: status }),
}));
