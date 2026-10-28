import { html, pad2 } from "../../lib/html.mjs";
import { projects, brand, projectUrl, toneTheme, u, disciplineById } from "../ctx.mjs";
import { label, textLink, provisionalBadge } from "../components.mjs";
import { projectList, projectHeader, resultBlocks } from "../projects.mjs";

// ── /proyectos/ ─────────────────────────────────────────────
export function projectsIndexPage() {
  const anyProvisional = projects.some((p) => p.provisional);
  const children = html`
    <section class="page-head theme-paper" aria-labelledby="page-title">
      <div class="wrap">
        ${label("Proyectos", "")}
        <h1 class="page-head__title" id="page-title">Proyectos</h1>
        <div class="page-head__row">
          <p class="page-head__intro">Cada proyecto se cuenta en el mismo orden: <em>el porqué</em>, las decisiones y el resultado. Filtra por disciplina o entra directamente.</p>
          ${anyProvisional
            ? html`<p class="notice"><strong>Contenido provisional.</strong> Los proyectos de abajo son ejemplos de estructura, no trabajos reales.</p>`
            : ""}
        </div>
      </div>
    </section>
    <section class="work work--index theme-paper" aria-label="Listado de proyectos">
      <div class="wrap">${projectList(projects, { filterable: true })}</div>
    </section>
  `;
  return {
    path: "/proyectos/",
    title: "Proyectos",
    description: `Proyectos de ${brand.name}: fotografía, vídeo, dirección creativa, branding y diseño gráfico, contados desde su porqué hasta su resultado.`,
    headerTheme: "paper",
    children,
  };
}

// ── /proyectos/<slug>/ ──────────────────────────────────────
export function projectPage(p, index) {
  const total = projects.length;
  const next = projects[(index + 1) % total];
  const theme = toneTheme[p.tone] || "paper";

  const hasDecisions = Array.isArray(p.decisions) && p.decisions.length > 0;
  const hasResult = p.result && Array.isArray(p.result.blocks) && p.result.blocks.length > 0;

  const sections = [{ id: "porque", name: "Porqué" }];
  if (hasDecisions) sections.push({ id: "decisiones", name: "Decisiones" });
  if (hasResult) sections.push({ id: "resultado", name: "Resultado" });
  const num = (id) => pad2(sections.findIndex((s) => s.id === id) + 1);

  const thread = html`<nav class="pthread theme-paper" aria-label="En este proyecto">
    <div class="wrap">
      <ol class="pthread__list">
        ${sections.map((s, i) => html`<li class="pthread__item"><span class="pthread__node" aria-hidden="true"></span><a href="#${s.id}"><span class="pthread__n">(${pad2(i + 1)})</span> ${s.name}</a></li>`)}
      </ol>
    </div>
  </nav>`;

  const porque = html`<section class="psec psec--why theme-paper" id="porque" aria-labelledby="porque-t">
    <div class="wrap psec__grid">
      <div class="psec__head">${label(num("porque"), "Intención")}<h2 class="psec__title" id="porque-t">El porqué</h2></div>
      <div class="psec__body">
        <p class="lead">${p.summary}</p>
        ${p.intention?.length ? html`<div class="prose">${p.intention.map((t) => html`<p>${t}</p>`)}</div>` : ""}
        ${p.concept
          ? html`<aside class="concept"><p class="concept__label">Concepto creativo</p><h3 class="concept__title">${p.concept.title}</h3><div class="prose">${p.concept.body.map((t) => html`<p>${t}</p>`)}</div></aside>`
          : ""}
      </div>
    </div>
  </section>`;

  const decisiones = hasDecisions
    ? html`<section class="psec psec--decisions theme-soft" id="decisiones" aria-labelledby="decisiones-t">
        <div class="wrap psec__grid">
          <div class="psec__head">${label(num("decisiones"), "Proceso")}<h2 class="psec__title" id="decisiones-t">Las decisiones</h2></div>
          <ol class="decisions">
            ${p.decisions.map(
              (d, i) => html`<li class="decision">
                <span class="decision__dot" aria-hidden="true"></span>
                <span class="decision__n">${num("decisiones")}.${i + 1}</span>
                <h3 class="decision__title">${d.title}</h3>
                <p class="decision__text">${d.text}</p>
              </li>`
            )}
          </ol>
        </div>
      </section>`
    : "";

  const resultado = hasResult
    ? html`<section class="psec psec--result theme-ink" id="resultado" aria-labelledby="resultado-t">
        <div class="wrap">
          <div class="psec__grid psec__grid--result">
            <div class="psec__head">${label(num("resultado"), "Pieza final")}<h2 class="psec__title" id="resultado-t">El resultado</h2></div>
            ${p.result.intro ? html`<p class="psec__intro serif">${p.result.intro}</p>` : ""}
          </div>
          ${resultBlocks(p.result.blocks)}
        </div>
      </section>`
    : "";

  const nextBand =
    total > 1
      ? html`<section class="pnext theme-lilac" aria-labelledby="pnext-t">
          <div class="wrap">
            ${label("Siguiente proyecto", "")}
            <h2 class="sr-only" id="pnext-t">Siguiente proyecto</h2>
            <a class="pnext__link" href="${u(projectUrl(next))}">
              <span class="pnext__title">${next.title}</span>
              <span class="pnext__arrow" aria-hidden="true">→</span>
            </a>
            <p class="pnext__all">${textLink({ href: "/proyectos/", label: "Ver todos los proyectos" })}</p>
          </div>
        </section>`
      : "";

  const children = html`<article class="project">
    <header class="phead theme-${theme}">${projectHeader(p, index, total)}</header>
    ${thread}
    ${porque}
    ${decisiones}
    ${resultado}
    ${nextBand}
  </article>`;

  return {
    path: projectUrl(p),
    title: p.title,
    description: p.seo?.description || p.summary,
    headerTheme: theme === "lilac" ? "lilac" : theme,
    ogType: "article",
    children,
  };
}

export { provisionalBadge, disciplineById };
