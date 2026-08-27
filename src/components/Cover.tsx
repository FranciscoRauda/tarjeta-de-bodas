"use client";

import { PhotoHero } from "./PhotoHero";

export function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <PhotoHero
      footer={
        <button
          type="button"
          onClick={onOpen}
          className="w-full rounded-full bg-[#d4af37] px-5 py-3.5 font-[family-name:var(--font-serif)] font-semibold text-[#2a2418] shadow-[0_10px_22px_-12px_rgba(184,134,11,0.8)] transition hover:brightness-105"
        >
          Abrir invitación
        </button>
      }
    />
  );
}
