import pg from "pg";
import jwt from "jsonwebtoken";
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

function sendJson(res, statusCode, data) {
  try {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("[sendJson error]:", err);
    try {
      res.statusCode = statusCode;
      res.end(JSON.stringify(data));
    } catch {}
  }
}

async function parseBody(req) {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  if (typeof req.on === "function") {
    return new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch {
          resolve({});
        }
      });
      req.on("error", () => resolve({}));
    });
  }

  return {};
}

function getHeader(req, name) {
  const lower = name.toLowerCase();
  if (!req?.headers) return null;
  return req.headers[lower] || req.headers[name] || null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, message: "Method not allowed" });
    return;
  }

  try {
    // Check Authorization if present
    const authHeader = getHeader(req, "authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]?.trim();
      const secret = process.env.JWT_SECRET || "lotus_session_secret_key_2026";
      try {
        jwt.verify(token, secret);
      } catch (tokenErr) {
        // If expired or invalid token
        sendJson(res, 401, { success: false, message: "Session expired. Please log in again." });
        return;
      }
    }

    const body = await parseBody(req);
    const { fileName, folder = "documents", base64, mimeType } = body;

    if (!fileName || !base64) {
      sendJson(res, 400, { success: false, message: "Missing fileName or base64 file data." });
      return;
    }

    const cleanBase64 = base64.replace(/^data:.*?;base64,/, "");
    const fileBuffer = Buffer.from(cleanBase64, "base64");
    const fileSize = fileBuffer.length;

    // Check size limit (max 10MB)
    if (fileSize > 10 * 1024 * 1024) {
      sendJson(res, 413, {
        success: false,
        message: `File is too large (${(fileSize / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`,
      });
      return;
    }

    const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const safeFolder = ["documents", "images", "gallery", "banners"].includes(folder) ? folder : "documents";
    const fileId = `${Date.now()}-${cleanName}`;
    const detectedMime =
      mimeType ||
      (cleanName.endsWith(".pdf")
        ? "application/pdf"
        : cleanName.endsWith(".docx")
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : cleanName.endsWith(".doc")
        ? "application/msword"
        : cleanName.endsWith(".webp")
        ? "image/webp"
        : cleanName.endsWith(".png")
        ? "image/png"
        : cleanName.endsWith(".jpg") || cleanName.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream");

    // 1. Persist file into Neon PostgreSQL uploaded_files table
    try {
      const db = getPool();
      await db.query(
        `INSERT INTO uploaded_files (id, filename, mime_type, file_size, data)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE SET filename = EXCLUDED.filename, mime_type = EXCLUDED.mime_type, file_size = EXCLUDED.file_size, data = EXCLUDED.data`,
        [fileId, cleanName, detectedMime, fileSize, cleanBase64]
      );
    } catch (dbErr) {
      console.error("[api/upload Neon DB error]:", dbErr);
    }

    // 2. Also write to local disk if filesystem is writable (e.g. dev environment)
    try {
      const localDir = path.resolve(process.cwd(), "public/uploads", safeFolder);
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localDir, fileId), fileBuffer);
      // Also save with cleanName if not existing
      const simplePath = path.join(localDir, cleanName);
      if (!fs.existsSync(simplePath)) {
        fs.writeFileSync(simplePath, fileBuffer);
      }
    } catch {
      // Ignored in read-only serverless environments
    }

    const sizeKb = Math.round(fileSize / 1024);
    const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

    sendJson(res, 200, {
      success: true,
      url: `/api/files?id=${encodeURIComponent(fileId)}`,
      fileName: cleanName,
      fileSize: formattedSize,
      message: `File uploaded successfully (${formattedSize})`,
    });
  } catch (err) {
    console.error("[api/upload Fatal Error]:", err);
    sendJson(res, 500, {
      success: false,
      message: err instanceof Error ? err.message : "Failed to upload file to cloud storage.",
    });
  }
}
