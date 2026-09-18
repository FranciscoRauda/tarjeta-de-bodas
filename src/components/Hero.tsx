import { coupleFullNames, heroMetaLine, wedding } from "@/lib/wedding";
import { RingsIcon } from "./Ornaments";

export function Hero() {
  const a = wedding.couple.partnerOne.first;
  const b = wedding.couple.partnerTwo.first;

  return (
    <header className="hero-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/hero-bouquet.png"
        alt=""
        width={280}
        height={360}
        className="hero-deco hero-deco-bouquet"
        aria-hidden
        decoding="async"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/hero-olive.png"
        alt=""
        width={220}
        height={320}
        className="hero-deco hero-deco-olive"
        aria-hidden
        decoding="async"
      />

      <div className="wrap hero-inner">
        <figure className="hero-photo-block hero-rise d1">
          <div className="hero-photo-arch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt={`${a} y ${b}`}
              width={640}
              height={800}
              className="hero-photo-img"
            />
          </div>
        </figure>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-garland.png"
          alt=""
          width={420}
          height={90}
          className="hero-deco hero-deco-garland hero-rise d2"
          aria-hidden
          decoding="async"
        />

        <h1 className="names-hero hero-rise d3">
          {a} <span className="amp foil-text">&amp;</span> {b}
        </h1>

        <p className="hero-meta hero-rise d4">{heroMetaLine()}</p>
        <p className="hero-line hero-rise d5">{wedding.invitationLine}</p>
        <RingsIcon className="hero-rise d6" />
        <p className="sr-only">{coupleFullNames()}</p>
      </div>
    </header>
  );
}
