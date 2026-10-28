// Página /conectemos/ y cierre de todas las páginas.
//
// DATOS PENDIENTES: no se han inventado direcciones ni perfiles.
// Mientras `email` o `url` estén vacíos, la web muestra un aviso visible de "pendiente".
// Para completarlos, rellena solo estos campos.

export const contact = {
  seo: {
    title: "Conectemos",
    description:
      "Cuéntame qué quieres crear y por qué. Colaboro con marcas, artistas, agencias y otros creativos.",
  },

  eyebrow: "Conectemos",
  title: ["Cuéntame qué quieres crear", "y por qué."],
  intro:
    "Marcas, artistas, agencias, otros creativos. Si tu proyecto tiene una razón de ser, me interesa. Escríbeme con lo que ya sepas: no hace falta que esté cerrado.",

  // ← PON AQUÍ TU CORREO PROFESIONAL (ej.: "hola@tudominio.com")
  email: "bypilarts@gmail.com",

  // ← PON AQUÍ TUS ENLACES. `handle` es lo que se ve (ej.: "@tuusuario"); `url` es el enlace completo.
  socials: [
    { label: "Instagram", handle: "@bypilarts", url: "https://www.instagram.com/bypilarts/" },
    { label: "TikTok", handle: "@bypilarts", url: "https://www.tiktok.com/@bypilarts" },
    { label: "Behance", handle: "", url: "https://www.behance.net/pilarblanco6" },
    { label: "LinkedIn", handle: "", url: "https://www.linkedin.com/in/pilar-blanco-a176942b9/" },
  ],

  // Preguntas guía: ayudan a que el primer mensaje ya tenga un porqué.
  prompts: ["¿Qué quieres crear?", "¿Por qué ahora?", "¿Para quién es?"],

  // Plantilla del correo que se abre al pulsar "Escribirme".
  mail: {
    subject: "Un proyecto con porqué",
    body: [
      "Hola Pilar,",
      "",
      "Me gustaría contarte un proyecto.",
      "",
      "¿Qué quiero crear?",
      "",
      "¿Por qué ahora?",
      "",
      "¿Para quién es?",
      "",
      "¿Plazos aproximados?",
      "",
      "Gracias,",
    ].join("\n"),
  },

  // Cierre que aparece al final de las demás páginas.
  closing: {
    eyebrow: "Conectemos",
    title: ["Si tu proyecto", "tiene un porqué,"],
    accent: "hablemos.",
    cta: { label: "Escribirme", href: "/conectemos/" },
  },
};
