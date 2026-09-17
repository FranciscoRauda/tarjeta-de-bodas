import { wedding } from "@/lib/wedding";
import { BotanicalEnvLeft } from "./Ornaments";
import { Reveal } from "./Reveal";

export function DetailsSection() {
  const { dressCode, gifts } = wedding;

  return (
    <section className="invite-section section-detalles">
      <BotanicalEnvLeft className="bouquet-section bouquet-det-l" />
      <div className="wrap">
        <div className="cards-grid">
          <Reveal className="detalle-card">
            <div className="detalle-icon detalle-icon-dress" aria-hidden />
            <h3>{dressCode.label}</h3>
            <p>{dressCode.note}</p>
            <span className="tag-foil">{dressCode.title}</span>
          </Reveal>

          <Reveal className="detalle-card">
            <div className="detalle-icon detalle-icon-gift" aria-hidden />
            <h3>{gifts.kicker}</h3>
            <p>{gifts.title}</p>
            <p className="mt-2 text-[0.92rem] opacity-90">
              Agradecemos sus muestras de cariño en <strong>sobre</strong>.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
