"use client";

import type { RefObject } from "react";
import { useEffect, useState } from "react";

export function WeddingMusicToggle({
  audioRef,
  visible,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  visible: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  useEffect(() => {
    if (!visible) return;
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    void audio.play().catch(() => {});
  }, [audioRef, visible]);

  if (!visible) return null;

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  return (
    <button
      type="button"
      className="music-toggle"
      onClick={toggle}
      aria-label={playing ? "Silenciar música" : "Reproducir música"}
      aria-pressed={playing}
    >
      {playing ? <MusicOnIcon /> : <MusicOffIcon />}
    </button>
  );
}

function MusicOnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor" />
      <path d="M17 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor" />
    </svg>
  );
}

function MusicOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
