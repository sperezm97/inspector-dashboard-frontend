module.exports = {
  extends: ["airbnb", "prettier"],
  ignorePatterns: ['**/@core/**'],

  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false
  },

  env: {
    browser: true,
    jest: true
},

  rules: {
    "max-len": ["error", {"code": 100}],
    "prefer-promise-reject-errors": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/prop-types": ["warn"],
    "no-return-assign": ["off"]
  },

}
