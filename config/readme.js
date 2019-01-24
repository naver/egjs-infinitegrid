
const fs = require("fs");

const data = fs.readFileSync("./README.md", "utf8");


fs.writeFileSync("./README.md", data.replace(/\|\s*\[((?:[.a-z]+){1,}(?:\.min)?\.js)\s*(\([^)]*\))\]\([^)]+\)\s*/g, (all, filename, sizearea) => {
	const stats = fs.statSync(`./dist/${filename}`);
	const size = Math.floor(stats.size / 102.4);

	return all.replace(sizearea, `(${size / 10}kb)`);
}));


const egjs = fs.readFileSync("./demo/_data/egjs.yml", "utf8");

fs.writeFileSync("./demo/_data/egjs.yml", egjs.replace(/file:\s(\S*)\n\s\ssize:\s(\S+)/g, (all, filename, sizearea) => {
	const stats = fs.statSync(`./dist/${filename}`);
	const size = Math.floor(stats.size / 102.4);

	return all.replace(sizearea, `${size / 10}kb`);
}));
