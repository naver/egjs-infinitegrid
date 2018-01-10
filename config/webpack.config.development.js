var merge = require("webpack-merge");
var WriteFilePlugin = require("write-file-webpack-plugin");
var config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/"
	},
	plugins: [new WriteFilePlugin()]
};

module.exports = function(common, name, localpath) {
	config.entry = {
		[name]: localpath,
	};
	return merge(common, config);
};
