import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../apps/backend/src/app.js";

const ADMIN = { "x-demo-role": "admin" };

describe("User API baseline", () => {
  it("rejects unauthenticated user requests", async () => {
    await request(createApp()).get("/api/users").expect(401);
  });

  it("returns users to the demo administrator", async () => {
    const response = await request(createApp())
      .get("/api/users")
      .set(ADMIN)
      .expect(200);

    expect(response.body).toHaveLength(3);
  });

  it("supports profile updates", async () => {
    const response = await request(createApp())
      .patch("/api/users/usr-001/profile")
      .set(ADMIN)
      .send({
        displayName: "Alice Updated",
        email: "alice.updated@example.test",
        department: "Engineering",
        jobTitle: "Staff Engineer"
      })
      .expect(200);

    expect(response.body.displayName).toBe("Alice Updated");
    expect(response.body.status).toBe("ACTIVE");
  });

  it("does not expose account suspension endpoints in the baseline", async () => {
    await request(createApp())
      .post("/api/users/usr-001/suspend")
      .set(ADMIN)
      .expect(404);
  });
});
