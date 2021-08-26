const path = require("path");

module.exports = {
  webpackFinal: (config) => {
    config.resolve.alias["@egjs/infinitegrid"] = path.resolve(__dirname, '../../../dist/infinitegrid.esm.js');
    return config;
  },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs/register",
    "@storybook/addon-controls",
    "@storybook/addon-viewport/register",
    "storybook-addon-preview/register",
  ]
}
