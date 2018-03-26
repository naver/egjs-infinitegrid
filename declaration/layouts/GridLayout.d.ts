import {Group} from "./Layout";

declare class GridLayout {
	constructor(options?: {
		margin?: number,
		horizontal?: boolean,
		align?: string,
		itemSize?: number,
	});
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default GridLayout;