import Component from "@egjs/component";
import InfiniteGrid from "./index.squarelayout";

export type CursorType = "start" | "end";
export type SizeType = "width" | "height";
export type PositionType = "left" | "top";
export type ReversePositionType = "right" | "bottom";
export type RectType = SizeType | PositionType;
export type InnerSizeType = "innerWidth" | "innerHeight";
export type ClientSizeType = "clientWidth" | "clientHeight";
export type OffsetSizeType = "offsetWidth" | "offsetHeight";
export type ScrollSizeType = "scrollWidth" | "scrollHeight";

export interface IInfiniteGridOptions {
	itemSelector: string;
	isOverflowScroll: boolean;
	threshold: number;
	isEqualSize: boolean;
	isConstantSize: boolean;
	useRecycle: boolean;
	horizontal: boolean;
	transitionDuration: number;
	useFit: boolean;
	attributePrefix: string;
	renderExternal: boolean;
}

export interface IInfiniteGridGroup {
	groupKey: string | number;
	items: IInfiniteGridItem[];
	outlines: { start: number[], end: number[] };
}

export interface IWatcherOptions {
	container: HTMLElement;
	isOverflowScroll: boolean;
	horizontal: boolean;
	resize: () => void;
	check: (e: {
		isForward: boolean,
		scrollPos: number,
		orgScrollPos: number,
		horizontal: boolean,
	}) => void;
}

export interface IInfiniteOptions {
	useRecycle: boolean;
	threshold: number;
	append: (e: { cache: IInfiniteGridGroup[] }) => void;
	prepend: (e: { cache: IInfiniteGridGroup[] }) => void;
	recycle: (e: { start: number, end: number }) => void;
}

export interface IInfiniteGridOptions {
	itemSelector: string;
	isOverflowScroll: boolean;
	threshold: number;
	isEqualSize: boolean;
	isConstantSize: boolean;
	useRecycle: boolean;
	horizontal: boolean;
	transitionDuration: number;
	useFit: boolean;
	attributePrefix: string;
	renderExternal: boolean;
}

export interface IInfiniteGridStatus {
	_status: {
		processingStatus: number,
		loadingSize: number,
		loadingStyle: StyleType,
	};
	_itemManager: IItemManagerStatus;
	_renderer: IDOMRendererStatus;
	_watcher: IWatchStatus;
	_infinite: IInfiniteStatus;
}

export interface IItemManagerStatus {
	_data: IInfiniteGridGroup[];
}

export interface IInfiniteStatus {
	startCursor: number;
	endCursor: number;
	size: number;
}

export interface IDOMRendererSize {
	container: number;
	view: number;
	viewport: number;
	item?: ISize | null;
}

export interface IDOMRendererStatus {
	cssText: string;
	_size: IDOMRendererSize;
}

export interface IWatchStatus {
	_prevPos: number | null;
	scrollPos: number;
}

export interface IRemoveResult {
	group: IInfiniteGridGroup | null;
	items: IInfiniteGridItem[];
}

/**
 * The object of data to be sent to an event
 * @ko 이벤트에 전달되는 데이터 객체
 * @memberof eg.InfiniteGrid
 * @typedef
 * @property - Appending card's image element.<ko>추가 되는 카드의 이미지 엘리먼트</ko>
 * @property - The item's element with error images.<ko>에러난 이미지를 가지고 있는 아이템의 엘리먼트</ko>
 * @property - The items being added.<ko>화면에 추가중인 아이템들</ko>
 * @property - The item with error images.<ko>에러난 이미지를 가지고 있는 아이템</ko>
 * @property - The item's index with error images.<ko>에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
 * @property - The item's index with error images in all items.<ko>전체 아이템중 에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
 * @property - In the imageError event, this method expects to remove the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 삭제한다.</ko>
 * @property - In the imageError event, this method expects to remove the item with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템을 삭제한다.</ko>
 * @property - In the imageError event, this method expects to replace the error image's source or element.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지의 주소 또는 엘리먼트를 교체한다.</ko>
 * @property - In the imageError event, this method expects to replace the item's contents with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템의 내용을 교체한다.</ko>
 * @example
	ig.on("imageError", e => {
	  e.remove();
	  e.removeItem();
	  e.replace("http://...jpg");
	  e.replace(imageElement);
	  e.replaceItem("item html");
	});
 */
export interface IErrorCallbackOptions {
	target: HTMLImageElement;
	element: HTMLElement;
	items: IInfiniteGridItem[];
	item: IInfiniteGridItem;
	itemIndex: number;
	totalIndex: number;
	replace: (src: string) => void;
	replaceItem: (content: string) => void;
	remove: () => void;
	removeItem: () => void;
}
/**
 * Item Interface
 * @ko Item Interface
 * @memberof eg.InfiniteGrid
 * @typedef
 * @property - Key in group containing item <ko>아이템을 포함하고 있는 그룹의 키</ko>
 * @property - html of element in item <ko>아이템의 엘리먼트 html</ko>
 * @property {HTMLElement} - Element for the item <ko>아이템에 있는 엘리먼트</ko>
 * @property - Size of elements of the rendering when the first time. <ko>처음 렌더링 했을 때의 엘리먼트의 사이즈</ko>
 * @property - Currently seen the size of element <ko>현재 보여지는 엘리먼트의 사이즈</ko>
 * @property - Position and size of the element shown in layout <ko>레이아웃할 때 보여지는 포지션과 사이즈</ko>
 * @property - The position and size of the element that was seen in the layout before <ko>전에 레이아웃했을 때 보였었던 포지션과 사이즈</ko>
 */
export interface IInfiniteGridItem {
	groupKey: string | number;
	itemKey?: string | number;
	content: string;
	el?: IInfiniteGridItemElement | null;
	orgSize?: ISize | null;
	size?: ISize | null;
	rect: IPosition & Partial<ISize>;
	prevRect?: IPosition & Partial<ISize> | null;
	mounted: boolean;
	[key: string]: any;
}

export interface IIndexes {
	groupIndex?: number;
	itemIndex?: number;
}
export interface IGroup {
	groupKey: string | number;
	[key: string]: any;
}
export interface IItem {
	groupKey: string | number;
	itemKey?: string | number;
	[key: string]: any;
}
// see https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
export type Equals<X, Y, A, B = never> =
	(<T>() => T extends X ? 1 : 2) extends
	(<T>() => T extends Y ? 1 : 2) ? A : B;

export type ExcludeReadOnly<T> = Pick<T, {
	[K in keyof T]: (Equals<{ -readonly [P in K]: T[K] }, { [P in K]: T[K] }, K>)
}[string & keyof T]>;

export type StyleType = Partial<ExcludeReadOnly<CSSStyleDeclaration>>;
export interface IInfiniteGridItemElement extends HTMLElement {
	_INFINITEGRID_TRANSITION?: boolean;
	__IMAGE__?: -1 | IInfiniteGridItemElement;
	__BOX__?: IInfiniteGridItemElement;
	__SIZE__?: number;
	__TRANSLATE__?: number;
	__RATIO__?: number;
}
export interface ITransitionProperties {
	property: "transition-property";
	duration: "transition-duration";
	delay: "transition-delay";
}
export interface IRectlProperties {
	startPos1: PositionType;
	endPos1: ReversePositionType;
	size1: SizeType;
	startPos2: PositionType;
	endPos2: ReversePositionType;
	size2: SizeType;
}
export interface IAlign {
	START: "start";
	CENTER: "center";
	END: "end";
	JUSTIFY: "justify";
}
/**
 * Position Interface
 * @ko Position Interface
 * @memberof eg.InfiniteGrid
 * @typedef
 */
export interface IPosition {
	top: number;
	left: number;
}
/**
 * Size Interface
 * @ko Size Interface
 * @memberof eg.InfiniteGrid
 * @typedef
 */
export interface ISize {
	width: number;
	height: number;
}
export interface IJQuery {
	length: number;
	jquery: string;
	toArray(): Array<string | HTMLElement>;
	get(index: number): string | HTMLElement;
}

export interface ILayoutResult {
	items: IInfiniteGridItem[];
	outlines: {
		start: number[],
		end: number[],
	};
}
export interface ILayout {
	options: {
		horizontal: boolean,
		margin: number;
		[key: string]: any,
	};
	append(groupItems: IInfiniteGridItem[], outline: number[], cache?: boolean): ILayoutResult;
	prepend(groupItems: IInfiniteGridItem[], outline: number[], cache?: boolean): ILayoutResult;
	setSize(size: number): this;
	layout(groups: IInfiniteGridGroup[], outline: number[]): this;
}

export interface IImageLoadedOptions {
	prefix?: string;
	length?: number;
	type?: 1 | 2;
	complete?: () => void;
	end?: () => void;
	error?: (e: { target: LoadingImageElement, itemIndex: number }) => void;
}
export interface LoadingImageElement extends HTMLImageElement {
	__ITEM_INDEX__?: number;
}

export interface IDOMRendererOptions {
	isEqualSize: boolean;
	isConstantSize: boolean;
	horizontal: boolean;
	container: boolean | HTMLElement;
}

export interface IDOMRendererOrgStyle {
	position?: CSSStyleDeclaration["position"];
	overflowX?: CSSStyleDeclaration["overflowX"];
	overflowY?: CSSStyleDeclaration["overflowY"];
}

export interface IArrayFormat<T> {
	length: number;
	[index: number]: T;
}

export interface IDOMRendererOptions {
	isEqualSize: boolean;
	isConstantSize: boolean;
	horizontal: boolean;
	container: boolean | HTMLElement;
}

export interface IDOMRendererOrgStyle {
	position?: CSSStyleDeclaration["position"];
	overflowX?: CSSStyleDeclaration["overflowX"];
	overflowY?: CSSStyleDeclaration["overflowY"];
}

export type ExcludeKeys = keyof Component
  | "clear" | "destroy" | "remove" | "prepend" | "append"
  | "setLayout" | "removeByIndex" | "setLoadingBar"
  | "beforeSync" | "sync" | "getRenderingItems";
export type InfiniteGridMethodsKeys = Exclude<keyof InfiniteGrid, ExcludeKeys>;
export type InfiniteGridMethods = Pick<InfiniteGrid, InfiniteGridMethodsKeys>;
