const buildHelper = require("@egjs/build-helper");
const vuePlugin = require("rollup-plugin-vue");

const defaultOptions = {
  sourcemap: true,
  input: "./src/index.ts",
  exports: "named",
  plugins: [
    vuePlugin(),
  ]
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/infinitegrid.esm.js",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/infinitegrid.cjs.js",
  },
]);
