const buildHelper = require("@egjs/build-helper");
const VuePlugin = require("rollup-plugin-vue");


const defaultOptions = {
	input: "./src/index.ts",
	sourcemap: true,
	plugins: [VuePlugin],
};

export default buildHelper([
	{
		...defaultOptions,
		format: "es",
		exports: "named",
		output: "./dist/infinitegrid.esm.js",
	},
	{
		...defaultOptions,
		format: "cjs",
		output: "./dist/infinitegrid.cjs.js",
	},
]);
