import { expect, test } from "@playwright/test";

test("administrator can open a user profile from the user list", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  await page.getByText("Alice Romano").click();
  await expect(page.getByRole("heading", { name: "Alice Romano" })).toBeVisible();
  await expect(page.getByText("ACTIVE", { exact: true })).toBeVisible();
});
