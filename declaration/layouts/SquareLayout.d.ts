import FrameLayout from "./FrameLayout";
import {Group} from "./Layout";

declare class SquareLayout extends FrameLayout {
	constructor(options?: {
		margin?: number,
		horizontal?: boolean,
		itemSize?: number,
	});
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default FrameLayout;