import { wedding } from "@/lib/wedding";
import { DetailCard, DressCodeBadge } from "./Ornaments";

export function DressCode() {
  const { dressCode } = wedding;

  return (
    <section className="section-stone px-5 py-12">
      <DressCodeBadge />
      <DetailCard title={dressCode.label} className="mt-2">
        <p className="text-[0.92rem] leading-relaxed">{dressCode.note}</p>
      </DetailCard>
    </section>
  );
}
