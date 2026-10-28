// PROYECTO PROVISIONAL — ejemplo de un proyecto que combina varias disciplinas.
// Todo el texto es de relleno: sustitúyelo por tu proyecto real (ver _plantilla.mjs).

export default {
  slug: "concepto-y-direccion",
  provisional: true,
  title: "Concepto y dirección",
  year: "AAAA",
  disciplines: ["direccion-creativa", "fotografia", "video", "diseno-grafico"],
  tone: "lila",
  variant: "stacked",

  cover: { src: "/sample/ejemplo-01.jpg", alt: "Portada del proyecto de dirección creativa", ratio: "16/9", tone: "lila", kind: "foto" },

  summary:
    "Texto provisional. Un proyecto completo, de la idea a la imagen: qué se planteaba, qué piezas lo componen y cuál fue tu papel.",
  why: "La pregunta de la que partió este proyecto, en una frase.",

  intention: [
    "Texto provisional. Aquí encaja el proyecto que mejor muestra tu forma de trabajar: el que empezó con una pregunta y terminó en un conjunto de piezas coherentes.",
  ],
  concept: {
    title: "La idea central",
    body: [
      "Texto provisional. El concepto que conectó la fotografía, el vídeo y las piezas gráficas en un solo universo.",
    ],
  },

  decisions: [
    {
      title: "La pregunta inicial",
      text: "Texto provisional. Qué se quería decir y por qué hacerlo así.",
    },
    {
      title: "El universo visual",
      text: "Texto provisional. Qué referencias, colores y tono definieron la dirección artística.",
    },
    {
      title: "Coherencia entre piezas",
      text: "Texto provisional. Cómo se mantuvo una misma idea a través de formatos distintos.",
    },
  ],

  result: {
    intro: "Texto provisional. Una frase que une el conjunto final con la pregunta inicial.",
    blocks: [
      { kind: "full", media: { src: "/sample/ejemplo-02.jpg", alt: "Imagen principal del proyecto", ratio: "21/9", tone: "lila", kind: "foto" } },
      {
        kind: "collage",
        layout: "b",
        items: [
          { src: "/sample/ejemplo-03.jpg", alt: "Fotografía del proyecto", ratio: "4/5", tone: "tinta", kind: "foto" },
          { src: "/sample/ejemplo-04.jpg", alt: "Fotograma del proyecto", ratio: "3/2", tone: "papel", kind: "video" },
          { src: "/sample/ejemplo-05.jpg", alt: "Pieza gráfica del proyecto", ratio: "1/1", tone: "lila", kind: "grafico" },
        ],
      },
      { kind: "text", title: "Cómo encaja todo", body: ["Texto provisional. Un párrafo sobre cómo las piezas se complementan entre sí."] },
    ],
  },
};
