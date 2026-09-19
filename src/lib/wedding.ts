export const wedding = {
  slug: "samuel-sofia",
  couple: {
    partnerOne: { first: "Samuel", last: "Fuentes" },
    partnerTwo: { first: "Sofía", last: "Guzmán" },
    initials: "S · S",
  },
  tagline: "Una civil al pie del volcán",
  invitationLine:
    "Queremos que seas parte del inicio de una nueva etapa en nuestras vidas.",
  datetime: {
    iso: "2026-12-21T15:30:00-06:00",
    receptionIso: "2026-12-21T15:30:00-06:00",
    displayDate: "21 de diciembre de 2026",
    shortDate: "21 · 12 · 2026",
    slashDate: "21/12/2026",
    ceremonyTime: "3:30 p.m.",
    heroTime: "03:30 pm",
    timezone: "America/El_Salvador",
  },
  venue: {
    title: "Boda civil",
    name: "Bistro Boquerón",
    address: "Km 18 1/2, Volcán de San Salvador, El Salvador",
    extra: "Bistro Boquerón, Km 18 1/2, Volcán de San Salvador",
    mapsQuery: "Bistro Boquerón Km 18 1/2 Volcán de San Salvador El Salvador",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bistro+Boquer%C3%B3n+Km+18+1%2F2+Volc%C3%A1n+de+San+Salvador+El+Salvador",
    mapsEmbed:
      "https://maps.google.com/maps?q=Bistro%20Boquer%C3%B3n%20Km%2018%201%2F2%20Volc%C3%A1n%20de%20San%20Salvador%20El%20Salvador&z=15&output=embed",
  },
  itinerary: [
    { time: "03:30 pm", title: "recepción", icon: "venue" },
    { time: "04:30 pm", title: "Ceremonia", icon: "ceremony" },
    { time: "05:30 pm", title: "coffee lounge", icon: "coffee" },
    { time: "06:30 pm", title: "Brindis", icon: "cheers" },
    { time: "07:00 pm", title: "Cena", icon: "dinner" },
  ],
  dressCode: {
    title: "Código de vestimenta",
    label: "Formal",
    note: "Les recomendamos llevar abrigo para disfrutar cómodamente de la celebración.",
  },
  gifts: {
    kicker: "Regalo",
    title: "Su presencia es el mejor detalle.",
    line: "Muestras de cariño en sobre",
  },
  rsvp: {
    deadline: "1 de diciembre de 2026",
    // Número de Samuel o Sofía, con código de país y sin + ni espacios. Ej. 50370112233
    hostWhatsApp: "50377203615",
    countryCode: "503",
    countryLabel: "SV +503",
    adminKey: "samuelsofia",
  },
  gallery: [
    "/gallery/01.webp",
    "/gallery/02.webp",
    "/gallery/03.webp",
    "/gallery/04.webp",
    "/gallery/05.webp",
    "/gallery/06.webp",
    "/gallery/07.webp",
    "/gallery/08.webp",
  ],
  music: {
    enabled: true,
    src: "/audio/entrance.mp3",
    title: "Thinking Out Loud",
    volume: 0.62,
  },
  hostNames: "Samuel y Sofía",
} as const;

export type WeddingConfig = typeof wedding;

export function coupleFullNames() {
  const { partnerOne: a, partnerTwo: b } = wedding.couple;
  return `${a.first} ${a.last} y ${b.first} ${b.last}`;
}

export function mapsHref() {
  return wedding.venue.mapsUrl;
}

export function wazeHref() {
  const q = encodeURIComponent(wedding.venue.mapsQuery);
  return `https://waze.com/ul?q=${q}&navigate=yes`;
}

export function rsvpWhatsAppHref(input: {
  name: string;
  adults: number;
  minors: number;
  phone: string;
}) {
  const { partnerOne: a, partnerTwo: b } = wedding.couple;
  const adultsLabel = `${input.adults} adulto${input.adults === 1 ? "" : "s"}`;
  const minorsLabel =
    input.minors === 0
      ? "sin menores"
      : `${input.minors} menor${input.minors === 1 ? "" : "es"}`;

  const lines = [
    `Hola, confirmo asistencia a la boda de ${a.first} y ${b.first} el ${wedding.datetime.slashDate}.`,
    "",
    `Nombre: ${input.name || "…"}`,
    `Adultos: ${adultsLabel}`,
    `Menores: ${minorsLabel}`,
  ];

  const digits = input.phone.replace(/\D/g, "");
  if (digits) {
    lines.push(`Teléfono: +${wedding.rsvp.countryCode} ${digits}`);
  }

  const text = encodeURIComponent(lines.join("\n"));
  const host = wedding.rsvp.hostWhatsApp.replace(/\D/g, "");
  return host
    ? `https://wa.me/${host}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function calendarHref() {
  const start = "20261221T153000";
  const end = "20261221T230000";
  const text = encodeURIComponent(`Boda de ${coupleFullNames()}`);
  const details = encodeURIComponent(
    `${wedding.venue.title}: ${wedding.venue.name}. ${wedding.venue.address}`,
  );
  const location = encodeURIComponent(
    `${wedding.venue.name}, ${wedding.venue.address}`,
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}&ctz=${wedding.datetime.timezone}`;
}

export function outlookCalendarHref() {
  const subject = encodeURIComponent(`Boda de ${coupleFullNames()}`);
  const body = encodeURIComponent(
    `${wedding.venue.title}: ${wedding.venue.name}. ${wedding.venue.address}`,
  );
  const location = encodeURIComponent(
    `${wedding.venue.name}, ${wedding.venue.address}`,
  );
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&location=${location}&startdt=2026-12-21T15:30:00&enddt=2026-12-21T23:00:00&allday=false`;
}

export function heroMetaLine() {
  return `${wedding.datetime.shortDate} · ${wedding.venue.name}`;
}

export function eventDayLine() {
  const label = new Intl.DateTimeFormat("es-SV", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(wedding.datetime.iso));
  return label.charAt(0).toUpperCase() + label.slice(1);
}
