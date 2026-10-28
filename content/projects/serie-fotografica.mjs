// PROYECTO PROVISIONAL — ejemplo de cómo se cuenta un proyecto de fotografía.
// Todo el texto es de relleno: sustitúyelo por tu proyecto real (ver _plantilla.mjs).

export default {
  slug: "serie-fotografica",
  provisional: true,
  title: "Serie fotográfica",
  year: "AAAA",
  disciplines: ["fotografia", "direccion-creativa"],
  tone: "lila",
  variant: "split",

  cover: { src: "/sample/ejemplo-16.jpg", alt: "Portada de la serie fotográfica", ratio: "4/5", tone: "lila", kind: "foto" },

  summary:
    "Texto provisional. Descripción breve del proyecto: qué es, para quién y cuál fue tu papel.",
  why: "La idea que originó esta serie, en una sola frase.",

  intention: [
    "Texto provisional. Explica aquí por qué existe este proyecto: qué querías contar, para quién y qué necesidad o idea hizo que empezara.",
    "Si hubo un punto de partida concreto (una imagen, una conversación, una pregunta), cuéntalo: es lo que hace que el proyecto tenga un porqué.",
  ],
  concept: {
    title: "La idea central",
    body: [
      "Texto provisional. Resume el concepto creativo: la idea que ordena todas las decisiones visuales de la serie.",
    ],
  },

  decisions: [
    {
      title: "Luz y color",
      text: "Texto provisional. Qué luz elegiste, qué paleta, y qué razón había detrás.",
    },
    {
      title: "Encuadre y ritmo",
      text: "Texto provisional. Cómo compusiste y por qué: qué entra en el cuadro y qué se queda fuera.",
    },
    {
      title: "Edición y secuencia",
      text: "Texto provisional. Cómo se ordenan las imágenes entre sí y qué cuenta ese orden.",
    },
  ],

  result: {
    intro: "Texto provisional. Una frase que une el resultado con la idea de partida.",
    blocks: [
      { kind: "full", media: { src: "/sample/ejemplo-17.jpg", alt: "Imagen principal de la serie", ratio: "16/9", tone: "tinta", kind: "foto" } },
      {
        kind: "pair",
        shift: "down",
        a: { src: "/sample/ejemplo-18.jpg", alt: "Fotografía de la serie", ratio: "4/5", tone: "lila", kind: "foto" },
        b: { src: "/sample/ejemplo-19.jpg", alt: "Fotografía de la serie", ratio: "3/4", tone: "papel", kind: "foto" },
      },
      { kind: "note", label: "Detalle", text: "Anotación provisional al margen: aquí va un dato, una referencia o una decisión pequeña." },
      {
        kind: "trio",
        items: [
          { src: "/sample/ejemplo-20.jpg", alt: "Fotografía de la serie", ratio: "3/4", tone: "papel", kind: "foto" },
          { src: "/sample/ejemplo-21.jpg", alt: "Fotografía de la serie", ratio: "3/4", tone: "lila", kind: "foto" },
          { src: "/sample/ejemplo-22.jpg", alt: "Fotografía de la serie", ratio: "3/4", tone: "tinta", kind: "foto" },
        ],
      },
    ],
  },
};
