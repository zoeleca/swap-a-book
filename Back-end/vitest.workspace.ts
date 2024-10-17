import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/*",
  {
    test: {
      include: ["test/test-e2e/**/*.spec.ts"],
      name: "e2e",
    },
  },
  {
    test: {
      include: ["test/test-integration/**/*.spec.ts"],
      name: "integration",
    },
  },
  {
    test: {
      include: ["test/test-component/**/*.spec.ts"],
      name: "component",
    },
  },
  {
    test: {
      include: ["test/test-unit/**/**/**/*.spec.ts"],
      name: "unit",
    },
  },
]);
