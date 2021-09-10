const fs = require("fs-extra");
const path = require("path");
const exec = require("sync-exec");
const cwd = process.cwd();


function shell(cmd, ignore = false) {
  let result = exec(cmd);
  if (!result.stderr) {
    !ignore && console.log(result.stdout);
    console.log(`# ${cmd}`);
  } else {
    if (!ignore) {
      console.error(result.stderr);
      throw new Error(result.stderr);
    }
  }
  return result.stdout;
}

shell("rm -rf ./src");
shell("rm -rf ./stories")

shell("npx cpx '../vue-infinitegrid/src/**/*' ./src");
shell("npx cpx '../vue-infinitegrid/stories/**/*' ./stories");


const file = path.resolve(cwd, "./src/InfiniteGrid.ts");
let code = fs.readFileSync(file, { encoding: "utf-8" });

code = code.replace(/(render\([^)]+), h: any\)/g, "$1)");
code = code.replace("beforeDestroy", "beforeUnmount");
code = code.replace(`    // Check Vue3 Slot Type`, `
    if (typeof slots === "function") {
      children = slots() as any[];
      // const STABLE_FRAGMENT = 1 << 6;
      // const KEYED_FRAGMENT = 1 << 7;
      // const UNKEYED_FRAGMENT = 1 << 8;
      children = children.reduce((prev, cur) => {
        if ((cur.patchFlag > 0 && cur.patchFlag & ((1 << 6) + (1 << 7) + (1 << 8))) > 0) {
          return [...prev, ...cur.children];
        } else if (cur) {
          return [...prev, cur];
        }
        return prev;
      }, []);
    }`);
const codes = code.split("\n");

const lastImportIndex = codes.reduce((prev, cur, i) => {
  return cur.indexOf("import ") === 0 ? i : prev;
}, -1);

codes.splice(lastImportIndex, 0, `import { h } from "vue";`);



code = codes.join("\n");
fs.writeFileSync(file, code, { encoding: "utf-8" });

