import { NextResponse } from "next/server";
import { wedding } from "@/lib/wedding";
import { readRsvps, saveRsvp, type Rsvp } from "@/lib/rsvps";

type Payload = {
  name?: string;
  adults?: number;
  minors?: number;
  phone?: string;
  attending?: "si" | "no";
};

function authorized(request: Request) {
  const url = new URL(request.url);
  const key =
    request.headers.get("x-admin-key") ?? url.searchParams.get("key") ?? "";
  return key === wedding.rsvp.adminKey;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const list = await readRsvps();
  const going = list.filter((r) => r.attending === "si");
  return NextResponse.json({
    list,
    totals: {
      confirmations: list.length,
      attending: going.length,
      adults: going.reduce((n, r) => n + r.adults, 0),
      minors: going.reduce((n, r) => n + r.minors, 0),
    },
  });
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const adults = Number(body.adults ?? 0);
  const minors = Number(body.minors ?? 0);
  const attending: Rsvp["attending"] = body.attending === "no" ? "no" : "si";

  if (name.length < 3 || adults < 1 || adults > 10 || minors < 0 || minors > 10) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const row: Rsvp = {
    name,
    adults,
    minors,
    phone: String(body.phone ?? "").trim(),
    attending,
    at: new Date().toISOString(),
  };

  try {
    await saveRsvp(row);
  } catch (error) {
    console.error("RSVP persist failed", error);
    return NextResponse.json(
      { error: "No se pudo guardar en este entorno" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
