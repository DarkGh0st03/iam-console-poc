import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environmentMatchGlobs: [["tests/frontend/**/*.test.tsx", "jsdom"]],
    setupFiles: ["./tests/setup.ts"]
  }
});
