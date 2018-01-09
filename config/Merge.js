const fs = require("fs");
const path = require("path");

class Merge {
	constructor(files) {
		this.files = files;
	}
	apply(compiler) {
		const contents = this.files.map(file => {
			const filePath = path.resolve(__dirname, file);

			if (!filePath) {
				return "";
			}
			return fs.readFileSync(filePath);
		}).join("");

		compiler.plugin("compilation", compilation => {
			compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
				chunks.forEach(chunk => {
					chunk.files.forEach(file => {
						const asset = compilation.assets[file];

						asset._source.children.unshift(contents);
					});
				});
				callback();
			});
		});
	}
}

module.exports = Merge;
