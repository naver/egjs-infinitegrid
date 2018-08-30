import * as React from "react";

interface InfiniteGridProps {
	tag?: string,
	type?: (...args: any[]) => any,
	options?: object,
	margin?: number,
	threshold?: number,
	isOverflowScroll?: boolean,
	isEqualSize?: boolean,
	useRecycle?: boolean,
	isConstantSize?: boolean,
	horizontal?: boolean,
	loading?: object | boolean,
	transitionDuration?: number,
	onAppend?: (param?: any) => void,
	onPrepend?: (param?: any) => void,
	onLayoutComplete?: (param?: any) => void,
	onImageError?: (param?: any) => void,
	onChange?: (param?: any) => void,
	status?: object,
	useFit?: boolean,
	[others: string]: any,
}

declare class InfiniteGrid extends React.Component<InfiniteGridProps> {
	layout(isRelayout?: boolean): this;
	resize(): this;
	setStatus(status: object, applyScrollPos?: boolean): this;
	getStatus(): object;
	clear(): this;
}
declare class GridLayout extends InfiniteGrid {}
declare class JustifiedLayout extends InfiniteGrid {}
declare class FrameLayout extends InfiniteGrid {}
declare class PackingLayout extends InfiniteGrid {}
declare class Squarelayout extends InfiniteGrid {}


export default InfiniteGrid;
