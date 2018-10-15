/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    document: {},
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}
/* eslint-enable no-new-func, no-nested-ternary */


export { win as window };
export var document = win.document;