// jest.config.js
module.exports = {
    moduleFileExtensions: [
        "js",
        "json",
        "ts"
      ],
      rootDir: ".",
      testRegex: ".*\\.spec\\.ts$",
      transform: {
        "^.+\\.(t|j)s$": "ts-jest"
      },
      collectCoverageFrom: [
        "**/*.(t|j)s"
      ],
      coverageDirectory: "./coverage",
      testEnvironment: "node",
      roots: [
        "<rootDir>/apps/"
      ],
      coveragePathIgnorePatterns: ["/node_modules/", "/test/", '\\.module\\.ts$', 'main.ts'],
    };