import { wedding } from "@/lib/wedding";
import { LaceCard } from "./Ornaments";

export function Hero() {
  const a = wedding.couple.partnerOne.first.toUpperCase();
  const b = wedding.couple.partnerTwo.first.toUpperCase();

  return (
    <section className="hero-envelope-backdrop animate-rise">
      <div className="hero-envelope-shadow" aria-hidden />
      <div className="hero-lace-wrap">
        <LaceCard>
          <p className="caps-names !text-[#4d4336] tracking-[0.24em]">
            {a} & {b}
          </p>
          <p className="section-serif mt-6 px-2 text-[0.95rem] leading-relaxed">
            {wedding.invitationLine}
          </p>
          <p className="mt-8 caps-names !text-[#4d4336] text-[0.9rem] tracking-[0.3em]">
            {wedding.datetime.shortDate}
          </p>
        </LaceCard>
      </div>
    </section>
  );
}
