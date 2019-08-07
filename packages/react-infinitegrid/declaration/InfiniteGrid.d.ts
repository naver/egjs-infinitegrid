import * as React from "react";
import { IInfiniteGridItem } from "@egjs/infinitegrid";

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
	loading?: React.ReactNode,
	transitionDuration?: number,
	onAppend?: (param: OnAppendParameter) => void,
	onPrepend?: (param: OnPrependParameter) => void,
	onLayoutComplete?: (param: OnLayoutCompleteParameter) => void,
	onImageError?: (param: any) => void,
	onChange?: (param: OnChangeParameter) => void,
	status?: object,
	useFit?: boolean,
	[others: string]: any,
}

interface OnAppendParameter {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	startLoading?: (loadingStyle: object) => void;
	endLoading?: (loadingStyle: object) => void;
}
interface OnPrependParameter {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	startLoading?: (loadingStyle: object) => void;
	endLoading?: (loadingStyle: object) => void;
}
interface OnChangeParameter {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	isForward?: boolean;
	horizontal?: boolean;
	scrollPos?: number;
	orgScrollPos?: number;
}
interface OnImageErrorParameter {
	currentTarget?: InfiniteGrid;
	target?: HTMLElement;
	element?: HTMLElement;
	item?: IInfiniteGridItem;
	itemIndex?: number;
}
interface OnLayoutCompleteParameter {
	currentTarget?: InfiniteGrid;
	fromCache?: boolean;
	target?: IInfiniteGridItem[];
	isAppend?: boolean;
	isTrusted?: boolean;
	isLayout?: boolean;
	isScroll?: boolean;
	scrollPos?: number;
	orgScrollPos?: number;
	size?: number;
	endLoading?: (loadginStyle: object) => void;
}

declare class InfiniteGrid extends React.Component<InfiniteGridProps> {
	layout(isRelayout?: boolean): this;
	resize(): this;
	setStatus(status: object, applyScrollPos?: boolean): this;
	getStatus(): object;
	getItems(includeCached?: boolean): IInfiniteGridItem[];
	isCached(element: HTMLElement): boolean;
	isCached(groupIndex?: number, itemIndex?: number): boolean;
	isCached(groupIndex: { itemKey: any }): boolean;
	getItem(element: HTMLElement): IInfiniteGridItem;
	getItem(groupIndex?: number, itemIndex?: number): IInfiniteGridItem;
	getItem(groupIndex: { itemKey: any }): IInfiniteGridItem;
	updateItem(element: HTMLElement): this;
	updateItem(groupIndex?: number, itemIndex?: number): this;
	updateItems(): this;
	clear(): this;
}
declare class GridLayout extends InfiniteGrid {}
declare class JustifiedLayout extends InfiniteGrid {}
declare class FrameLayout extends InfiniteGrid {}
declare class PackingLayout extends InfiniteGrid {}
declare class Squarelayout extends InfiniteGrid {}


export default InfiniteGrid;
