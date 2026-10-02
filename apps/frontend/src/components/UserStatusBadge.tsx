import type { AccountStatus } from "@iam/shared";

export interface UserStatusBadgeProps {
  status: AccountStatus;
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}
