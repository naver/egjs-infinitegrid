const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

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
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-google-analytics",
    "@storybook/addon-controls/register",
    "@storybook/addon-viewport/register",
    "storybook-addon-preview/register",
    "storybook-dark-mode/register",
    "@storybook/addon-essentials",
  ],
};
