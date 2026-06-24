const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const publicRoot = path.resolve(root, "../..");
const allowedStaticRoots = [
  root,
  path.resolve(publicRoot, "assets/demo-images")
];
const port = Number(process.env.PORT || 8787);
const corsOrigin = process.env.CORS_ORIGIN || "*";

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      sendOptions(res);
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "GET" && url.pathname === "/health") {
      sendJson(res, 200, {
        ok: true,
        minimaxConfigured: Boolean(process.env.MINIMAX_API_KEY)
      });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/generate-image") {
      await handleGenerateImage(req, res);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    const pathname = url.pathname === "/" ? "/app/ai-home-makeover/index.html" : url.pathname;
    const filePath = path.resolve(publicRoot, `.${decodeURIComponent(pathname)}`);
    const allowed = allowedStaticRoots.some((allowedRoot) => filePath === allowedRoot || filePath.startsWith(`${allowedRoot}${path.sep}`));
    if (!allowed) {
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

async function handleGenerateImage(req, res) {
  const body = await readJson(req);
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    sendJson(res, 200, {
      fallback: true,
      imageUrl: "../../assets/demo-images/living-room-after.png",
      message: "MINIMAX_API_KEY is not configured."
    });
    return;
  }

  const prompt = buildPrompt(body);
  const payload = {
    model: process.env.MINIMAX_IMAGE_MODEL || "image-01",
    prompt,
    aspect_ratio: "16:9",
    response_format: "url",
    n: 1,
    prompt_optimizer: true
  };

  if (body.imageDataUrl) {
    payload.subject_reference = [
      {
        type: "character",
        image_file: body.imageDataUrl
      }
    ];
  }

  const response = await fetch("https://api.minimax.io/v1/image_generation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data?.base_resp?.status_code) {
    sendJson(res, response.ok ? 502 : response.status, {
      error: data?.base_resp?.status_msg || data?.error?.message || "MiniMax image generation failed",
      providerResponse: data
    });
    return;
  }

  const imageUrl = data?.data?.image_urls?.[0];
  const imageBase64 = data?.data?.image_base64?.[0];
  if (!imageUrl && !imageBase64) {
    sendJson(res, 502, { error: "MiniMax did not return an image.", providerResponse: data });
    return;
  }

  sendJson(res, 200, {
    imageUrl,
    imageBase64,
    provider: "minimax",
    traceId: data.id
  });
}

function buildPrompt(input) {
  const needs = Array.isArray(input.needs) && input.needs.length ? input.needs.join("、") : "基础居住需求";
  return [
    "基于用户上传的真实房间照片生成一张软装改造效果图。",
    `空间类型：${input.roomType || "客厅"}。`,
    `风格偏好：${input.style || "奶油风"}。`,
    `预算档位：${input.budget || "中等改造"}。`,
    `家庭需求：${needs}。`,
    "必须保留原房间结构、门窗位置、墙面、地面和主要透视关系。",
    "不要进行硬装拆改，不要改变户型，不要改变房间大小。",
    "重点通过家具、窗帘、地毯、灯具、装饰画、收纳和软装材质完成改造。",
    "画面真实自然，适合中国精装修新房，不要夸张豪宅风，不要过度装饰。",
    "如果原图为空间照片，请尽量保持原图的视角和空间边界。"
  ].join("\n");
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12 * 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, corsHeaders({ "Content-Type": "application/json; charset=utf-8" }));
  res.end(JSON.stringify(body));
}

function sendOptions(res) {
  res.writeHead(204, corsHeaders());
  res.end();
}

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    ...extra
  };
}

server.listen(port, () => {
  console.log(`JiaPlus MVP server running: http://127.0.0.1:${port}/app/ai-home-makeover/index.html`);
});
