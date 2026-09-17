"use client";

import { useEffect } from "react";

export function PageBackground() {
  useEffect(() => {
    const layer = document.getElementById("bg-parallax");
    if (!layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    function onScroll() {
      if (!layer) return;
      const y = window.scrollY * 0.18;
      layer.style.transform = `translate3d(0, ${y}px, 0)`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="bg-parallax" className="bg-parallax" aria-hidden />
      <div className="bg-veil" aria-hidden />
    </>
  );
}
