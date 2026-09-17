"use client";

import { useMemo, useRef } from "react";
import { wedding } from "@/lib/wedding";
import { LeafDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M9 3L5 7l4 4" : "M5 3l4 4-4 4"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const photos = useMemo(() => {
    const base = wedding.gallery.length > 0 ? [...wedding.gallery] : ["/hero.png"];
    const repeats = 6;
    return Array.from({ length: repeats * base.length }, (_, i) => ({
      src: base[i % base.length],
      key: `gallery-${i}`,
      mono: i % 2 === 1,
    }));
  }, []);

  function scroll(dir: -1 | 1) {
    const rail = scrollRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".gallery-card");
    const gap = 10;
    const step = (card?.offsetWidth ?? 150) + gap;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section className="invite-section section-gallery" id="galeria">
      <div className="wrap">
        <Reveal className="section-head">
          <LeafDivider />
          <p className="section-eyebrow">Recuerdos</p>
          <h2 className="section-title">Galería</h2>
        </Reveal>
      </div>

      <Reveal className="gallery-carousel">
        <div ref={scrollRef} className="gallery-rail" aria-label="Galería de fotos">
          {photos.map((photo, i) => (
            <figure
              key={photo.key}
              className={`gallery-card ${photo.mono ? "is-mono" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`Samuel y Sofía — foto ${(i % 3) + 1}`}
                loading={i < 4 ? "eager" : "lazy"}
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <div className="gallery-controls">
          <button
            type="button"
            className="gallery-arrow"
            onClick={() => scroll(-1)}
            aria-label="Ver foto anterior"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className="gallery-arrow"
            onClick={() => scroll(1)}
            aria-label="Ver siguiente foto"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
