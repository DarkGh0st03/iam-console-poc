import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../apps/backend/src/users/user.repository.js";
import { UserService } from "../../apps/backend/src/users/user.service.js";

describe("UserService baseline", () => {
  it("lists seeded users", () => {
    const service = new UserService(new InMemoryUserRepository());
    expect(service.listUsers()).toHaveLength(3);
    expect(service.listUsers().every((user) => user.status === "ACTIVE")).toBe(true);
  });

  it("updates profile information without changing status", () => {
    const service = new UserService(new InMemoryUserRepository());
    const before = service.getUser("usr-001");

    const updated = service.updateProfile("usr-001", {
      displayName: "Alice R.",
      email: "alice.r@example.test",
      department: "Platform Engineering",
      jobTitle: "Senior Software Engineer"
    });

    expect(updated.displayName).toBe("Alice R.");
    expect(updated.status).toBe(before.status);
  });
});
