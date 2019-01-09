var merge = require("webpack-merge");
var webpack = require("webpack");
var pkg = require("./package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

function getConfig(env) {
	return {
		entry: {
			[env.name.toLowerCase()]: env.path
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "[name].ts",
			library: [pkg.namespace.eg, env.name],
			libraryTarget: "umd",
		}
	};
}

var config = {
	externals: {
		"@egjs/component": {
			commonjs: "@egjs/component",
			commonjs2: "@egjs/component",
			amd: "@egjs/component",
			root: [pkg.namespace.eg, "Component"]
		}
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	devtool: "cheap-source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		},
		{
			test: /\.tsx?$/,
			loader: 'awesome-typescript-loader'
		},
		{
			test: /(\.js)$/,
			loader: StringReplacePlugin.replace({
				replacements: [{
					pattern: /#__VERSION__#/ig,
					replacement: function (match, p1, offset, string) {
						return pkg.version;
					}
				}]
			})
		}]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new StringReplacePlugin()
	]
};

module.exports = function (env) {
	env = Object.assign({
		type: "development",
		name: "InfiniteGrid",
		path: "./src/index.umd.ts",
	}, env);

	const partConfig = require(path.resolve(__dirname, "config") + "/webpack.config." + env.type + ".ts");

	return partConfig(Object.assign(config, getConfig(env)), env.name.toLowerCase(), env.path);
};
