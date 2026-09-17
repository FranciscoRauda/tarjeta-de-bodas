import { mapsHref, wazeHref, wedding } from "@/lib/wedding";
import { DetailCard } from "./Ornaments";

export function Venue() {
  return (
    <section className="invite-section">
      <DetailCard title="Lugar">
        <p className="font-medium">{wedding.venue.name}</p>
        <p className="mt-2 text-[0.92rem]">{wedding.venue.address}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={mapsHref()} target="_blank" rel="noreferrer" className="btn-outline-pill">
            Ver mapa
          </a>
          <a href={wazeHref()} target="_blank" rel="noreferrer" className="btn-outline-pill">
            Waze
          </a>
        </div>
      </DetailCard>
    </section>
  );
}
