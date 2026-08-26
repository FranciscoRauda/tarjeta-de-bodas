import { ReactNode } from "react";
import { wedding } from "@/lib/wedding";

export function PhotoHero({ footer }: { footer?: ReactNode }) {
  const a = wedding.couple.partnerOne;
  const b = wedding.couple.partnerTwo;

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#7aa3c4]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.png"
        alt={`${a.first} y ${b.first}`}
        className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-black/25 via-black/10 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-between px-6 pb-8 pt-14">
        <div className="animate-rise text-center text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.4)]">
          <h1 className="font-[family-name:var(--font-hero)] text-[clamp(2.6rem,9vw,3.35rem)] leading-[1.12] font-normal">
            {a.first} {a.last}
            <span className="block text-[clamp(2.1rem,7vw,2.7rem)]">y</span>
            {b.first} {b.last}
          </h1>
          <p className="mt-5 font-[family-name:var(--font-hero)] text-[clamp(1.7rem,5.5vw,2.05rem)] leading-tight">
            {wedding.datetime.slashDate}
          </p>
          <p className="mt-1 font-[family-name:var(--font-hero)] text-[clamp(1.55rem,5vw,1.9rem)] leading-tight">
            {wedding.datetime.heroTime}
          </p>
        </div>
        {footer ? <div className="w-full">{footer}</div> : <span />}
      </div>
    </section>
  );
}
