import {
	APPEND,
	PREPEND,
	DUMMY_POSITION,
	MULTI,
	GROUPKEY_ATT,
	CONTAINER_CLASSNAME,
	TRANSITION_NAME,
	TRANSITION,
	TRANSITION_END,
	TRANSFORM,
} from "./consts";
import { window, document, WindowMockType } from "./browser";
import {
	$,
	innerHeight,
	innerWidth,
	getSize,
	getStyles,
	addOnceEvent,
	assign,
} from "./utils";
import { IInfiniteGridItem } from "./ItemManager";
import { RectType, IPosition, ISize, IJQuery } from "./types";

export interface IDOMRendererOptions {
	isEqualSize: boolean;
	isConstantSize: boolean;
	horizontal: boolean;
	container: boolean | HTMLElement;
}
export interface IDOMRendererSize {
	container?: number;
	view?: number;
	viewport?: number;
	item?: ISize;
}
export interface IDOMRendererStatus {
	cssText: string;
	_size: IDOMRendererSize;
}
export interface IDOMRendererOrgStyle {
	position?: CSSStyleDeclaration["position"];
	overflowX?: CSSStyleDeclaration["overflowX"];
	overflowY?: CSSStyleDeclaration["overflowY"];
}
export function resetSize(item: IInfiniteGridItem) {
	item.orgSize = null;
	item.size = null;
}
function createContainer(element: HTMLElement) {
	const container = document.createElement("div");

	container.className = CONTAINER_CLASSNAME;
	container.style.position = "relative";
	container.style.height = "100%";

	const children = element.children;
	const length = children.length;	// for IE8

	for (let i = 0; i < length; i++) {
		container.appendChild(children[0]);
	}
	element.appendChild(container);
	return container;
}
function render(properties: RectType[], rect: IInfiniteGridItem["rect"], styles: HTMLElement["style"]) {
	properties.forEach(p => {
		(p in rect) && (styles[p] = `${rect[p]}px`);
	});
}
function setTransition(styles: HTMLElement["style"], transitionDuration?: number, pos1?: IPosition, pos2?: IPosition) {
	const cssText = transitionDuration ?
		`${TRANSITION}-property:${TRANSFORM},width,height;${TRANSITION}-duration:${transitionDuration}s;${TRANSITION}-delay:0s;` +
		`${TRANSFORM}:translate(${pos1.left - pos2.left}px,${pos1.top - pos2.top}px);` : "";
	styles.cssText = cssText;
}

export default class DOMRenderer {
	public static renderItem(item: IInfiniteGridItem, rect: IInfiniteGridItem["rect"], transitionDuration?: number) {
		if (!item.el) {
			return;
		}
		const { el, prevRect } = item;
		const styles = el.style;

		// for debugging
		el.setAttribute(GROUPKEY_ATT, `${item.groupKey}`);
		styles.position = "absolute";
		render(["width", "height"], rect, styles);
		if (transitionDuration && TRANSITION && prevRect) {
			setTransition(styles, transitionDuration, rect as IPosition, prevRect as IPosition);
			if ((el as any)[TRANSITION_NAME]) {
				return;
			}
			el[TRANSITION_NAME] = true;
			addOnceEvent(el, TRANSITION_END, () => {
				const itemRect = item.rect;

				setTransition(styles);
				render(["left", "top"], itemRect, styles);
				item.prevRect = itemRect;
				el[TRANSITION_NAME] = false;
			});
		} else {
			render(["left", "top"], rect, styles);
			item.prevRect = rect;
		}
	}
	public static renderItems(items: IInfiniteGridItem[], transitionDuration?: number) {
		items.forEach(item => {
			DOMRenderer.renderItem(item, item.rect, transitionDuration);
		});
	}
	public static removeItems(items: IInfiniteGridItem[]) {
		items.forEach(item => {
			if (item.el) {
				DOMRenderer.removeElement(item.el);
				item.el = null;
			}
		});
	}
	public static removeElement(element: HTMLElement) {
		const parentNode = element && element.parentNode;

		if (!parentNode) {
			return;
		}
		parentNode.removeChild(element);
	}
	public static createElements(items: IInfiniteGridItem[]) {
		if (!items.length) {
			return;
		}
		const noElementItems = items.filter(item => !item.el);

		if (!noElementItems.length) {
			return;
		}
		const elements = $(noElementItems.map(({ content }) =>
			content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")).join(""), MULTI);

		noElementItems.forEach((item, index) => {
			item.el = elements[index];
		});
	}
	public container: HTMLElement;
	public view: WindowMockType | HTMLElement;
	public options: IDOMRendererOptions = {
		isEqualSize: false,
		isConstantSize: false,
		horizontal: false,
		container: false,
	};
	public _size: IDOMRendererSize = {
		container: -1,
		view: -1,
		viewport: -1,
		item: null,
	};
	public _orgStyle: IDOMRendererOrgStyle = {};
	constructor(element: string | HTMLElement | IJQuery, options: IDOMRendererOptions) {
		assign(this.options, options);
		this._init(element);
		this.resize();
	}
	public getStatus() {
		return {
			cssText: this.container.style.cssText,
			_size: assign({}, this._size),
		};
	}
	public setStatus(status: IDOMRendererStatus) {
		this.container.style.cssText = status.cssText;
		assign(this._size, status._size);
	}
	public updateSize(items: IInfiniteGridItem[]) {
		const { isEqualSize, isConstantSize } = this.options;
		const size = this._size;

		return items.map(item => {
			if (!item.el) {
				return item;
			}
			if (isEqualSize && !size.item) {
				size.item = getSize(item.el);
			}
			item.size = (isEqualSize && assign({}, size.item)) ||
				(isConstantSize && item.orgSize && assign({}, item.orgSize)) ||
				getSize(item.el);
			if (!item.orgSize) {
				item.orgSize = assign({}, item.size);
			}
			return item;
		});
	}
	public append(items: IInfiniteGridItem[]) {
		this._insert(items, APPEND, {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		});
	}
	public prepend(items: IInfiniteGridItem[]) {
		this._insert(items, PREPEND, {
			top: DUMMY_POSITION,
			left: DUMMY_POSITION,
		});
	}
	public createAndInsert(items: IInfiniteGridItem[], isAppend?: boolean) {
		DOMRenderer.createElements(items);

		DOMRenderer.renderItems(items);
		this._insert(items, isAppend);
	}
	public getViewSize() {
		return this._size.view;
	}
	public getViewportSize() {
		return this._size.viewport;
	}
	public setContainerSize(size: number) {
		this.container.style[this.options.horizontal ? "width" : "height"] = `${size}px`;
	}
	public resize() {
		const horizontal = this.options.horizontal;
		const view = this.view;
		const isResize = this.isNeededResize();

		if (isResize) {
			this._size = {
				viewport: this._calcSize(),
				item: null,
			};
		}
		this._size.view = horizontal ? innerWidth(view) : innerHeight(view);
		return isResize;
	}
	public isNeededResize() {
		return this._calcSize() !== this._size.viewport;
	}
	public clear() {
		this.container.innerHTML = "";
		this.container.style[this.options.horizontal ? "width" : "height"] = "";

		this._size = {
			item: null,
			viewport: -1,
			container: -1,
			view: -1,
		};
	}
	public destroy() {
		this.clear();
		const container = this.options.container;

		for (const p in this._orgStyle) {
			(this[container ? "view" : "container"] as HTMLElement).style[p as keyof IDOMRendererOrgStyle] =
				this._orgStyle[p as keyof IDOMRendererOrgStyle];
		}
		container && this.container.parentNode.removeChild(this.container);
	}
	private _init(el: HTMLElement | IJQuery | string) {
		const element = $(el);
		const style = getStyles(element);
		const { container, horizontal } = this.options;

		if (style.position === "static") {
			this._orgStyle.position = element.style.position;
			element.style.position = "relative";
		}
		if (container) {
			const target = horizontal ? ["X", "Y"] : ["Y", "X"];

			this._orgStyle.overflowX = element.style.overflowX;
			this._orgStyle.overflowY = element.style.overflowY;
			element.style[`overflow${target[0]}` as "overflowX" | "overflowY"] = "scroll";
			element.style[`overflow${target[1]}` as "overflowX" | "overflowY"] = "hidden";
			this.view = element;
			this.container = container === true ? createContainer(this.view as HTMLElement) : container;
		} else {
			this.view = window;
			this.container = element;
		}
	}
	private _insert(items: IInfiniteGridItem[], isAppend?: boolean, styles?: IInfiniteGridItem["rect"]) {
		const container = this.container;
		const df = document.createDocumentFragment();

		items.forEach(item => {
			styles && DOMRenderer.renderItem(item, styles);
			isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
		});
		isAppend ?
			container.appendChild(df) :
			container.insertBefore(df, container.firstChild);
	}
	private _calcSize() {
		return this.options.horizontal ?
			innerHeight(this.container) : innerWidth(this.container);
	}
}
