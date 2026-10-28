// Componentes reutilizables.
import { html, raw, attr, pad2 } from "../lib/html.mjs";
import { imageInfo, srcsetFor } from "../lib/images.mjs";
import { brand, contact, disciplineById, u, mailtoHref } from "./ctx.mjs";

// ── Logotipo ────────────────────────────────────────────────
export function logo({ variant = "full" } = {}) {
  if (variant === "mono") {
    return html`<span class="logo logo--mono" aria-hidden="true"><span class="logo__letter">${brand.name.charAt(0)}</span><span class="logo__dot"></span></span>`;
  }
  return html`<span class="logo"><span class="logo__name">${brand.name}</span><span class="logo__dot" aria-hidden="true"></span></span>`;
}

// ── Botones y enlaces ───────────────────────────────────────
export function button({ href, label, variant = "solid", arrow = true, attrs = "" }) {
  return html`<a class="btn btn--${variant}" href="${u(href)}"${raw(attrs)}><span class="btn__label">${label}</span>${arrow ? html`<span class="btn__arrow" aria-hidden="true">→</span>` : ""}</a>`;
}

export function textLink({ href, label, external = false }) {
  const ext = external ? raw(' target="_blank" rel="noopener noreferrer"') : "";
  return html`<a class="tlink" href="${u(href)}"${ext}><span>${label}</span><span class="tlink__arrow" aria-hidden="true">${external ? "↗" : "→"}</span></a>`;
}

// ── Etiquetas editoriales ───────────────────────────────────
export function label(num, text, { as = "p", className = "" } = {}) {
  const n = num === null || num === undefined ? "" : html`<span class="label__num">(${num})</span>`;
  const t = text ? html`<span class="label__text">${text}</span>` : "";
  return raw(`<${as} class="label ${className}">${html`${n}${t}`}</${as}>`);
}

export function tags(ids = [], { className = "" } = {}) {
  const items = ids.map((id) => disciplineById[id]).filter(Boolean);
  if (!items.length) return "";
  return html`<ul class="tags ${className}" aria-label="Disciplinas">${items.map((d) => html`<li class="tag">${d.label}</li>`)}</ul>`;
}

export function provisionalBadge(text = "Provisional") {
  return html`<span class="badge">${text}</span>`;
}

// ── Datos pendientes ────────────────────────────────────────
export function pending(text, { big = false } = {}) {
  return html`<span class="pending${big ? " pending--big" : ""}" title="Dato pendiente de completar en content/contact.mjs">${text} <span class="pending__tag">pendiente</span></span>`;
}

// ── Imagen / marcador provisional ───────────────────────────
const KIND_LABEL = {
  foto: "Foto provisional",
  video: "Vídeo provisional",
  grafico: "Pieza provisional",
};

const cssRatio = (r) => String(r || "4/3").replace(":", "/").replace(/\s+/g, "");
const prettyRatio = (r) => cssRatio(r).replace("/", ":");

export function media(m, { sizes = "(min-width: 900px) 50vw, 100vw", priority = false, className = "", caption = true } = {}) {
  const capHtml = caption && m.caption ? html`<figcaption class="media__cap">${m.caption}</figcaption>` : "";

  if (m.src) {
    const info = imageInfo(m.src);
    const ratio = m.ratio ? cssRatio(m.ratio) : info.width && info.height ? `${info.width}/${info.height}` : "4/3";
    const srcset = srcsetFor(m.src);
    const srcsetAttr = srcset
      ? srcset.split(", ").map((s) => { const [p, w] = s.split(" "); return `${u(p)} ${w}`; }).join(", ")
      : "";
    return html`<figure class="media ${className}">
      <div class="media__box" style="--ratio:${ratio}">
        <img src="${u(m.src)}"${attr("srcset", srcsetAttr)}${attr("sizes", srcset ? sizes : "")} alt="${m.alt || ""}"${attr("width", info.width)}${attr("height", info.height)} loading="${priority ? "eager" : "lazy"}" decoding="async"${attr("fetchpriority", priority ? "high" : "")}>
      </div>
      ${capHtml}
    </figure>`;
  }

  const tone = m.tone || "lila";
  const tag = m.label || KIND_LABEL[m.kind] || "Imagen provisional";
  return html`<figure class="media media--ph tone-${tone} ${className}">
    <div class="media__box" style="--ratio:${cssRatio(m.ratio)}">
      <div class="ph" role="img" aria-label="${tag}: ${m.alt || "sin descripción"}">
        <span class="ph__tag">${tag}</span>
        <span class="ph__ratio" aria-hidden="true">${prettyRatio(m.ratio)}</span>
      </div>
    </div>
    ${capHtml}
  </figure>`;
}

// ── Vídeo ───────────────────────────────────────────────────
export function video(b) {
  const ratio = cssRatio(b.ratio || "16/9");
  const title = b.title || "Vídeo";

  if (b.provider === "file" && b.src) {
    return html`<div class="video" style="--ratio:${ratio}">
      <video controls preload="none" playsinline${attr("poster", b.poster ? u(b.poster) : "")} aria-label="${title}">
        <source src="${u(b.src)}" type="video/mp4">
      </video>
    </div>`;
  }

  if ((b.provider === "vimeo" || b.provider === "youtube") && b.id) {
    const watch = b.provider === "vimeo" ? `https://vimeo.com/${b.id}` : `https://www.youtube.com/watch?v=${b.id}`;
    const poster = b.poster
      ? media({ ...b.poster, alt: b.poster.alt || title }, { sizes: "100vw", caption: false })
      : media({ alt: title, ratio, tone: "tinta", kind: "video" }, { caption: false });
    return html`<div class="video" data-video data-provider="${b.provider}" data-id="${b.id}" data-title="${title}" style="--ratio:${ratio}">
      <button type="button" class="video__play" aria-label="Reproducir vídeo: ${title}">
        ${poster}
        <span class="video__cta"><span class="video__disc" aria-hidden="true"></span><span>Reproducir</span></span>
      </button>
      <noscript><a class="tlink" href="${watch}" target="_blank" rel="noopener noreferrer">Ver el vídeo: ${title}</a></noscript>
    </div>`;
  }

  // Sin id ni archivo: marcador provisional.
  return html`<div class="video video--ph">${media({ alt: title, ratio, tone: "tinta", kind: "video" }, { sizes: "100vw", caption: false })}</div>`;
}

// ── Contacto (correo y redes) ───────────────────────────────
export function emailLink({ big = false } = {}) {
  const href = mailtoHref();
  if (!href) return pending("Tu correo profesional", { big });
  return html`<a class="email${big ? " email--big" : ""}" href="${href}">${contact.email}</a>`;
}

export function socialList({ className = "" } = {}) {
  return html`<ul class="socials ${className}">${contact.socials.map((s) => {
    if (!s.url) return html`<li>${pending(s.label)}</li>`;
    return html`<li><a class="tlink" href="${s.url}" target="_blank" rel="noopener noreferrer"><span>${s.label}${s.handle ? html` <span class="socials__handle">${s.handle}</span>` : ""}</span><span class="tlink__arrow" aria-hidden="true">↗</span></a></li>`;
  })}</ul>`;
}

export { pad2 };
