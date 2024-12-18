module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transpile JavaScript/JSX files using Babel
  },
  transformIgnorePatterns: [
    "node_modules/**", // Allow Jest to process ES modules in axios
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^react-router-dom$": "node_modules/react-router-dom",
  },
}
