import { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden>
      <ellipse cx="30" cy="46" rx="10" ry="5" transform="rotate(-38 30 46)" fill="currentColor" opacity="0.38" />
      <ellipse cx="46" cy="30" rx="10" ry="5" transform="rotate(38 46 30)" fill="currentColor" opacity="0.38" />
      <ellipse cx="24" cy="28" rx="7" ry="3.6" transform="rotate(-50 24 28)" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

function WeddingKnot({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="86" height="28" viewBox="0 0 86 28" fill="none" aria-hidden>
      <path d="M4 14h22M60 14h22" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path
        d="M43 5c-6 5-12 6-16 7 6 1 10 4 16 9 6-5 10-8 16-9-4-1-10-2-16-7Z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="43" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

function HeroFrame() {
  return (
    <div className="wedding-frame" aria-hidden>
      <span className="wedding-frame-line" />
      <span className="wedding-frame-line wedding-frame-line-inner" />
      <Flourish className="wedding-flourish wedding-flourish-tl" />
      <Flourish className="wedding-flourish wedding-flourish-tr" />
      <Flourish className="wedding-flourish wedding-flourish-bl" />
      <Flourish className="wedding-flourish wedding-flourish-br" />
      <WeddingKnot className="wedding-knot wedding-knot-top" />
      <WeddingKnot className="wedding-knot wedding-knot-bottom" />
    </div>
  );
}

export function PhotoHero({
  footer,
  clasp,
}: {
  footer?: ReactNode;
  clasp?: ReactNode;
}) {
  const a = wedding.couple.partnerOne;
  const b = wedding.couple.partnerTwo;

  return (
    <section className="relative isolate overflow-hidden bg-transparent px-6 py-9">
      <HeroFrame />

      <div className="relative z-10 flex min-h-[min(100dvh,760px)] flex-col items-center justify-between gap-6 py-3">
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

        <figure className="relative w-[min(82%,290px)] bg-[#fffdf8] p-[11px] shadow-[0_18px_40px_-24px_rgba(44,48,54,0.45)] ring-1 ring-[#575E4B]/55">
          {clasp}
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
