// Portada. Todos los textos de la home están aquí.
//
// Para cambiar las imágenes del collage de la primera pantalla, añade `src` a cada una
// (ej.: src: "/images/portada-1.jpg"). Mientras no haya `src`, se muestra un marcador provisional.

export const home = {
  seo: {
    title: "Dirección creativa, fotografía y vídeo",
    description:
      "Portfolio de Pilar: dirección creativa, fotografía, vídeo, branding y diseño gráfico. Proyectos que parten de una intención y la llevan hasta la imagen.",
    absoluteTitle: true, // el título ya incluye el nombre de marca al principio
  },

  hero: {
    eyebrow: "Portfolio",
    philosophyTag: true, // muestra «Proyectos con alma» como etiqueta editorial
    lines: [
      { text: "Nada existe", style: "sans" },
      { text: "porque sí.", style: "serif" },
    ],
    intro:
      "Soy Pilar. Pienso ideas y las llevo hasta la imagen: dirección creativa, fotografía, vídeo, branding y diseño gráfico.",
    cta: { label: "Ver proyectos", href: "/proyectos/" },
    secondary: { label: "Conectemos", href: "/conectemos/" },
    disciplinesLine: "Dirección creativa · Fotografía · Vídeo · Branding · Diseño gráfico",
    collage: [
      { src: "/sample/ejemplo-23.jpg", alt: "Imagen principal de la portada", ratio: "4/5", tone: "lila", kind: "foto", label: "Foto provisional" },
      { src: "/sample/ejemplo-24.jpg", alt: "Fotograma de un vídeo", ratio: "3/2", tone: "papel", kind: "video", label: "Vídeo provisional" },
      { src: "/sample/ejemplo-25.jpg", alt: "Pieza gráfica", ratio: "1/1", tone: "tinta", kind: "grafico", label: "Pieza provisional" },
    ],
    collageNote: "Composición provisional: sustituye por tus imágenes.",
  },

  process: {
    eyebrow: "El orden de cada proyecto",
    title: ["Primero el porqué.", "Después, la imagen."],
    text: "Esta web está construida igual que trabajo: cada proyecto se cuenta en el mismo orden. La idea, las decisiones que la hacen visible y, al final, el resultado, visto con todo lo anterior detrás.",
    steps: [
      {
        num: "01",
        title: "Porqué",
        text: "La intención. Qué idea o necesidad hace que el proyecto exista.",
      },
      {
        num: "02",
        title: "Decisiones",
        text: "Cada elección visual, narrativa o técnica responde a algo. Aquí se enseña cuál.",
      },
      {
        num: "03",
        title: "Resultado",
        text: "La imagen final, con la idea inicial y las decisiones todavía a la vista.",
      },
    ],
    link: { label: "Ver cómo se cuenta un proyecto", slug: 0 }, // 0 = primer proyecto de la lista
  },

  projects: {
    eyebrow: "Proyectos",
    title: "Trabajo seleccionado",
    intro: "Pasa el cursor por cada título para ver el proyecto. En el móvil, toca para entrar.",
    limit: 6,
    all: { label: "Ver todos los proyectos", href: "/proyectos/" },
  },

  disciplines: {
    eyebrow: "Disciplinas",
    title: ["Cinco disciplinas,", "un mismo recorrido."],
    link: { label: "Cómo trabajo", href: "/servicios/" },
  },

  about: {
    eyebrow: "Sobre mí",
    statement: "Me interesa el punto exacto en el que un pensamiento se convierte en imagen.",
    text: "Estudio Comunicación Audiovisual y trabajo entre la fotografía, el vídeo, el diseño y las ideas que vienen antes de todo eso.",
    link: { label: "Conocerme mejor", href: "/sobre-mi/" },
  },
};
