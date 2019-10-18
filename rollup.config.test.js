const buildHelper = require("@egjs/build-helper");
const name = "eg.InfiniteGrid";
const external = {
	"@egjs/component": "eg.Component",
	"@egjs/list-differ": "eg.ListDiffer",
	"@egjs/lazyloaded": "eg.LazyLoaded",
};


export default buildHelper([
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.js",
		format: "umd",
		external,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.min.js",
		uglify: true,
		format: "umd",
		external,
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.pkgd.js",
		resolve: true,
		uglify: false,
		format: "umd",
	},
	{
		name,
		input: "./src/index.umd.ts",
		output: "./dist/infinitegrid.pkgd.min.js",
		resolve: true,
		uglify: true,
		format: "umd",
	},
	{
		name: "eg.Parallax",
		input: "./src/Parallax.ts",
		output: "./dist/parallax.min.js",
		resolve: true,
		uglify: true,
		format: "umd",
	},
]);
