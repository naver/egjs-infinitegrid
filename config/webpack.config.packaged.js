var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
	externals: [],
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin([banner.common, "", banner.pkgd].join("\r\n"))
	]
};

module.exports = function(common, name, localpath) {
	config.entry = {
		[`${name}.pkgd`]: localpath,
		[`${name}.pkgd.min`]: localpath,
	};
	return merge.strategy({
		entry: "replace",
		externals: "replace",
		plugins: "append"
	})(common, config);
};
