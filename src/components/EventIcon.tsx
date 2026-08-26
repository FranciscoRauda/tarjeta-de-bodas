export type EventIconName = "venue" | "ceremony" | "coffee" | "cheers" | "dinner";

export function EventIcon({ name }: { name: EventIconName }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
    className: "text-[#2c3036] shrink-0",
  };

  if (name === "venue") {
    return (
      <svg {...common}>
        <path d="M4 20V10l8-6 8 6v10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 20v-6h4v6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "ceremony") {
    return (
      <svg {...common}>
        <path d="M4 20h16M12 4v2M6 20V10l6-4 6 4v10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "coffee") {
    return (
      <svg {...common}>
        <path d="M6 9h10v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V9Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 11h2.2a2.2 2.2 0 1 1 0 4H16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5c.4 1 .4 2 0 3M12 5c.4 1 .4 2 0 3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "cheers") {
    return (
      <svg {...common}>
        <path d="M7 4h5l-.8 7.5A3.2 3.2 0 0 1 8 14.5 3.2 3.2 0 0 1 4.8 11.5L4 4h3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14.5V20M6 20h4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 5h6l-1 6.2a3 3 0 0 1-3 2.6 3 3 0 0 1-3-2.6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M7 4v6M17 4v6M5 10h14v2a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 17v4M8 21h8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
