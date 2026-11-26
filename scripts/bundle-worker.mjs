/**
 * Gera um Worker "autocontido" com todos os arquivos de ./out embutidos.
 * Usado para publicar a partir de ambientes onde o envio de Static Assets
 * não está disponível. O deploy padrão (CI) continua usando wrangler.jsonc.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { createHash } from "node:crypto";

const OUT = "out";
const DEST = ".bundle";
mkdirSync(DEST, { recursive: true });

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".avif": "image/avif",
};

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(OUT);

const entries = [];
let imports = "";
files.filter((f) => !f.endsWith("_headers")).forEach((f, i) => {
  const rel = "/" + relative(OUT, f).split("\\").join("/");
  const type = TYPES[extname(f)] || "application/octet-stream";
  const etag = '"' + createHash("sha1").update(readFileSync(f)).digest("hex").slice(0, 16) + '"';
  imports += `import f${i} from "../${f}";\n`;
  entries.push(`[${JSON.stringify(rel)}, [f${i}, ${JSON.stringify(type)}, ${JSON.stringify(etag)}]]`);
});

const src = `${imports}
const FILES = new Map([\n${entries.join(",\n")}\n]);
const SECURITY = ${JSON.stringify(parseHeaders())};

function cacheFor(path) {
  if (path.startsWith("/_next/static/")) return "public, max-age=31536000, immutable";
  if (path.startsWith("/brand/")) return "public, max-age=2592000, stale-while-revalidate=86400";
  if (path.endsWith(".html") || path.endsWith(".txt")) return "public, max-age=0, must-revalidate";
  return "public, max-age=86400";
}

function resolve(pathname) {
  let p = decodeURIComponent(pathname);
  if (p.length > 1 && p.endsWith("/")) return { redirect: p.slice(0, -1) };
  if (FILES.has(p)) return { path: p };
  if (p === "/") return { path: "/index.html" };
  if (FILES.has(p + ".html")) return { path: p + ".html" };
  if (p.endsWith(".html") && FILES.has(p)) return { path: p };
  return null;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.protocol === "http:") { url.protocol = "https:"; return Response.redirect(url.toString(), 301); }
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    const r = resolve(url.pathname);
    if (r && r.redirect) return Response.redirect(new URL(r.redirect + url.search, url).toString(), 308);
    const path = r ? r.path : "/404.html";
    const [body, type, etag] = FILES.get(path);
    const headers = new Headers(SECURITY);
    headers.set("Content-Type", type);
    headers.set("Cache-Control", r ? cacheFor(path) : "public, max-age=0, must-revalidate");
    headers.set("ETag", etag);
    if (r && request.headers.get("If-None-Match") === etag) return new Response(null, { status: 304, headers });
    return new Response(request.method === "HEAD" ? null : body, { status: r ? 200 : 404, headers });
  },
};
`;
writeFileSync(join(DEST, "worker.js"), src);
console.log(`Worker gerado com ${files.length} arquivos.`);

function parseHeaders() {
  const lines = readFileSync(join("public", "_headers"), "utf8").split("\n");
  const out = {};
  let inAll = false;
  for (const l of lines) {
    if (!l.trim()) continue;
    if (!l.startsWith(" ")) { inAll = l.trim() === "/*"; continue; }
    if (inAll) { const i = l.indexOf(":"); out[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  }
  return out;
}
