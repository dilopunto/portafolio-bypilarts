// Disciplinas. El `id` es lo que se escribe en cada proyecto (disciplines: ["fotografia", ...]).
// Son también las etiquetas del filtro de proyectos y las áreas de /servicios/.
//
// TEXTOS PRELIMINARES: están escritos a partir de tu briefing. Revísalos y ajústalos con tu voz.

export const disciplines = [
  {
    id: "direccion-creativa",
    label: "Dirección creativa",
    fullName: "Dirección creativa y conceptualización",
    stage: "Concepto",
    headline: "Antes de la imagen, la idea.",
    text: "Es donde empieza todo: entender qué necesita un proyecto, encontrar el concepto que lo sostiene y traducirlo en una dirección artística que ordene el resto de decisiones.",
    question: "¿Qué hay que decir, y por qué hacerlo así?",
    connects:
      "Da sentido a las demás disciplinas: una fotografía, un vídeo o una identidad se deciden con más claridad cuando hay un concepto detrás.",
  },
  {
    id: "fotografia",
    label: "Fotografía",
    fullName: "Fotografía",
    stage: "Imagen fija",
    headline: "Mirar despacio y elegir qué se queda.",
    text: "Una fotografía concentra una idea en un solo encuadre. Me interesan la luz, la composición y el detalle como decisiones: qué entra, qué se queda fuera y por qué.",
    question: "¿Qué merece quedarse quieto?",
    connects:
      "Es la base visual sobre la que se apoyan el vídeo, la identidad y las piezas gráficas.",
  },
  {
    id: "video",
    label: "Vídeo",
    fullName: "Vídeo y producción audiovisual",
    stage: "Imagen en movimiento",
    headline: "Una idea que avanza en el tiempo.",
    text: "El vídeo añade ritmo, secuencia y sonido. Pienso cada pieza desde su intención —qué quiero que se sienta y en qué orden— hasta su producción y su montaje.",
    question: "¿Qué cambia entre el primer plano y el último?",
    connects:
      "Lleva el universo visual del proyecto al movimiento y lo conecta con la dirección artística.",
  },
  {
    id: "branding",
    label: "Branding",
    fullName: "Branding e identidad visual",
    stage: "Identidad",
    headline: "Que todo se reconozca como parte de lo mismo.",
    text: "Una identidad es un conjunto de decisiones coherentes: nombre, tipografía, color, tono, imagen. Trabajo para que cada pieza se parezca a la idea que representa.",
    question: "¿Qué debe reconocerse siempre y qué puede cambiar?",
    connects:
      "Es el hilo que une la fotografía, el vídeo y el diseño en un mismo universo.",
  },
  {
    id: "diseno-grafico",
    label: "Diseño gráfico",
    fullName: "Diseño gráfico",
    stage: "Piezas",
    headline: "Dar forma a cada pieza.",
    text: "Composición, tipografía, jerarquía y ritmo aplicados a piezas concretas, con la misma lógica que el resto del proyecto.",
    question: "¿Qué decisión hace que esta pieza funcione?",
    connects:
      "Convierte la identidad y la dirección creativa en material concreto y utilizable.",
  },
];

export const disciplineById = Object.fromEntries(disciplines.map((d) => [d.id, d]));
