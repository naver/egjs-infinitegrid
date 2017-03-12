var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var WriteFilePlugin = require("write-file-webpack-plugin");
var banner = require("./config/banner");
var config = require("./config/webpack");
var path = require("path");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env) {
	env = env || {};

	if (env.mode === "production") {
		for (var p in config.entry) {
			config.entry[p + ".min"] = config.entry[p];
		}
		config.module.rules.push({
			test: /(\.js)$/,
			loader: "eslint-loader",
			include: path.resolve(process.cwd(), "src"),
			exclude: /(node_modules)/,
			enforce: "pre"
		});
		config.plugins.push(
			new CleanWebpackPlugin(["dist"], {
				root: path.resolve(__dirname),
				verbose: true,
				dry: false
			}),
			new UglifyJSPlugin({
				include: /\.min\.js$/,
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true,
					warnings: false
				},
				output: {
					screw_ie8: false
				},
				comments: false
			}),
			new webpack.BannerPlugin(banner.common)
		);
	} else if (env.mode === "pkgd") {
		for (var p in config.entry) {
			config.entry[p + ".pkgd"] = config.entry[p];
			config.entry[p + ".pkgd.min"] = config.entry[p];
			delete config.entry[p];
		}
		config.plugins.push(
			new UglifyJSPlugin({
				include: /\.min\.js$/,
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					screw_ie8: true,
					warnings: false
				},
				output: {
					screw_ie8: false
				},
				comments: false,
				extractComments: {
					banner: banner.pkgd
				}
			}),
			new webpack.BannerPlugin(banner.pkgd)
		);
		config.externals = [];
	} else if (env.mode === "server") {
		config.devServer = {
			publicPath: "/dist/"
		};
		config.plugins.push(new WriteFilePlugin());
	}
	return config;
};
