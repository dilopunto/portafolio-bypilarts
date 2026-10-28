import { html, pad2 } from "../../lib/html.mjs";
import { services, disciplines } from "../ctx.mjs";
import { button, label } from "../components.mjs";

export function servicesPage() {
  const children = html`
    <section class="page-head theme-paper" aria-labelledby="page-title">
      <div class="wrap">
        ${label(services.eyebrow, "")}
        <h1 class="page-head__title" id="page-title">
          <span class="page-head__line">${services.title[0]}</span>
          <span class="page-head__line page-head__line--serif">${services.title[1]}</span>
        </h1>
        <div class="page-head__row"><p class="page-head__intro">${services.intro}</p></div>
      </div>
    </section>

    ${disciplines.map(
      (d, i) => html`<section class="svc ${i % 2 === 0 ? "theme-paper" : "theme-soft"}" id="${d.id}" aria-labelledby="${d.id}-t">
        <div class="wrap svc__grid">
          <p class="svc__num" aria-hidden="true">${pad2(i + 1)}</p>
          <div class="svc__main">
            <p class="svc__stage label"><span class="label__text">${d.stage}</span></p>
            <h2 class="svc__name" id="${d.id}-t">${d.fullName}</h2>
            <p class="svc__headline serif">${d.headline}</p>
          </div>
          <div class="svc__side">
            <p class="svc__text">${d.text}</p>
            <p class="svc__q"><span class="svc__q-label">La pregunta</span> <span class="serif">${d.question}</span></p>
            <p class="svc__connects">${d.connects}</p>
          </div>
        </div>
      </section>`
    )}

    <section class="chain chain--how theme-lilac" aria-labelledby="how-t">
      <div class="wrap">
        <div class="section-head">
          ${label("Recorrido", "")}
          <h2 class="section-head__title" id="how-t">${services.howTitle}</h2>
        </div>
        <ol class="chain__list">
          ${disciplines.map(
            (d, i) => html`<li class="chain__item"><span class="chain__n" aria-hidden="true">${pad2(i + 1)}</span><span class="chain__stage">${d.stage}</span><h3 class="chain__name">${d.label}</h3></li>`
          )}
        </ol>
        <div class="how__text prose">${services.howText.map((t) => html`<p>${t}</p>`)}</div>
        <p class="how__cta">${button({ href: services.cta.href, label: services.cta.label, variant: "solid" })}</p>
      </div>
    </section>
  `;

  return {
    path: "/servicios/",
    title: services.seo.title,
    description: services.seo.description,
    headerTheme: "paper",
    children,
  };
}
