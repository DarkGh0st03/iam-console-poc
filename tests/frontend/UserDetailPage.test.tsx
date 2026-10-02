import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UserDetailPage } from "../../apps/frontend/src/pages/UserDetailPage.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("UserDetailPage baseline", () => {
  it("shows the current status but no suspension action", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          id: "usr-001",
          displayName: "Alice Romano",
          email: "alice.romano@example.test",
          department: "Engineering",
          jobTitle: "Software Engineer",
          status: "ACTIVE"
        })
      })
    );

    render(
      <MemoryRouter initialEntries={["/users/usr-001"]}>
        <Routes>
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("Alice Romano")).toBeInTheDocument());
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /suspend/i })).not.toBeInTheDocument();
  });
});
