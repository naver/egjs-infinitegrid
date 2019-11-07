let win: Window;

if (typeof window === "undefined") {
	// window is undefined in node.js
	win = {
		document: {},
		navigator: {
			userAgent: "",
		},
	} as Window;
} else {
	win = window;
}

export { win as window };
export const document = win.document;
