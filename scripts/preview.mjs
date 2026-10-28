// Versión de PREVISUALIZACIÓN que se abre con doble clic (sin servidor).
//   npm run preview   → genera la carpeta preview/ ; abre preview/index.html en el navegador.
// Reescribe las rutas absolutas ("/assets/...") a relativas. No es la versión para publicar:
// para publicar usa `npm run build` (carpeta dist/).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, DIST } from "../src/lib/paths.mjs";

const OUT = path.join(ROOT, "preview");
execFileSync(process.execPath, [path.join(ROOT, "src/build.mjs")], { stdio: "inherit", env: { ...process.env, BASE_PATH: "" } });
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(DIST, OUT, { recursive: true });

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const fix = (url, prefix) => {
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  const [p, ...rest] = url.split(/(?=[?#])/);
  const tail = rest.join("");
  const target = p.endsWith("/") ? p + "index.html" : p;
  return prefix + target.slice(1) + tail;
};

for (const f of walk(OUT).filter((x) => x.endsWith(".html"))) {
  const depth = path.relative(OUT, path.dirname(f)).split(path.sep).filter(Boolean).length;
  const prefix = depth ? "../".repeat(depth) : "./";
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/<link rel="preload"[^>]*>\s*/g, ""); // el precarga con crossorigin no funciona en file://
  s = s.replace(/\b(href|src)="([^"]*)"/g, (m, a, v) => `${a}="${fix(v, prefix)}"`);
  s = s.replace(/\bsrcset="([^"]*)"/g, (m, v) => `srcset="${v.split(", ").map((c) => { const [u, w] = c.split(" "); return [fix(u, prefix), w].filter(Boolean).join(" "); }).join(", ")}"`);
  fs.writeFileSync(f, s);
}
fs.rmSync(path.join(OUT, "robots.txt"), { force: true });
console.log(`✓ Previsualización en preview/ → abre preview/index.html`);
