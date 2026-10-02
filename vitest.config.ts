import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
    environmentMatchGlobs: [["tests/frontend/**/*.test.tsx", "jsdom"]],
    setupFiles: ["./tests/setup.ts"]
  }
});
