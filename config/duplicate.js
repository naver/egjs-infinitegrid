const { spawn } = require("child_process");
const process = require("process");
const path = require("path");
const fs = require("fs-extra");


function replaceFile(fileName) {
  const file = fs.readFileSync(fileName, { encoding: "utf-8" });
  const lines = file.split("\n");
  const length = lines.length;
  const startIndex = lines.indexOf("|PROPERTY|TYPE|DESCRIPTION|");

  if (startIndex === -1) {
    return;
  }

  const keys = {};
  const duplicated = [];

  for (let i = startIndex + 2; i < length; ++i) {
    const line = lines[i];

    if (!line.startsWith("|")) {
      break;
    }
    const key = line.split("|")[1];

    if (keys[key]) {
      duplicated.push(i);
    } else {
      keys[key] = true;
    }
  }
  duplicated.reverse().forEach(index => {
    lines.splice(index, 1);
  });
  fs.writeFileSync(fileName, lines.join("\n"), { endcoding: "utf8" });
}


function replaceFiles(dir) {
  const koDir = path.resolve(__dirname, dir);

  fs.readdirSync(koDir).forEach(fileName => {
    replaceFile(path.resolve(koDir, fileName));
  });
}

replaceFiles("../docs/i18n/ko/docusaurus-plugin-content-docs/current/api/");
replaceFiles("../docs/docs/api/");
