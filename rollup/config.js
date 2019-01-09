
const pluginResolve = require("rollup-plugin-node-resolve");
const pluginBabel = require("rollup-plugin-babel");
const pluginTypescript = require("rollup-plugin-typescript");
const pluginReplace = require("rollup-plugin-replace");
const pluginUglify = require("rollup-plugin-uglify").uglify;
const pluginProtoMinify = require("rollup-plugin-prototype-minify");
const {common, pkgd} = require("../config/banner");
const version = require("../package.json").version;


const bannerCommon = `/*
${common}
*/`;
const bannerPkgd = `/*
${common}
${pkgd}
*/`;
const uglify = pluginUglify({
	sourcemap: true,
	output: {
		comments: (node, comment) => {
			const text = comment.value;
			const type = comment.type;

			if (type === "comment2") {
				// multiline comment
				return /@egjs\/infinitegrid/.test(text);
			}
			return false;
		},
	},
});

const protoMinify = pluginProtoMinify({
	sourcemap: true,
});
const typescript = pluginTypescript({
	"module": "es2015",
	"target": "es5",
	"lib": ["es2015", "dom"],
	"exclude": "node_modules/**",
	"sourceMap": true,
});
const babel = pluginBabel({
	babelrc: false,
	"presets": [
		[
			"@babel/preset-env",
			{
				"loose": true,
				"modules": false,
			},
		],
	],
	"plugins": [
		"no-side-effect-class-properties",
		[
			"@babel/plugin-proposal-class-properties",
			{
				"loose": true,
			},
		],
		"@babel/plugin-transform-object-assign",
		"transform-es3-property-literals",
		"transform-es3-member-expression-literals",
	],
});
const replace = pluginReplace({
	"#__VERSION__#": version,
	"/** @class */": "/*#__PURE__*/",
	delimiters: ["", ""],
});
const _resolve = pluginResolve({});

function umd({
	input,
	output,
	library,
	ugly,
	externals = {},
	resolve,
}) {
	const plugins = [typescript, protoMinify, replace];

	resolve && plugins.push(_resolve);
	ugly && plugins.push(uglify);
	return {
		input,
		plugins,
		external: Object.keys(externals),
		output: {
			file: output,
			globals: externals,
			banner: resolve ? bannerPkgd : bannerCommon,
			freeze: false,
			name: library,
			format: "umd",
			exports: "default",
			interop: false,
			sourcemap: true,
		},
	};
}

exports.umds = function umds({
	input,
	outputs,
	library,
	externals,
	resolve,
	ugly,
}) {
	return outputs.map(output => umd({
		input,
		output,
		library,
		externals,
		resolve: resolve || ~output.indexOf(".pkgd"),
		ugly: ugly || ~output.indexOf(".min"),
	}));
};

exports.esm = function esm({
	input,
	output,
}) {
	const plugins = [typescript, protoMinify, replace];

	return {
		input,
		plugins,
		output: {
			file: output,
			banner: bannerCommon,
			freeze: false,
			format: "esm",
			interop: false,
			sourcemap: true,
		},
	};
};

exports.umd = umd;
