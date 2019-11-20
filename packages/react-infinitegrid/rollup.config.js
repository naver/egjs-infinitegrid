const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
    tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
		input: "./src/react-infinitegrid/index.ts",
		exports: "named",
		format: "es",
    output: "./dist/infinitegrid.esm.js",
  },
  {
		...defaultOptions,
		input: "./src/react-infinitegrid/index.umd.ts",
		exports: "default",
    format: "cjs",
    output: "./dist/infinitegrid.cjs.js",
  },
]);
