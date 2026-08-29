"use client";

import { PointerEvent, useMemo, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

const STACK = 3;
const THRESHOLD = 72;

export function Gallery() {
  const photos = useMemo(() => {
    const base = wedding.gallery.length > 0 ? [...wedding.gallery] : ["/hero.png"];
    if (base.length >= STACK) return base;
    return Array.from({ length: STACK }, (_, i) => base[i % base.length]);
  }, []);

  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);
  const [busy, setBusy] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragRef = useRef({ x: 0, y: 0 });
  const holding = useRef(false);

  const fly = (dir: "left" | "right") => {
    if (busy) return;
    setBusy(true);
    setLeaving(dir);
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % photos.length);
      setLeaving(null);
      dragRef.current = { x: 0, y: 0 };
      setDrag({ x: 0, y: 0 });
      setBusy(false);
    }, 420);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (busy) return;
    holding.current = true;
    start.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!holding.current || !start.current || busy) return;
    const next = {
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    };
    dragRef.current = next;
    setDrag(next);
  };

  const onPointerUp = () => {
    if (!holding.current) return;
    holding.current = false;
    start.current = null;
    const dx = dragRef.current.x;
    if (Math.abs(dx) > THRESHOLD) {
      fly(dx > 0 ? "right" : "left");
    } else {
      dragRef.current = { x: 0, y: 0 };
      setDrag({ x: 0, y: 0 });
    }
  };

  const idle = !busy && !leaving && drag.x === 0 && drag.y === 0;

  return (
    <section className="bg-transparent pt-4">
      <div className="relative mx-auto h-[380px] w-[270px]">
        {photos.map((src, i) => {
          const offset = (i - index + photos.length) % photos.length;
          if (offset >= STACK) return null;

          const isTop = offset === 0;
          const restRot = offset === 0 ? -2 : offset === 1 ? 7 : -9;
          const restY = offset * 10;
          const rest = `translateY(${restY}px) rotate(${restRot}deg)`;

          let transform = rest;
          let opacity = 1;
          let transition = "transform 0.45s cubic-bezier(.2,.8,.2,1), opacity 0.35s ease";

          if (isTop && leaving) {
            const x = leaving === "right" ? 460 : -460;
            const r = leaving === "right" ? 32 : -32;
            transform = `translate(${x}px, 12px) rotate(${r}deg)`;
            opacity = 0;
            transition = "transform 0.42s cubic-bezier(.2,.9,.2,1), opacity 0.32s ease";
          } else if (isTop && (holding.current || drag.x !== 0 || drag.y !== 0)) {
            transform = `translate(${drag.x}px, ${drag.y * 0.35}px) rotate(${-2 + drag.x / 18}deg)`;
            transition = holding.current ? "none" : transition;
          }

          return (
            <div
              key={`${src}-${i}`}
              className="absolute left-0 top-0 w-full"
              style={{ zIndex: 20 - offset }}
            >
              <div
                className={`polaroid w-full ${
                  isTop && idle ? "gallery-nudge cursor-grab" : isTop ? "cursor-grabbing" : ""
                }`}
                style={{
                  ["--rest-rot" as string]: `${restRot}deg`,
                  transform: isTop && idle ? undefined : transform,
                  opacity,
                  transition: isTop && idle ? undefined : transition,
                }}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Samuel y Sofía"
                  className="pointer-events-none h-[300px] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => fly("left")}
        className="mt-2 flex w-full flex-col items-center gap-1 bg-[#ebe8df] py-5 text-[#575E4B]"
      >
        <span className="swipe-hint-icon" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V9M8 13l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M5 16c-1.2-.8-2-2-2-3.5 0-1 2-1 2 0M19 16c1.2-.8 2-2 2-3.5 0-1-2-1-2 0"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="font-[family-name:var(--font-serif)] text-sm italic">
          Desliza para ver más fotos
        </span>
      </button>
    </section>
  );
}
