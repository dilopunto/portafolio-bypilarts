// /identidad/ — hoja interna de identidad (noindex). Para revisar y decidir; no es parte del recorrido público.
import { html, pad2 } from "../../lib/html.mjs";
import { brand, identity } from "../ctx.mjs";
import { logo, label } from "../components.mjs";
import { resolved, textPairs, avoid, derived } from "../../lib/palette.mjs";

const fmt = (n) => n.toFixed(2).replace(".", ",") + ":1";

function mixBar(mix) {
  return html`<div class="mixbar" role="img" aria-label="Claros ${mix.claro}%, lila ${mix.lila}%, oscuro ${mix.oscuro}%">
    <span style="flex:${mix.claro};background:var(--papel)"></span>
    <span style="flex:${mix.lila};background:var(--lila)"></span>
    <span style="flex:${mix.oscuro};background:var(--tinta)"></span>
  </div>
  <p class="mixbar__legend">Claros ${mix.claro}% · Lila ${mix.lila}% · Oscuro ${mix.oscuro}%</p>`;
}

export function identityPage() {
  const c = resolved();
  const pairs = textPairs();
  const avoidRatio = avoid.ratio();

  const children = html`
    <section class="page-head theme-paper" aria-labelledby="page-title">
      <div class="wrap">
        ${label("Interno", "Hoja de identidad")}
        <h1 class="page-head__title" id="page-title">Identidad de ${brand.name}</h1>
        <p class="page-head__intro">Naming, logotipo, color y tipografía de esta primera versión. Esta página no aparece en el menú, ni en el sitemap, ni se indexa: es para decidir.</p>
      </div>
    </section>

    <section class="id-sec theme-paper" aria-labelledby="id-naming">
      <div class="wrap">
        <div class="section-head">${label("01", "Naming")}<h2 class="section-head__title" id="id-naming">Tres direcciones</h2><p class="section-head__intro">${identity.naming.intro}</p></div>
        <dl class="id-functions">
          ${identity.naming.functions.map((f) => html`<div><dt>${f.term}</dt><dd>${f.def}</dd></div>`)}
        </dl>
        <div class="id-cards">
          ${identity.naming.directions.map(
            (d) => html`<article class="id-card">
              <p class="id-card__id" aria-hidden="true">${d.id}</p>
              <h3 class="id-card__title">${d.title}</h3>
              <p><strong>Posicionamiento.</strong> ${d.positioning}</p>
              <p><strong>Personalidad.</strong> ${d.personality}</p>
              <p class="id-card__h">Ventajas</p>
              <ul>${d.pros.map((t) => html`<li>${t}</li>`)}</ul>
              <p class="id-card__h">Limitaciones</p>
              <ul>${d.cons.map((t) => html`<li>${t}</li>`)}</ul>
              <p class="id-card__h">Nombres</p>
              <ul>${d.names.map((t) => html`<li>${t}</li>`)}</ul>
            </article>`
          )}
        </div>
        <div class="id-reco theme-lilac">
          <h3>${identity.naming.recommendation.title}</h3>
          <p>${identity.naming.recommendation.text}</p>
          <p class="note">${identity.naming.recommendation.note}</p>
        </div>
        <div class="id-verify">
          <h3>${identity.naming.verification.title}</h3>
          <p>${identity.naming.verification.done}</p>
          <ul>${identity.naming.verification.todo.map((t) => html`<li>${t}</li>`)}</ul>
        </div>
      </div>
    </section>

    <section class="id-sec theme-soft" aria-labelledby="id-logo">
      <div class="wrap">
        <div class="section-head">${label("02", "Logotipo")}<h2 class="section-head__title" id="id-logo">Identidad tipográfica</h2><p class="section-head__intro">${identity.logo.intro}</p></div>
        <div class="logo-board">
          <div class="logo-board__cell theme-paper"><span class="logo-board__big">${logo()}</span><span class="logo-board__cap">Principal · sobre papel</span></div>
          <div class="logo-board__cell theme-ink"><span class="logo-board__big">${logo()}</span><span class="logo-board__cap">Principal · sobre tinta</span></div>
          <div class="logo-board__cell theme-lilac"><span class="logo-board__big">${logo()}</span><span class="logo-board__cap">Principal · sobre lila</span></div>
          <div class="logo-board__cell theme-paper"><span class="logo-board__avatar">${logo({ variant: "mono" })}</span><span class="logo-board__cap">Reducida · avatar de redes</span></div>
          <div class="logo-board__cell theme-paper"><span class="logo-board__small">${logo()}</span><span class="logo-board__cap">Tamaño de cabecera</span></div>
          <div class="logo-board__cell theme-ink"><span class="logo-board__stamp"><span>${brand.philosophy}</span></span><span class="logo-board__cap">Sello (uso puntual en materiales)</span></div>
        </div>
        <ul class="id-rules">${identity.logo.rules.map((t) => html`<li>${t}</li>`)}</ul>
      </div>
    </section>

    <section class="id-sec theme-paper" aria-labelledby="id-color">
      <div class="wrap">
        <div class="section-head">${label("03", "Color")}<h2 class="section-head__title" id="id-color">Sistema cromático</h2><p class="section-head__intro">${identity.color.intro}</p></div>
        <div class="swatches">
          ${identity.color.roles.map(
            (r) => html`<div class="swatch"><span class="swatch__chip" style="background:${r.hex}"></span><p class="swatch__name">${r.name}</p><p class="swatch__hex">${r.hex} · <code>${r.token}</code></p><p class="swatch__role">${r.role}</p></div>`
          )}
        </div>
        <h3 class="id-sub">Mezclas derivadas (no son colores nuevos)</h3>
        <div class="swatches swatches--small">
          ${Object.entries(derived).map(
            ([name, d]) => html`<div class="swatch"><span class="swatch__chip" style="background:${c[name]}"></span><p class="swatch__name"><code>--${name}</code></p><p class="swatch__hex">${c[name]} · ${d.pct}% ${d.a} + ${100 - d.pct}% ${d.b}</p><p class="swatch__role">${d.use}</p></div>`
          )}
        </div>
        <h3 class="id-sub">Proporciones exploradas</h3>
        <div class="mixes">
          ${identity.color.options.map((o) => html`<div class="mix"><h4>${o.name}</h4>${mixBar(o.mix)}<p>${o.text}</p></div>`)}
        </div>
        <h3 class="id-sub">Contraste (WCAG 2.x, calculado al compilar)</h3>
        <table class="contrast">
          <thead><tr><th scope="col">Uso</th><th scope="col">Muestra</th><th scope="col">Ratio</th><th scope="col">Mínimo</th><th scope="col">Resultado</th></tr></thead>
          <tbody>
            ${pairs.map(
              (p) => html`<tr>
                <th scope="row">${p.label}</th>
                <td><span class="contrast__sample" style="color:${p.fgHex};background:${p.bgHex}">Aa porqué</span></td>
                <td>${fmt(p.ratio)}</td><td>${fmt(p.min)}</td>
                <td class="${p.ratio >= p.min ? "ok" : "ko"}">${p.ratio >= p.min ? "Cumple" : "No cumple"}</td>
              </tr>`
            )}
          </tbody>
        </table>
        <p class="id-warn"><strong>Evitar:</strong> lila medio (#9C88C2) como texto sobre papel (${fmt(avoidRatio)}). No cumple ni siquiera para texto grande, por eso el lila medio solo se usa como detalle gráfico, nunca para texto. El lila #C7B3E0 es un campo de color con texto en tinta profunda.</p>
      </div>
    </section>

    <section class="id-sec theme-ink" aria-labelledby="id-type">
      <div class="wrap">
        <div class="section-head">${label("04", "Tipografía")}<h2 class="section-head__title" id="id-type">Sistema tipográfico</h2><p class="section-head__intro">${identity.type.intro}</p></div>
        <div class="specimens">
          <div class="specimen"><p class="label">Titulares · Inter Display 500</p><p class="specimen__display">Nada existe</p></div>
          <div class="specimen"><p class="label">Porqués y énfasis · serif cursiva</p><p class="specimen__serif">porque sí.</p></div>
          <div class="specimen"><p class="label">Texto · Inter 400</p><p class="specimen__text">Cada proyecto parte de una intención, una idea o una necesidad. Las decisiones visuales, narrativas y estéticas responden a un propósito.</p></div>
        </div>
        <ul class="families">
          ${identity.type.families.map((f) => html`<li><strong>${f.role}</strong> — ${f.name}. <span class="families__why">${f.why}</span> <em>Licencia: ${f.license}.</em></li>`)}
        </ul>
        <p>${identity.type.note}</p>
        <p class="id-warn id-warn--ink">${identity.type.upgrade}</p>
      </div>
    </section>

    <section class="id-sec theme-paper" aria-labelledby="id-graphic">
      <div class="wrap">
        <div class="section-head">${label("05", "Sistema gráfico")}<h2 class="section-head__title" id="id-graphic">Cómo se ve «${brand.philosophy}»</h2><p class="section-head__intro">${identity.graphic.intro}</p></div>
        <ol class="id-graphic">
          ${identity.graphic.items.map((g, i) => html`<li><span class="id-graphic__n" aria-hidden="true">${pad2(i + 1)}</span><h3>${g.title}</h3><p>${g.text}</p></li>`)}
        </ol>
      </div>
    </section>
  `;

  return {
    path: "/identidad/",
    title: "Identidad",
    description: "Hoja interna de identidad: naming, logotipo, color y tipografía.",
    headerTheme: "paper",
    closing: false,
    noindex: true,
    children,
  };
}
