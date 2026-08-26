import { mapsHref, wedding } from "@/lib/wedding";

export function Venue() {
  return (
    <section className="bg-[#fffdfc] px-6 pb-10 pt-12">
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
        <a
          href={mapsHref()}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#8a919b] px-5 py-2.5 text-sm font-semibold text-white shadow-md"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="10" r="2.2" fill="currentColor" />
          </svg>
          Abrir en Google Maps
        </a>
      </div>
    </section>
  );
}
