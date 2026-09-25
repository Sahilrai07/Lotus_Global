import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    const connStr =
      process.env.DATABASE_URL ||
      "postgresql://neondb_owner:npg_vzF4LudHWE3Q@ep-noisy-tree-b5xrljes-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 2,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    // Parse query params (supports ?id=... or ?name=... and ?download=1)
    let fileId = "";
    let isDownload = false;
    if (req.query) {
      fileId = req.query.id || req.query.name || "";
      if (req.query.download === "1" || req.query.download === "true" || req.query.dl === "1") {
        isDownload = true;
      }
    }
    if (!fileId && req.url) {
      const parsedUrl = new URL(req.url, "http://localhost");
      fileId = parsedUrl.searchParams.get("id") || parsedUrl.searchParams.get("name") || "";
      if (parsedUrl.searchParams.get("download") === "1" || parsedUrl.searchParams.get("download") === "true") {
        isDownload = true;
      }
    }

    if (!fileId) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing file id parameter" }));
      return;
    }

    // 1. Try fetching from Neon database uploaded_files table
    try {
      const db = getPool();
      const result = await db.query(
        "SELECT filename, mime_type, file_size, data FROM uploaded_files WHERE id = $1 LIMIT 1",
        [fileId]
      );

      if (result.rows.length > 0) {
        const row = result.rows[0];
        const rawBase64 = (row.data || "").replace(/^data:.*?;base64,/, "");
        const fileBuffer = Buffer.from(rawBase64, "base64");
        const disposition = isDownload ? "attachment" : "inline";

        res.setHeader("Content-Type", row.mime_type || "application/pdf");
        res.setHeader("Content-Disposition", `${disposition}; filename="${row.filename || "document.pdf"}"`);
        res.setHeader("Content-Length", fileBuffer.length);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.statusCode = 200;

        if (req.method === "HEAD") {
          res.end();
          return;
        }

        res.end(fileBuffer);
        return;
      }
    } catch (dbErr) {
      console.warn("[api/files DB lookup error]:", dbErr.message);
    }

    // 2. Fallback to local filesystem if available (e.g. public/uploads/)
    const possiblePaths = [
      path.resolve(process.cwd(), "public/uploads/documents", fileId),
      path.resolve(process.cwd(), "public/uploads/images", fileId),
      path.resolve(process.cwd(), "public/uploads/gallery", fileId),
      path.resolve(process.cwd(), "public", fileId),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const mime = fileId.endsWith(".pdf")
          ? "application/pdf"
          : fileId.endsWith(".webp")
          ? "image/webp"
          : fileId.endsWith(".png")
          ? "image/png"
          : fileId.endsWith(".jpg") || fileId.endsWith(".jpeg")
          ? "image/jpeg"
          : "application/octet-stream";

        const content = fs.readFileSync(filePath);
        const disposition = isDownload ? "attachment" : "inline";
        res.setHeader("Content-Type", mime);
        res.setHeader("Content-Disposition", `${disposition}; filename="${path.basename(filePath)}"`);
        res.setHeader("Content-Length", content.length);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.statusCode = 200;

        if (req.method === "HEAD") {
          res.end();
          return;
        }

        res.end(content);
        return;
      }
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "File not found" }));
  } catch (err) {
    console.error("[api/files handler error]:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }));
  }
}
