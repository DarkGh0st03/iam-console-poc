import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { UserSummary } from "@iam/shared";
import { listUsers } from "../api/users-api.js";
import { UserStatusBadge } from "../components/UserStatusBadge.js";

export function UserListPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    listUsers().then(setUsers).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "Unable to load users.");
    });
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Users</h1>
        </div>
        <span className="baseline-label">Baseline</span>
      </div>

      {error ? <p className="error-message">{error}</p> : null}

      <div className="user-grid">
        {users.map((user) => (
          <Link className="user-card" to={`/users/${user.id}`} key={user.id}>
            <div>
              <strong>{user.displayName}</strong>
              <span>{user.email}</span>
            </div>
            <UserStatusBadge status={user.status} />
          </Link>
        ))}
      </div>
    </section>
  );
}
