var merge = require("webpack-merge");
var webpack = require("webpack");
var path = require("path");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");
var mergePlugin = require("./merge.production");
var config = {
	module: {
		rules: [{
			test: /(\.js)$/,
			loader: "eslint-loader",
			include: path.resolve(process.cwd(), "src"),
			exclude: /(node_modules)/,
			enforce: "pre"
		}]
	},
	plugins: [
		mergePlugin,
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin(banner.common)
	]
};

module.exports = function(common, name, localpath) {
	config.entry = {
		[name]: localpath,
		[`${name}.min`]: localpath,
	};
	return merge.strategy({
		entry: "replace",
		module: "append",
		plugins: "append",
	})(common, config);
};
