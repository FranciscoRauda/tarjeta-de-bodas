"use client";

import { FormEvent, useMemo, useState } from "react";
import { rsvpWhatsAppHref, wedding } from "@/lib/wedding";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [adults, setAdults] = useState(1);
  const [minors, setMinors] = useState(0);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <section className="section-parchment px-6 pb-14 pt-12" id="rsvp">
      <h3 className="caps-names !text-[#4d4336] text-[0.95rem] tracking-[0.34em]">RSVP</h3>
      <p className="section-serif mt-4 text-[0.92rem]">
        Agradecemos su confirmación de asistencia antes del {wedding.rsvp.deadline}.
      </p>

      {sent ? (
        <p className="section-serif mt-8 rounded-md border border-[#c8c0b4] bg-white/70 px-5 py-6 text-[0.92rem]">
          ¡Gracias! Envíen el mensaje en WhatsApp para que quede confirmado.
        </p>
      ) : expanded ? (
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm text-[#4d4336]">
            Nombre completo
            <input
              className="field mt-2"
              required
              placeholder="Ej. María García"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm text-[#4d4336]">
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
            <label className="text-sm text-[#4d4336]">
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

          <label className="block text-sm text-[#4d4336]">
            Teléfono (opcional)
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

          <div className="mt-4 flex justify-center">
            <button className="btn-outline-pill" disabled={!canSubmit} type="submit">
              Confirmar asistencia
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="btn-outline-pill"
            onClick={() => setExpanded(true)}
          >
            Confirmar asistencia
          </button>
        </div>
      )}
    </section>
  );
}
