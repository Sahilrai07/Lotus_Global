import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { authenticateToken } from "../middleware/auth";
import { authorizeRoles } from "../middleware/authorize";

export const documentsRouter = Router();

/**
 * Helper to validate HTTP/HTTPS URLs
 */
function isValidHttpUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Helper to validate standard MIME type format (e.g. application/pdf, image/png)
 */
function isValidMimeType(str: string): boolean {
  // Matches type/subtype with allowable characters (alphanumeric, dot, dash, plus)
  const mimeRegex = /^[a-zA-Z0-9\.\+-]+\/[a-zA-Z0-9\.\+-]+$/;
  return mimeRegex.test(str);
}

/**
 * Format document item for consistent API responses
 */
function formatDocument(doc: {
  id: string;
  title: string;
  category: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: string | null;
  required: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: doc.id,
    title: doc.title,
    category: doc.category,
    fileUrl: doc.fileUrl,
    fileType: doc.fileType,
    fileSize: doc.fileSize !== null && doc.fileSize !== undefined ? parseInt(doc.fileSize, 10) : null,
    required: doc.required,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

/**
 * GET /api/documents
 * Public endpoint: Returns all documents ordered by createdAt descending.
 */
documentsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        category: true,
        fileUrl: true,
        fileType: true,
        fileSize: true,
        required: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: items.map(formatDocument),
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Documents Error] Failed to fetch documents:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve documents.",
    });
  }
});

/**
 * GET /api/documents/:id
 * Public endpoint: Returns a single document by its ID. Returns 404 if not found.
 */
documentsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await prisma.document.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        fileUrl: true,
        fileType: true,
        fileSize: true,
        required: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!item) {
      res.status(404).json({
        success: false,
        message: "Document not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: formatDocument(item),
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Documents Error] Failed to fetch document by ID:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve document.",
    });
  }
});

/**
 * POST /api/documents
 * Protected management endpoint: Creates a new document record in Neon PostgreSQL.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
documentsRouter.post(
  "/",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { title, category, fileUrl, fileType, fileSize, required } = req.body;

      // 1. Validate title (required, max 200)
      if (!title || typeof title !== "string" || title.trim() === "") {
        res.status(400).json({
          success: false,
          message: "Title is required and cannot be empty.",
        });
        return;
      }

      const trimmedTitle = title.trim();
      if (trimmedTitle.length > 200) {
        res.status(400).json({
          success: false,
          message: "Title must not exceed 200 characters.",
        });
        return;
      }

      // 2. Validate fileUrl (required, valid HTTP/HTTPS URL)
      if (!fileUrl || typeof fileUrl !== "string" || fileUrl.trim() === "") {
        res.status(400).json({
          success: false,
          message: "File URL is required.",
        });
        return;
      }

      const trimmedFileUrl = fileUrl.trim();
      if (!isValidHttpUrl(trimmedFileUrl)) {
        res.status(400).json({
          success: false,
          message: "File URL must be a valid HTTP or HTTPS URL.",
        });
        return;
      }

      // 3. Validate fileType (required, max 100, valid MIME type)
      if (!fileType || typeof fileType !== "string" || fileType.trim() === "") {
        res.status(400).json({
          success: false,
          message: "File type is required.",
        });
        return;
      }

      const trimmedFileType = fileType.trim();
      if (trimmedFileType.length > 100 || !isValidMimeType(trimmedFileType)) {
        res.status(400).json({
          success: false,
          message: "File type must be a valid MIME type (e.g. application/pdf, image/jpeg).",
        });
        return;
      }

      // 4. Validate category (optional, max 100)
      let parsedCategory: string | null = null;
      if (category !== undefined && category !== null) {
        if (typeof category !== "string") {
          res.status(400).json({
            success: false,
            message: "Category must be a string.",
          });
          return;
        }
        parsedCategory = category.trim() || null;
        if (parsedCategory && parsedCategory.length > 100) {
          res.status(400).json({
            success: false,
            message: "Category must not exceed 100 characters.",
          });
          return;
        }
      }

      // 5. Validate fileSize (optional, non-negative integer representing bytes)
      let storedFileSize: string | null = null;
      if (fileSize !== undefined && fileSize !== null) {
        if (typeof fileSize !== "number" || !Number.isInteger(fileSize)) {
          res.status(400).json({
            success: false,
            message: "Field 'fileSize' must be an integer representing bytes.",
          });
          return;
        }
        if (fileSize < 0) {
          res.status(400).json({
            success: false,
            message: "Field 'fileSize' cannot be negative.",
          });
          return;
        }
        storedFileSize = fileSize.toString();
      }

      // 6. Validate required flag (optional, strict boolean)
      let parsedRequired = false;
      if (required !== undefined) {
        if (typeof required !== "boolean") {
          res.status(400).json({
            success: false,
            message: "Field 'required' must be a boolean.",
          });
          return;
        }
        parsedRequired = required;
      }

      // 7. Insert into Neon PostgreSQL
      const newItem = await prisma.document.create({
        data: {
          title: trimmedTitle,
          category: parsedCategory,
          fileUrl: trimmedFileUrl,
          fileType: trimmedFileType,
          fileSize: storedFileSize,
          required: parsedRequired,
        },
        select: {
          id: true,
          title: true,
          category: true,
          fileUrl: true,
          fileType: true,
          fileSize: true,
          required: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(201).json({
        success: true,
        data: formatDocument(newItem),
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Documents Error] Failed to create document:", err);
      res.status(500).json({
        success: false,
        message: "Failed to create document.",
      });
    }
  }
);

/**
 * PUT /api/documents/:id
 * Protected management endpoint: Updates an existing document record.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
documentsRouter.put(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Verify existence
      const existing = await prisma.document.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Document not found.",
        });
        return;
      }

      const { title, category, fileUrl, fileType, fileSize, required } = req.body;
      const updateData: {
        title?: string;
        category?: string | null;
        fileUrl?: string;
        fileType?: string;
        fileSize?: string | null;
        required?: boolean;
      } = {};

      if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
          res.status(400).json({
            success: false,
            message: "Title cannot be empty.",
          });
          return;
        }
        const trimmed = title.trim();
        if (trimmed.length > 200) {
          res.status(400).json({
            success: false,
            message: "Title must not exceed 200 characters.",
          });
          return;
        }
        updateData.title = trimmed;
      }

      if (fileUrl !== undefined) {
        if (typeof fileUrl !== "string" || fileUrl.trim() === "") {
          res.status(400).json({
            success: false,
            message: "File URL cannot be empty.",
          });
          return;
        }
        const trimmedUrl = fileUrl.trim();
        if (!isValidHttpUrl(trimmedUrl)) {
          res.status(400).json({
            success: false,
            message: "File URL must be a valid HTTP or HTTPS URL.",
          });
          return;
        }
        updateData.fileUrl = trimmedUrl;
      }

      if (fileType !== undefined) {
        if (typeof fileType !== "string" || fileType.trim() === "") {
          res.status(400).json({
            success: false,
            message: "File type cannot be empty.",
          });
          return;
        }
        const trimmedType = fileType.trim();
        if (trimmedType.length > 100 || !isValidMimeType(trimmedType)) {
          res.status(400).json({
            success: false,
            message: "File type must be a valid MIME type (e.g. application/pdf, image/jpeg).",
          });
          return;
        }
        updateData.fileType = trimmedType;
      }

      if (category !== undefined) {
        if (category === null) {
          updateData.category = null;
        } else if (typeof category === "string") {
          const trimmed = category.trim();
          if (trimmed.length > 100) {
            res.status(400).json({
              success: false,
              message: "Category must not exceed 100 characters.",
            });
            return;
          }
          updateData.category = trimmed || null;
        } else {
          res.status(400).json({
            success: false,
            message: "Category must be a string or null.",
          });
          return;
        }
      }

      if (fileSize !== undefined) {
        if (fileSize === null) {
          updateData.fileSize = null;
        } else if (typeof fileSize === "number") {
          if (!Number.isInteger(fileSize)) {
            res.status(400).json({
              success: false,
              message: "Field 'fileSize' must be an integer representing bytes.",
            });
            return;
          }
          if (fileSize < 0) {
            res.status(400).json({
              success: false,
              message: "Field 'fileSize' cannot be negative.",
            });
            return;
          }
          updateData.fileSize = fileSize.toString();
        } else {
          res.status(400).json({
            success: false,
            message: "Field 'fileSize' must be an integer representing bytes or null.",
          });
          return;
        }
      }

      if (required !== undefined) {
        if (typeof required !== "boolean") {
          res.status(400).json({
            success: false,
            message: "Field 'required' must be a boolean.",
          });
          return;
        }
        updateData.required = required;
      }

      const updated = await prisma.document.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          title: true,
          category: true,
          fileUrl: true,
          fileType: true,
          fileSize: true,
          required: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(200).json({
        success: true,
        data: formatDocument(updated),
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Documents Error] Failed to update document:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update document.",
      });
    }
  }
);

/**
 * DELETE /api/documents/:id
 * Protected management endpoint: Permanently deletes a document record from Neon PostgreSQL.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
documentsRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existing = await prisma.document.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Document not found.",
        });
        return;
      }

      await prisma.document.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Document deleted successfully",
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Documents Error] Failed to delete document:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete document.",
      });
    }
  }
);
