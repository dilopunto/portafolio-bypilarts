import { html, pad2 } from "../../lib/html.mjs";
import { contact } from "../ctx.mjs";
import { label, emailLink, socialList, button } from "../components.mjs";
import { mailtoHref } from "../ctx.mjs";

export function contactPage() {
  const href = mailtoHref();
  const children = html`
    <section class="contact theme-ink" aria-labelledby="page-title">
      <div class="wrap contact__grid">
        <div class="contact__head">
          ${label(contact.eyebrow, "")}
          <h1 class="contact__title" id="page-title">
            <span class="contact__line">${contact.title[0]}</span>
            <span class="contact__line contact__line--serif">${contact.title[1]}</span>
          </h1>
          <p class="contact__intro">${contact.intro}</p>
        </div>

        <div class="contact__main">
          <p class="contact__email">${emailLink({ big: true })}</p>
          ${href ? html`<p>${button({ href, label: "Escribirme", variant: "light" })}</p>` : ""}
        </div>

        <ol class="prompts" aria-label="Para tu primer mensaje">
          ${contact.prompts.map((q, i) => html`<li class="prompt"><span class="prompt__n" aria-hidden="true">${pad2(i + 1)}</span><span class="prompt__q serif">${q}</span></li>`)}
        </ol>

        <div class="contact__socials">
          ${label("Redes", "")}
          ${socialList()}
        </div>
      </div>
    </section>
  `;

  return {
    path: "/conectemos/",
    title: contact.seo.title,
    description: contact.seo.description,
    headerTheme: "ink",
    closing: false,
    children,
  };
}
