import { coupleFullNames, wedding } from "@/lib/wedding";
import { BotanicalEnvLeft, BotanicalEnvRight, GarlandArch } from "./Ornaments";

function RingsIcon() {
  return (
    <svg className="rings-icon hero-rise d6" viewBox="0 0 52 30" fill="none" aria-hidden>
      <circle cx="18" cy="15" r="10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="34" cy="15" r="10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Hero() {
  const a = wedding.couple.partnerOne.first;
  const b = wedding.couple.partnerTwo.first;

  return (
    <header className="hero-section">
      <BotanicalEnvLeft className="bouquet-hero bouquet-hero-l" />
      <BotanicalEnvRight className="bouquet-hero bouquet-hero-r es-rama" />
      <div className="wrap">
        <GarlandArch className="hero-rise d1" />
        <h1 className="names-hero hero-rise d2">
          {a} <span className="amp foil-text">&amp;</span> {b}
        </h1>

        <figure className="hero-polaroid hero-photo hero-rise d3">
          <div className="hero-polaroid-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt={`${a} y ${b}`}
              width={640}
              height={800}
              className="hero-polaroid-img"
            />
          </div>
          <figcaption className="hero-polaroid-caption">El día que decimos sí</figcaption>
        </figure>

        <p className="hero-meta hero-rise d4">
          {wedding.datetime.shortDate} · {wedding.venue.name}
        </p>
        <p className="hero-line hero-rise d5">{wedding.invitationLine}</p>
        <RingsIcon />
        <p className="sr-only">{coupleFullNames()}</p>
      </div>
    </header>
  );
}
