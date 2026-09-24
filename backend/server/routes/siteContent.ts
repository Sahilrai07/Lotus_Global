import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { authenticateToken } from "../middleware/auth";
import fs from "fs";
import path from "path";

export const siteContentRouter = Router();

/**
 * GET /api/site-data
 * Public endpoint to fetch active site content directly from Neon PostgreSQL
 */
siteContentRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const siteContent = await prisma.siteContent.findUnique({
      where: { id: "active" },
    });

    if (siteContent && siteContent.data) {
      res.status(200).json(siteContent.data);
      return;
    }

    // Fallback to local siteData.json
    const fallbackPath = path.resolve(process.cwd(), "src/data/siteData.json");
    if (fs.existsSync(fallbackPath)) {
      const data = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
      res.status(200).json(data);
      return;
    }

    res.status(404).json({ error: "Site data not found" });
  } catch (err: unknown) {
    console.error("[SiteContent Error] Failed to fetch site data from DB:", err);
    try {
      const fallbackPath = path.resolve(process.cwd(), "src/data/siteData.json");
      if (fs.existsSync(fallbackPath)) {
        const data = JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
        res.status(200).json(data);
        return;
      }
    } catch {}
    res.status(500).json({ error: "Internal server error fetching site data" });
  }
});

/**
 * POST /api/site-data
 * Protected endpoint to update site content in Neon PostgreSQL (Requires JWT Bearer token)
 */
siteContentRouter.post("/", authenticateToken, async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    if (!updatedData || typeof updatedData !== "object") {
      res.status(400).json({ success: false, message: "Invalid site data payload" });
      return;
    }

    // Persist live updates to Neon PostgreSQL
    await prisma.siteContent.upsert({
      where: { id: "active" },
      update: { data: updatedData },
      create: { id: "active", data: updatedData },
    });

    // Also sync to local disk if writable
    try {
      const dataPath = path.resolve(process.cwd(), "src/data/siteData.json");
      if (fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), "utf-8");
      }
    } catch {
      // Ignored in read-only serverless environments like Vercel
    }

    res.status(200).json({
      success: true,
      message: "Website content updated live in database successfully!",
    });
  } catch (err: unknown) {
    console.error("[SiteContent Error] Failed to save site data:", err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Failed to update site content in database",
    });
  }
});
