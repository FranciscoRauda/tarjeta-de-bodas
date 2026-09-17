"use client";

import { useEffect, useState } from "react";

export function ConfirmFab({ visible }: { visible: boolean }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const rsvp = document.getElementById("rsvp");
    if (!rsvp) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(rsvp);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#rsvp"
      className={`fab ${hidden ? "is-hidden" : ""}`}
      aria-label="Ir a confirmar asistencia"
    >
      Confirmar
    </a>
  );
}
