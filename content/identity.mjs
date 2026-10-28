// Contenido de la página /identidad/ (hoja de identidad: naming, logotipo, color, tipografía).
// Es una página interna (noindex, no aparece en el menú ni en el sitemap) para que veas y decidas.

export const identity = {
  naming: {
    intro:
      "Tres direcciones posibles. La web está construida de forma modular: cambiar el nombre es editar una línea en content/brand.mjs.",
    functions: [
      { term: "Nombre de marca", def: "Lo que firma el trabajo. Ej.: «Bypilarts»." },
      { term: "Descriptor profesional", def: "Qué haces, en pocas palabras. Ej.: «Dirección creativa, fotografía y vídeo»." },
      { term: "Eslogan / filosofía", def: "La idea que guía el trabajo. Ej.: «Proyectos con alma». No se usa como lema repetido." },
    ],
    directions: [
      {
        id: "A",
        title: "Mantener By Pilarts y evolucionar su universo",
        positioning: "Marca de creadora con continuidad: lo que ya existe, con una identidad más madura.",
        personality: "Cercana, creativa, con un juego de palabras (Pilar + arts).",
        pros: [
          "Ya existe y ya te reconocen quienes te siguen.",
          "Nombre corto, memorable y fácil de escribir.",
          "Sin el «By» funciona como firma de estudio: «Pilarts».",
        ],
        cons: [
          "El «By» lo asocia a marca artesanal más que a dirección creativa.",
          "«Arts» en inglés puede sonar ajeno en un entorno hispanohablante.",
          "Puede confundirse con «pilares» o con «pilates» al oído.",
        ],
        names: ["By Pilarts", "Pilarts", "Pilarts Studio"],
      },
      {
        id: "B",
        title: "Tu nombre personal como firma creativa",
        positioning: "La persona es la marca. Es lo más habitual en dirección creativa y fotografía de autor.",
        personality: "Sobria, directa, de confianza.",
        pros: [
          "Las agencias y los artistas contratan personas: refuerza la confianza.",
          "No caduca ni se queda corta si cambian tus disciplinas.",
          "Se puede convertir en estudio más adelante sin renunciar al nombre.",
        ],
        cons: [
          "«Pilar» es un nombre muy común: necesita apellido para encontrarse (búsquedas, dominio, redes).",
          "Aporta menos concepto que un nombre propio de marca.",
          "Depende de que quieras usar tu nombre completo en público.",
        ],
        names: ["Pilar + [tu apellido]  — pendiente: dime cómo quieres firmar"],
      },
      {
        id: "C",
        title: "Un nombre conceptual que represente tu filosofía",
        positioning: "Una marca-idea, separada de la persona, que expresa por qué haces lo que haces.",
        personality: "Editorial, con carácter, más estudio que persona.",
        pros: [
          "El nombre ya cuenta una idea (el porqué).",
          "Permite crecer como estudio o colectivo.",
          "Más fácil de proteger como marca si es distintivo.",
        ],
        cons: [
          "Hay que construir reconocimiento desde cero.",
          "Las palabras comunes son difíciles de posicionar (SEO) y de registrar.",
          "Corres el riesgo de sonar genérica si el nombre no es muy específico.",
        ],
        names: [
          "Motivo — «motivo» es razón y también motivo visual: la idea y la imagen en una palabra.",
          "Estudio Porqué",
          "Causa y Forma",
        ],
      },
    ],
    recommendation: {
      title: "Decisión: Bypilarts",
      text: "El nombre artístico es Bypilarts (@bypilarts), el que ya usa Pilar en Instagram, TikTok y Behance. Las tres direcciones de arriba se conservan como histórico de análisis. La web no depende del nombre: si cambia, se edita una línea en content/brand.mjs.",
      note: "Pilar Blanco es el nombre real; en la web no aparece salvo que se decida.",
    },
    verification: {
      title: "Verificaciones pendientes (no se ha comprobado disponibilidad)",
      done: "Hecho: nada. No se ha comprobado la disponibilidad del nombre «Bypilarts» (una búsqueda web no devolvió el perfil, y no equivale a una comprobación).",
      todo: [
        "Dominios: .com, .es y .studio (en un registrador, no basta con buscar en Google).",
        "Marcas: buscador de la OEPM (España), EUIPO (UE) y WIPO Global Brand Database, en clases 9, 35, 41 y 42.",
        "Redes: el usuario @bypilarts ya existe en Instagram y TikTok; falta comprobar Behance, LinkedIn y un dominio propio.",
        "Búsqueda cruzada: que «Bypilarts» no esté asociado a un estudio de pilates, arquitectura o diseño ya establecido.",
      ],
    },
  },

  logo: {
    intro:
      "Identidad tipográfica: el nombre en cursiva serif y un punto. El punto es la decisión final: cada elemento de la web está puesto a propósito. Sirve para cualquier nombre, así que sobrevive a un cambio de naming.",
    rules: [
      "Logotipo principal: nombre en minúsculas, cursiva serif, seguido de un punto lila.",
      "Versión reducida: inicial + punto, para favicon, avatares y espacios pequeños.",
      "El punto se reutiliza como viñeta, como marca de «decisión» y como cursor del listado de proyectos.",
      "No hay símbolos de cámara, objetivo ni claqueta: la identidad es tipográfica.",
    ],
  },

  color: {
    intro:
      "Cinco lilas, de claro a oscuro. Se usan como fondos y campos de color; el texto va en la tinta profunda o en el papel claro. La tinta profunda es una mezcla de la tinta con negro, no un sexto color de marca.",
    roles: [
      { token: "--papel", name: "1 · Papel", hex: "#F7F3FB", role: "Fondo base de lectura y texto sobre fondo oscuro." },
      { token: "--suave", name: "2 · Suave", hex: "#E3D7F0", role: "Fondos de sección y paneles. Texto en tinta." },
      { token: "--lila", name: "3 · Lila", hex: "#C7B3E0", role: "Campo de color grande. Texto solo en tinta profunda." },
      { token: "--lila-medio", name: "4 · Lila medio", hex: "#9C88C2", role: "Detalles gráficos (punto del logotipo, líneas). Nunca texto." },
      { token: "--tinta", name: "5 · Tinta", hex: "#5E4B8B", role: "Fondo oscuro y texto secundario. Con texto papel (6,7:1)." },
    ],
    options: [
      {
        name: "A · Luminosa",
        mix: { claro: 80, lila: 15, oscuro: 5 },
        text: "Muy aérea y suave, pero casi sin contraste: el lila apenas se nota y las secciones se parecen entre sí.",
      },
      {
        name: "B · Nocturna",
        mix: { claro: 15, lila: 15, oscuro: 70 },
        text: "Más dramática, pero cansa en lectura larga y apaga el lila.",
      },
      {
        name: "C · Alterna (elegida)",
        mix: { claro: 50, lila: 25, oscuro: 25 },
        text: "Papel para leer, suave y lila como campos de color, y tinta al abrir y al cerrar. Da ritmo manteniendo todo dentro de la misma familia.",
      },
    ],
  },

  type: {
    intro:
      "Un contraste simple: un grotesco de titular muy ajustado frente a una serif en cursiva que se reserva para el porqué. Todo se sirve desde el propio sitio (sin Google Fonts), lo que mejora la velocidad y la privacidad.",
    families: [
      {
        role: "Titulares",
        name: "Inter Display Medium",
        license: "SIL Open Font License 1.1",
        why: "Grotesco con óptica de titular: muy denso a gran tamaño, neutro y firme.",
      },
      {
        role: "Porqués y énfasis",
        name: "Lora (variable, redondas y cursivas)",
        license: "SIL Open Font License 1.1",
        why: "La cursiva aporta voz humana y editorial. Se usa para el porqué, las anotaciones y las palabras que quieren pesar.",
      },
      {
        role: "Texto, navegación y etiquetas",
        name: "Inter 400 / 500 / 600",
        license: "SIL Open Font License 1.1",
        why: "Legible desde pantallas pequeñas. Las etiquetas editoriales son Inter en versalitas con espaciado: no hace falta una tercera familia.",
      },
    ],
    note: "Tercera familia: descartada a propósito. Aportaría poco frente al coste en carga y en coherencia.",
    upgrade:
      "Siendo honesta: estas fuentes eran las libres que había disponibles al construir esto sin conexión a internet. Si más adelante quieres una display con más carácter (por ejemplo una serif de alto contraste), cambia solo --font-serif y --font-display en tokens.css.",
  },

  graphic: {
    intro: "El concepto «Proyectos con alma» se traduce en cuatro decisiones de estructura, no en un lema:",
    items: [
      { title: "El porqué va primero", text: "Cada proyecto empieza por la intención, antes que por la imagen. Ese es el orden de las páginas de proyecto y de la portada." },
      { title: "El hilo", text: "Una línea fina con nodos une Porqué → Decisiones → Resultado: la relación entre idea y resultado se ve." },
      { title: "Anotaciones al margen", text: "Numeración, paréntesis y etiquetas pequeñas, como en una publicación: el pensamiento también se ve." },
      { title: "El punto", text: "El punto del logotipo marca las decisiones: nada está puesto porque sí." },
    ],
  },
};
