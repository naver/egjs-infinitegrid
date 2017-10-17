var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");
var path = require("path");

var config = {
	entry: {
		"JustifiedLayout": "./src/layouts/JustifiedLayout.js",
		"GridLayout": "./src/layouts/GridLayout.js",
		"FrameLayout": "./src/layouts/FrameLayout.js",
		"FacebookLayout": "./src/layouts/FacebookLayout.js",
		"LightBoxLayout": "./src/layouts/LightBoxLayout.js",
		"PackingLayout": "./src/layouts/PackingLayout.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: "[name]",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
//	devtool: "cheap-source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules|build/,
			loader: "babel-loader",
		}],
	},
	plugins: [
		new webpack.ProvidePlugin({
			babelHelpers: path.resolve(__dirname, "../lib/PackingLayout/build/babel/babel-external-helpers.js"),
		}),
	],
};

module.exports = function (common) {
	return config;
};
