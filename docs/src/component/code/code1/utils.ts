/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable eol-last */


export function decamelize(str: string) {
  return ` ${str}`.replace(/([a-z ])([A-Z])/g, (_, letter, letter2) => `${letter}-${letter2.toLowerCase()}`).substr(2);
}

export function convertClassName(code: string, className: string, deClassName: string) {
  return code.replace(/#ClassName/g, className).replace(/#DeClassName/g, deClassName);
}
export function convertOptions(code: string, options: Record<string, any>, temp: (name: string, value: any) => string) {
  const texts = [];

  for (const name in options) {
    texts.push(temp(name, options[name]));
  }
  return code.replace(/#Options/, texts.join("\n"));
}
export function convertMaintained(code: string, hasMaintained: boolean) {
  return code.replace(/#Maintained/, hasMaintained ? `data-grid-maintained-target="true"` : "");
}
