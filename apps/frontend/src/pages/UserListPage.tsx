import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { UserSummary } from "@iam/shared";
import { listUsers } from "../api/users-api.js";
import { DepartmentTag } from "../components/DepartmentTag.js";
import { UserAvatar } from "../components/UserAvatar.js";
import { UserStatusBadge } from "../components/UserStatusBadge.js";

export function UserListPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    listUsers().then(setUsers).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "Unable to load users.");
    });
  }, []);

  const departments = new Set(users.map((user) => user.department)).size;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>Users</h1>
          <p className="page-subtitle">
            {users.length} people across {departments} departments
          </p>
        </div>
        <span className="baseline-label">Baseline</span>
      </div>

      {error ? <p className="error-message">{error}</p> : null}

      <div className="user-grid">
        {users.map((user) => (
          <Link className="user-card" to={`/users/${user.id}`} key={user.id}>
            <UserAvatar name={user.displayName} department={user.department} />
            <div className="user-card-main">
              <strong>{user.displayName}</strong>
              <span>{user.email}</span>
            </div>
            <DepartmentTag department={user.department} />
            <UserStatusBadge status={user.status} />
          </Link>
        ))}
      </div>
    </section>
  );
}
