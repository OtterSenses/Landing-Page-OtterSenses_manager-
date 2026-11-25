// Gera a pasta dist/ com os arquivos publicáveis (usada pelo deploy no GitHub Pages).
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const entries = ["index.html", "404.html", "assets", "pages", "docs"];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of entries) {
  await cp(path.join(root, entry), path.join(dist, entry), { recursive: true });
}
console.log(`Build concluído: ${entries.join(", ")} → dist/`);
