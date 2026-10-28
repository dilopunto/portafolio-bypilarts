# Bypilarts — portfolio de Pilar · «Proyectos con alma»

Web de portfolio editorial: Inicio, Proyectos (con página por proyecto), Servicios, Sobre mí y Conectemos.
No tiene dependencias: es un generador estático en Node que produce HTML, CSS y JS sencillos en `dist/`.

> **Estado: versión de revisión, NO publicada.** Los proyectos, textos de proyecto e imágenes (`public/sample/`) son de EJEMPLO, generados para ver el diseño, y están marcados «provisional». Datos reales ya incluidos: nombre artístico, correo y enlaces (Instagram, TikTok, Behance, LinkedIn) tomados de su perfil y su Linktree.

## 1. Cómo ejecutarla

Necesitas Node 20 o superior. No hace falta `npm install`.

```bash
npm run preview    # genera preview/: ábrelo con doble clic en preview/index.html (sin servidor)
npm run dev        # servidor local con recarga automática → http://localhost:3000
npm run build      # genera la carpeta dist/
npm run check      # valida contenido, contraste, enlaces, encabezados, alt, etc. (tras build)
npm run pendientes # lista lo que falta antes de publicar
```

Variables de entorno al compilar:

| Variable | Para qué | Ejemplo |
|---|---|---|
| `SITE_URL` | Dominio final: activa canonical, Open Graph y `sitemap.xml` | `SITE_URL=https://tudominio.com npm run build` |
| `BASE_PATH` | Si se aloja en una subcarpeta (GitHub Pages de proyecto) | `BASE_PATH=/portfolio npm run build` |
| `PORT` | Puerto del servidor de desarrollo | `PORT=4000 npm run dev` |

## 2. Dónde está cada cosa

```
content/     ← TODO lo que editas (textos y datos). Sin tocar código.
  brand.mjs        nombre, descriptor, año, dominio
  contact.mjs      correo y redes (vacíos = «pendiente» visible)
  about.mjs        Sobre mí (+ foto)
  home.mjs         textos de Inicio
  services.mjs / disciplines.mjs
  identity.mjs     naming, paleta, tipografía (página /identidad/)
  projects/        un archivo por proyecto + index.mjs
public/      ← imágenes, fuentes, favicon (se copia tal cual a dist/)
src/         ← plantillas, estilos y JS (solo si quieres cambiar el diseño)
```

## 3. Cambiar textos e imágenes

- **Textos:** edita el archivo de `content/` correspondiente y guarda; `npm run dev` recarga solo.
- **Imágenes:** copia el archivo a `public/` (p. ej. `public/projects/mi-proyecto/portada.jpg`) y pon su ruta en el campo `src` (`"/projects/mi-proyecto/portada.jpg"`). Si `src` está vacío se ve un marcador «provisional». Escribe siempre el `alt`.
- Las dimensiones se leen del archivo. Si junto a `portada.jpg` existen `portada-640.jpg`, `portada-1280.jpg` y `portada-1920.jpg`, se usan como `srcset` automáticamente.
- **Vídeo:** bloque `video` con `provider: "vimeo" | "youtube"` y el `id`, o un archivo propio. Vimeo/YouTube cargan solo al hacer clic (sin cookies hasta entonces).
- **Foto personal:** `content/about.mjs` → `photo.src`.
- **Correo y redes:** `content/contact.mjs`. Mientras estén vacíos aparecen como «pendiente»; no se ha inventado ninguno.

## 4. Añadir un proyecto

1. Copia `content/projects/_plantilla.mjs` a `content/projects/mi-proyecto.mjs` (la plantilla explica cada campo).
2. Cambia `slug` (será la URL) y rellena: `title`, `year`, `disciplines`, `cover`, `summary`, `why`. Lo demás es opcional: lo que no pongas, no aparece.
3. Borra `provisional: true`.
4. Regístralo en `content/projects/index.mjs` (import + añadirlo a la lista; el orden de la lista es el de la web).
5. Imágenes en `public/projects/mi-proyecto/`.
6. `npm run check` te avisa de campos que faltan, disciplinas inválidas o imágenes que no existen.

Para quitar los proyectos de ejemplo, elimínalos de `index.mjs` y borra sus archivos.

## 5. Publicar

Sube la carpeta `dist/` a cualquier alojamiento estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages…):

```bash
SITE_URL=https://tudominio.com npm run build
npm run pendientes     # debe quedar vacío
```

- Comando de build: `npm run build` · carpeta de salida: `dist`.
- `public/_headers` trae cabeceras de caché y seguridad (Netlify / Cloudflare Pages); en otros servicios habrá que configurarlas allí.
- Antes de publicar, ejecuta `npm run pendientes` y completa la lista. También conviene quitar la ruta `/identidad/` (es una página interna de trabajo, ya está marcada `noindex`) si no quieres mostrarla: quita la línea `identityPage(),` de `src/build.mjs`.

## 6. Diseño y decisiones

- **Concepto:** «Proyectos con alma» no es un eslogan repetido: se traduce en estructura. Cada proyecto se cuenta empezando por el porqué, después las decisiones y al final el resultado; el hilo con nodos, las anotaciones al margen, el punto del logotipo y la alternancia papel/oscuro/lila salen de esa idea.
- **Paleta:** cinco lilas facilitadas por Pilar: `#F7F3FB`, `#E3D7F0`, `#C7B3E0`, `#9C88C2`, `#5E4B8B`. Se derivan tres mezclas en `src/lib/palette.mjs` (la principal es una «tinta profunda», `#5E4B8B` mezclado con negro, para el texto: sin ella el texto sobre lila no llega a AA). El contraste WCAG se calcula en cada compilación (tabla en `/identidad/` y en `npm run check`). El lila medio `#9C88C2` no se usa para texto (2,85:1 sobre papel).
- **Tipografía (autoalojada, sin llamadas externas):** Inter (sans) y Lora (serif cursiva), ambas SIL OFL 1.1. La serif está renombrada internamente («Portfolio Serif») por la cláusula de nombre reservado. Son las fuentes libres disponibles al construir; si quieres otras, cambia los `@font-face` en `src/styles/tokens.css` y revisa su licencia.
- **Movimiento:** transiciones sutiles; todo se desactiva con `prefers-reduced-motion`. Vista previa al pasar el cursor, parallax y similares solo con puntero fino; en táctil hay alternativas.
- **Accesibilidad:** enlace «saltar al contenido», foco visible, un `h1` por página, orden de encabezados, `alt` obligatorio, menú con `aria-expanded`, filtros anunciados a lectores de pantalla.

## 7. Lo que NO está verificado

- **Naming:** «Bypilarts» es el nombre artístico indicado por Pilar. **No** se ha comprobado dominio ni marca (OEPM/EUIPO/WIPO). Ver `/identidad/`.
- **Referencias de diseño y contenido real:** no se han podido ver. Instagram y Behance bloquean el acceso automático y el portfolio de Canva no se puede leer desde este entorno; solo se usaron capturas de pantalla del perfil aportadas por Pilar. El diseño actual NO está contrastado con sus referencias.
- **Imágenes de ejemplo:** son abstractas y generadas; no son trabajos de Pilar. Sustitúyelas por originales (con permiso de las personas que aparezcan).
- **GitHub y Vercel:** no conectados; pendiente de autorización oficial.
- **Publicación:** no se ha desplegado en ningún servidor ni se ha probado con el dominio real.
- **Vídeo embebido:** las incrustaciones de Vimeo/YouTube no se han probado con vídeos reales.
- **Navegadores:** se probó con Chromium (escritorio, 820 px y 390 px) y no se detectaron errores de consola ni desbordes. No se probó en Safari ni Firefox. Las transiciones entre páginas (View Transitions) solo funcionan en navegadores que las soportan; en el resto la web funciona igual, sin ese efecto.
- **Next.js/React/Tailwind:** el registro de npm no estaba accesible al construirla, por eso no se usan. Si más adelante necesitas cuentas, pagos o CMS, esta base se puede migrar.
