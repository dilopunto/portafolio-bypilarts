import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DIST = path.join(ROOT, "dist");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const SRC = path.join(ROOT, "src");
export const CONTENT = path.join(ROOT, "content");
