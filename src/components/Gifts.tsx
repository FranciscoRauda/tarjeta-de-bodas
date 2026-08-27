import { wedding } from "@/lib/wedding";

function EnvelopeMark() {
  return (
    <svg
      width="86"
      height="62"
      viewBox="0 0 86 62"
      fill="none"
      aria-hidden
      className="mx-auto text-[#575E4B]"
    >
      <rect
        x="6"
        y="18"
        width="74"
        height="38"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7 20.5 43 42.5 79 20.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 54.5 32.5 36.5M79 54.5 53.5 36.5"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <circle cx="43" cy="21" r="11.5" fill="#575E4B" />
      <circle cx="43" cy="21" r="9.2" fill="none" stroke="#fffdf8" strokeWidth="0.8" />
      <text
        x="43"
        y="24.5"
        textAnchor="middle"
        fill="#fffdf8"
        fontSize="9"
        fontFamily="Georgia, serif"
      >
        {wedding.couple.initials}
      </text>
    </svg>
  );
}

export function Gifts() {
  const { gifts } = wedding;

  return (
    <section className="bg-[#fffdfc] px-8 pb-6 pt-10">
      <p className="text-center text-[0.65rem] tracking-[0.38em] uppercase text-[#575E4B]">
        {gifts.kicker}
      </p>
      <div className="mt-6">
        <EnvelopeMark />
      </div>
      <h3 className="mt-5 text-center font-[family-name:var(--font-hero)] text-[2.35rem] leading-[1.12] text-[#3a2a22]">
        {gifts.title}
      </h3>
      <p className="mt-2 text-center font-[family-name:var(--font-hero)] text-[1.7rem] leading-tight text-[#575E4B]">
        {gifts.line}
      </p>
      <span
        aria-hidden
        className="mx-auto mt-8 block h-px w-20 bg-gradient-to-r from-transparent via-[#575E4B] to-transparent"
      />
    </section>
  );
}
