var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");
var path = require("path");

var config = {
	entry: {
<<<<<<< HEAD
		"JustifiedLayout": "./src/layouts/JustifiedLayout.js",
		"GridLayout": "./src/layouts/GridLayout.js",
		"FrameLayout": "./src/layouts/FrameLayout.js"
=======
		"GoogleLayout": "./src/layouts/GoogleLayout.js",
		"GridLayout": "./src/layouts/GridLayout.js",
>>>>>>> c26076b... test(Layout): test GoogleLayout  - remove Item
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: "[name]",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
<<<<<<< HEAD
//	devtool: "cheap-source-map",
=======
	devtool: "cheap-source-map",
>>>>>>> c26076b... test(Layout): test GoogleLayout  - remove Item
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}],
	},
};

module.exports = function (common) {
	return config;
};
