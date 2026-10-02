export const SECURITY_CONFIG = {
  roleHeader: "x-demo-role",
  allowedRoles: new Set(["admin"])
} as const;
