"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { playWeddingMusic } from "@/lib/playWeddingMusic";
import { coupleFullNames, heroMetaLine, wedding } from "@/lib/wedding";
import { ConfirmFab } from "./ConfirmFab";
import { Countdown } from "./Countdown";
import { Cover } from "./Cover";
import { DetailsSection } from "./DetailsSection";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Itinerary } from "./Itinerary";
import { PageBackground } from "./PageBackground";
import { RsvpForm } from "./RsvpForm";
import { WeddingMusicToggle } from "./WeddingMusic";

export function Invitation() {
  const [opened, setOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = useCallback(() => {
    if (!wedding.music.enabled) return;
    void playWeddingMusic(audioRef.current, wedding.music.volume);
  }, []);

  useEffect(() => {
    if (!wedding.music.enabled) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = wedding.music.volume;
    audio.load();
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    return () => {
      document.documentElement.classList.remove("js-ready", "opened");
    };
  }, []);

  useEffect(() => {
    if (opened) {
      document.documentElement.classList.add("opened");
      window.scrollTo(0, 0);
    }
  }, [opened]);

  return (
    <>
      <PageBackground />
      <div className="grain-overlay" aria-hidden />
      {wedding.music.enabled ? (
        <audio
          ref={audioRef}
          src={wedding.music.src}
          loop
          preload="auto"
          playsInline
          aria-hidden
        />
      ) : null}
      {showCover ? (
        <Cover
          onStartMusic={startMusic}
          onOpen={() => setOpened(true)}
          onComplete={() => setShowCover(false)}
        />
      ) : null}

      <main className="site-page">
        <Hero />
        <Countdown />
        <Itinerary />
        <Gallery />
        <DetailsSection />
        <RsvpForm />
        <footer className="site-footer">
          <div className="wrap">
            <p className="signoff">
              {wedding.couple.partnerOne.first}{" "}
              <span className="amp">&amp;</span> {wedding.couple.partnerTwo.first}
            </p>
            <p className="footer-note">{heroMetaLine()}</p>
            <p className="footer-cierre">Los esperamos.</p>
            <p className="section-serif mt-4 text-[0.82rem]">{coupleFullNames()}</p>
          </div>
        </footer>
      </main>

      <WeddingMusicToggle audioRef={audioRef} visible={opened} />
      <ConfirmFab visible={opened} />
    </>
  );
}
