import InfiniteGrid from "./InfiniteGrid";
import { IInfiniteGridItem, ILayout, IInfiniteGridOptions, IInfiniteGridStatus } from "@egjs/infinitegrid";

export interface OnAppend {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	startLoading?: (loadingStyle: object) => void;
	endLoading?: (loadingStyle: object) => void;
}
export interface OnPrepend {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	startLoading?: (loadingStyle: object) => void;
	endLoading?: (loadingStyle: object) => void;
}
export interface OnChange {
	currentTarget?: InfiniteGrid;
	groupKey?: number | string;
	isForward?: boolean;
	horizontal?: boolean;
	scrollPos?: number;
	orgScrollPos?: number;
}
export interface OnImageError {
	currentTarget?: InfiniteGrid;
	target?: HTMLElement;
	element?: HTMLElement;
	item?: IInfiniteGridItem;
	itemIndex?: number;
	totalIndex?: number;
}
export interface OnLayoutComplete {
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

export interface InfiniteGridProps<T extends ILayout = any> {
	tag?: string;
	containerTag?: string;
	status?: IInfiniteGridStatus | null;
	options?: Partial<IInfiniteGridOptions>;
	layoutOptions?: Partial<T["options"]>;
	loading?: React.ReactElement | null;
	layoutType?: new (...args: any[]) => ILayout;
	onAppend?: (param: OnAppend) => any;
	onPrepend?: (param: OnPrepend) => any;
	onLayoutComplete?: (param: OnLayoutComplete) => any;
	onImageError?: (param: OnImageError) => any;
	onChange?: (param: OnChange) => any;
	[others: string]: any;
}
