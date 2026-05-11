import { Howl } from "howler";

type UiSound = "upload-complete" | "fresco-navigate";

const soundManifest: Record<UiSound, string> = {
  "upload-complete": "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  "fresco-navigate": "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3",
};

const soundCache = new Map<UiSound, Howl>();

export function playUiSound(sound: UiSound) {
  const existing = soundCache.get(sound);
  if (existing) {
    existing.play();
    return;
  }

  const howl = new Howl({
    src: [soundManifest[sound]],
    volume: sound === "upload-complete" ? 0.18 : 0.12,
    preload: true,
    html5: true,
  });

  soundCache.set(sound, howl);
  howl.play();
}
