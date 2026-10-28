// Mini sistema de plantillas: las interpolaciones se escapan por defecto.
// Para insertar HTML ya construido, devuélvelo desde html`...` o envuélvelo con raw().

export class Safe {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ESC[c]);

export const raw = (value) => new Safe(String(value));

function render(value) {
  if (value === null || value === undefined || value === false || value === true) return "";
  if (value instanceof Safe) return value.value;
  if (Array.isArray(value)) return value.map(render).join("");
  return esc(value);
}

export function html(strings, ...values) {
  let out = "";
  strings.forEach((chunk, i) => {
    out += chunk;
    if (i < values.length) out += render(values[i]);
  });
  return new Safe(out);
}

// Añade un atributo solo si tiene valor.
export const attr = (name, value) =>
  value === undefined || value === null || value === "" || value === false
    ? raw("")
    : raw(` ${name}="${esc(value)}"`);

export const pad2 = (n) => String(n).padStart(2, "0");
