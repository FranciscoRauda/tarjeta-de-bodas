"use client";

import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

const SWIPE = 40;

function OliveSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="150"
      viewBox="0 0 120 150"
      fill="none"
      aria-hidden
    >
      <path
        d="M62 148c-8-28-6-56 4-84 8-22 14-40 12-62"
        stroke="#f6f2e6"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <ellipse cx="48" cy="38" rx="16" ry="8" transform="rotate(-38 48 38)" fill="#f6f2e6" opacity="0.28" />
      <ellipse cx="86" cy="52" rx="15" ry="7.5" transform="rotate(32 86 52)" fill="#f6f2e6" opacity="0.22" />
      <ellipse cx="44" cy="72" rx="17" ry="8" transform="rotate(-42 44 72)" fill="#f6f2e6" opacity="0.24" />
      <ellipse cx="90" cy="88" rx="16" ry="8" transform="rotate(28 90 88)" fill="#f6f2e6" opacity="0.22" />
      <ellipse cx="50" cy="108" rx="15" ry="7" transform="rotate(-36 50 108)" fill="#f6f2e6" opacity="0.18" />
    </svg>
  );
}

function WaxSeal() {
  const a = wedding.couple.partnerOne.first[0];
  const b = wedding.couple.partnerTwo.first[0];

  return (
    <>
      <svg width="176" height="176" viewBox="0 0 176 176" aria-hidden>
        <defs>
          <radialGradient id="wax-body" cx="34%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#9aa384" />
            <stop offset="42%" stopColor="#6f7758" />
            <stop offset="100%" stopColor="#3f4436" />
          </radialGradient>
          <radialGradient id="wax-shine" cx="30%" cy="24%" r="55%">
            <stop offset="0%" stopColor="#f4f1e4" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#f4f1e4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="88" cy="88" r="84" fill="url(#wax-body)" />
        <circle cx="88" cy="88" r="72" fill="none" stroke="#d8d4c4" strokeWidth="2.2" opacity="0.55" />
        <circle cx="88" cy="88" r="64" fill="none" stroke="#efe8d4" strokeWidth="1.15" opacity="0.72" />
        <circle cx="88" cy="88" r="84" fill="url(#wax-shine)" />
      </svg>
      <span className="wax-monogram">
        <span>{a}</span>
        <em>&</em>
        <span>{b}</span>
      </span>
    </>
  );
}

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const locked = useRef(false);
  const startY = useRef<number | null>(null);

  function open() {
    if (locked.current) return;
    locked.current = true;
    setOpening(true);
    window.setTimeout(onOpen, 850);
  }

  function onPointerDown(e: PointerEvent<HTMLElement>) {
    startY.current = e.clientY;
  }

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (startY.current == null) return;
    if (e.clientY - startY.current <= -SWIPE) {
      startY.current = null;
      open();
    }
  }

  function onPointerUp() {
    startY.current = null;
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }

  const a = wedding.couple.partnerOne;
  const b = wedding.couple.partnerTwo;

  return (
    <section
      className={`seal-stage noise ${opening ? "is-opening" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Abrir invitación"
      onClick={open}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="seal-tri seal-tri-left" aria-hidden />
      <span className="seal-tri seal-tri-right" aria-hidden />

      <div className="seal-frame" aria-hidden>
        <span className="seal-frame-outer" />
        <span className="seal-frame-inner" />
        <span className="seal-corner seal-corner-tl" />
        <span className="seal-corner seal-corner-tr" />
        <span className="seal-corner seal-corner-bl" />
        <span className="seal-corner seal-corner-br" />
      </div>

      <OliveSprig className="seal-sprig seal-sprig-tr" />
      <OliveSprig className="seal-sprig seal-sprig-bl" />

      <p className="relative z-10 font-[family-name:var(--font-hero)] text-[2.35rem] leading-none text-[#575E4B]">
        {a.first} y {b.first}
      </p>

      <span className="wax-seal">
        <WaxSeal />
      </span>

      <div className="relative z-10 flex flex-col items-center gap-1 text-[#575E4B]">
        <p className="text-[0.68rem] tracking-[0.28em] uppercase">
          {opening ? "Abriendo…" : "Pulsa aquí y desliza"}
        </p>
        <span className="seal-chevron" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 14 12 8l6 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
