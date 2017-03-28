var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
	entry: {
		"infinitegrid.pkgd": "./src/index.js",
		"infinitegrid.pkgd.min": "./src/index.js"
	},
	externals: [],
    plugins: [
        new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin(banner.pkgd)
    ]
};

module.exports = function(common) {
	return merge.strategy({
		entry: "replace",
		externals: "replace",
        plugins: "append"
	})(common, config);
};