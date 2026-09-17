import { wedding } from "@/lib/wedding";
import { DetailCard } from "./Ornaments";

export function Timeline() {
  return (
    <section className="invite-section">
      <p className="section-eyebrow mb-6">Así será el día</p>
      <DetailCard title="Hora">
        <p className="text-[1.05rem] font-medium">{wedding.datetime.ceremonyTime}</p>
        <p className="mt-2 text-[0.88rem] opacity-90">{wedding.venue.title}</p>
      </DetailCard>
    </section>
  );
}
