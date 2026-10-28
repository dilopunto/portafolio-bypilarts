import { html } from "../../lib/html.mjs";
import { home, about, projects, disciplines, brand, projectUrl } from "../ctx.mjs";
import { button, textLink, label, media } from "../components.mjs";
import { projectList } from "../projects.mjs";

export function homePage() {
  const h = home.hero;
  const p = home.process;
  const firstProject = projects[p.link.slug] || projects[0];
  const featured = projects.slice(0, home.projects.limit);

  const children = html`
    <section class="hero theme-ink" aria-labelledby="hero-title" data-hero>
      <div class="wrap hero__grid">
        <div class="hero__masthead">
          ${label(`${h.eyebrow} — ${brand.year}`, "")}
          ${h.philosophyTag ? html`<p class="label hero__phil"><span class="hero__phil-dot" aria-hidden="true"></span>${brand.philosophy}</p>` : ""}
          <p class="label hero__disc">${h.disciplinesLine}</p>
        </div>

        <div class="hero__intro">
          <p class="hero__lead">${h.intro}</p>
          <div class="hero__actions">
            ${button({ href: h.cta.href, label: h.cta.label, variant: "light" })}
            ${textLink({ href: h.secondary.href, label: h.secondary.label })}
          </div>
        </div>

        <div class="hero__collage" data-parallax>
          ${h.collage.map(
            (m, i) => html`<div class="hero__frame hero__frame--${"abc"[i]}" data-depth="${i + 1}">${media(m, { sizes: "(min-width: 900px) 22vw, 60vw", priority: i === 0, caption: false })}</div>`
          )}
          ${h.collageNote ? html`<p class="hero__note note">(${h.collageNote})</p>` : ""}
        </div>

        <h1 class="hero__title" id="hero-title">
          ${h.lines.map((l) => html`<span class="hero__line${l.style === "serif" ? " hero__line--serif" : ""}">${l.text}</span> `)}
        </h1>
      </div>
    </section>

    <section class="process theme-lilac" aria-labelledby="process-title">
      <div class="wrap">
        <div class="process__head">
          ${label(p.eyebrow, "")}
          <h2 class="process__title" id="process-title">
            <span class="process__line">${p.title[0]}</span>
            <span class="process__line process__line--serif">${p.title[1]}</span>
          </h2>
          <p class="process__text">${p.text}</p>
        </div>
        <ol class="thread">
          ${p.steps.map(
            (s) => html`<li class="thread__step">
              <span class="thread__node" aria-hidden="true"></span>
              <span class="thread__num" aria-hidden="true">${s.num}</span>
              <h3 class="thread__title">${s.title}</h3>
              <p class="thread__text">${s.text}</p>
            </li>`
          )}
        </ol>
        <p class="process__link">${textLink({ href: projectUrl(firstProject), label: p.link.label })}</p>
      </div>
    </section>

    <section class="work theme-paper" aria-labelledby="work-title">
      <div class="wrap">
        <div class="section-head">
          ${label(home.projects.eyebrow, "")}
          <h2 class="section-head__title" id="work-title">${home.projects.title}</h2>
          <p class="section-head__intro">${home.projects.intro}</p>
        </div>
        ${projectList(featured)}
        <p class="work__all">${textLink({ href: home.projects.all.href, label: home.projects.all.label })}</p>
      </div>
    </section>

    <section class="chain theme-soft" aria-labelledby="chain-title">
      <div class="wrap">
        <div class="section-head section-head--row">
          <div>
            ${label(home.disciplines.eyebrow, "")}
            <h2 class="section-head__title" id="chain-title">${home.disciplines.title[0]} <span class="serif">${home.disciplines.title[1]}</span></h2>
          </div>
          <p class="section-head__link">${textLink({ href: home.disciplines.link.href, label: home.disciplines.link.label })}</p>
        </div>
        <ol class="chain__list">
          ${disciplines.map(
            (d, i) => html`<li class="chain__item">
              <span class="chain__n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
              <span class="chain__stage">${d.stage}</span>
              <h3 class="chain__name">${d.label}</h3>
              <p class="chain__q">${d.question}</p>
            </li>`
          )}
        </ol>
      </div>
    </section>

    <section class="about-teaser theme-paper" aria-labelledby="about-teaser-title">
      <div class="wrap about-teaser__grid">
        <div class="about-teaser__photo">${media(about.photo, { sizes: "(min-width: 900px) 30vw, 70vw", caption: false })}</div>
        <div class="about-teaser__text">
          ${label(home.about.eyebrow, "")}
          <h2 class="about-teaser__statement" id="about-teaser-title">${home.about.statement}</h2>
          <p class="about-teaser__p">${home.about.text}</p>
          ${textLink({ href: home.about.link.href, label: home.about.link.label })}
        </div>
      </div>
    </section>
  `;

  return {
    path: "/",
    title: home.seo.title,
    description: home.seo.description,
    absoluteTitle: true,
    headerTheme: "ink",
    children,
  };
}
