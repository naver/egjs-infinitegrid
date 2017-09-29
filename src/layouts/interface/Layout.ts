// import {DEFAULT_OPTIONS} from "../Constants";

export interface ILayoutOption {
	direction?: string;
	margin?: number;
};

export interface IGroup {
	groupKey?: number;
	items: Object[];
	outlines: Object;
};

export interface ILayout {
	layout(groups: IGroup[], outline: number[]);
	append(group: IGroup, outline: number[]): IGroup;
	prepend(group: IGroup, outline: number[]): IGroup;
	setViewport(width: number, height: number);
};

// immediately
const DEFAULT_OPTIONS = {};
const STYLE = {};
const VERTICAL = "";

abstract class Layout {
	private _options;
	private _style;
	private _viewport;

	constructor(layoutDefaultOptions, options) {
		this._options = {...DEFAULT_OPTIONS, ...layoutDefaultOptions, ...options};
		this._style = this.getStyleNames();
		this._viewport = {};
	}
	getStyleNames() {
		const options = this._options;
		const direction = options.direction in STYLE ? options.direction : VERTICAL;
		const style = STYLE[direction];

		return style;
	}
	setViewport(width: number, height: number) {
		this._viewport.width = width;
		this._viewport.height = height;
	}
	abstract layout(groups: IGroup[], outline: number[]);
	abstract append(group: IGroup, outline: number[]): IGroup;
	abstract prepend(group: IGroup, outline: number[]): IGroup;
}
