// Comprobaciones de calidad. Uso:
//   npm run check                → valida contenido, contraste y HTML generado (necesita `npm run build` antes)
//   npm run pendientes           → además lista lo que falta para publicar; sale con error si queda algo
import fs from "node:fs";
import path from "node:path";
import { DIST, PUBLIC_DIR } from "../src/lib/paths.mjs";
import { textPairs } from "../src/lib/palette.mjs";
import { brand, disciplineById, projects, contact, about, home } from "../src/templates/ctx.mjs";

const publicacion = process.argv.includes("--publicacion");
const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

// ── 1. Contenido ────────────────────────────────────────────
const slugs = new Set();
for (const p of projects) {
  const id = `proyecto «${p.slug || p.title || "?"}»`;
  for (const f of ["slug", "title", "year", "summary", "why"]) if (!p[f]) err(`${id}: falta «${f}»`);
  if (p.slug) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) err(`${id}: el slug debe ser minúsculas, números y guiones`);
    if (slugs.has(p.slug)) err(`${id}: slug duplicado`);
    slugs.add(p.slug);
  }
  if (!Array.isArray(p.disciplines) || !p.disciplines.length) err(`${id}: faltan disciplinas`);
  else for (const d of p.disciplines) if (!disciplineById[d]) err(`${id}: disciplina desconocida «${d}»`);
  if (!p.cover) err(`${id}: falta «cover»`);
}

// Medios: alt obligatorio y archivo existente si hay src
const medias = [];
const collect = (m, where) => m && typeof m === "object" && medias.push({ m, where });
for (const p of projects) {
  collect(p.cover, `${p.slug} · cover`);
  for (const b of p.result?.blocks || []) {
    ["media", "a", "b"].forEach((k) => collect(b[k], `${p.slug} · ${b.kind}`));
    (b.items || []).forEach((m) => collect(m, `${p.slug} · ${b.kind}`));
  }
}
collect(about.photo, "sobre-mi · foto");
for (const { m, where } of medias) {
  if (m.src) {
    if (!m.alt) err(`${where}: imagen sin texto alternativo`);
    if (!/^https?:/.test(m.src) && !fs.existsSync(path.join(PUBLIC_DIR, m.src))) err(`${where}: no existe public${m.src}`);
  }
}

// ── 2. Contraste de la paleta ───────────────────────────────
for (const p of textPairs()) {
  if (p.ratio < p.min) err(`contraste: «${p.label}» ${p.ratio.toFixed(2)}:1 (mínimo ${p.min}:1)`);
}

// ── 3. HTML generado ────────────────────────────────────────
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const f = path.join(dir, e.name);
    return e.isDirectory() ? walk(f) : [f];
  });
}
const BASE = (process.env.BASE_PATH || "").replace(/\/$/, "");
let pages = [];
if (!fs.existsSync(DIST)) {
  err("No existe dist/. Ejecuta antes: npm run build");
} else {
  pages = walk(DIST).filter((f) => f.endsWith(".html"));
  const routeOf = (f) => {
    const rel = "/" + path.relative(DIST, f).replace(/\\/g, "/");
    return rel.replace(/index\.html$/, "");
  };
  const ids = new Map();
  const docs = pages.map((f) => {
    const src = fs.readFileSync(f, "utf8");
    ids.set(routeOf(f), new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
    return { f, route: routeOf(f), src };
  });

  for (const { route, src } of docs) {
    const at = `${route}`;
    if (!/<html[^>]*\slang="[a-z-]+"/.test(src)) err(`${at}: falta lang`);
    const title = src.match(/<title>([^<]*)<\/title>/)?.[1] || "";
    const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1] || "";
    if (!title) err(`${at}: falta <title>`);
    else if (title.length > 65) warn(`${at}: título largo (${title.length})`);
    if (!desc) err(`${at}: falta meta description`);
    else if (desc.length > 170) warn(`${at}: descripción larga (${desc.length})`);

    const h1 = (src.match(/<h1[\s>]/g) || []).length;
    if (route !== "/404.html" && h1 !== 1) err(`${at}: ${h1} elementos h1 (debe haber 1)`);

    // orden de encabezados: sin saltos de más de un nivel
    let prev = 0;
    for (const m of src.matchAll(/<h([1-6])[\s>]/g)) {
      const l = +m[1];
      if (prev && l > prev + 1) err(`${at}: salto de encabezado h${prev} → h${l}`);
      prev = l;
    }

    for (const m of src.matchAll(/<img\b[^>]*>/g)) {
      if (!/\salt=/.test(m[0])) err(`${at}: <img> sin alt`);
      if (!/\swidth=/.test(m[0]) || !/\sheight=/.test(m[0])) warn(`${at}: <img> sin width/height`);
    }
    for (const m of src.matchAll(/aria-controls="([^"]+)"/g)) {
      if (!ids.get(route).has(m[1])) err(`${at}: aria-controls apunta a #${m[1]}, que no existe`);
    }
    for (const m of src.matchAll(/aria-labelledby="([^"]+)"/g)) {
      if (!ids.get(route).has(m[1])) err(`${at}: aria-labelledby apunta a #${m[1]}, que no existe`);
    }
    const dup = [...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    dup.filter((v, i) => dup.indexOf(v) !== i).forEach((v) => err(`${at}: id duplicado «${v}»`));
  }

  // enlaces internos y anclas
  const exists = (route) => {
    if (BASE && route.startsWith(BASE)) route = route.slice(BASE.length) || "/";
    const clean = route.split(/[?#]/)[0];
    if (ids.has(clean)) return clean;
    if (ids.has(clean.replace(/\/?$/, "/"))) return clean.replace(/\/?$/, "/");
    return fs.existsSync(path.join(DIST, clean)) && !fs.statSync(path.join(DIST, clean)).isDirectory() ? clean : null;
  };
  for (const { route, src } of docs) {
    for (const m of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      const link = m[1];
      if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(link)) continue;
      if (link.startsWith("#")) {
        if (link !== "#" && link !== "#top" && !ids.get(route).has(link.slice(1))) err(`${route}: ancla ${link} sin destino`);
        continue;
      }
      const target = exists(link);
      if (!target) err(`${route}: enlace roto → ${link}`);
      else if (link.includes("#") && ids.has(target)) {
        const a = link.split("#")[1];
        if (a && !ids.get(target).has(a)) err(`${route}: ancla ${link} sin destino`);
      }
    }
  }
}

// ── 4. Pendientes de publicación ────────────────────────────
const pending = [];
if (!brand.siteUrl) pending.push("Dominio: define SITE_URL (canonical, Open Graph, sitemap).");
if (!contact.email) pending.push("Correo profesional (content/contact.mjs → email).");
contact.socials.filter((s) => !s.url).forEach((s) => pending.push(`Enlace de ${s.label} (content/contact.mjs → socials).`));
projects.filter((p) => p.provisional).forEach((p) => pending.push(`Proyecto provisional «${p.slug}»: sustitúyelo por uno real.`));
const ph = medias.filter(({ m }) => !m.src).length;
if (ph) pending.push(`${ph} imágenes/medios sin archivo (se muestran como marcador «provisional»).`);
if (!about.photo?.src) pending.push("Foto personal en Sobre mí.");
if (!brand.ogImage) pending.push("Imagen para compartir en redes (content/brand.mjs → ogImage).");
pending.push("Confirmar nombre: disponibilidad de dominio, marca y redes (no verificada). Ver /identidad/.");
pending.push("Revisar y reescribir con tu voz los textos de Sobre mí, Servicios e Inicio.");
void home;

// ── Informe ─────────────────────────────────────────────────
console.log(`\nPáginas HTML revisadas: ${pages.length} · Proyectos: ${projects.length} · Pares de contraste: ${textPairs().length}`);
if (warns.length) console.log("\nAvisos:\n" + warns.map((w) => "  · " + w).join("\n"));
if (errors.length) console.log("\nErrores:\n" + errors.map((e) => "  ✗ " + e).join("\n"));
else console.log("\n✓ Sin errores.");

if (publicacion) {
  console.log("\nPendiente antes de publicar:\n" + pending.map((p) => "  ☐ " + p).join("\n"));
  process.exit(errors.length || pending.length ? 1 : 0);
}
process.exit(errors.length ? 1 : 0);
