// ─────────────────────────────────────────────────────────────
//  MARCA — todo lo que cambia si cambia el nombre o la firma
// ─────────────────────────────────────────────────────────────
//  Distinguimos tres funciones (no las mezcles):
//   · name        → NOMBRE DE MARCA (lo que firma el trabajo)
//   · descriptor  → DESCRIPTOR PROFESIONAL (qué haces, en pocas palabras)
//   · philosophy  → FILOSOFÍA (no es un eslogan: se usa con cuentagotas)
//
//  Para cambiar el nombre basta con editar `name`: el logotipo, los títulos,
//  el pie de página y los metadatos se actualizan solos.
// ─────────────────────────────────────────────────────────────

export const brand = {
  // Nombre artístico, tal como aparece en su perfil: @bypilarts.
  // (Disponibilidad de dominio y marca SIN comprobar: ver /identidad/.)
  name: "Bypilarts",

  // Firma personal: aparece en "Sobre mí" y en los textos en primera persona.
  person: "Pilar",

  // Descriptor profesional.
  descriptor: "Dirección creativa, fotografía y vídeo",

  // Filosofía de trabajo.
  philosophy: "Proyectos con alma",

  // Ciudad (de la bio pública de Instagram).
  location: "Barcelona",

  // Año que se muestra en la portada y en el pie.
  year: 2026,

  // Dominio definitivo, SIN barra final. Ej.: "https://www.tudominio.com"
  // Mientras esté vacío no se generan canonical, sitemap ni URLs absolutas.
  // También puede definirse al compilar:  SITE_URL=https://tudominio.com npm run build
  siteUrl: process.env.SITE_URL || "",

  // Imagen para compartir en redes (1200×630). Ruta dentro de /public. Ej.: "/og.jpg"
  ogImage: "",

  locale: "es_ES",
  lang: "es",

  // Color de la barra del navegador en móvil.
  themeColor: "#5E4B8B",
};
