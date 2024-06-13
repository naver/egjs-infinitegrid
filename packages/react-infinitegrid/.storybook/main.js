const path = require("path");

module.exports = {
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader',
      options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true
      },
    });

    return config;
  },
  stories: [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    // "@storybook/addon-knobs/register",
    "@storybook/addon-docs/register",
    "@storybook/addon-controls/register",
    "@storybook/addon-viewport/register",
    "storybook-addon-preview/register",
    "storybook-dark-mode/register",
  ],
};
