import { wedding } from "@/lib/wedding";
import { DetailCard } from "./Ornaments";

export function Timeline() {
  return (
    <section className="section-parchment px-5 py-10">
      <DetailCard title="Hora">
        <p>{wedding.datetime.ceremonyTime}</p>
      </DetailCard>
    </section>
  );
}
