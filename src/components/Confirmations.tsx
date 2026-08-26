"use client";

import { FormEvent, useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

type Rsvp = {
  name: string;
  adults: number;
  minors: number;
  phone: string;
  attending: "si" | "no";
  at: string;
};

type Payload = {
  list: Rsvp[];
  totals: {
    confirmations: number;
    attending: number;
    adults: number;
    minors: number;
  };
};

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-SV", {
      timeZone: "America/El_Salvador",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function Confirmations() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<Payload | null>(null);

  async function load(adminKey: string) {
    const res = await fetch("/api/rsvp", {
      headers: { "x-admin-key": adminKey },
    });
    if (!res.ok) {
      setUnlocked(false);
      setError("Clave incorrecta.");
      return;
    }
    setData(await res.json());
    setUnlocked(true);
    setError("");
    sessionStorage.setItem("boda-admin", adminKey);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("boda-admin");
    if (saved) {
      setKey(saved);
      void load(saved);
    }
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void load(key.trim());
  }

  return (
    <main className="min-h-dvh bg-[#e8eaee] px-4 py-10 text-[#2c3036]">
      <div className="mx-auto w-full max-w-3xl rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-36px_rgba(70,76,86,0.4)] sm:p-10">
        <p className="text-center text-[0.65rem] tracking-[0.35em] uppercase text-[#b8860b]">
          Solo anfitriones
        </p>
        <h1 className="mt-2 text-center font-[family-name:var(--font-hero)] text-5xl">
          Confirmaciones
        </h1>
        <p className="mt-2 text-center font-[family-name:var(--font-serif)] italic">
          {wedding.couple.partnerOne.first} y {wedding.couple.partnerTwo.first}
        </p>

        {!unlocked ? (
          <form className="mx-auto mt-10 max-w-sm space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm">
              Clave
              <input
                className="field mt-2"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Escriban su clave"
              />
            </label>
            <button className="btn-ember" type="submit">
              Ver lista
            </button>
            {error ? <p className="text-center text-sm text-[#d4af37]">{error}</p> : null}
          </form>
        ) : data ? (
          <>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Confirmaciones", data.totals.confirmations],
                ["Asisten", data.totals.attending],
                ["Adultos", data.totals.adults],
                ["Menores", data.totals.minors],
              ].map(([label, n]) => (
                <div key={label} className="rounded-2xl bg-[#eef1f4] px-3 py-4 text-center">
                  <div className="font-[family-name:var(--font-display)] text-2xl">{n}</div>
                  <div className="mt-1 text-[0.65rem] tracking-[0.16em] uppercase text-[#b8860b]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {data.list.length === 0 ? (
              <p className="mt-10 text-center font-[family-name:var(--font-serif)] italic">
                Todavía no hay confirmaciones.
              </p>
            ) : (
              <ul className="mt-8 divide-y divide-[#d8dce3]">
                {data.list.map((row, i) => (
                  <li key={`${row.at}-${i}`} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{row.name}</p>
                      <p className="text-sm text-[#5c636c]">
                        {row.adults} adulto{row.adults === 1 ? "" : "s"}
                        {row.minors > 0 ? ` · ${row.minors} menor${row.minors === 1 ? "" : "es"}` : ""}
                        {row.phone ? ` · +503 ${row.phone}` : ""}
                      </p>
                    </div>
                    <div className="text-sm text-[#5c636c]">
                      <span
                        className={`mr-3 rounded-full px-2 py-0.5 text-xs ${
                          row.attending === "si"
                            ? "bg-[#eef1f4] text-[#d4af37]"
                            : "bg-[#f4f5f7] text-[#5c636c]"
                        }`}
                      >
                        {row.attending === "si" ? "Asiste" : "No asiste"}
                      </span>
                      {formatWhen(row.at)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-8 text-center text-xs text-[#5c636c]">
              No compartan este enlace con invitados.
            </p>
          </>
        ) : null}
      </div>
    </main>
  );
}
