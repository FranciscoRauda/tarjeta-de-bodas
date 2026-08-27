import { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

function CornerMarks() {
  return (
    <>
      {[
        "top-4 left-4 border-l border-t",
        "top-4 right-4 border-r border-t",
        "bottom-4 left-4 border-l border-b",
        "bottom-4 right-4 border-r border-b",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute h-8 w-8 border-[#575E4B] ${pos}`}
        />
      ))}
    </>
  );
}

export function PhotoHero({ footer }: { footer?: ReactNode }) {
  const a = wedding.couple.partnerOne;
  const b = wedding.couple.partnerTwo;

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#fffdf8] px-5 py-7">
      <div className="pointer-events-none absolute inset-[10px] border border-[#575E4B]/55" />
      <div className="pointer-events-none absolute inset-[16px] border border-[#575E4B]/25" />
      <CornerMarks />

      <div className="relative z-10 flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-between gap-5 py-2">
        <div className="animate-rise text-center">
          <p className="text-[0.68rem] tracking-[0.46em] uppercase text-[#575E4B]">
            Boda civil
          </p>
          <span
            aria-hidden
            className="mx-auto mt-3 block h-px w-16 bg-gradient-to-r from-transparent via-[#575E4B] to-transparent"
          />
          <h1 className="mt-3 font-[family-name:var(--font-hero)] text-[clamp(2.35rem,8.4vw,3.05rem)] font-normal leading-[1.12] text-[#2c3036]">
            {a.first} {a.last}
            <span className="block text-[clamp(1.7rem,6vw,2.2rem)] text-[#575E4B]">
              y
            </span>
            {b.first} {b.last}
          </h1>
        </div>

        <figure className="w-[min(86%,300px)] bg-white p-[9px] shadow-[0_18px_40px_-24px_rgba(44,48,54,0.45)] ring-1 ring-[#575E4B]/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt={`${a.first} y ${b.first}`}
            className="aspect-[3/4] h-auto w-full object-cover object-[center_58%]"
          />
          <figcaption className="mt-2 pb-0.5 text-center font-[family-name:var(--font-serif)] text-[0.68rem] italic tracking-wide text-[#5c636c]">
            El día que decimos sí
          </figcaption>
        </figure>

        <div className="w-full text-center">
          <p className="font-[family-name:var(--font-hero)] text-[clamp(1.55rem,5.2vw,1.9rem)] leading-tight text-[#2c3036]">
            {wedding.datetime.slashDate}
          </p>
          <p className="mt-0.5 font-[family-name:var(--font-hero)] text-[clamp(1.4rem,4.8vw,1.7rem)] leading-tight text-[#575E4B]">
            {wedding.datetime.heroTime}
          </p>
          {footer ? <div className="mt-5 w-full">{footer}</div> : <span className="mt-2 block" />}
        </div>
      </div>
    </section>
  );
}
