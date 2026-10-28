import { html } from "../../lib/html.mjs";
import { button, label } from "../components.mjs";

export function notFoundPage() {
  return {
    path: "/404.html",
    title: "Página no encontrada",
    description: "La página que buscas no existe.",
    headerTheme: "paper",
    closing: false,
    noindex: true,
    children: html`<section class="page-head theme-paper" aria-labelledby="page-title">
      <div class="wrap">
        ${label("404", "")}
        <h1 class="page-head__title" id="page-title"><span class="page-head__line">Esta página</span> <span class="page-head__line page-head__line--serif">no tiene porqué.</span></h1>
        <p class="page-head__intro">No existe o ha cambiado de sitio. Vuelve al inicio o entra directamente a los proyectos.</p>
        <p class="notfound__actions">${button({ href: "/", label: "Ir al inicio" })} ${button({ href: "/proyectos/", label: "Ver proyectos", variant: "ghost" })}</p>
      </div>
    </section>`,
  };
}
