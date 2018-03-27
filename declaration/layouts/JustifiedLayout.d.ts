import {Group} from "./Layout";

declare class JustifiedLayout {
	constructor(options?: {
		margin?: number,
		horizontal?: boolean,
		minSize?: number,
		maxSize?: number,
		column?: number[] | number,
	});
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default JustifiedLayout;