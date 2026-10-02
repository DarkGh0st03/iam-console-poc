import type { AccountStatus } from "./account-status.js";

export interface UserSummary {
  id: string;
  displayName: string;
  email: string;
  status: AccountStatus;
}

export interface UserDetails extends UserSummary {
  department: string;
  jobTitle: string;
}

export interface UpdateUserProfileInput {
  displayName: string;
  email: string;
  department: string;
  jobTitle: string;
}

export interface ApiError {
  code: string;
  message: string;
}
