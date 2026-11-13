/* ==========================================================================
   preview-server.mjs  —  LOCAL PREVIEW ONLY (development tool)
   --------------------------------------------------------------------------
   The site is a plain static bundle: upload /css, /js, /images and the HTML
   files to any Apache / static host. This script is NOT part of the site.

   Why it exists: the SVG sprite is loaded with fetch(). Browsers block
   fetch() for local files, so opening index.html by double-clicking it
   (file://) silently drops every icon and mascot. Serving the folder over
   HTTP is the only way to see the real thing.

   Usage:
     node preview-server.mjs          -> http://localhost:8090
     node preview-server.mjs 3000     -> http://localhost:3000
   Press Ctrl+C to stop.

   Port note: 8090 is this project's default because 8080 is commonly taken
   by another dev server on this machine (other projects use it). If the
   chosen port is busy the server steps up to the next free one.
   ========================================================================== */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE_PORT = Number(process.argv[2]) || 8090;
const NO_OPEN = process.argv.includes("no-open");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function openBrowser(url) {
  const cmd = process.platform === "win32" ? "cmd" : "open";
  const args = process.platform === "win32" ? ["/c", "start", '""', url] : [url];
  try {
    spawn(cmd, args, { stdio: "ignore", detached: true }).unref();
  } catch {
    /* non-fatal */
  }
}

/* Ask a local preview server who it is. Every project server exposes
   /__whoami, so a launcher (or this banner) can tell the projects apart
   instead of guessing from the port number. */
async function identify(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/__whoami`, { cache: "no-store" });
    if (!res.ok) return null;
    const info = await res.json();
    return info && info.site ? info.site : null;
  } catch {
    return null;
  }
}

/* Build a map of which project is sitting on which local preview port.
   This is the thing that actually prevents "I clicked Privacy Policy and
   landed on another company's site": the port number alone proves nothing. */
async function portMap() {
  const rows = [];
  for (let port = 8078; port <= 8100; port++) {
    const site = await identify(port);
    if (site) rows.push([port, site]);
  }
  return rows;
}

let attempt = 0;

function start(port) {
  const server = http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      urlPath = "/";
    }

    /* Identity endpoint: lets a launcher page find THIS project's preview
       among several dev servers that may share the machine. */
    if (urlPath === "/__whoami") {
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      });
      res.end(JSON.stringify({
        site: "MiniCity (Hongkong) Co., Limited",
        project: "E:\\香港\\49",
        port
      }));
      return;
    }

    // mirror the .htaccess rules: /index.html -> /, trailing slash -> index.html
    if (urlPath === "/index.html") {
      res.writeHead(301, { Location: "/" });
      res.end();
      return;
    }
    if (urlPath.endsWith("/")) urlPath += "index.html";

    const filePath = path.join(ROOT, urlPath.replace(/^\/+/, ""));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const notFound = path.join(ROOT, "404.html");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404 Not Found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache"
    });
    res.end(fs.readFileSync(filePath));
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && attempt < 10) {
      attempt++;
      const next = port + 1;
      identify(port).then((site) => {
        if (site) {
          console.log("");
          console.log("  ⚠  port " + port + " is already serving another project:");
          console.log("       " + site);
          console.log("     MiniCity will use port " + next + " instead.");
          console.log("");
        }
      });
      start(next);
    } else {
      console.error("FATAL:", err.message);
      process.exit(1);
    }
  });

  server.listen(port, async () => {
    const url = "http://localhost:" + port + "/";
    console.log("");
    console.log("  MiniCity (Hongkong) Co., Limited — local preview");
    console.log("  ---------------------------------------------");
    console.log("  Serving : " + ROOT);
    console.log("  Home    : " + url);
    console.log("  Services: " + url + "services.html");
    console.log("  Ctrl+C to stop");

    const rows = await portMap();
    if (rows.length > 1) {
      console.log("");
      console.log("  Local preview port map (port alone proves nothing — ask /__whoami):");
      for (const [p, site] of rows) {
        const mine = p === port ? "  <-- THIS PROJECT" : "";
        console.log("    " + String(p).padEnd(6) + site + mine);
      }
    }
    console.log("");

    if (!NO_OPEN) openBrowser(url);
  });
}

start(BASE_PORT);
