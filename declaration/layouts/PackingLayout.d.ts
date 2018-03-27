import {Group} from "./Layout";

declare class PackingLayout {
	constructor(options?: {
		margin?: number,
		horizontal?: boolean,
		aspectRatio?: number,
		sizeWeight?: number,
		ratioWeight?: number,
	});
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default PackingLayout;