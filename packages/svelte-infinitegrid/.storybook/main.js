const autoPreprocess = require('svelte-preprocess');
const path = require("path");

module.exports = {
  webpackFinal: (config) => {
    const svelteLoader = config.module.rules.find(
      r => r.loader && r.loader.includes('svelte-loader'),
    );
    svelteLoader.options.preprocess = autoPreprocess({
      less: { includePaths: ['src', 'node_modules'] },
      css: { includePaths: ['src', 'node_modules'] },
      typescript: {
        tsconfigFile: './tsconfig.json',
        transpileOnly: true,
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias["@egjs/infinitegrid"] = path.resolve(__dirname, '../../../dist/infinitegrid.esm.js');
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
