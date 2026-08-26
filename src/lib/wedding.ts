export const wedding = {
  slug: "samuel-sofia",
  couple: {
    partnerOne: { first: "Samuel", last: "Fuentes" },
    partnerTwo: { first: "Sofía", last: "Guzmán" },
    initials: "S · S",
  },
  tagline: "Una civil al pie del volcán",
  invitationLine:
    "Con la alegría de quienes se eligen de nuevo cada día, los invitamos a celebrar nuestra unión.",
  datetime: {
    iso: "2026-12-21T16:30:00-06:00",
    receptionIso: "2026-12-21T15:30:00-06:00",
    displayDate: "21 de diciembre de 2026",
    shortDate: "21 · 12 · 2026",
    slashDate: "21/12/2026",
    ceremonyTime: "4:30 p.m.",
    heroTime: "04:30 pm",
    timezone: "America/El_Salvador",
  },
  venue: {
    title: "Ceremonia civil",
    name: "Casa Vulkan",
    address: "Km 18.5, Carretera al Boquerón, Volcán de San Salvador",
    extra: "Hostal Casa Volcán, Calle al Volcán, Santa Tecla, El Salvador",
    mapsQuery:
      "Casa Vulkan Km 18.5 Carretera al Boquerón Volcán de San Salvador",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Casa+Vulkan+Km+18.5+Carretera+al+Boqueron+Volcan+de+San+Salvador",
    mapsEmbed:
      "https://maps.google.com/maps?q=Casa%20Vulkan%20Km%2018.5%20Carretera%20al%20Boquer%C3%B3n%20Volc%C3%A1n%20de%20San%20Salvador&z=15&output=embed",
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
    label: "Formal elegante",
    note: "Paleta sugerida: rosa, blush y blancos rotos. Eviten blanco total y tenis deportivos.",
  },
  gifts: {
    title: "Mesa de regalos",
    note: "Su presencia es el mejor regalo. Si desean un detalle extra, pueden depositarlo o preguntarnos en privado.",
    accounts: [] as { bank: string; name: string; number: string }[],
  },
  rsvp: {
    deadline: "1 de diciembre de 2026",
    // Número de Samuel o Sofía, con código de país y sin + ni espacios. Ej. 50370112233
    hostWhatsApp: "",
    countryCode: "503",
    countryLabel: "SV +503",
    adminKey: "samuelsofia",
  },
  gallery: ["/hero.png", "/gallery/01.png", "/gallery/02.png"],
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
