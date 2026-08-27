import { mapsHref, wazeHref, wedding } from "@/lib/wedding";

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

function NavIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4.8 20.2 12 16.5l7.2 3.7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Venue() {
  return (
    <section className="bg-[#fffdfc] px-6 pb-10 pt-12">
      <p className="text-center text-[0.65rem] tracking-[0.38em] uppercase text-[#b8860b]">
        Con ustedes
      </p>
      <p className="mt-4 text-center font-[family-name:var(--font-hero)] text-[2.85rem] leading-[1.15] text-[#2c3036]">
        {wedding.invitationLine}
      </p>
      <span
        aria-hidden
        className="mx-auto mt-7 mb-8 block h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
      />

      <h3 className="text-center font-[family-name:var(--font-hero)] text-[1.85rem] leading-snug text-[#6b5348]">
        {wedding.venue.title}: {wedding.venue.name} {wedding.venue.address}.
      </h3>
      <p className="mt-5 text-center font-[family-name:var(--font-serif)] text-[1.05rem] font-semibold leading-relaxed text-[#1d1612]">
        {wedding.venue.extra}
      </p>

      <div className="relative mt-7 overflow-hidden bg-[#eef1f4]">
        <iframe
          title="Casa Vulkan en Google Maps"
          src={wedding.venue.mapsEmbed}
          className="h-[250px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-3 left-3 right-3 z-10 grid grid-cols-2 gap-2">
          <a
            href={mapsHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d4af37] px-3 py-2.5 text-center text-[0.82rem] font-semibold text-[#2a2418] shadow-md"
          >
            <PinIcon />
            Google Maps
          </a>
          <a
            href={wazeHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d4af37] px-3 py-2.5 text-center text-[0.82rem] font-semibold text-[#2a2418] shadow-md"
          >
            <NavIcon />
            Waze
          </a>
        </div>
      </div>
    </section>
  );
}
