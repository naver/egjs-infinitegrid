/* eslint-disable no-new-func, no-nested-ternary */

if (typeof window === "undefined") {
	global.window = {
		document: {},
		navigator: {
			userAgent: "",
		},
	};
}
const win = window;
/* eslint-enable no-new-func, no-nested-ternary */

export {win as window};
export const document = win.document;
