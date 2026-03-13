export default {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: '.',
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup/setup.ts"],
  testMatch: ["**/tests/**/*.test.ts"]
}