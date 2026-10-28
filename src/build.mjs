// Generador del sitio estático. Sin dependencias: solo Node.
//   npm run build   →  genera la carpeta /dist (lista para subir a cualquier hosting)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { DIST, PUBLIC_DIR, SRC } from "./lib/paths.mjs";
import { tokensCss } from "./lib/palette.mjs";
import { layout, assets } from "./templates/layout.mjs";
import { brand, projects, BASE, abs } from "./templates/ctx.mjs";
import { homePage } from "./templates/pages/home.mjs";
import { projectsIndexPage, projectPage } from "./templates/pages/projects.mjs";
import { servicesPage } from "./templates/pages/services.mjs";
import { aboutPage } from "./templates/pages/about.mjs";
import { contactPage } from "./templates/pages/contact.mjs";
import { identityPage } from "./templates/pages/identity.mjs";
import { notFoundPage } from "./templates/pages/notfound.mjs";

const CSS_ORDER = ["tokens.css", "base.css", "layout.css", "components.css", "pages.css"];

const hash = (text) => crypto.createHash("sha1").update(text).digest("hex").slice(0, 8);

const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

export function build() {
  const started = Date.now();
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  // 1) Archivos estáticos (fuentes, imágenes, favicon…)
  if (fs.existsSync(PUBLIC_DIR)) fs.cpSync(PUBLIC_DIR, DIST, { recursive: true });

  // 2) CSS: tokens de paleta (generados) + hojas de estilo
  const css = minifyCss(
    tokensCss() + CSS_ORDER.map((f) => fs.readFileSync(path.join(SRC, "styles", f), "utf8")).join("\n")
  );
  assets.cssVersion = hash(css);
  write(path.join(DIST, "assets", "site.css"), css);

  // 3) JS del cliente
  const js = fs.readFileSync(path.join(SRC, "client", "site.js"), "utf8");
  assets.jsVersion = hash(js);
  write(path.join(DIST, "assets", "site.js"), js);

  // 4) Páginas
  const pages = [
    homePage(),
    projectsIndexPage(),
    ...projects.map((p, i) => projectPage(p, i)),
    servicesPage(),
    aboutPage(),
    contactPage(),
    identityPage(),
  ];

  for (const page of pages) {
    const out = path.join(DIST, page.path === "/" ? "index.html" : path.join(page.path, "index.html"));
    write(out, layout(page).toString());
  }
  const nf = notFoundPage();
  write(path.join(DIST, "404.html"), layout(nf).toString());

  // 5) robots + sitemap
  const indexable = pages.filter((p) => !p.noindex);
  const today = new Date().toISOString().slice(0, 10);
  let robots = "User-agent: *\nAllow: /\nDisallow: /identidad/\n";
  if (brand.siteUrl) {
    const urls = indexable
      .map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${today}</lastmod></url>`)
      .join("\n");
    write(
      path.join(DIST, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
    robots += `\nSitemap: ${abs("/sitemap.xml")}\n`;
  }
  write(path.join(DIST, "robots.txt"), robots);

  const ms = Date.now() - started;
  console.log(`✓ ${pages.length + 1} páginas generadas en dist/ (${ms} ms) · CSS ${(css.length / 1024).toFixed(1)} KB`);
  if (!brand.siteUrl) {
    console.log("  · Aviso: brand.siteUrl está vacío → sin canonical ni sitemap (se completa al publicar).");
  }
  if (BASE) console.log(`  · BASE_PATH activo: ${BASE}`);
  return { pages };
}

// Ejecución directa: node src/build.mjs
import { fileURLToPath } from "node:url";
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  build();
}
