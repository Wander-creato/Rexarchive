"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, FileText, LoaderCircle, Upload, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  DEFAULT_MEMORY_CATEGORY,
  MEMORY_CATEGORIES,
  normalizeMemoryCategory,
  type MemoryCategory,
} from "@/constants/memory-categories";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { mapMemoryRowToContribution } from "@/lib/memory-mappers";
import { playUiSound } from "@/lib/sound";
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import { useMemoryStore } from "@/store/memory-store";
import type { Database } from "@/types/database";
import type { MediaType, MemoryContribution } from "@/types/narrative";

const steps = [
  { id: "step-1", title: "Fichier", detail: "Ajoutez une photo, une vidéo ou un audio", icon: Upload },
  { id: "step-2", title: "Description", detail: "Donnez du contexte à votre souvenir", icon: FileText },
  { id: "step-3", title: "Catégorie", detail: "Finalisez l'archivage dans le bon thème", icon: Video },
];

const vaultSchema = z.object({
  title: z.string().min(3, "Veuillez saisir un titre d'au moins 3 caractères."),
  description: z.string().min(12, "Veuillez saisir au moins 12 caractères."),
  category: z.enum(MEMORY_CATEGORIES),
});

type VaultValues = z.infer<typeof vaultSchema>;
type MemoryInsert = Database["public"]["Tables"]["memories"]["Insert"];
type MemoryRow = Database["public"]["Tables"]["memories"]["Row"];
const STORAGE_BUCKET = "archives";

function detectMediaType(file: File): MediaType {
  if (file.type.startsWith("video/")) {
    return "video";
  }
  if (file.type.startsWith("audio/")) {
    return "audio";
  }
  return "photo";
}

function fileLabel(file: File | null) {
  if (!file) {
    return "Aucun média sélectionné";
  }
  const sizeMb = (file.size / 1_000_000).toFixed(2);
  return `${file.name} (${sizeMb} MB)`;
}

export function UploadVaultPreview() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<MediaType>("photo");
  const uploadStatus = useMemoryStore((state) => state.uploadStatus);
  const setUploadStatus = useMemoryStore((state) => state.setUploadStatus);
  const addOptimisticMemory = useMemoryStore((state) => state.addOptimisticMemory);
  const reconcileMemory = useMemoryStore((state) => state.reconcileMemory);
  const removeMemory = useMemoryStore((state) => state.removeMemory);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VaultValues>({
    resolver: zodResolver(vaultSchema),
    defaultValues: {
      title: "",
      description: "",
      category: DEFAULT_MEMORY_CATEGORY,
    },
  });

  const dropzone = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
      "video/*": [],
      "audio/*": [],
    },
    onDropAccepted: (acceptedFiles) => {
      const [file] = acceptedFiles;
      if (!file) return;
      setSelectedFile(file);
      setSelectedType(detectMediaType(file));
    },
    onDropRejected: () => {
      setUploadStatus({
        phase: "error",
        progress: 0,
        message: "Type non pris en charge. Importez une image, une vidéo ou un audio.",
      });
    },
  });

  const progressLabel = useMemo(
    () =>
      uploadStatus.phase === "uploading"
        ? `Importation ${uploadStatus.progress}%`
        : uploadStatus.message ?? "Prêt à archiver",
    [uploadStatus],
  );

  const runUpload = handleSubmit(async (values) => {
    if (!selectedFile) {
      setUploadStatus({ phase: "error", progress: 0, message: "Ajoutez d'abord un fichier média." });
      toast.error("Aucun fichier sélectionné.");
      return;
    }

    if (!values.category) {
      setUploadStatus({ phase: "error", progress: 0, message: "Sélectionnez une catégorie avant de publier." });
      toast.error("Catégorie manquante : choisissez une catégorie prédéfinie.");
      return;
    }

    const optimisticId = `optimistic-${Date.now()}`;
    let localObjectUrl = "";
    let progress = 7;
    setUploadStatus({ phase: "uploading", progress, message: "Préparation du transfert sécurisé..." });
    const progressTimer = window.setInterval(() => {
      progress = Math.min(progress + 9, 92);
      setUploadStatus({
        phase: "uploading",
        progress,
        message: "Importation dans le coffre ADAMIC...",
      });
    }, 220);

    try {
      const supabase = getSupabaseBrowserClient();
      localObjectUrl = URL.createObjectURL(selectedFile);
      const normalizedCategory = normalizeMemoryCategory(values.category);

      const optimisticMemory: MemoryContribution = {
        id: optimisticId,
        createdAt: new Date().toISOString(),
        type: selectedType,
        url: localObjectUrl,
        title: values.title,
        description: values.description,
        category: normalizedCategory,
        isOptimistic: true,
      };

      addOptimisticMemory(optimisticMemory);

      const storagePath = `memories/${Date.now()}-${selectedFile.name.replace(/\s+/g, "-").toLowerCase()}`;
      const uploadResult = await supabase.storage.from(STORAGE_BUCKET).upload(storagePath, selectedFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: selectedFile.type,
      });

      if (uploadResult.error) {
        throw new Error(`Échec de l'envoi dans le bucket "${STORAGE_BUCKET}" : ${uploadResult.error.message}`);
      }

      const { data: publicAsset } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
      if (!publicAsset.publicUrl) {
        throw new Error("Impossible de générer l'URL publique du média.");
      }

      const insertPayload: MemoryInsert = {
        type: selectedType,
        url: publicAsset.publicUrl,
        title: values.title,
        description: values.description,
        category: normalizedCategory,
      };

      const { data: insertedRows, error: insertError } = await supabase
        .from("memories")
        .insert(insertPayload)
        .select("*")
        .limit(1);

      if (insertError) {
        throw insertError;
      }

      const insertedRow = insertedRows?.[0] as MemoryRow | undefined;
      if (!insertedRow) {
        throw new Error("Importation terminée, mais aucune ligne mémoire n'a été renvoyée.");
      }

      reconcileMemory(optimisticId, mapMemoryRowToContribution(insertedRow));
      setUploadStatus({
        phase: "success",
        progress: 100,
        message: "Souvenir archivé avec succès.",
      });
      toast.success("Souvenir publié avec succès !");
      playUiSound("upload-complete");
      router.refresh();
      reset({ title: "", description: "", category: DEFAULT_MEMORY_CATEGORY });
      setSelectedFile(null);
      setSelectedType("photo");
      setStepIndex(0);
    } catch (error) {
      removeMemory(optimisticId);
      setUploadStatus({
        phase: "error",
        progress: 0,
        message: error instanceof Error ? error.message : "Échec de l'importation.",
      });
      toast.error(error instanceof Error ? error.message : "L'importation a échoué.");
    } finally {
      window.clearInterval(progressTimer);
      if (localObjectUrl) {
        URL.revokeObjectURL(localObjectUrl);
      }
    }
  });

  return (
    <GlassCard className="h-full p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Coffre d&apos;importation unifié</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-100">Parcours d&apos;ingestion en 3 étapes</h3>
        </div>
        <span className="rounded-full border border-teal-300/35 bg-teal-300/10 px-3 py-1 text-xs text-teal-100">
          Supabase en direct
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className={[
              "group flex w-full items-center justify-between rounded-2xl border bg-white/5 px-4 py-3 text-left transition-all duration-300",
              stepIndex === index
                ? "border-amber-300/60 shadow-[0_0_0_1px_rgba(245,158,11,0.35)]"
                : "border-white/10",
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber-400/20 text-amber-200">
                <step.icon className="size-4" />
              </span>
              <span>
                <strong className="block text-sm font-semibold text-slate-50">{step.title}</strong>
                <span className="text-xs text-slate-300/80">{step.detail}</span>
              </span>
            </span>
            {stepIndex > index ? (
              <CheckCircle2 className="size-4 text-emerald-300" />
            ) : (
              <span className="text-xs text-slate-400">{index + 1}</span>
            )}
          </motion.div>
        ))}
      </div>

      <form className="mt-6 space-y-4" onSubmit={runUpload}>
        {stepIndex === 0 ? (
          <div
            {...dropzone.getRootProps()}
            className={[
              "cursor-pointer rounded-2xl border border-dashed p-5 text-center transition-colors",
              dropzone.isDragActive ? "border-amber-300 bg-amber-300/10" : "border-white/20 bg-[#0f172a]/70",
            ].join(" ")}
          >
            <input {...dropzone.getInputProps()} />
            <p className="text-sm font-medium text-slate-100">Glissez-déposez vos médias dans le coffre</p>
            <p className="mt-1 text-xs text-slate-300/80">ou cliquez pour parcourir vos fichiers locaux</p>
            <p className="mt-3 text-xs text-teal-100">{fileLabel(selectedFile)}</p>
          </div>
        ) : null}

        {stepIndex === 1 ? (
          <div className="space-y-3 rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
            <p className="rounded-xl border border-amber-300/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
              Type détecté : {selectedType}
            </p>
            <label className="block text-xs uppercase tracking-[0.14em] text-slate-300">Titre du souvenir</label>
            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none ring-amber-300/30 placeholder:text-slate-400 focus:ring-2"
              placeholder="Ex. Soirée de restauration des archives"
              {...register("title")}
            />
            {errors.title ? <p className="text-xs text-rose-300">{errors.title.message}</p> : null}
            <label className="block text-xs uppercase tracking-[0.14em] text-slate-300">Description</label>
            <textarea
              className="min-h-24 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none ring-amber-300/30 placeholder:text-slate-400 focus:ring-2"
              placeholder="Décrivez le souvenir, son contexte et son importance."
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-xs text-rose-300">{errors.description.message}</p>
            ) : null}
          </div>
        ) : null}

        {stepIndex === 2 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Aperçu de validation</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-200">
              <p>
                <span className="text-slate-400">Fichier :</span> {fileLabel(selectedFile)}
              </p>
              <p>
                <span className="text-slate-400">Type :</span> {selectedType}
              </p>
              <p>
                <span className="text-slate-400">Titre :</span> {watch("title") || "Emplacement vide - En attente de contenu"}
              </p>
              <p className="text-xs text-slate-300/85">
                {watch("description") || "Emplacement vide - En attente de contenu"}
              </p>
              <label className="block text-xs uppercase tracking-[0.14em] text-slate-300">Catégorie</label>
              <div className="flex flex-wrap gap-2">
                {MEMORY_CATEGORIES.map((category) => {
                  const current = watch("category") as MemoryCategory;
                  const isActive = current === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setValue("category", category, { shouldDirty: true, shouldValidate: true })}
                      className={[
                        "rounded-full border px-3 py-1.5 text-xs transition-colors",
                        isActive
                          ? "border-amber-300/70 bg-amber-500/25 text-amber-100"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/45",
                      ].join(" ")}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" {...register("category")} />
              {errors.category ? <p className="text-xs text-rose-300">{errors.category.message}</p> : null}
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-white/10 bg-[#0f172a]/80 p-4">
          <p className="text-xs tracking-[0.14em] text-slate-300 uppercase">État du transfert vers le coffre</p>
          {uploadStatus.phase === "idle" ? (
            <div className="mt-3 grid gap-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-300 to-amber-300 transition-all duration-300"
                  style={{ width: `${uploadStatus.progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-200">{progressLabel}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={stepIndex === 0 || isSubmitting}
            onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs text-slate-200 transition-colors hover:border-white/35 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-3.5" />
            Retour
          </button>

          {stepIndex < 2 ? (
            <button
              type="button"
              disabled={isSubmitting || (stepIndex === 0 && !selectedFile)}
              onClick={() => setStepIndex((current) => Math.min(current + 1, 2))}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-3 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Suivant
              <ChevronRight className="size-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-300 px-3 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? <LoaderCircle className="size-3.5 animate-spin" /> : null}
              Archiver le souvenir
            </button>
          )}
        </div>
      </form>
    </GlassCard>
  );
}
