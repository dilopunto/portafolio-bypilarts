// Servidor de desarrollo sin dependencias:
//   npm run dev        → compila, sirve en http://localhost:3000 y recompila al guardar cambios
//   PORT=4000 npm run dev
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = Number(process.env.PORT) || 3000;
const WATCH = !process.argv.includes("--no-watch");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ico": "image/x-icon",
};

const clients = new Set();

function build() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["src/build.mjs"], { cwd: ROOT, stdio: "inherit" });
    child.on("close", (code) => resolve(code));
  });
}

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const target = path.normalize(path.join(DIST, clean));
  if (!target.startsWith(DIST)) return null;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const index = path.join(target, "index.html");
    return fs.existsSync(index) ? index : null;
  }
  return fs.existsSync(target) ? target : null;
}

const RELOAD = `<script>new EventSource("/__reload").onmessage=function(){location.reload()}</script>`;

const server = http.createServer((req, res) => {
  if (req.url === "/__reload") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    res.write("retry: 800\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  let file = resolveFile(req.url || "/");
  let status = 200;
  if (!file) {
    file = path.join(DIST, "404.html");
    status = 404;
    if (!fs.existsSync(file)) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404");
      return;
    }
  }

  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  const body = fs.readFileSync(file);
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  if (type.startsWith("text/html") && WATCH) res.end(body.toString("utf8").replace("</body>", RELOAD + "</body>"));
  else res.end(body);
});

await build();
server.listen(PORT, () => {
  console.log(`\n  Servidor en  http://localhost:${PORT}\n  ${WATCH ? "Vigilando cambios en content/, src/ y public/ (Ctrl+C para salir)" : "Sin vigilancia de cambios"}\n`);
});

if (WATCH) {
  let timer = null;
  let building = false;
  const trigger = (why) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (building) return;
      building = true;
      console.log(`↻ Cambio en ${why}: recompilando…`);
      await build();
      building = false;
      for (const c of clients) c.write("data: reload\n\n");
    }, 150);
  };
  for (const dir of ["content", "src", "public"]) {
    try {
      fs.watch(path.join(ROOT, dir), { recursive: true }, (_e, name) => trigger(`${dir}/${name || ""}`));
    } catch {
      console.log(`(No se puede vigilar ${dir}/: reinicia npm run dev tras editar)`);
    }
  }
}
