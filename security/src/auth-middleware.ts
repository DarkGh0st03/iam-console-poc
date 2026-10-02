import type { NextFunction, Request, Response } from "express";
import { SECURITY_CONFIG } from "./security-config.js";

export function requireAdminRole(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const role = request.header(SECURITY_CONFIG.roleHeader);

  if (!role) {
    response.status(401).json({
      code: "AUTH_REQUIRED",
      message: `Missing ${SECURITY_CONFIG.roleHeader} header.`
    });
    return;
  }

  if (!SECURITY_CONFIG.allowedRoles.has(role)) {
    response.status(403).json({
      code: "FORBIDDEN",
      message: "The caller is not authorized to use the administration API."
    });
    return;
  }

  next();
}
