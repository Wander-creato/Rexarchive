"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Camera, Filter, Mic, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { DEFAULT_MEMORY_CATEGORY } from "@/constants/memory-categories";
import { WaveformPlayer } from "@/components/audio/waveform-player";
import { GlassCard } from "@/components/ui/glass-card";
import type { MediaType, MemoryContribution } from "@/types/narrative";

interface MediaGalleryPreviewProps {
  items: MemoryContribution[];
  highlightedMediaIds?: string[];
  activeFilter?: MediaType | "all";
  onFilterChange?: (value: MediaType | "all") => void;
  showHeader?: boolean;
}

const filters: { id: MediaType | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Vidéos" },
  { id: "audio", label: "Vocal" },
];

function MediaIcon({ type }: { type: MediaType }) {
  if (type === "audio") return <Mic className="size-4" />;
  if (type === "video") return <PlayCircle className="size-4" />;
  return <Camera className="size-4" />;
}

function mediaTypeLabel(type: MediaType) {
  if (type === "video") return "vidéo";
  if (type === "audio") return "vocal";
  return "photo";
}

const defaultBlurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTE1ZTU5Ii8+PC9zdmc+";

interface MemoryCardProps {
  item: MemoryContribution;
  index: number;
  highlighted: boolean;
}

function MemoryCard({ item, index, highlighted }: MemoryCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [magneticEnabled, setMagneticEnabled] = useState(false);
  const springX = useSpring(rotateX, { stiffness: 240, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 240, damping: 18 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const halo = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(245,158,11,0.30), transparent 62%)`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const syncMode = () => setMagneticEnabled(media.matches);
    syncMode();
    media.addEventListener("change", syncMode);
    return () => media.removeEventListener("change", syncMode);
  }, []);

  function handleMove(event: MouseEvent<HTMLElement>) {
    if (!magneticEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 12);
    rotateX.set((0.5 - y) * 10);
    glowX.set(x * 100);
    glowY.set(y * 100);
  }

  function resetMagnetism() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      style={{
        rotateX: magneticEnabled ? springX : 0,
        rotateY: magneticEnabled ? springY : 0,
        transformPerspective: 1100,
        backgroundImage: halo,
      }}
      onMouseMove={handleMove}
      onMouseLeave={resetMagnetism}
      whileHover={{
        scale: magneticEnabled ? 1.02 : 1,
        boxShadow: "0 20px 45px -24px rgba(245,158,11,0.45)",
      }}
      className={[
        "rounded-2xl border bg-white/5 p-3 transition-colors will-change-transform",
        highlighted
          ? "border-amber-300/70 shadow-[0_0_0_1px_rgba(245,158,11,0.35)]"
          : "border-white/10 hover:border-amber-300/55",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-300/15 px-2 py-1 text-[11px] text-teal-100 uppercase">
          <MediaIcon type={item.type} />
          {mediaTypeLabel(item.type)}
        </span>
        <span className="text-xs text-slate-300/80">{new Date(item.createdAt).getFullYear()}</span>
      </div>

      {item.type === "photo" && item.url ? (
        <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-white/10">
          {item.url.startsWith("blob:") ? (
            <Image
              src={item.url}
              alt="Miniature d'un souvenir archivé"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <Image
              src={item.url}
              alt="Miniature d'un souvenir archivé"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              blurDataURL={defaultBlurDataUrl}
              placeholder="blur"
              loading={index < 2 ? "eager" : "lazy"}
            />
          )}
        </div>
      ) : item.type === "photo" ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300/80">
          Emplacement vide - En attente de contenu
        </div>
      ) : null}

      <h4 className="mt-3 text-sm font-semibold text-slate-100">{item.title || "Emplacement vide - En attente de contenu"}</h4>
      <p className="mt-2">
        <span className="inline-flex rounded-full border border-amber-300/35 bg-amber-500/15 px-2.5 py-1 text-[11px] text-amber-100">
          {item.category || DEFAULT_MEMORY_CATEGORY}
        </span>
      </p>
      <p className="mt-1 text-xs text-slate-300/85">{item.description || "Emplacement vide - En attente de contenu"}</p>
      {item.type === "audio" && item.url ? <WaveformPlayer audioUrl={item.url} /> : null}
    </motion.article>
  );
}

export function MediaGalleryPreview({
  items,
  highlightedMediaIds = [],
  activeFilter,
  onFilterChange,
  showHeader = true,
}: MediaGalleryPreviewProps) {
  const [localFilter, setLocalFilter] = useState<MediaType | "all">("all");
  const selectedFilter = activeFilter ?? localFilter;

  const setSelectedFilter = (value: MediaType | "all") => {
    if (onFilterChange) {
      onFilterChange(value);
      return;
    }
    setLocalFilter(value);
  };

  const filteredItems = useMemo(
    () => items.filter((item) => selectedFilter === "all" || item.type === selectedFilter),
    [selectedFilter, items],
  );

  return (
    <GlassCard className="h-full p-5 md:p-6">
      {showHeader ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-teal-200/80">Galerie média</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-100">Grille bento filtrée</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <Filter className="size-3.5" />
            Filtres intelligents
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setSelectedFilter(filter.id)}
            className={[
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              selectedFilter === filter.id
                ? "border-amber-300/65 bg-amber-500/20 text-amber-100"
                : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/45 hover:text-amber-100",
            ].join(" ")}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {filteredItems.length === 0 ? (
          <div className="sm:col-span-2">
            <GlassCard className="border-amber-300/20 bg-amber-500/10 p-5">
              <p className="text-sm text-amber-100">Emplacement vide - En attente de contenu</p>
              <Link
                href="/le-coffre"
                className="mt-3 inline-flex rounded-xl border border-amber-300/45 px-3 py-2 text-xs font-medium text-amber-100 transition-colors hover:bg-amber-500/20"
              >
                Ajouter un souvenir dans Le Coffre
              </Link>
            </GlassCard>
          </div>
        ) : (
          <AnimatePresence initial={false} mode="popLayout">
            {filteredItems.slice(0, 8).map((item, index) => (
              <MemoryCard
                key={item.id}
                item={item}
                index={index}
                highlighted={highlightedMediaIds.includes(item.id)}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </GlassCard>
  );
}
