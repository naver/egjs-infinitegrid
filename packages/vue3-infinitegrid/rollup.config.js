const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  sourcemap: true,
  input: "./src/index.ts",
  exports: "named",
  commonjs: true,
  external: {
    vue: "vue",
  },
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
    input: "./src/index.umd.ts",
    exports: "default",
    output: "./dist/infinitegrid.cjs.js",
  },
]);
