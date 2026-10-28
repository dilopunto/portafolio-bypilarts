// Piezas de proyecto: filas del listado, filtros, bloques de la página individual.
import { html, raw, pad2 } from "../lib/html.mjs";
import { projects, disciplines, disciplineById, projectUrl, u } from "./ctx.mjs";
import { media, video, tags, label, provisionalBadge } from "./components.mjs";

const discLabels = (ids) => ids.map((id) => disciplineById[id]?.label).filter(Boolean).join(" · ");

// ── Listado tipográfico con vista previa ────────────────────
export function projectRow(p, index) {
  return html`<li class="prow" data-disciplines="${p.disciplines.join(" ")}">
    <a class="prow__link" href="${u(projectUrl(p))}" data-preview>
      <span class="prow__num">${pad2(index + 1)}</span>
      <span class="prow__main">
        <span class="prow__title">${p.title}</span>
        <span class="prow__why"><span aria-hidden="true">(</span>${p.why}<span aria-hidden="true">)</span></span>
      </span>
      <span class="prow__meta">
        ${p.provisional ? html`<span class="prow__badge">${provisionalBadge()}</span>` : ""}
        <span class="prow__disc">${discLabels(p.disciplines)}</span>
        <span class="prow__year">${p.year}</span>
      </span>
      <span class="prow__thumb" aria-hidden="true">${media(p.cover, { sizes: "200px", caption: false })}</span>
    </a>
  </li>`;
}

export function projectList(list, { filterable = false } = {}) {
  const used = disciplines.filter((d) => list.some((p) => p.disciplines.includes(d.id)));
  const count = (id) => list.filter((p) => p.disciplines.includes(id)).length;
  return html`<div class="plist-wrap" data-plist-wrap>
    ${filterable
      ? html`<div class="filters" role="group" aria-label="Filtrar proyectos por disciplina" data-filters>
          <button type="button" class="chip" data-filter="all" aria-pressed="true">Todos <span class="chip__n">${list.length}</span></button>
          ${used.map((d) => html`<button type="button" class="chip" data-filter="${d.id}" aria-pressed="false">${d.label} <span class="chip__n">${count(d.id)}</span></button>`)}
        </div>
        <p class="sr-only" role="status" aria-live="polite" data-filter-status></p>`
      : ""}
    <ol class="plist" data-plist>
      ${list.map((p, i) => projectRow(p, i))}
    </ol>
    <p class="plist__empty" data-empty hidden>No hay proyectos con esa disciplina todavía.</p>
    <div class="preview" data-preview-box aria-hidden="true"><div class="preview__media" data-preview-media></div><span class="preview__chip"><span class="preview__dot"></span>Ver proyecto</span></div>
  </div>`;
}

// ── Bloques de resultado ────────────────────────────────────
function block(b) {
  switch (b.kind) {
    case "full":
      return html`<div class="blk blk--full">${media(b.media, { sizes: "100vw" })}</div>`;

    case "pair":
      return html`<div class="blk blk--pair${b.shift ? ` is-shift-${b.shift}` : ""}">
        <div class="blk__a">${media(b.a, { sizes: "(min-width: 900px) 58vw, 100vw" })}</div>
        <div class="blk__b">${media(b.b, { sizes: "(min-width: 900px) 36vw, 100vw" })}</div>
      </div>`;

    case "trio":
      return html`<div class="blk blk--trio">${b.items.map((m) => html`<div>${media(m, { sizes: "(min-width: 900px) 30vw, 100vw" })}</div>`)}</div>`;

    case "collage":
      return html`<div class="blk blk--collage is-${b.layout || "a"}">
        ${b.items.map((m, i) => html`<div class="collage__item collage__item--${i + 1}">${media(m, { sizes: "(min-width: 900px) 40vw, 90vw" })}</div>`)}
      </div>`;

    case "video":
      return html`<div class="blk blk--video">${video(b)}</div>`;

    case "text":
      return html`<div class="blk blk--text">
        ${b.title ? html`<h3 class="blk__title">${b.title}</h3>` : ""}
        <div class="prose">${b.body.map((t) => html`<p>${t}</p>`)}</div>
      </div>`;

    case "note":
      return html`<aside class="blk blk--note"><span class="note__label">${b.label}</span><p class="note__text">${b.text}</p></aside>`;

    default:
      return "";
  }
}

export function resultBlocks(blocks = []) {
  return html`<div class="blocks">${blocks.map(block)}</div>`;
}

// ── Cabecera de proyecto (3 composiciones) ──────────────────
export function projectHeader(p, index, total) {
  const meta = html`<dl class="pmeta">
    <div><dt>Año</dt><dd>${p.year}</dd></div>
    <div><dt>Disciplinas</dt><dd>${discLabels(p.disciplines)}</dd></div>
    ${p.role ? html`<div><dt>Rol</dt><dd>${p.role}</dd></div>` : ""}
    ${p.client ? html`<div><dt>Cliente</dt><dd>${p.client}</dd></div>` : ""}
  </dl>`;

  const eyebrow = html`<div class="phead__eyebrow">
    ${label(`${pad2(index + 1)}/${pad2(total)}`, "Proyecto")}
    ${p.provisional ? provisionalBadge("Proyecto provisional") : ""}
  </div>`;

  const cover = media(p.cover, { sizes: "(min-width: 900px) 50vw, 100vw", priority: true, caption: false });
  const coverWide = media(p.cover, { sizes: "100vw", priority: true, caption: false });

  if (p.variant === "poster") {
    return html`<div class="phead__inner phead--poster wrap">
      ${eyebrow}
      <h1 class="phead__title">${p.title}</h1>
      <div class="phead__row"><p class="phead__why">${p.why}</p>${meta}</div>
      <div class="phead__cover phead__cover--wide">${coverWide}</div>
    </div>`;
  }

  if (p.variant === "stacked") {
    return html`<div class="phead__inner phead--stacked wrap">
      ${eyebrow}
      <div class="phead__top">
        <h1 class="phead__title">${p.title}</h1>
        <div class="phead__side"><p class="phead__why">${p.why}</p>${meta}</div>
      </div>
      <div class="phead__cover phead__cover--wide">${coverWide}</div>
    </div>`;
  }

  // split (por defecto)
  return html`<div class="phead__inner phead--split wrap">
    <div class="phead__text">
      ${eyebrow}
      <h1 class="phead__title">${p.title}</h1>
      <p class="phead__why">${p.why}</p>
      ${meta}
    </div>
    <div class="phead__cover">${cover}</div>
  </div>`;
}

export { raw, tags };
