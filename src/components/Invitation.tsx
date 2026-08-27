"use client";

import { useState } from "react";
import { coupleFullNames, wedding } from "@/lib/wedding";
import { Cover } from "./Cover";
import { Hero } from "./Hero";
import { Countdown } from "./Countdown";
import { Venue } from "./Venue";
import { Timeline } from "./Timeline";
import { Gallery } from "./Gallery";
import { Gifts } from "./Gifts";
import { RsvpForm } from "./RsvpForm";

export function Invitation() {
  const [open, setOpen] = useState(false);

  return (
    <main className="invite-shell">
      <article className="invite-card">
        {!open ? (
          <Cover onOpen={() => setOpen(true)} />
        ) : (
          <>
            <Hero />
            <Countdown />
            <Venue />
            <Timeline />
            <Gallery />
            <Gifts />
            <RsvpForm />
            <footer className="bg-[#575E4B] px-6 py-10 text-center text-white">
              <p className="font-[family-name:var(--font-script)] text-4xl">
                {wedding.couple.partnerOne.first} & {wedding.couple.partnerTwo.first}
              </p>
              <p className="mt-3 text-[0.7rem] tracking-[0.28em] uppercase">
                {wedding.datetime.shortDate} · {wedding.venue.name}
              </p>
              <p className="mt-6 text-[0.7rem] leading-relaxed text-white/90">
                Link de invitación ilimitado
                <br />
                <span className="break-all">/i/{wedding.slug}</span>
              </p>
              <p className="mt-4 text-[0.65rem] text-white/85">
                {coupleFullNames()}
              </p>
            </footer>
          </>
        )}
      </article>
    </main>
  );
}
