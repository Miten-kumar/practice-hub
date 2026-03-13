export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTest.ts"],
  maxWorkers: 1,
};
