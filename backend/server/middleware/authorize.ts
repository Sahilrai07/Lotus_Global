import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

/**
 * Role-based authorization middleware factory.
 * Verifies that the authenticated user possesses one of the allowed roles.
 * Must always be used after authenticateToken middleware.
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.role) {
      res.status(401).json({
        success: false,
        message: "Authentication required before verifying role permissions.",
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access forbidden: insufficient administrative permissions.",
      });
      return;
    }

    next();
  };
};
