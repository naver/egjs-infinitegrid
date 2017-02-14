/* eslint-disable no-new-func */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func */

export {win as window};
export const document = win.document;
