import { wedding } from "@/lib/wedding";
import { EventIcon, EventIconName } from "./EventIcon";

function EventBlock({
  time,
  title,
  icon,
  align,
}: {
  time: string;
  title: string;
  icon: EventIconName;
  align: "left" | "right";
}) {
  const text = (
    <div className={align === "left" ? "text-right" : "text-left"}>
      <p className="text-[0.95rem] font-semibold tracking-wide text-[#2b2420]">
        {time}
      </p>
      <p className="mt-0.5 font-[family-name:var(--font-hero)] text-[1.45rem] leading-tight text-[#3a2a22]">
        {title}
      </p>
    </div>
  );

  return (
    <div
      className={`flex items-center gap-2 ${align === "left" ? "justify-end" : "justify-start"}`}
    >
      {align === "left" ? (
        <>
          <EventIcon name={icon} />
          {text}
        </>
      ) : (
        <>
          {text}
          <EventIcon name={icon} />
        </>
      )}
    </div>
  );
}

export function Timeline() {
  return (
    <section className="bg-transparent px-4 pb-12 pt-4">
      <h3 className="text-center font-[family-name:var(--font-hero)] text-5xl text-[#7a6a62]">
        Itinerario
      </h3>

      <ol className="relative mt-8">
        <span className="absolute bottom-3 left-1/2 top-3 w-px -translate-x-1/2 bg-[#575E4B]" />
        {wedding.itinerary.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={`${item.time}-${item.title}`}
              className="relative grid grid-cols-[1fr_22px_1fr] items-center gap-1 py-5"
            >
              <div>
                {left ? (
                  <EventBlock
                    time={item.time}
                    title={item.title}
                    icon={item.icon}
                    align="left"
                  />
                ) : null}
              </div>
              <div className="flex justify-center">
                <span className="relative z-10 h-3 w-3 rounded-full bg-[#575E4B] ring-4 ring-white" />
              </div>
              <div>
                {!left ? (
                  <EventBlock
                    time={item.time}
                    title={item.title}
                    icon={item.icon}
                    align="right"
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
