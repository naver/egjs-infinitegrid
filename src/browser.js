/* eslint-disable no-new-func, no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

export {win as window};
export const document = win.document;
