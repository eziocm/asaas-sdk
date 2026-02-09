/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.ts"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "src/**/*.ts",
        // Exclude types and main export from coverage
        "!src/types/**/*.ts",
        "!src/index.ts"
    ],
    moduleFileExtensions: ["ts", "js", "json", "node"],
};
