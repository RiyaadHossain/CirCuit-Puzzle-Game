const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: ["**/*.test.ts"], // all test files
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // support for your path aliases,
    "^@config$": "<rootDir>/src/config/index.ts", // add this line
    "^@config/(.*)$": "<rootDir>/src/config/$1", // add this line for submodules
  },
  transform: {
    ...tsJestTransformCfg,
  },
};
