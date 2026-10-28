// Lectura de dimensiones de imágenes sin dependencias (PNG, JPEG, WebP, GIF, SVG).
// Se usa para escribir width/height reales en <img> y evitar saltos de diseño.
import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR } from "./paths.mjs";

const cache = new Map();

function pngSize(b) {
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function gifSize(b) {
  return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
}

function jpegSize(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = b.readUInt16BE(i + 2);
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}

function webpSize(b) {
  const type = b.toString("ascii", 12, 16);
  if (type === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (type === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (type === "VP8X") {
    return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
  }
  return null;
}

function svgSize(text) {
  const vb = text.match(/viewBox\s*=\s*"([\d.\s-]+)"/i);
  if (vb) {
    const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
    if (w && h) return { width: w, height: h };
  }
  const w = text.match(/\swidth\s*=\s*"([\d.]+)/i);
  const h = text.match(/\sheight\s*=\s*"([\d.]+)/i);
  if (w && h) return { width: Number(w[1]), height: Number(h[1]) };
  return null;
}

export function publicFile(src) {
  return path.join(PUBLIC_DIR, src.replace(/^\/+/, ""));
}

export function imageInfo(src) {
  if (!src) return { exists: false };
  if (cache.has(src)) return cache.get(src);
  const file = publicFile(src);
  let info = { exists: false };
  try {
    const buf = fs.readFileSync(file);
    const ext = path.extname(file).toLowerCase();
    let size = null;
    try {
      if (ext === ".png") size = pngSize(buf);
      else if (ext === ".jpg" || ext === ".jpeg") size = jpegSize(buf);
      else if (ext === ".webp") size = webpSize(buf);
      else if (ext === ".gif") size = gifSize(buf);
      else if (ext === ".svg") size = svgSize(buf.toString("utf8"));
    } catch {
      size = null;
    }
    info = { exists: true, ...(size || {}) };
  } catch {
    info = { exists: false };
  }
  cache.set(src, info);
  return info;
}

// Convención de nombres para versiones responsive:
//   foto.jpg  → foto-640.jpg, foto-1280.jpg, foto-1920.jpg (las que existan)
export const SRCSET_WIDTHS = [640, 1280, 1920];

export function srcsetFor(src) {
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  const found = [];
  for (const w of SRCSET_WIDTHS) {
    const candidate = `${base}-${w}${ext}`;
    if (fs.existsSync(publicFile(candidate))) found.push(`${candidate} ${w}w`);
  }
  const original = imageInfo(src);
  if (found.length && original.width) found.push(`${src} ${original.width}w`);
  return found.length ? found.join(", ") : null;
}
