import { expect, test } from "@playwright/test";

test("administrator can inspect a user profile in the baseline console", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  await page.getByText("Alice Romano").click();
  await expect(page.getByRole("heading", { name: "Alice Romano" })).toBeVisible();
  await expect(page.getByText("ACTIVE")).toBeVisible();
  await expect(page.getByRole("button", { name: /suspend/i })).toHaveCount(0);
});
