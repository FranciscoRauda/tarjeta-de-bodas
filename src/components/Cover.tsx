"use client";

import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";
import { EnvelopeGraphic } from "./Ornaments";

const SWIPE = 40;

export function Cover({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const locked = useRef(false);
  const startY = useRef<number | null>(null);

  const a = wedding.couple.partnerOne.first.toUpperCase();
  const b = wedding.couple.partnerTwo.first.toUpperCase();

  function open() {
    if (locked.current) return;
    locked.current = true;
    setOpening(true);
    window.setTimeout(onOpen, 750);
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

  return (
    <section
      className={`cover-stage paper-texture ${opening ? "is-opening" : ""}`}
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
      <div className="relative z-10 text-center">
        <p className="caps-names">
          {a} & {b}
        </p>
        <p className="mt-3 caps-names text-[0.95rem] tracking-[0.32em]">
          {wedding.datetime.shortDate}
        </p>
      </div>

      <EnvelopeGraphic />

      <div className="cover-reserved lace-card">
        <p className="font-[family-name:var(--font-display)] text-2xl text-[#8a8278]">♥</p>
        <p className="mt-1">Un espacio ha sido reservado para ti</p>
      </div>

      <p className="cover-hint">{opening ? "Abriendo…" : "Pulsa para abrir"}</p>
    </section>
  );
}
