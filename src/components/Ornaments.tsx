export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ornament mx-auto ${className}`}
      width="180"
      height="28"
      viewBox="0 0 180 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 14h58M112 14h58"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M90 4c-7 6-14 8-22 10 8 1 14 5 22 10 8-5 14-9 22-10-8-2-15-4-22-10Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="90" cy="14" r="2.2" fill="#d4af37" />
    </svg>
  );
}

export function VolcanoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="220"
      height="72"
      viewBox="0 0 220 72"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 64 L62 18 L88 42 L118 8 L162 40 L212 64"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.8"
      />
      <path
        d="M118 8 L126 0 M118 8 L110 2"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.65"
      />
    </svg>
  );
}

export function WaxSeal({ initials }: { initials: string }) {
  return (
    <div className="animate-seal relative grid h-[92px] w-[92px] place-items-center">
      <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden>
        <circle cx="46" cy="46" r="44" fill="#d4af37" />
        <circle cx="46" cy="46" r="38" fill="#e6c84a" />
        <circle
          cx="46"
          cy="46"
          r="34"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeDasharray="2 3"
        />
      </svg>
      <span className="absolute font-[family-name:var(--font-script)] text-[1.65rem] leading-none text-white">
        {initials}
      </span>
    </div>
  );
}
