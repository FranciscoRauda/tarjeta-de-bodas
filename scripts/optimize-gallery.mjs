import { mkdir } from "node:fs/promises";
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
  "assets"
);
const outDir = join(root, "public", "gallery");

const sources = [
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_1-8a10a599-d3f0-4bbe-8433-0fb93fb13006.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_2-c2f11d7a-aea8-4962-840b-3c956b5f8c53.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_3-873aaeb7-c8fb-4800-80d8-e67733dce350.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_4-e9f7dea5-f75f-4e38-8fed-9f5824e0230a.png",
  "c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_IMG_8080-645cffb2-5d41-4dad-8fe3-7b82252df5e6.png",
];

await mkdir(outDir, { recursive: true });

for (let i = 0; i < sources.length; i++) {
  const input = join(assets, sources[i]);
  const output = join(outDir, `${String(i + 1).padStart(2, "0")}.webp`);
  const meta = await sharp(input).metadata();
  const pipeline = sharp(input).rotate().resize({
    width: 960,
    height: 1200,
    fit: "inside",
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality: 82, effort: 4 }).toFile(output);
  const outMeta = await sharp(output).metadata();
  const inKb = Math.round((meta.size ?? 0) / 1024);
  const outStat = await import("node:fs/promises").then((fs) => fs.stat(output));
  console.log(
    `OK ${output.replace(root + "\\", "")} ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height} (${Math.round(outStat.size / 1024)} KB, was ~${inKb} KB)`
  );
}
