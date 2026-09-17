"use client";

import { useEffect, useState } from "react";
import { calendarHref, wedding } from "@/lib/wedding";
import { LeafDivider, PergaminoCard } from "./Ornaments";
import { Reveal } from "./Reveal";

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
    { n: left.d, l: "Días" },
    { n: left.h, l: "Horas" },
    { n: left.m, l: "Min" },
    { n: left.s, l: "Seg" },
  ];

  return (
    <section className="invite-section section-countdown" aria-label="Cuenta regresiva">
      <div className="wrap">
        <Reveal>
          <PergaminoCard>
            <LeafDivider />
            <p className="section-eyebrow">Faltan</p>
            {left.done ? (
              <p className="script-heading mt-4">¡Hoy es el día!</p>
            ) : (
              <div className="countdown-grid" role="timer" aria-live="off">
                {cells.map((c) => (
                  <div key={c.l} className="countdown-unit">
                    <span className="countdown-num">{pad(c.n)}</span>
                    <span className="countdown-lbl">{c.l}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="cal-actions">
              <a href={calendarHref()} target="_blank" rel="noreferrer" className="btn-soft">
                Google Calendar
              </a>
            </div>
          </PergaminoCard>
        </Reveal>
      </div>
    </section>
  );
}
