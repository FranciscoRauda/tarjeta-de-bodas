import { eventDayLine, mapsHref, wazeHref, wedding } from "@/lib/wedding";
import { EventIcon } from "./EventIcon";
import { LeafDivider, BotanicalEnvRight } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Itinerary() {
  return (
    <section className="invite-section section-itinerary" id="itinerario">
      <BotanicalEnvRight className="bouquet-section bouquet-itin" />
      <div className="wrap">
        <Reveal className="section-head">
          <LeafDivider />
          <p className="section-eyebrow">{eventDayLine()}</p>
          <h2 className="section-title">Así será el día</h2>
        </Reveal>

        <Reveal className="stop arco">
          <EventIcon name="venue" />
          <p className="stop-time foil-text">{wedding.datetime.ceremonyTime}</p>
          <p className="stop-kicker">{wedding.venue.title}</p>
          <h3 className="stop-name">{wedding.venue.name}</h3>
          <p className="stop-addr">{wedding.venue.address}</p>
          <span className="chip">Les recomendamos llegar con tiempo</span>
          <div className="stop-actions">
            <a href={mapsHref()} target="_blank" rel="noreferrer" className="btn-soft">
              Maps
            </a>
            <a href={wazeHref()} target="_blank" rel="noreferrer" className="btn-soft">
              Waze
            </a>
          </div>
        </Reveal>

        <div className="itinerary-list">
          {wedding.itinerary.map((item) => (
            <Reveal key={`${item.time}-${item.title}`} className="itinerary-item">
              <EventIcon name={item.icon} />
              <div>
                <p className="itinerary-time foil-text">{item.time}</p>
                <p className="itinerary-title">{item.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
