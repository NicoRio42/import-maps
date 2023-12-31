module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  plugins: ["import"],
  settings: {
    "import/resolver": {
      "@jsenv/importmap-eslint-resolver": {
        projectDirectoryUrl: __dirname,
        importMapFileRelativeUrl: "./project.importmap",
      },
    },
  },
};
