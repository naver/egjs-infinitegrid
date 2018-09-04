/* eslint-disable no-new-func, no-nested-ternary */
if (typeof window === "undefined") {
  global.window = {
    document: {},
    navigator: {
      userAgent: ""
    }
  };
}

var win = window;
/* eslint-enable no-new-func, no-nested-ternary */

export { win as window };
export var document = win.document;