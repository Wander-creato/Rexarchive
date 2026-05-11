"use client";

import { ChangeEvent, DragEvent, useMemo } from "react";
import { AudioLines, Camera, Check, Clapperboard, FileUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUploadVaultStore } from "@/stores/upload-vault-store";
import type { MediaKind } from "@/types/memory";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";

const steps = ["Media", "Story", "Consent"];

const mediaOptions: Array<{
  value: MediaKind;
  label: string;
  icon: typeof Camera;
  copy: string;
}> = [
  {
    value: "photo",
    label: "Photo",
    icon: Camera,
    copy: "Scans, portraits, places, documents",
  },
  {
    value: "video",
    label: "Video",
    icon: Clapperboard,
    copy: "Ceremonies, interviews, moving fragments",
  },
  {
    value: "audio",
    label: "Audio",
    icon: AudioLines,
    copy: "Voices, songs, field recordings",
  },
];

export function UploadVault() {
  const {
    step,
    mediaKind,
    title,
    description,
    files,
    consent,
    setStep,
    setMediaKind,
    setField,
    setFiles,
    setConsent,
  } = useUploadVaultStore();

  const canContinue = useMemo(() => {
    if (step === 0) {
      return files.length > 0;
    }

    if (step === 1) {
      return title.trim().length > 2 && description.trim().length > 12;
    }

    return consent;
  }, [consent, description, files.length, step, title]);

  function captureFiles(fileList: FileList | null) {
    setFiles(Array.from(fileList ?? []).map((file) => file.name));
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    captureFiles(event.dataTransfer.files);
  }

  return (
    <section id="vault" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-memory-amber">
            Unified Upload Vault
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
            A calm, guided flow for fragile stories.
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-slate-300">
          The upload experience is structured for Supabase Storage and Auth:
          media first, narrative context second, explicit consent always.
        </p>
      </div>

      <GlassCard className="overflow-hidden p-4 md:p-6">
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {steps.map((label, index) => (
            <button
              className={cn(
                "rounded-2xl border px-4 py-3 text-left transition",
                step === index
                  ? "border-memory-amber/50 bg-memory-amber/15 text-white"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10",
              )}
              key={label}
              onClick={() => setStep(index)}
              type="button"
            >
              <span className="text-xs uppercase tracking-[0.22em]">
                Step {index + 1}
              </span>
              <span className="mt-1 block font-semibold">{label}</span>
            </button>
          ))}
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]"
          initial={{ opacity: 0, y: 16 }}
          key={step}
          transition={{ duration: 0.35 }}
        >
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5">
            {step === 0 && (
              <MediaStep
                captureFiles={captureFiles}
                files={files}
                handleDrop={handleDrop}
                mediaKind={mediaKind}
                setMediaKind={setMediaKind}
              />
            )}
            {step === 1 && (
              <StoryStep
                description={description}
                setField={setField}
                title={title}
              />
            )}
            {step === 2 && (
              <ConsentStep consent={consent} setConsent={setConsent} />
            )}
          </div>

          <VaultPreview
            consent={consent}
            description={description}
            files={files}
            mediaKind={mediaKind}
            title={title}
          />
        </motion.div>

        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
          <button
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
            type="button"
          >
            Back
          </button>
          <MagneticButton
            disabled={!canContinue}
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            type="button"
          >
            {step === steps.length - 1 ? "Prepare Supabase upload" : "Continue"}
          </MagneticButton>
        </div>
      </GlassCard>
    </section>
  );
}

type MediaStepProps = {
  mediaKind: MediaKind;
  files: string[];
  setMediaKind: (mediaKind: MediaKind) => void;
  captureFiles: (fileList: FileList | null) => void;
  handleDrop: (event: DragEvent<HTMLLabelElement>) => void;
};

function MediaStep({
  mediaKind,
  files,
  setMediaKind,
  captureFiles,
  handleDrop,
}: MediaStepProps) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-white">Choose the memory form</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {mediaOptions.map(({ value, label, icon: Icon, copy }) => (
          <button
            className={cn(
              "rounded-2xl border p-4 text-left transition",
              mediaKind === value
                ? "border-memory-amber/60 bg-memory-amber/15"
                : "border-white/10 bg-white/5 hover:bg-white/10",
            )}
            key={value}
            onClick={() => setMediaKind(value)}
            type="button"
          >
            <Icon className="mb-4 text-memory-amber" size={22} aria-hidden="true" />
            <span className="block font-semibold text-white">{label}</span>
            <span className="mt-2 block text-xs leading-5 text-slate-400">
              {copy}
            </span>
          </button>
        ))}
      </div>

      <label
        className="mt-5 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-white/20 bg-white/[0.04] p-6 text-center transition hover:border-memory-amber/50 hover:bg-memory-amber/10"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <FileUp className="text-memory-amber" size={32} aria-hidden="true" />
        <span className="mt-4 text-lg font-semibold text-white">
          Drag and drop files here
        </span>
        <span className="mt-2 max-w-sm text-sm text-slate-400">
          Or browse from your device. The production flow will stream selected
          files into Supabase Storage.
        </span>
        <input
          className="sr-only"
          multiple
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            captureFiles(event.target.files)
          }
          type="file"
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {files.map((file) => (
            <li className="rounded-xl bg-white/5 px-3 py-2" key={file}>
              {file}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type StoryStepProps = {
  title: string;
  description: string;
  setField: (field: "title" | "description", value: string) => void;
};

function StoryStep({ title, description, setField }: StoryStepProps) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-white">
        Add the human context
      </h3>
      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Memory title</span>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-memory-amber/60"
            onChange={(event) => setField("title", event.target.value)}
            placeholder="The courtyard feast"
            value={title}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">
            Description or testimonial
          </span>
          <textarea
            className="mt-2 min-h-44 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-memory-amber/60"
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Describe the people, place, date, emotion, and why this memory matters..."
            value={description}
          />
        </label>
      </div>
    </div>
  );
}

function ConsentStep({
  consent,
  setConsent,
}: {
  consent: boolean;
  setConsent: (consent: boolean) => void;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-white">Confirm permissions</h3>
      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
        <ShieldCheck className="text-memory-amber" size={28} aria-hidden="true" />
        <p className="mt-4 text-sm leading-6 text-slate-300">
          I confirm that I have the right to share this contribution with
          ADAMIC and understand it may be used to generate AI-assisted archive
          summaries and public fresco views.
        </p>
        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-semibold text-white">
          <input
            checked={consent}
            className="h-5 w-5 accent-memory-amber"
            onChange={(event) => setConsent(event.target.checked)}
            type="checkbox"
          />
          I agree to the archival consent terms.
        </label>
      </div>
    </div>
  );
}

function VaultPreview({
  mediaKind,
  title,
  description,
  files,
  consent,
}: {
  mediaKind: MediaKind;
  title: string;
  description: string;
  files: string[];
  consent: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-slate-teal/40 blur-3xl" />
      <div className="relative">
        <p className="text-sm uppercase tracking-[0.28em] text-memory-amber">
          Live preview
        </p>
        <div className="mt-6 min-h-64 rounded-[1.5rem] bg-gradient-to-br from-white/15 via-white/5 to-slate-teal/25 p-5">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-200">
            {mediaKind}
          </span>
          <h3 className="mt-16 text-3xl font-semibold tracking-tight text-white">
            {title || "Untitled memory"}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">
            {description ||
              "Your context will guide the AI fresco toward faithful themes, dates, and emotional texture."}
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StatusPill active={files.length > 0} label={`${files.length} file(s)`} />
          <StatusPill active={consent} label="Consent captured" />
        </div>
      </div>
    </div>
  );
}

function StatusPill({ active, label }: { active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-3 text-sm text-slate-300">
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full",
          active ? "bg-memory-amber text-slate-950" : "bg-white/10 text-slate-500",
        )}
      >
        <Check size={14} aria-hidden="true" />
      </span>
      {label}
    </div>
  );
}
