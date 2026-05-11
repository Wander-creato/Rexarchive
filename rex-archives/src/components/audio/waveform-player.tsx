"use client";

import { Pause, Play } from "lucide-react";
import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";

interface WaveformPlayerProps {
  audioUrl: string;
}

export function WaveformPlayer({ audioUrl }: WaveformPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !audioUrl) {
      return;
    }

    const wave = WaveSurfer.create({
      container: containerRef.current,
      url: audioUrl,
      waveColor: "rgba(245, 158, 11, 0.35)",
      progressColor: "rgba(245, 158, 11, 0.95)",
      cursorColor: "rgba(245, 158, 11, 1)",
      cursorWidth: 2,
      barWidth: 3,
      barGap: 2,
      barRadius: 4,
      height: 62,
      normalize: true,
    });

    waveRef.current = wave;
    wave.on("ready", () => setIsReady(true));
    wave.on("play", () => setIsPlaying(true));
    wave.on("pause", () => setIsPlaying(false));
    wave.on("finish", () => setIsPlaying(false));

    return () => {
      wave.destroy();
      waveRef.current = null;
      setIsReady(false);
      setIsPlaying(false);
    };
  }, [audioUrl]);

  function togglePlayback() {
    if (!waveRef.current || !isReady) {
      return;
    }
    void waveRef.current.playPause();
  }

  return (
    <div className="mt-3 rounded-xl border border-amber-300/25 bg-[#0f172a]/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-amber-100/80">Témoignage audio</p>
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!isReady}
          className="inline-flex items-center gap-1 rounded-full border border-amber-300/35 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-100 transition-colors hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {isPlaying ? "Pause" : "Lecture"}
        </button>
      </div>
      <div ref={containerRef} className="mt-2 min-h-16" />
      {!isReady ? <p className="text-[11px] text-slate-300/70">Chargement de l&apos;onde sonore…</p> : null}
    </div>
  );
}
