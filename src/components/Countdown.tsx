"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

const target = new Date(wedding.datetime.receptionIso).getTime();

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

export function Countdown() {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0, s: 0, done: true });
        return;
      }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        done: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { n: left.d, l: "días" },
    { n: left.h, l: "hrs" },
    { n: left.m, l: "min" },
    { n: left.s, l: "seg" },
  ];

  return (
    <section className="bg-[#fceef3] px-6 py-10">
      <p className="text-center text-[0.65rem] tracking-[0.35em] uppercase text-[#c45d7a]">
        Falta para el día
      </p>
      {left.done ? (
        <p className="mt-4 text-center font-[family-name:var(--font-script)] text-3xl text-[#5a3040]">
          ¡Hoy es el día!
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-4 gap-2">
          {cells.map((c) => (
            <div
              key={c.l}
              className="rounded-2xl bg-white px-1 py-3 text-center text-[#5a3040] shadow-[0_8px_20px_-12px_rgba(196,93,122,0.45)]"
            >
              <div className="font-[family-name:var(--font-display)] text-2xl tabular-nums">
                {pad(c.n)}
              </div>
              <div className="mt-1 text-[0.6rem] tracking-[0.18em] uppercase text-[#c45d7a]">
                {c.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
