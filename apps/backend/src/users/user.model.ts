import type { AccountStatus } from "@iam/shared";

export interface UserEntity {
  id: string;
  displayName: string;
  email: string;
  department: string;
  jobTitle: string;
  status: AccountStatus;
}
