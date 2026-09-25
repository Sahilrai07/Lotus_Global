import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import fs from "fs";
import path from "path";

export const filesRouter = Router();

/**
 * GET /api/files?id=...
 * Streams uploaded files from Neon DB or local disk
 */
filesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const fileId = (req.query.id as string) || (req.query.name as string) || "";
    const isDownload = req.query.download === "1" || req.query.download === "true";

    if (!fileId) {
      res.status(400).json({ error: "Missing file id parameter" });
      return;
    }

    // 1. Try Neon DB uploaded_files table via raw query
    try {
      const rows: any[] = await prisma.$queryRaw`
        SELECT filename, mime_type, file_size, data FROM uploaded_files WHERE id = ${fileId} LIMIT 1
      `;
      if (rows && rows.length > 0) {
        const row = rows[0];
        const rawBase64 = (row.data || "").replace(/^data:.*?;base64,/, "");
        const fileBuffer = Buffer.from(rawBase64, "base64");
        const disposition = isDownload ? "attachment" : "inline";

        res.setHeader("Content-Type", row.mime_type || "application/pdf");
        res.setHeader("Content-Disposition", `${disposition}; filename="${row.filename || "document.pdf"}"`);
        res.setHeader("Content-Length", fileBuffer.length);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.status(200).send(fileBuffer);
        return;
      }
    } catch (dbErr) {
      console.warn("[Express filesRouter DB lookup error]:", dbErr);
    }

    // 2. Fallback to local disk
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
        res.setHeader("Content-Type", mime);
        res.setHeader("Content-Disposition", `inline; filename="${path.basename(filePath)}"`);
        res.setHeader("Content-Length", content.length);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        res.status(200).send(content);
        return;
      }
    }

    res.status(404).json({ error: "File not found" });
  } catch (err: unknown) {
    console.error("[Express filesRouter error]:", err);
    res.status(500).json({ error: err instanceof Error ? err.message : "Internal error" });
  }
});
