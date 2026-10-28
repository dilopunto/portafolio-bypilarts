// ─────────────────────────────────────────────────────────────
//  PLANTILLA DE PROYECTO — cópiala, renómbrala y rellénala
// ─────────────────────────────────────────────────────────────
//  CÓMO AÑADIR UN PROYECTO NUEVO
//   1. Copia este archivo → content/projects/mi-proyecto.mjs  (el nombre da igual)
//   2. Cambia `slug` (será la URL: /proyectos/mi-proyecto/) y rellena los campos.
//   3. Pon tus imágenes en  public/projects/mi-proyecto/  y referencia con "/projects/mi-proyecto/portada.jpg"
//   4. Regístralo en content/projects/index.mjs (añade el import y ponlo en la lista).
//   5. npm run build   (o npm run dev, que lo hace solo)
//
//  Los proyectos con `provisional: true` muestran la etiqueta «Provisional».
//  Cuando el proyecto sea real, borra esa línea.
//
//  QUÉ ES OBLIGATORIO: slug, title, year, disciplines, cover, summary, why.
//  El resto es opcional: si no lo pones, esa parte simplemente no aparece.
//
//  IMÁGENES: cada imagen es un objeto { src, alt, ratio, tone }.
//   · src   → ruta dentro de /public. Si lo dejas vacío se muestra un marcador provisional.
//   · alt   → descripción para personas que no ven la imagen (obligatorio).
//   · ratio → proporción del marco: "4/5", "3/2", "16/9", "1/1", "3/4", "21/9"…
//   · tone  → color del marcador provisional: "lila" | "tinta" | "papel".
// ─────────────────────────────────────────────────────────────

export default {
  slug: "mi-proyecto-plantilla",
  title: "Nombre del proyecto",
  year: 2026,
  // Opciones: "direccion-creativa" | "fotografia" | "video" | "branding" | "diseno-grafico"
  disciplines: ["fotografia"],

  // Color con el que se presenta el proyecto: "lila" | "tinta" | "papel"
  tone: "lila",
  // Composición de la cabecera: "split" (texto + imagen) | "poster" (imagen grande) | "stacked" (título arriba, imagen debajo)
  variant: "split",

  cover: { src: "", alt: "Descripción de la portada", ratio: "4/5", tone: "lila" },

  summary: "Descripción breve: qué es el proyecto, para quién y cuál fue tu papel.",
  // EL PORQUÉ EN UNA FRASE (se ve en el listado de proyectos)
  why: "La idea o necesidad de la que partió el proyecto.",

  role: "Tu rol en el proyecto (opcional)",
  client: "Cliente o contexto (opcional)",

  // (01) PORQUÉ — la intención, con más detalle
  intention: ["Párrafo explicando por qué existe este proyecto."],
  // Concepto creativo
  concept: {
    title: "La idea central",
    body: ["Párrafo con el concepto que ordena todas las decisiones."],
  },

  // (02) DECISIONES — proceso. Pon las que importen (2–5). `media` es opcional.
  decisions: [
    { title: "Primera decisión", text: "Qué elegiste y qué razón había detrás." },
    { title: "Segunda decisión", text: "Qué elegiste y qué razón había detrás." },
  ],

  // (03) RESULTADO — piezas finales. Mezcla los bloques que necesites, en el orden que quieras.
  result: {
    intro: "Una frase que une el resultado con la idea inicial (opcional).",
    blocks: [
      // Imagen a todo el ancho
      { kind: "full", media: { src: "", alt: "…", ratio: "16/9", tone: "lila" } },
      // Dos imágenes asimétricas (shift: "down" o "up" desplaza la segunda)
      {
        kind: "pair",
        shift: "down",
        a: { src: "", alt: "…", ratio: "4/5", tone: "tinta" },
        b: { src: "", alt: "…", ratio: "3/4", tone: "papel" },
      },
      // Tres imágenes en fila
      {
        kind: "trio",
        items: [
          { src: "", alt: "…", ratio: "3/4", tone: "lila" },
          { src: "", alt: "…", ratio: "3/4", tone: "papel" },
          { src: "", alt: "…", ratio: "3/4", tone: "tinta" },
        ],
      },
      // Collage superpuesto (layout: "a" o "b"). Úsalo con intención, no en todos los proyectos.
      {
        kind: "collage",
        layout: "a",
        items: [
          { src: "", alt: "…", ratio: "4/5", tone: "lila" },
          { src: "", alt: "…", ratio: "3/2", tone: "papel" },
          { src: "", alt: "…", ratio: "1/1", tone: "tinta" },
        ],
      },
      // Vídeo: provider "vimeo" | "youtube" (con `id`) o "file" (con `src` a un .mp4 ligero)
      { kind: "video", provider: "vimeo", id: "", title: "Título del vídeo", ratio: "16/9" },
      // Texto libre
      { kind: "text", title: "Título opcional", body: ["Párrafo."] },
      // Nota al margen
      { kind: "note", label: "Detalle", text: "Una anotación breve, como en el margen de una revista." },
    ],
  },

  seo: { description: "Descripción para buscadores (opcional; si no, se usa `summary`)." },
};
