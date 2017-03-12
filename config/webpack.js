var pkg = require("../package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
	entry: {
		"infinitegrid": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library:  ["eg", "InfiniteGrid"],
		libraryTarget: "umd",
	},
	externals: [{
		"eg.component": {
			commonjs: "eg.component",
			commonjs2: "eg.component",
			amd: "eg.component",
			root: ["eg", "Component"]
		}
	}],
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					"presets": [ 
						[
							"es2015",
							{
								"loose": true,
								"modules": false
							}
						]
					],
					"plugins": [
						"add-module-exports"
					]
				}
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: function (match, p1, offset, string) {
								return pkg.version;
							}
						}
					]}
				)
            }
		]
	},
	plugins: [new StringReplacePlugin()]
};
