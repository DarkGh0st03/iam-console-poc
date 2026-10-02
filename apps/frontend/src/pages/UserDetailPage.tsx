import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { UpdateUserProfileInput, UserDetails } from "@iam/shared";
import { getUser, updateUserProfile } from "../api/users-api.js";
import { UserStatusBadge } from "../components/UserStatusBadge.js";

export function UserDetailPage() {
  const { id = "" } = useParams();
  const [user, setUser] = useState<UserDetails>();
  const [form, setForm] = useState<UpdateUserProfileInput>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    getUser(id)
      .then((loaded) => {
        setUser(loaded);
        setForm({
          displayName: loaded.displayName,
          email: loaded.email,
          department: loaded.department,
          jobTitle: loaded.jobTitle
        });
      })
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Unable to load user.");
      });
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form) return;

    setMessage(undefined);
    setError(undefined);
    try {
      const updated = await updateUserProfile(id, form);
      setUser(updated);
      setMessage("Profile updated successfully.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to update profile.");
    }
  }

  if (error && !user) {
    return <p className="error-message">{error}</p>;
  }

  if (!user || !form) {
    return <p>Loading user...</p>;
  }

  return (
    <section>
      <Link to="/">← Back to users</Link>

      <div className="page-header detail-header">
        <div>
          <p className="eyebrow">User details</p>
          <h1>{user.displayName}</h1>
        </div>
        <UserStatusBadge status={user.status} />
      </div>

      <div className="notice">
        Account status is currently read-only in this baseline. Suspension and
        reactivation are intentionally not implemented yet.
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Display name
          <input
            value={form.displayName}
            onChange={(event) => setForm({ ...form, displayName: event.target.value })}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <label>
          Department
          <input
            value={form.department}
            onChange={(event) => setForm({ ...form, department: event.target.value })}
          />
        </label>

        <label>
          Job title
          <input
            value={form.jobTitle}
            onChange={(event) => setForm({ ...form, jobTitle: event.target.value })}
          />
        </label>

        <button type="submit">Save profile</button>
      </form>

      {message ? <p className="success-message">{message}</p> : null}
      {error ? <p className="error-message">{error}</p> : null}
    </section>
  );
}
