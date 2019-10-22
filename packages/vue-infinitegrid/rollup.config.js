const buildHelper = require("@egjs/build-helper");
const VuePlugin = require("rollup-plugin-vue");


const defaultOptions = {
	sourcemap: true,
	plugins: [VuePlugin],
};

export default buildHelper([
	{
		...defaultOptions,
		input: "./src/index.ts",
		format: "es",
		exports: "named",
		output: "./dist/infinitegrid.esm.js",
	},
	{
		...defaultOptions,
		input: "./src/index.umd.ts",
		format: "cjs",
		output: "./dist/infinitegrid.cjs.js",
	},
]);
