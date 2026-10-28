// PROYECTO PROVISIONAL — ejemplo de cómo se cuenta una pieza de vídeo.
// Todo el texto es de relleno: sustitúyelo por tu proyecto real (ver _plantilla.mjs).

export default {
  slug: "pieza-audiovisual",
  provisional: true,
  title: "Pieza audiovisual",
  year: "AAAA",
  disciplines: ["video", "direccion-creativa"],
  tone: "tinta",
  variant: "poster",

  cover: { src: "/sample/ejemplo-13.jpg", alt: "Fotograma de la pieza audiovisual", ratio: "21/9", tone: "tinta", kind: "video" },

  summary:
    "Texto provisional. Descripción breve de la pieza: qué cuenta, para quién y cuál fue tu papel.",
  why: "La necesidad a la que responde esta pieza, en una frase.",

  intention: [
    "Texto provisional. Explica qué quería comunicar la pieza y por qué el vídeo era el formato adecuado.",
  ],
  concept: {
    title: "La idea central",
    body: [
      "Texto provisional. El concepto que ordena la pieza: qué se siente, en qué orden y por qué.",
    ],
  },

  decisions: [
    {
      title: "Estructura narrativa",
      text: "Texto provisional. Cómo se organiza la pieza en el tiempo y qué papel juega cada parte.",
    },
    {
      title: "Cámara y movimiento",
      text: "Texto provisional. Qué lenguaje de cámara elegiste y qué intención tenía cada decisión.",
    },
    {
      title: "Montaje y sonido",
      text: "Texto provisional. Cómo el ritmo del montaje y el sonido sostienen la idea.",
    },
  ],

  result: {
    intro: "Texto provisional. Una frase que une la pieza final con la intención inicial.",
    blocks: [
      { kind: "video", provider: "vimeo", id: "", title: "Pieza audiovisual (vídeo provisional)", ratio: "16/9" },
      {
        kind: "pair",
        shift: "up",
        a: { src: "/sample/ejemplo-14.jpg", alt: "Fotograma de la pieza", ratio: "3/2", tone: "lila", kind: "video" },
        b: { src: "/sample/ejemplo-15.jpg", alt: "Fotograma de la pieza", ratio: "3/2", tone: "papel", kind: "video" },
      },
      { kind: "text", title: "Detrás de cámara", body: ["Texto provisional. Un párrafo sobre el proceso de rodaje o montaje, si es relevante."] },
    ],
  },
};
