import { WindowMockType } from "./types";

let win: WindowMockType;

if (typeof window === "undefined") {
	// window is undefined in node.js
	win = {
		document: {},
		navigator: {
			userAgent: "",
		},
	};
} else {
	win = window;
}

export { win as window };
export const document = win.document;
