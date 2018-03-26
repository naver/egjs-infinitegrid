var merge = require("webpack-merge");
var webpack = require("webpack");
var path = require("path");
var banner = require("./banner");
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
		new webpack.BannerPlugin(banner.common)
	]
};

module.exports = function(common, name, localpath) {
	config.entry = {
		[`${name}.module`]: localpath,
	};
	return merge.strategy({
		entry: "replace",
		module: "append",
		plugins: "append",
	})(common, config);
};
