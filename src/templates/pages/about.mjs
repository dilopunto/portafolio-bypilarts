import { html, pad2 } from "../../lib/html.mjs";
import { about } from "../ctx.mjs";
import { label, media } from "../components.mjs";

export function aboutPage() {
  const children = html`
    <section class="about theme-paper" aria-labelledby="page-title">
      <div class="wrap about__grid">
        <div class="about__head">
          ${label(about.eyebrow, "")}
          <h1 class="page-head__title" id="page-title">
            <span class="page-head__line">${about.title[0]}</span>
            <span class="page-head__line page-head__line--serif">${about.title[1]}</span>
          </h1>
        </div>
        <div class="about__photo">${media(about.photo, { sizes: "(min-width: 900px) 34vw, 80vw", priority: true, caption: false })}</div>
        <div class="about__text">
          <p class="lead">${about.lead}</p>
          <div class="prose">${about.body.map((t) => html`<p>${t}</p>`)}</div>
          <dl class="facts">
            ${about.facts.map((f) => html`<div class="facts__row"><dt>${f.label}</dt><dd>${f.value}</dd></div>`)}
          </dl>
        </div>
      </div>
    </section>

    <section class="principles theme-ink" aria-labelledby="principles-t">
      <div class="wrap">
        <div class="section-head">
          ${label("Principios", "")}
          <h2 class="section-head__title" id="principles-t">${about.principlesTitle}</h2>
        </div>
        <ol class="principles__list">
          ${about.principles.map(
            (p, i) => html`<li class="principle"><span class="principle__n" aria-hidden="true">${pad2(i + 1)}</span><h3 class="principle__title">${p.title}</h3><p class="principle__text">${p.text}</p></li>`
          )}
        </ol>
      </div>
    </section>
  `;

  return {
    path: "/sobre-mi/",
    title: about.seo.title,
    description: about.seo.description,
    headerTheme: "paper",
    children,
  };
}
