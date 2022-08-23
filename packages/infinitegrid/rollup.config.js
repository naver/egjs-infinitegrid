
const buildHelper = require("@egjs/build-helper");
const name = "InfiniteGrid";

export default buildHelper([
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.js",
		format: "umd",
		resolve: true,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.min.js",
		format: "umd",
		uglify: true,
		resolve: true,
	},
	{
		input: "./src/index.cjs.ts",
		output: "./dist/infinitegrid.cjs.js",
		format: "cjs",
		exports: "named",
	},
	{
		input: "./src/index.ts",
		output: "./dist/infinitegrid.esm.js",
		format: "esm",
		exports: "named",
	},
]);

