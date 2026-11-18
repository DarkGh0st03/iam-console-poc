/** States of a user account. */
export type AccountStatus = "ACTIVE";

export const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE"
} as const satisfies Record<string, AccountStatus>;
