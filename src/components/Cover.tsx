"use client";

import { useState } from "react";
import { wedding } from "@/lib/wedding";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const a = wedding.couple.partnerOne;
  const b = wedding.couple.partnerTwo;

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1550);
  }

  return (
    <section className="envelope-stage">
      <div className="pointer-events-none absolute inset-[10px] border border-[#d4af37]/50" />
      <div className="pointer-events-none absolute inset-[16px] border border-[#d4af37]/22" />

      <p className="relative z-10 text-[0.68rem] tracking-[0.46em] uppercase text-[#b8860b]">
        Boda civil
      </p>
      <h1 className="relative z-10 mt-3 text-center font-[family-name:var(--font-hero)] text-[clamp(2.2rem,8vw,2.9rem)] leading-[1.12] text-[#2c3036]">
        {a.first}
        <span className="block text-[1.7rem] text-[#b8860b]">y</span>
        {b.first}
      </h1>

      <button
        type="button"
        className={`envelope ${opening ? "is-opening" : ""}`}
        onClick={open}
        aria-label="Abrir invitación"
      >
        <span className="envelope-letter">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="" className="h-full w-full object-cover object-[center_58%]" />
        </span>
        <span className="envelope-back" />
        <span className="envelope-pocket" />
        <span className="envelope-flap">
          <span className="envelope-seal">{wedding.couple.initials}</span>
        </span>
      </button>

      <p className="relative z-10 mt-1 font-[family-name:var(--font-hero)] text-2xl text-[#2c3036]">
        {wedding.datetime.slashDate}
      </p>
      <p className="relative z-10 font-[family-name:var(--font-hero)] text-xl text-[#b8860b]">
        {wedding.datetime.heroTime}
      </p>

      <button
        type="button"
        onClick={open}
        disabled={opening}
        className="relative z-10 mt-6 w-full max-w-[300px] rounded-full bg-[#d4af37] px-5 py-3.5 font-[family-name:var(--font-serif)] font-semibold text-[#2a2418] shadow-[0_10px_22px_-12px_rgba(184,134,11,0.8)] transition hover:brightness-105 disabled:opacity-70"
      >
        {opening ? "Abriendo…" : "Abrir invitación"}
      </button>
    </section>
  );
}
