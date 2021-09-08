
// export function makeLink(name: string, property: string) {
//   return `<a href="https://naver.github.io/egjs-infinitegrid/release/latest/doc/Grid.${name}.html#${property}" target="_blank">See API</a>`;
// }
export function makeArgType(param: {
  type: "array" | "text" | "radio" | "object" | "number" | "boolean" | "inline-radio";
  description?: string;
  defaultValue: any;
  category?: string;
  control?: Record<string, any>;
  table?: Record<string, any>;
}) {
  return {
    control: {
      type: param.type,
      ...(param.control || {}),
    },
    table: {
      defaultValue: { summary: param.defaultValue },
      category: param.category,
      ...(param.table || {}),
    },
    description: param.description,
  };
}
export function makeArgs(argTypes: any) {
  return Object.keys(argTypes).reduce((prev, cur) => {
    prev[cur] = argTypes[cur].table.defaultValue.summary;

    return prev;
  }, {} as Record<string, any>);
}

export function convertPath(text: string, findName: string, moduleName = findName) {
  let nextText = text.replace(new RegExp(`"[a-zA-Z0-9./_-]*${findName}[a-zA-Z0-9./_-]*"`, "g"), `"${moduleName}"`);
  nextText = nextText.replace(new RegExp(`'[a-zA-Z0-9./_-]*${findName}[a-zA-Z0-9./_-]*'`, "g"), `'${moduleName}'`);

  return nextText;
}

export function convertVanillaTemplate(text: string) {
  let previewText = text.replace(/\n^export[^\n]*$/mg, "");

  previewText = previewText.replace(/\s*return ig;\n\}$/mg, "\n");
  previewText = previewText.replace(/^[ ]{2}/mg, "");

  return convertTemplate(previewText);
}
export function convertVueTemplate(text: string) {
  let previewText = text.replace("props:", "data:");

  previewText = previewText.replace(/\[(\s*"([^"]+)",\s*)+\]/g, (...args) => {
    return args[0].replace("[", "() => ({").replace("]", "})").replace(/"([^"]+)"/g, (_, name) => {
      return `${name}: ${name}`;
    });
  });
  return convertTemplate(previewText, /([a-zA-Z_0-9]+):\s([a-zA-Z_0-9]+),/g, true);
}

export function convertSvelteTemplate(text: string, cssCode = "") {
  let previewText = text.replace(/export let ([a-zA-Z_0-9]+);/g, "const $1 = $1;");

  if (cssCode) {
    previewText = previewText.replace("</script>", `</script>\n<style>\n${cssCode}\n</style>`);
  }

  return convertTemplate(previewText, /([a-zA-Z_0-9]+) = ([a-zA-Z_0-9]+);/g, true);
}

export function convertAngularHTMLTemplate(text: string) {
  const previewText = text.replace(/\n\s+\*ngFor="let item of \[0\]; trackBy: trackBy;"/g, "");

  return convertTemplate(previewText);
}
export function convertAngularTemplate(text: string) {
  let previewText = text.replace(/\n\s+@Input\(\) key[^;]+;[^;]+;/g, "");

  previewText = previewText.replace(/@Input\(\) ([a-zA-Z_0-9]+): any;/g, "$1 = $1;");



  return convertTemplate(previewText, /([a-zA-Z_0-9]+) = ([a-zA-Z_0-9]+);/g, true);
}

export function convertReactTemplate(text: string) {
  const previewText = text.replace(/\n\s+key=\{Math.random\(\)\}/, "");

  return convertTemplate(previewText);
}

export function convertTemplate(text: string, regex = /props\.([a-zA-Z0-9_]+)/g, includePrefix = false) {
  const previewText = text.replace(/App\([^)]*\)/g, "App()");
  let result: RegExpExecArray | null;
  let index = 0;

  const strings: string[] = [];
  const values: string[] = [];

  // eslint-disable-next-line no-cond-assign
  while (result = regex.exec(previewText)) {
    const nextIndex = result.index + (includePrefix ? result[0].lastIndexOf(result[2]) : 0);

    strings.push(previewText.slice(index, nextIndex));
    values.push(result[1]);
    index = nextIndex + (includePrefix ? result[2].length : result[0].length);
  }

  strings.push(previewText.slice(index));
  return [strings, values];
}


