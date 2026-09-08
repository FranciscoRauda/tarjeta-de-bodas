"use client";

import { useState } from "react";
import { coupleFullNames, wedding } from "@/lib/wedding";
import { Cover } from "./Cover";
import { Hero } from "./Hero";
import { Venue } from "./Venue";
import { Timeline } from "./Timeline";
import { DressCode } from "./DressCode";
import { Gifts } from "./Gifts";
import { RsvpForm } from "./RsvpForm";

export function Invitation() {
  const [open, setOpen] = useState(false);

  return (
    <main className="invite-shell">
      <article className="invite-card paper-texture">
        {!open ? (
          <Cover onOpen={() => setOpen(true)} />
        ) : (
          <>
            <Hero />
            <Timeline />
            <Venue />
            <DressCode />
            <Gifts />
            <RsvpForm />
            <footer className="section-stone px-6 py-10 text-center">
              <p className="caps-names !text-[#4d4336] text-[0.85rem] tracking-[0.28em]">
                {wedding.couple.partnerOne.first.toUpperCase()} &{" "}
                {wedding.couple.partnerTwo.first.toUpperCase()}
              </p>
              <p className="section-serif mt-3 text-[0.72rem] tracking-[0.2em] uppercase">
                {wedding.datetime.shortDate} · {wedding.venue.name}
              </p>
              <p className="section-serif mt-5 text-[0.68rem] opacity-80">{coupleFullNames()}</p>
            </footer>
          </>
        )}
      </article>
    </main>
  );
}
