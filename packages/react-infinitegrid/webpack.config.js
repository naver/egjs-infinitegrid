const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");

const JS_DR = path.resolve(__dirname, "examples/js");


function buildEntries() {
	return fs.readdirSync(JS_DR).reduce((entries, dir) => {
		if (dir === "dat.gui.js") {
			return entries;
		}
		entries[dir] = path.join(JS_DR, dir);

		return entries;
	}, {});
}


module.exports = {
	devtool: "inline-source-map",
	entry: buildEntries(),
	output: {
		filename: "[name]",
		path: `${__dirname}/examples/build/`,
		publicPath: "/exmaples/build/",
	},
	devServer: {
		contentBase: `${__dirname}/examples`,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			},
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: "commons.js",
		}), new WriteFilePlugin(),
	],
};
