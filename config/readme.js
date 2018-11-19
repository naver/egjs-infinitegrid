
const fs = require("fs");

const data = fs.readFileSync("./README.md", "utf8");


fs.writeFileSync("./README.md", data.replace(/\|\s*\[(infinitegrid(?:\.[a-z]+)?(?:\.min)?\.js)\s*(\([^)]*\))\]\([^)]+\)\s*/g, (all, filename, sizearea) => {
	const stats = fs.statSync(`./dist/${filename}`);
	const size = Math.floor(stats.size / 102.4);

	return all.replace(sizearea, `(${size / 10}kb)`);
}));
