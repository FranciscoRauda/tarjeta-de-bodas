"use client";

import { PhotoHero } from "./PhotoHero";

export function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <PhotoHero
      footer={
        <button
          type="button"
          onClick={onOpen}
          className="w-full rounded-full border border-white/80 bg-white/25 px-5 py-3.5 font-[family-name:var(--font-serif)] text-white backdrop-blur-sm transition hover:bg-white/40 [text-shadow:0_1px_8px_rgba(0,0,0,0.25)]"
        >
          Abrir invitación
        </button>
      }
    />
  );
}
