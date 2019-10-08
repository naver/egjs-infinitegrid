const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/react-infinitegrid/index.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
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
