import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type Rsvp = {
  name: string;
  adults: number;
  minors: number;
  phone: string;
  attending: "si" | "no";
  at: string;
};

const filePath = () => path.join(process.cwd(), "data", "rsvps.jsonl");

export async function readRsvps(): Promise<Rsvp[]> {
  try {
    const raw = await readFile(filePath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Rsvp)
      .reverse();
  } catch {
    return [];
  }
}

export async function saveRsvp(row: Rsvp) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(filePath(), `${JSON.stringify(row)}\n`, "utf8");
}
