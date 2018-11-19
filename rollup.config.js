
// infinitegrid.js
// infinitegrid.min.js
// infinitegrid.pkgd.js
// infinitegrid.pkgd.min.js
// infinitegrid.esm.js
// infinitegrid.gridlayout.js
// infinitegrid.gridlayout.min.js
// infinitegrid.justifiedlayout.js
// infinitegrid.justifiedlayout.min.js
// infinitegrid.squarelayout.js
// infinitegrid.squarelayout.min.js
// infinitegrid.framelayout.js
// infinitegrid.framelayout.min.js
// infinitegrid.packinglayout.js
// infinitegrid.packinglayout.min.js

const {esm, umds} = require("./rollup/config");


const layouts = ["gridlayout", "justifiedlayout", "squarelayout", "framelayout", "packinglayout"];
const layoutUmds = layouts.reduce((arr, layout) => arr.concat(umds({
	input: `./src/index.${layout}.js`,
	library: "eg.InfiniteGrid",
	outputs: [
		`./dist/infinitegrid.${layout}.js`,
		`./dist/infinitegrid.${layout}.min.js`,
	],
	resolve: true,
})), []);


export default [
	...umds({
		input: "./src/index.umd.js",
		outputs: [
			`./dist/infinitegrid.js`,
			`./dist/infinitegrid.min.js`,
		],
		library: "eg.InfiniteGrid",
		externals: {
			"@egjs/component": "eg.Component",
		},
	}),
	...umds({
		input: "./src/index.umd.js",
		outputs: [
			`./dist/infinitegrid.pkgd.js`,
			`./dist/infinitegrid.pkgd.min.js`,
		],
		library: "eg.InfiniteGrid",
	}),
	...umds({
		input: "./src/Parallax.js",
		outputs: [
			`./dist/parallax.js`,
			`./dist/parallax.min.js`,
		],
		library: "eg.Parallax",
	}),
	...layoutUmds,
	esm({
		input: "./src/index.js",
		output: "./dist/infinitegrid.esm.js",
	}),
];

