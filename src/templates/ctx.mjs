// Contexto compartido: contenido cargado + utilidades de URL.
import { brand } from "../../content/brand.mjs";
import { navigation } from "../../content/navigation.mjs";
import { disciplines, disciplineById } from "../../content/disciplines.mjs";
import { services } from "../../content/services.mjs";
import { about } from "../../content/about.mjs";
import { contact } from "../../content/contact.mjs";
import { home } from "../../content/home.mjs";
import { identity } from "../../content/identity.mjs";
import { projects } from "../../content/projects/index.mjs";

export { brand, navigation, disciplines, disciplineById, services, about, contact, home, identity, projects };

// Si algún día publicas en una subcarpeta (p. ej. GitHub Pages de proyecto):
//   BASE_PATH=/mi-repo npm run build
export const BASE = (process.env.BASE_PATH || "").replace(/\/$/, "");

const EXTERNAL = /^(https?:|mailto:|tel:|#|\/\/)/;

export const u = (p) => (EXTERNAL.test(p) ? p : BASE + p);

export const siteOrigin = () => (brand.siteUrl ? brand.siteUrl.replace(/\/$/, "") : "");

export const abs = (p) => (brand.siteUrl ? siteOrigin() + BASE + p : null);

export const projectUrl = (p) => `/proyectos/${p.slug}/`;

export const toneTheme = { lila: "lilac", tinta: "ink", papel: "paper" };

export function pageTitle(title, { absolute = false } = {}) {
  if (absolute) return `${brand.name} — ${title}`;
  return `${title} — ${brand.name}`;
}

export const mailtoHref = () => {
  if (!contact.email) return null;
  const q = `subject=${encodeURIComponent(contact.mail.subject)}&body=${encodeURIComponent(contact.mail.body)}`;
  return `mailto:${contact.email}?${q}`;
};
