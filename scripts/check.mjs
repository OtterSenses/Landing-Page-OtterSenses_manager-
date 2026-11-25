// Verificações sem dependências: sintaxe dos JS, links/recursos locais e âncoras dos HTML.
import { readFile, readdir, access } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["node_modules", ".git", "dist"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(root);
const rel = (f) => path.relative(root, f).replaceAll("\\", "/");

// 1) Sintaxe JavaScript
for (const file of files.filter((f) => f.endsWith(".js") || f.endsWith(".mjs"))) {
  const r = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (r.status !== 0) errors.push(`Sintaxe inválida em ${rel(file)}:\n${r.stderr}`);
}

// 2) HTML: recursos locais, âncoras e ids duplicados
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) errors.push(`${rel(file)}: ids duplicados: ${[...new Set(dup)].join(", ")}`);

  for (const [, , url] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [target, hash] = url.split("#");
    let targetFile = file;
    let targetHtml = html;
    if (target) {
      targetFile = path.resolve(path.dirname(file), target);
      try { await access(targetFile); } catch { errors.push(`${rel(file)}: não encontrado → ${url}`); continue; }
      targetHtml = targetFile.endsWith(".html") ? await readFile(targetFile, "utf8") : "";
    }
    if (hash && targetHtml && !targetHtml.includes(`id="${hash}"`)) {
      errors.push(`${rel(file)}: âncora inexistente → ${url}`);
    }
  }
}

// 3) Imports relativos dos módulos JS
for (const file of files.filter((f) => f.endsWith(".js"))) {
  const code = await readFile(file, "utf8");
  for (const [, spec] of code.matchAll(/from\s+"(\.[^"]+)"/g)) {
    try { await access(path.resolve(path.dirname(file), spec)); }
    catch { errors.push(`${rel(file)}: import inexistente → ${spec}`); }
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${files.length} arquivos verificados sem erros.`);
