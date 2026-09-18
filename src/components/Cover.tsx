"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";
import { EnvelopeIllustration } from "./EnvelopeIllustration";
import { GoldSeal, LeafDivider } from "./Ornaments";

function burstConfetti(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const surface = canvas;
  const paint = ctx;
  surface.width = window.innerWidth;
  surface.height = window.innerHeight;

  const colors = ["#C6A15B", "#E0C07A", "#8A6C26", "#FDF3D8", "#7C8B6B"];
  const pieces = Array.from({ length: 48 }, () => ({
    x: surface.width * 0.5 + (Math.random() - 0.5) * 80,
    y: surface.height * 0.48,
    vx: (Math.random() - 0.5) * 7,
    vy: Math.random() * -8 - 2,
    size: Math.random() * 5 + 2,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1,
  }));

  let frame = 0;
  function tick() {
    paint.clearRect(0, 0, surface.width, surface.height);
    let alive = false;
    for (const p of pieces) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.rot += p.vr;
      p.life -= 0.018;
      paint.save();
      paint.translate(p.x, p.y);
      paint.rotate((p.rot * Math.PI) / 180);
      paint.globalAlpha = Math.max(0, p.life);
      paint.fillStyle = p.color;
      paint.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      paint.restore();
    }
    frame += 1;
    if (alive && frame < 120) requestAnimationFrame(tick);
    else paint.clearRect(0, 0, surface.width, surface.height);
  }
  tick();
}

export function Cover({
  onOpen,
  onComplete,
  onStartMusic,
}: {
  onOpen: () => void;
  onComplete: () => void;
  onStartMusic?: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "opening" | "gone">("idle");
  const locked = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function open() {
    if (locked.current || phase !== "idle") return;
    locked.current = true;
    setPhase("opening");
    burstConfetti(canvasRef.current);
    onStartMusic?.();

    window.setTimeout(() => {
      setPhase("gone");
      onOpen();
    }, 1650);

    window.setTimeout(onComplete, 2400);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="env-confetti" aria-hidden />
      <div
        className={`envelope-screen ${phase === "opening" ? "opening" : ""} ${phase === "gone" ? "is-gone" : ""}`}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          onStartMusic?.();
        }}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Abrir la invitación"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-bouquet.png"
          alt=""
          width={200}
          height={260}
          className="cover-deco cover-deco-bouquet"
          aria-hidden
          decoding="async"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-olive.png"
          alt=""
          width={160}
          height={220}
          className="cover-deco cover-deco-olive"
          aria-hidden
          decoding="async"
        />

        <p className="env-eyebrow">{wedding.tagline}</p>

        <div className="env-stage">
          <div className="env-photo">
            <div className="env-card">
              <LeafDivider className="env-orn" />
              <span className="env-card-date">{wedding.datetime.shortDate}</span>
            </div>
            <div className="env-sheet" aria-hidden>
              <EnvelopeIllustration />
            </div>
            <GoldSeal className="env-seal" />
          </div>
        </div>

        <p className="env-hint">{phase === "opening" ? "Abriendo…" : "Toca el sello para abrir"}</p>
      </div>
    </>
  );
}
