var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");
var path = require("path");

var config = {
	entry: {
		"GoogleLayout": "./src/layouts/GoogleLayout.js",
		"GridLayout": "./src/layouts/GridLayout.js",
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: "[name]",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	devtool: "cheap-source-map",
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
