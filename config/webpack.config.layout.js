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
		"FrameLayout": "./src/layouts/FrameLayout.js"
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
			exclude: /node_modules/,
			loader: "babel-loader"
		}],
	},
};

module.exports = function (common) {
	return config;
};
