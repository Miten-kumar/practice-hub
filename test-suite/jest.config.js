module.exports = {
  testEnvironment: "jsdom",

  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  collectCoverage: true,
  coverageDirectory: "coverage",
};