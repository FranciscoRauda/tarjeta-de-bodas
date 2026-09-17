import { wedding } from "@/lib/wedding";
import { PergaminoCard } from "./Ornaments";

export function Gifts() {
  const { gifts } = wedding;

  return (
    <section className="invite-section">
      <PergaminoCard>
        <h3 className="script-heading">{gifts.kicker}</h3>
        <p className="section-serif mt-5 text-[0.95rem]">{gifts.title}</p>
        <p className="section-serif mt-3 text-[0.92rem]">
          Agradecemos sus muestras de cariño en <strong>sobre</strong>.
        </p>
      </PergaminoCard>
    </section>
  );
}
