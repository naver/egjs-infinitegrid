const path = require("path");

module.exports = {
  webpackFinal: config => {
    config.resolve.alias["@egjs/infinitegrid"] = path.resolve(__dirname, '../../../dist/infinitegrid.esm.js');

    return config;
  },
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-controls/register",
    "@storybook/addon-viewport/register",
    "storybook-addon-preview/register",
    "storybook-dark-mode/register",
  ],
};
