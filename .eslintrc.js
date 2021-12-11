module.exports = {
  extends: ["airbnb", "prettier"],
  ignorePatterns: ["**/@core/**"],

  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: false
  },

  env: {
    browser: true,
    jest: true
  },

  rules: {
    "prefer-promise-reject-errors": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": ["warn"],
    "no-return-assign": ["off"]
  }
};
