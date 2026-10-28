// Fuente única de la paleta. De aquí salen:
//  · los tokens CSS (se generan al compilar),
//  · los contrastes que se muestran en /identidad/,
//  · las comprobaciones de accesibilidad de `npm run check`.
//
// Paleta de marca: cinco lilas (de claro a oscuro).
// Los derivados son MEZCLAS de esos cinco (la profunda, con negro), no colores nuevos.
import { mix, contrast } from "./color.mjs";

export const base = {
  papel: "#F7F3FB", // 1 · fondo base y texto sobre oscuro
  suave: "#E3D7F0", // 2 · fondo suave
  lila: "#C7B3E0", // 3 · campo de color
  "lila-medio": "#9C88C2", // 4 · detalle gráfico (no apto para texto)
  tinta: "#5E4B8B", // 5 · fondo oscuro y texto secundario
};

// pct = porcentaje de `a` en la mezcla con `b` (b puede ser una clave de `base` o un hex)
export const derived = {
  "tinta-profunda": { a: "tinta", b: "#000000", pct: 62, use: "Texto principal sobre papel, suave y lila" },
  "tinta-claro": { a: "tinta", b: "lila-medio", pct: 82, use: "Paneles y marcos sobre fondo oscuro" },
  "papel-80": { a: "papel", b: "tinta", pct: 85, use: "Texto secundario sobre fondo oscuro" },
};

const hexOf = (k) => (k.startsWith("#") ? k : base[k]);

export function resolved() {
  const out = { ...base };
  for (const [name, d] of Object.entries(derived)) {
    out[name] = mix(hexOf(d.a), hexOf(d.b), d.pct / 100);
  }
  return out;
}

export function tokensCss() {
  const ref = (k) => (k.startsWith("#") ? k : `var(--${k})`);
  const lines = Object.entries(base).map(([k, v]) => `  --${k}: ${v};`);
  for (const [name, d] of Object.entries(derived)) {
    lines.push(`  --${name}: color-mix(in srgb, ${ref(d.a)} ${d.pct}%, ${ref(d.b)});`);
  }
  return `:root {\n${lines.join("\n")}\n}\n`;
}

// Pares que la web usa de verdad (texto sobre fondo). min = umbral WCAG AA.
export function textPairs() {
  const c = resolved();
  return [
    { fg: "tinta-profunda", bg: "papel", label: "Texto principal sobre papel", min: 4.5 },
    { fg: "tinta", bg: "papel", label: "Texto secundario sobre papel", min: 4.5 },
    { fg: "tinta-profunda", bg: "suave", label: "Texto principal sobre fondo suave", min: 4.5 },
    { fg: "tinta", bg: "suave", label: "Texto secundario sobre fondo suave", min: 4.5 },
    { fg: "tinta-profunda", bg: "lila", label: "Texto sobre campo lila", min: 4.5 },
    { fg: "papel", bg: "tinta", label: "Texto principal sobre fondo oscuro", min: 4.5 },
    { fg: "papel-80", bg: "tinta", label: "Texto secundario sobre fondo oscuro", min: 4.5 },
    { fg: "suave", bg: "tinta", label: "Acento claro sobre fondo oscuro", min: 4.5 },
    { fg: "papel", bg: "tinta-claro", label: "Texto sobre panel oscuro", min: 4.5 },
    { fg: "tinta", bg: "papel", label: "Anillo de foco sobre papel (≥3:1)", min: 3 },
    { fg: "suave", bg: "tinta", label: "Anillo de foco sobre fondo oscuro (≥3:1)", min: 3 },
  ].map((p) => ({ ...p, ratio: contrast(c[p.fg], c[p.bg]), fgHex: c[p.fg], bgHex: c[p.bg] }));
}

// Combinación a EVITAR (se muestra como aviso en /identidad/)
export const avoid = { fg: "lila-medio", bg: "papel", ratio: () => contrast(base["lila-medio"], base.papel) };
