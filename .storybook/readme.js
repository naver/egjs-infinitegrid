const path = require("path");
const fs = require("fs");


const introductionText = fs.readFileSync(path.resolve(__dirname, "../stories/0-Introduction.stories.mdx"), {
  encoding: "utf-8",
});
const readmeText = fs.readFileSync(path.resolve(__dirname, "../README.md"), {
  encoding: "utf-8",
});

const startIndex = introductionText.indexOf("<!-- README -->");


if (startIndex === -1) {
  throw new Error("No Set <!-- README --> comment");
}

fs.writeFileSync(path.resolve(__dirname, "../stories/0-Introduction.stories.mdx"), `${introductionText.substring(0, startIndex)}<!-- README -->\n${readmeText}`, {
  encoding: "utf-8",
});
