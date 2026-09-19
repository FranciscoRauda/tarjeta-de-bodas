import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(
  "C:",
  "Users",
  "2540541",
  ".cursor",
  "projects",
  "d-Usuarios-Francisco-Documentos-Invitacion-boda",
  "assets",
);
const outDir = join(root, "public", "gallery");

const sources = [
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_nueva1-4410d233-e8d2-4160-836d-089738c5ab5b.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_nueva2-bf35d5fc-8de3-40b2-b09b-d044cc7a4df7.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_nueva3-259ce1ed-44c6-45f7-8a5c-19bc3cea5f7e.png",
];

await mkdir(outDir, { recursive: true });

for (let i = 0; i < sources.length; i++) {
  const input = join(assets, sources[i]);
  const output = join(outDir, `${String(i + 6).padStart(2, "0")}.webp`);
  const meta = await sharp(input).metadata();

  await sharp(input)
    .rotate()
    .resize({
      width: 960,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  const outStat = await stat(output);
  console.log(
    `OK ${output.replace(root + "\\", "")} ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height} (${Math.round(outStat.size / 1024)} KB)`,
  );
}
