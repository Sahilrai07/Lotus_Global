import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { prisma } from "./config/prisma";
import { authRouter } from "./routes/auth";
import { noticesRouter } from "./routes/notices";
import { galleryRouter } from "./routes/gallery";
import { documentsRouter } from "./routes/documents";
import { inquiryRouter } from "./routes/inquiry";
import { siteContentRouter } from "./routes/siteContent";

export const app = express();

// 1. Enable CORS for frontend communication
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// 2. Parse incoming JSON request bodies (increased limit for base64/large site data)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// 3. Health-check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Lotus Global School API is running",
  });
});

// 4. API routes (Supports both /api/* and direct routes for Vercel serverless compatibility)
app.use(["/api/auth", "/auth"], authRouter);
app.use(["/api/notices", "/notices"], noticesRouter);
app.use(["/api/gallery", "/gallery"], galleryRouter);
app.use(["/api/documents", "/documents"], documentsRouter);
app.use(["/api/inquiries", "/inquiries"], inquiryRouter);
app.use(["/api/site-data", "/site-data"], siteContentRouter);
app.use(["/api/admin/data", "/admin/data"], siteContentRouter);

// 5. Fallback 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 6. Basic global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Lotus Backend Server Error]:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// 7. Start the Express server when run directly (not on Vercel serverless)
if (!process.env.VERCEL) {
  app.listen(ENV.PORT, () => {
    console.log(`[Lotus Backend] Server is running on http://localhost:${ENV.PORT}`);
    console.log(`[Lotus Backend] Health-check available at http://localhost:${ENV.PORT}/api/health`);
    console.log(`[Lotus Backend] Site-data endpoint available at http://localhost:${ENV.PORT}/api/site-data`);
    console.log(`[Lotus Backend] Inquiries endpoint available at http://localhost:${ENV.PORT}/api/inquiries`);
  });
}

export default app;
