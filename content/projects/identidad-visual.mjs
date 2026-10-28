// PROYECTO PROVISIONAL — ejemplo de cómo se cuenta una identidad de marca.
// Todo el texto es de relleno: sustitúyelo por tu proyecto real (ver _plantilla.mjs).

export default {
  slug: "identidad-visual",
  provisional: true,
  title: "Identidad visual",
  year: "AAAA",
  disciplines: ["branding", "diseno-grafico"],
  tone: "papel",
  variant: "stacked",

  cover: { src: "/sample/ejemplo-06.jpg", alt: "Portada de la identidad visual", ratio: "16/9", tone: "papel", kind: "grafico" },

  summary:
    "Texto provisional. Descripción breve del proyecto de identidad: para quién, qué se necesitaba y cuál fue tu papel.",
  why: "La intención detrás de esta identidad, en una frase.",

  intention: [
    "Texto provisional. Explica qué necesitaba representar esta marca y por qué se tomó este camino y no otro.",
  ],
  concept: {
    title: "La idea central",
    body: [
      "Texto provisional. El concepto que une nombre, tipografía, color y tono en un mismo sistema.",
    ],
  },

  decisions: [
    {
      title: "Nombre y voz",
      text: "Texto provisional. Cómo se eligió el nombre y qué tono de voz lo acompaña.",
    },
    {
      title: "Tipografía",
      text: "Texto provisional. Qué familias se eligieron y por qué reflejan la idea.",
    },
    {
      title: "Color",
      text: "Texto provisional. Qué paleta se definió, cuándo se usa cada color y con qué proporción.",
    },
    {
      title: "Sistema de piezas",
      text: "Texto provisional. Cómo se aplica la identidad en piezas concretas para que todo se reconozca como parte de lo mismo.",
    },
  ],

  result: {
    intro: "Texto provisional. Una frase que une el sistema final con la idea de partida.",
    blocks: [
      {
        kind: "collage",
        layout: "a",
        items: [
          { src: "/sample/ejemplo-07.jpg", alt: "Pieza de la identidad", ratio: "4/5", tone: "lila", kind: "grafico" },
          { src: "/sample/ejemplo-08.jpg", alt: "Pieza de la identidad", ratio: "3/2", tone: "tinta", kind: "grafico" },
          { src: "/sample/ejemplo-09.jpg", alt: "Pieza de la identidad", ratio: "1/1", tone: "papel", kind: "grafico" },
        ],
      },
      {
        kind: "pair",
        a: { src: "/sample/ejemplo-10.jpg", alt: "Aplicación de la identidad", ratio: "3/2", tone: "papel", kind: "grafico" },
        b: { src: "/sample/ejemplo-11.jpg", alt: "Aplicación de la identidad", ratio: "3/2", tone: "lila", kind: "grafico" },
      },
      { kind: "full", media: { src: "/sample/ejemplo-12.jpg", alt: "Aplicación de la identidad a gran formato", ratio: "21/9", tone: "tinta", kind: "grafico" } },
    ],
  },
};
