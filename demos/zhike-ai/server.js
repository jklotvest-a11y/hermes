const http = require("http");
const fs = require("fs");
const path = require("path");

loadEnv(path.resolve(__dirname, "../../.env"));

const publicRoot = path.resolve(__dirname, "../..");
const port = Number(process.env.PORT || 8788);
const qdrantUrl = (process.env.QDRANT_URL || "").replace(/\/$/, "");
const qdrantApiKey = process.env.QDRANT_API_KEY || "";
const qdrantCollection = process.env.QDRANT_COLLECTION || "commerce_vectors";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/api/qdrant/health") {
      await handleQdrantHealth(res);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/knowledge/search") {
      await handleKnowledgeSearch(req, res);
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/knowledge") {
      await handleKnowledgeList(url, res);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = path.resolve(publicRoot, `.${decodeURIComponent(pathname)}`);
    if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
      sendJson(res, 403, { error: "Forbidden" });
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        sendJson(res, 404, { error: "Not found" });
        return;
      }
      res.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
      res.end(data);
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

async function handleQdrantHealth(res) {
  if (!qdrantUrl || !qdrantApiKey) {
    sendJson(res, 200, { connected: false, reason: "QDRANT_URL or QDRANT_API_KEY is not configured." });
    return;
  }

  const response = await qdrantFetch("/collections");
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    sendJson(res, response.status, { connected: false, providerResponse: data });
    return;
  }

  sendJson(res, 200, {
    connected: true,
    collection: qdrantCollection || null,
    collections: data?.result?.collections?.map((item) => item.name) || []
  });
}

async function handleKnowledgeSearch(req, res) {
  const body = await readJson(req);
  const query = String(body.query || "").trim();
  const limit = Number(body.limit || 5);

  if (!qdrantUrl || !qdrantApiKey || !qdrantCollection) {
    sendJson(res, 200, { fallback: true, items: [] });
    return;
  }

  const response = await qdrantFetch(`/collections/${encodeURIComponent(qdrantCollection)}/points/scroll`, {
    method: "POST",
    body: JSON.stringify({
      limit: 200,
      with_payload: true,
      with_vector: false
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    sendJson(res, response.status, { error: "Qdrant search failed.", providerResponse: data });
    return;
  }

  const points = data?.result?.points || [];
  const items = points
    .map((point) => normalizePoint(point, query))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  sendJson(res, 200, { fallback: false, items });
}

async function handleKnowledgeList(url, res) {
  const limit = Number(url.searchParams.get("limit") || 50);
  const category = url.searchParams.get("category") || "";

  if (!qdrantUrl || !qdrantApiKey || !qdrantCollection) {
    sendJson(res, 200, { fallback: true, items: [] });
    return;
  }

  const response = await qdrantFetch(`/collections/${encodeURIComponent(qdrantCollection)}/points/scroll`, {
    method: "POST",
    body: JSON.stringify({
      limit: Math.min(Math.max(limit, 1), 200),
      with_payload: true,
      with_vector: false
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    sendJson(res, response.status, { error: "Qdrant list failed.", providerResponse: data });
    return;
  }

  let items = (data?.result?.points || []).map((point) => normalizePoint(point, ""));
  if (category) items = items.filter((item) => item.category === category);
  sendJson(res, 200, { fallback: false, items });
}

function normalizePoint(point, query) {
  const payload = point.payload || {};
  const title = payload.title || payload.question || payload.name || `知识条目 ${point.id}`;
  const content = payload.content || payload.answer || payload.text || payload.description || "Qdrant 向量库条目，用于演示知识库检索链路。";
  const category = payload.category || payload.type || "knowledge";
  const keywords = Array.isArray(payload.keywords) ? payload.keywords : [];
  return {
    id: point.id,
    title,
    content,
    category,
    keywords,
    is_active: payload.is_active !== false,
    created_at: payload.created_at || new Date().toISOString(),
    score: scoreText([title, content, category, keywords.join(" ")].join(" "), query)
  };
}

function scoreText(text, query) {
  if (!query) return 1;
  const haystack = String(text || "").toLowerCase();
  const needle = query.toLowerCase();
  if (haystack.includes(needle)) return 0.95;
  const chars = [...new Set(needle.split(""))].filter(Boolean);
  if (!chars.length) return 0;
  const hit = chars.filter((char) => haystack.includes(char)).length;
  return hit / chars.length >= 0.5 ? Number((hit / chars.length).toFixed(2)) : 0;
}

function qdrantFetch(apiPath, options = {}) {
  return fetch(`${qdrantUrl}${apiPath}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "api-key": qdrantApiKey,
      ...(options.headers || {})
    }
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
  }
}

server.listen(port, () => {
  console.log(`Zhike AI portfolio server running: http://127.0.0.1:${port}/project-zhike-ai.html`);
});
