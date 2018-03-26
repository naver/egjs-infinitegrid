import {Group} from "./Layout";

declare class FrameLayout {
	constructor(options?: {
		margin?: number,
		horizontal?: boolean,
		itemSize?: number,
		frame?: any[],
		frameFill?: boolean,
	});
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default FrameLayout;