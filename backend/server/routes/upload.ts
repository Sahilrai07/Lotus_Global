import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import fs from "fs";
import path from "path";

export const uploadRouter = Router();

/**
 * POST /api/upload
 * Saves uploaded document to Neon DB uploaded_files table and local disk
 */
uploadRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { fileName, folder = "documents", base64, mimeType } = req.body;

    if (!fileName || !base64) {
      res.status(400).json({ success: false, message: "Missing fileName or base64 file data." });
      return;
    }

    const cleanBase64 = base64.replace(/^data:.*?;base64,/, "");
    const fileBuffer = Buffer.from(cleanBase64, "base64");
    const fileSize = fileBuffer.length;

    if (fileSize > 10 * 1024 * 1024) {
      res.status(413).json({
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

    // 1. Persist to Neon DB uploaded_files table
    try {
      await prisma.$executeRaw`
        INSERT INTO uploaded_files (id, filename, mime_type, file_size, data)
        VALUES (${fileId}, ${cleanName}, ${detectedMime}, ${fileSize}, ${cleanBase64})
        ON CONFLICT (id) DO UPDATE SET filename = EXCLUDED.filename, mime_type = EXCLUDED.mime_type, file_size = EXCLUDED.file_size, data = EXCLUDED.data
      `;
    } catch (dbErr) {
      console.error("[Express uploadRouter Neon DB error]:", dbErr);
    }

    // 2. Also save to local disk if writable
    try {
      const localDir = path.resolve(process.cwd(), "public/uploads", safeFolder);
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localDir, fileId), fileBuffer);
      const simplePath = path.join(localDir, cleanName);
      if (!fs.existsSync(simplePath)) {
        fs.writeFileSync(simplePath, fileBuffer);
      }
    } catch {}

    const sizeKb = Math.round(fileSize / 1024);
    const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

    res.status(200).json({
      success: true,
      url: `/api/files?id=${encodeURIComponent(fileId)}`,
      fileName: cleanName,
      fileSize: formattedSize,
      message: `File uploaded successfully (${formattedSize})`,
    });
  } catch (err: unknown) {
    console.error("[Express uploadRouter Fatal Error]:", err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Failed to upload file to cloud storage.",
    });
  }
});
