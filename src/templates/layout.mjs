// Documento HTML completo: <head>, cabecera, pie y scripts.
import { html, raw, attr } from "../lib/html.mjs";
import { brand, navigation, contact, u, abs, pageTitle } from "./ctx.mjs";
import { logo, button, emailLink, socialList, label } from "./components.mjs";

export const assets = { cssVersion: "", jsVersion: "" };

function siteHeader({ theme, path }) {
  const isCurrent = (href) => (href === "/" ? path === "/" : path.startsWith(href));
  return html`<header class="site-header theme-${theme}">
    <div class="site-header__inner">
      <a class="site-header__logo" href="${u("/")}" aria-label="${brand.name}, inicio">${logo()}</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu" data-nav-toggle>
        <span class="nav-toggle__text" data-nav-label>Menú</span>
        <span class="nav-toggle__icon" aria-hidden="true"><i></i><i></i></span>
      </button>
      <nav id="menu" class="site-nav" aria-label="Principal" data-nav>
        <ul>
          ${navigation.map(
            (item) => html`<li><a href="${u(item.href)}"${isCurrent(item.href) ? raw(' aria-current="page"') : ""}><span>${item.label}</span></a></li>`
          )}
        </ul>
      </nav>
    </div>
  </header>`;
}

function siteFooter({ closing }) {
  const c = contact.closing;
  return html`<footer class="site-footer">
    ${closing
      ? html`<section class="closing theme-ink" aria-labelledby="closing-title">
          <div class="wrap closing__grid">
            ${label(c.eyebrow, "", { className: "closing__label" })}
            <h2 class="closing__title" id="closing-title">
              ${c.title.map((line) => html`<span class="closing__line">${line}</span>`)}
              <span class="closing__line closing__line--serif">${c.accent}</span>
            </h2>
            <div class="closing__actions">
              ${button({ href: c.cta.href, label: c.cta.label, variant: "light" })}
              <p class="closing__mail">${emailLink()}</p>
            </div>
          </div>
        </section>`
      : ""}
    <div class="footer-bar theme-ink">
      <div class="wrap footer-bar__grid">
        <p class="footer-bar__brand">${logo()} <span class="footer-bar__desc">${brand.descriptor}</span></p>
        <nav class="footer-bar__nav" aria-label="Pie de página">
          <ul>${navigation.map((item) => html`<li><a href="${u(item.href)}">${item.label}</a></li>`)}</ul>
        </nav>
        ${socialList({ className: "footer-bar__socials" })}
        <p class="footer-bar__legal">© ${brand.year} ${brand.name}. <a href="#top" class="footer-bar__top" data-top>Volver arriba <span aria-hidden="true">↑</span></a></p>
      </div>
    </div>
  </footer>`;
}

export function layout({
  path,
  title,
  description,
  children,
  headerTheme = "paper",
  closing = true,
  noindex = false,
  ogType = "website",
  absoluteTitle = false,
}) {
  const fullTitle = pageTitle(title, { absolute: absoluteTitle });
  const url = abs(path);
  const ogImage = brand.ogImage && brand.siteUrl ? abs(brand.ogImage) : null;

  return html`<!doctype html>
<html lang="${brand.lang}" class="no-js" id="top">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="${brand.themeColor}">
  ${noindex ? raw('<meta name="robots" content="noindex, nofollow">') : ""}
  ${url ? raw(`<link rel="canonical" href="${url}">`) : ""}
  <meta property="og:site_name" content="${brand.name}">
  <meta property="og:locale" content="${brand.locale}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  ${url ? raw(`<meta property="og:url" content="${url}">`) : ""}
  ${ogImage ? raw(`<meta property="og:image" content="${ogImage}">`) : ""}
  <meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}">
  <link rel="icon" href="${u("/favicon.svg")}" type="image/svg+xml">
  <link rel="preload" href="${u("/fonts/inter-display-500.woff")}" as="font" type="font/woff" crossorigin>
  <link rel="preload" href="${u("/fonts/serif-italic-var.woff")}" as="font" type="font/woff" crossorigin>
  <link rel="stylesheet" href="${u("/assets/site.css")}?v=${assets.cssVersion}">
  <script>document.documentElement.className="js"</script>
</head>
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${siteHeader({ theme: headerTheme, path })}
  <main id="contenido" tabindex="-1">
    ${children}
  </main>
  ${siteFooter({ closing })}
  <script src="${u("/assets/site.js")}?v=${assets.jsVersion}" defer></script>
</body>
</html>
`;
}
