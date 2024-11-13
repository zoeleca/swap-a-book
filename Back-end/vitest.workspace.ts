import {defineWorkspace} from "vitest/config";

export default defineWorkspace([
  "packages/*",
  {
    test: {
      include: ["test/tests-e2e/**/*.spec.ts"],
      name: "e2e",
    },
  },
  {
    test: {
      include: ["test/tests-integration/**/*.spec.ts"],
      name: "integration",
    },
  },
  {
    test: {
      include: ["test/tests-component/**/*.spec.ts"],
      name: "component",
    },
  },
  {
    test: {
      include: ["test/tests-unit/**/**/**/*.spec.ts"],
      name: "unit",
    },
  },
]);
