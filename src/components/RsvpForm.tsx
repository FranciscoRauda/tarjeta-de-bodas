"use client";

import { FormEvent, useMemo, useState } from "react";
import { rsvpWhatsAppHref, wedding } from "@/lib/wedding";

function WhatsAppMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-[1.15rem] w-[1.15rem] fill-current"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.2 3.7.59.25 1.04.41 1.4.52.59.18 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function RsvpForm() {
  const [name, setName] = useState("");
  const [adults, setAdults] = useState(1);
  const [minors, setMinors] = useState(0);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length > 2 && adults >= 1;

  const whatsappHref = useMemo(
    () =>
      rsvpWhatsAppHref({
        name: name.trim(),
        adults,
        minors,
        phone: phone.trim(),
      }),
    [name, adults, minors, phone],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    localStorage.setItem(
      "boda-rsvp",
      JSON.stringify({ name: name.trim(), adults, minors, attending: "si" }),
    );

    const link = document.createElement("a");
    link.href = whatsappHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setSent(true);
  }

  return (
    <section className="bg-[#fffdfc] px-6 pb-12 pt-10" id="rsvp">
      <h3 className="text-center font-[family-name:var(--font-hero)] text-[2.6rem] leading-tight text-[#3a2a22]">
        Registra tu asistencia
      </h3>
      <p className="mt-3 text-center font-[family-name:var(--font-serif)] text-[1.05rem] font-semibold text-[#1d1612]">
        Completa tus datos para registrarte en el evento.
      </p>

      {sent ? (
        <p className="mt-8 rounded-2xl bg-[#f78fb3] px-5 py-6 text-center font-[family-name:var(--font-serif)] text-white">
          ¡Gracias! Envíen el mensaje en WhatsApp para que quede confirmado.
        </p>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <label className="block text-sm text-[#3a2a22]">
            ¿Cuál es tu nombre?
            <input
              className="field mt-2"
              required
              placeholder="Ej. María García"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm text-[#3a2a22]">
              Adultos
              <input
                className="field mt-2"
                type="number"
                min={1}
                max={10}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              />
            </label>
            <label className="text-sm text-[#3a2a22]">
              Menores
              <input
                className="field mt-2"
                type="number"
                min={0}
                max={10}
                value={minors}
                onChange={(e) => setMinors(Number(e.target.value))}
              />
            </label>
          </div>

          <label className="block text-sm text-[#3a2a22]">
            Escribe tu número de teléfono (opcional)
            <div className="mt-2 flex gap-2">
              <span className="field w-[7.8rem] shrink-0 text-center text-sm">
                🇸🇻 {wedding.rsvp.countryLabel.toLowerCase()}
              </span>
              <input
                className="field"
                inputMode="numeric"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </label>

          <button
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f3d5c8] py-3.5 font-semibold text-[#3a2a22] disabled:opacity-45"
            disabled={!canSubmit}
            type="submit"
          >
            <WhatsAppMark />
            Confirmar asistencia
          </button>
          <p className="text-center text-xs leading-relaxed text-[#7a4458]">
            Al confirmar se abre WhatsApp con el mensaje listo para Samuel y Sofía.
          </p>
        </form>
      )}
    </section>
  );
}
