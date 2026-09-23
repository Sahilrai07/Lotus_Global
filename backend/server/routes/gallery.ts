import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { authenticateToken } from "../middleware/auth";
import { authorizeRoles } from "../middleware/authorize";

export const galleryRouter = Router();

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
 * GET /api/gallery
 * Public endpoint: Returns all gallery items ordered by sortOrder ascending, then createdAt descending.
 */
galleryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        title: true,
        category: true,
        imageUrl: true,
        caption: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Gallery Error] Failed to fetch gallery items:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve gallery items.",
    });
  }
});

/**
 * GET /api/gallery/:id
 * Public endpoint: Returns a single gallery item by its ID. Returns 404 if not found.
 */
galleryRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await prisma.galleryItem.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        imageUrl: true,
        caption: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!item) {
      res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Gallery Error] Failed to fetch gallery item by ID:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve gallery item.",
    });
  }
});

/**
 * POST /api/gallery
 * Protected management endpoint: Creates a new gallery item in Neon PostgreSQL.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
galleryRouter.post(
  "/",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { title, category, imageUrl, caption, sortOrder } = req.body;

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

      // 2. Validate imageUrl (required, valid HTTP/HTTPS URL)
      if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
        res.status(400).json({
          success: false,
          message: "Image URL is required.",
        });
        return;
      }

      const trimmedImageUrl = imageUrl.trim();
      if (!isValidHttpUrl(trimmedImageUrl)) {
        res.status(400).json({
          success: false,
          message: "Image URL must be a valid HTTP or HTTPS URL.",
        });
        return;
      }

      // 3. Validate category (optional, default "Campus", max 100)
      let parsedCategory = "Campus";
      if (category !== undefined) {
        if (typeof category !== "string") {
          res.status(400).json({
            success: false,
            message: "Category must be a string.",
          });
          return;
        }
        parsedCategory = category.trim() || "Campus";
        if (parsedCategory.length > 100) {
          res.status(400).json({
            success: false,
            message: "Category must not exceed 100 characters.",
          });
          return;
        }
      }

      // 4. Validate caption (optional, max 500)
      let parsedCaption: string | null = null;
      if (caption !== undefined && caption !== null) {
        if (typeof caption !== "string") {
          res.status(400).json({
            success: false,
            message: "Caption must be a string.",
          });
          return;
        }
        parsedCaption = caption.trim() || null;
        if (parsedCaption && parsedCaption.length > 500) {
          res.status(400).json({
            success: false,
            message: "Caption must not exceed 500 characters.",
          });
          return;
        }
      }

      // 5. Validate sortOrder (optional integer, default 0)
      let parsedSortOrder = 0;
      if (sortOrder !== undefined) {
        if (typeof sortOrder !== "number" || !Number.isInteger(sortOrder)) {
          res.status(400).json({
            success: false,
            message: "Field 'sortOrder' must be an integer.",
          });
          return;
        }
        parsedSortOrder = sortOrder;
      }

      // 6. Insert into Neon PostgreSQL
      const newItem = await prisma.galleryItem.create({
        data: {
          title: trimmedTitle,
          category: parsedCategory,
          imageUrl: trimmedImageUrl,
          caption: parsedCaption,
          sortOrder: parsedSortOrder,
        },
        select: {
          id: true,
          title: true,
          category: true,
          imageUrl: true,
          caption: true,
          sortOrder: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(201).json({
        success: true,
        data: newItem,
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Gallery Error] Failed to create gallery item:", err);
      res.status(500).json({
        success: false,
        message: "Failed to create gallery item.",
      });
    }
  }
);

/**
 * PUT /api/gallery/:id
 * Protected management endpoint: Updates an existing gallery item.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
galleryRouter.put(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Verify existence
      const existing = await prisma.galleryItem.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Gallery item not found.",
        });
        return;
      }

      const { title, category, imageUrl, caption, sortOrder } = req.body;
      const updateData: {
        title?: string;
        category?: string;
        imageUrl?: string;
        caption?: string | null;
        sortOrder?: number;
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

      if (imageUrl !== undefined) {
        if (typeof imageUrl !== "string" || imageUrl.trim() === "") {
          res.status(400).json({
            success: false,
            message: "Image URL cannot be empty.",
          });
          return;
        }
        const trimmedUrl = imageUrl.trim();
        if (!isValidHttpUrl(trimmedUrl)) {
          res.status(400).json({
            success: false,
            message: "Image URL must be a valid HTTP or HTTPS URL.",
          });
          return;
        }
        updateData.imageUrl = trimmedUrl;
      }

      if (category !== undefined) {
        if (typeof category !== "string") {
          res.status(400).json({
            success: false,
            message: "Category must be a string.",
          });
          return;
        }
        const trimmed = category.trim() || "Campus";
        if (trimmed.length > 100) {
          res.status(400).json({
            success: false,
            message: "Category must not exceed 100 characters.",
          });
          return;
        }
        updateData.category = trimmed;
      }

      if (caption !== undefined) {
        if (caption === null) {
          updateData.caption = null;
        } else if (typeof caption === "string") {
          const trimmed = caption.trim();
          if (trimmed.length > 500) {
            res.status(400).json({
              success: false,
              message: "Caption must not exceed 500 characters.",
            });
            return;
          }
          updateData.caption = trimmed || null;
        } else {
          res.status(400).json({
            success: false,
            message: "Caption must be a string or null.",
          });
          return;
        }
      }

      if (sortOrder !== undefined) {
        if (typeof sortOrder !== "number" || !Number.isInteger(sortOrder)) {
          res.status(400).json({
            success: false,
            message: "Field 'sortOrder' must be an integer.",
          });
          return;
        }
        updateData.sortOrder = sortOrder;
      }

      const updatedItem = await prisma.galleryItem.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          title: true,
          category: true,
          imageUrl: true,
          caption: true,
          sortOrder: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(200).json({
        success: true,
        data: updatedItem,
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Gallery Error] Failed to update gallery item:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update gallery item.",
      });
    }
  }
);

/**
 * DELETE /api/gallery/:id
 * Protected management endpoint: Permanently deletes a gallery item from Neon PostgreSQL.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
galleryRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existing = await prisma.galleryItem.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Gallery item not found.",
        });
        return;
      }

      await prisma.galleryItem.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Gallery item deleted successfully",
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Gallery Error] Failed to delete gallery item:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete gallery item.",
      });
    }
  }
);
