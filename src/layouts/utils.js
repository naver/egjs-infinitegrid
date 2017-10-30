import {VERTICAL, DEFAULT_OPTIONS} from "./Constants";

export const STYLE = {
	vertical: {
		pos1: "top",
		endPos1: "bottom",
		size1: "height",
		pos2: "left",
		endPos2: "right",
		size2: "width",
	},
	horizontal: {
		pos1: "left",
		endPos1: "right",
		size1: "width",
		pos2: "top",
		endPos2: "bottom",
		size2: "height",
	},
};


export function getStyleNames(direction) {
	const style = STYLE[direction in STYLE ? direction : VERTICAL];

	return style;
}

export function assignOptions(defaultOptions, options) {
	return Object.assign({},
		DEFAULT_OPTIONS,
		defaultOptions,
		options);
}

export function toZeroArray(outline) {
	if (!outline || !outline.length) {
		return [0];
	}
	return outline;
}
