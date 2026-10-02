/**
 * Baseline account states.
 *
 * The Account Suspension thesis task will extend this type with SUSPENDED.
 */
export type AccountStatus = "ACTIVE";

export const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE"
} as const satisfies Record<string, AccountStatus>;
