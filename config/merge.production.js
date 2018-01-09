var Merge = require("./merge");

module.exports = new Merge([
	"./polyfills/Array.prototype.forEach.js",
	"./polyfills/Array.prototype.map.js",
	"./polyfills/Array.prototype.filter.js",
	"./polyfills/Array.prototype.every.js",
	"./polyfills/Array.prototype.indexOf.js",
	"./polyfills/Array.prototype.lastIndexOf.js",
	"./polyfills/Array.prototype.fill.js"
 ]);