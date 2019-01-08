import AutoSizer from "./AutoSizer";
import ImageLoaded, { CHECK_ALL, CHECK_ONLY_ERROR } from "./ImageLoaded";
import ItemManager, { IInfiniteGridGroup, IInfiniteGridItem } from "./ItemManager";
import { matchHTML, $, assign } from "./utils";
import { DUMMY_POSITION } from "./consts";
import DOMRenderer from "./DOMRenderer";
import { ILayout, ILayoutResult } from "./types";

function hasTarget<T>(target: T[], value: T) {
	return ~target.indexOf(value);
}
export interface ILayoutManagerOptions {
	attributePrefix?: string;
	isEqualSize?: boolean;
	isConstantSize?: boolean;
	horizontal?: boolean;
}
export interface ILayoutManagerErrorCallbackOptions {
	target: HTMLImageElement;
	element: HTMLElement;
	items: IInfiniteGridItem[];
	item: IInfiniteGridItem;
	itemIndex?: number;
	replace: (src: string) => void;
	replaceItem: (content: string) => void;
	remove: () => void;
	removeItem: () => void;
}
export interface ILayoutManagerCompleteCallbackOptions {
	groups?: ILayoutResult[];
	items?: IInfiniteGridItem[];
	isAppend?: boolean;
}
export interface ILayoutManagerEndCallbackOptions {
	remove: HTMLElement[];
	layout?: boolean;
}
export interface ILayoutManagerCallbacks {
	complete: (e?: ILayoutManagerCompleteCallbackOptions) => void;
	error: (e?: ILayoutManagerErrorCallbackOptions) => void;
	end: (e?: ILayoutManagerEndCallbackOptions) => void;
}

export default class LayoutMananger {
	public options: Required<ILayoutManagerOptions>;
	public _items: ItemManager;
	public _renderer: DOMRenderer;
	public _layout: ILayout;
	constructor(items: ItemManager, renderer: DOMRenderer, options: ILayoutManagerOptions = {}) {
		assign(this.options = {
			attributePrefix: "data-",
			isEqualSize: false,
			isConstantSize: false,
			horizontal: false,
		}, options);

		this._items = items;
		this._renderer = renderer;
		this._layout = null;
	}
	public setLayout(layout: ILayout) {
		this._layout = layout;
	}
	public setSize(size: number) {
		this._layout.setSize(size);
	}
	public append(
		{
			groups,
			items,
			isUpdate,
		}: {
			groups: IInfiniteGridGroup[],
			items: IInfiniteGridItem[],
			isUpdate?: boolean,
		},
		callbacks: Partial<ILayoutManagerCallbacks>,
	) {
		this._insert({ groups, items, isUpdate, isAppend: true }, callbacks);
	}
	public prepend(
		{
			groups,
			items,
			isUpdate,
		}: {
			groups: IInfiniteGridGroup[],
			items: IInfiniteGridItem[],
			isUpdate?: boolean,
		},
		callbacks: Partial<ILayoutManagerCallbacks>,
	) {
		this._insert({ groups, items, isUpdate, isAppend: false }, callbacks);
	}
	public layout(isRelayout: boolean, groups: IInfiniteGridGroup[], items: IInfiniteGridItem[]) {
		const renderer = this._renderer;
		const { isEqualSize, isConstantSize } = renderer.options;
		const layoutGroups = groups.filter(group => {
			const item = group.items[0];

			return item.orgSize && item.rect.top > DUMMY_POSITION / 10;
		});

		if (!layoutGroups.length) {
			return [];
		}
		let outline = layoutGroups[0].outlines.start;

		if (isRelayout) {
			outline = [outline.length ? Math.min(...outline) : 0];
			if (!isConstantSize && items.length) {
				renderer.updateSize(items);

				// update invisible items' size
				if (isEqualSize && items[0].size) {
					ItemManager.pluck(layoutGroups, "items").forEach(item => {
						item.size = assign({}, items[0].size);
					});
				}
			}
		}
		this._layout.layout(layoutGroups, outline);
		return layoutGroups;
	}
	public destroy() {
		this._items = null;
		this._renderer = null;
	}
	private _complete(
		groups: IInfiniteGridGroup[],
		items: IInfiniteGridItem[],
		isAppend: boolean,
		isUpdate: boolean,
		callback: ILayoutManagerCallbacks["complete"],
	) {
		const itemManager = this._items;
		const cursor = isAppend ? "end" : "start";
		const groupIndex = itemManager.indexOf(groups[0]);
		const prevGroup = itemManager.getData(groupIndex + (isAppend ? -1 : 1));
		let outline = prevGroup ? prevGroup.outlines[cursor] : [0];

		this._renderer.updateSize(items);

		const groupInfos = groups.map(group => {
			const groupOutline = group.outlines[isAppend ? "start" : "end"];
			const isRelayout = isUpdate || !outline.length || (outline.length === groupOutline.length ?
				!outline.every((v, index) => v === groupOutline[index]) : true);

			if (!isRelayout) {
				outline = group.outlines[isAppend ? "end" : "start"];
				DOMRenderer.renderItems(group.items);
				return group;
			}
			const groupItems = group.items;
			const groupInfo = this._layout[isAppend ? "append" : "prepend"](groupItems, outline, true);

			assign(group, groupInfo);
			DOMRenderer.renderItems(groupInfo.items);
			outline = groupInfo.outlines[isAppend ? "end" : "start"];

			return groupInfo;
		});

		callback({
			groups: groupInfos,
			items,
			isAppend,
		});
	}
	private _error(
		removeTarget: HTMLElement[],
		replaceTarget: number[],
		target: HTMLImageElement,
		items: IInfiniteGridItem[],
		errorIndex: number,
		callback: ILayoutManagerCallbacks["error"],
	) {
		const item = items[errorIndex];
		const element = item.el;
		const prefix = this.options.attributePrefix;

		// remove item
		const removeItem = () => {
			if (hasTarget(removeTarget, element)) {
				return;
			}
			removeTarget.push(element);
			const index = replaceTarget.indexOf(errorIndex);

			index !== -1 && replaceTarget.splice(index, 1);
		};
		// remove image
		const remove = () => {
			if (target === element) {
				removeItem();
				return;
			}
			if (hasTarget(removeTarget, element)) {
				return;
			}
			target.parentNode.removeChild(target);
			item.content = element.outerHTML;
			if (hasTarget(replaceTarget, errorIndex)) {
				return;
			}
			replaceTarget.push(errorIndex);
		};
		// replace image
		const replace = (src: string) => {
			if (hasTarget(removeTarget, element)) {
				return;
			}
			if (src) {
				if (matchHTML(src) || typeof src === "object") {
					const parentNode = target.parentNode;

					parentNode.insertBefore($(src), target);
					parentNode.removeChild(target);
					item.content = element.outerHTML;
				} else {
					target.src = src;
					if (target.getAttribute(`${prefix}width`)) {
						AutoSizer.remove(target);
						target.removeAttribute(`${prefix}width`);
						target.removeAttribute(`${prefix}height`);
					}
				}
			}
			item.content = element.outerHTML;
			if (hasTarget(replaceTarget, errorIndex)) {
				return;
			}
			replaceTarget.push(errorIndex);
		};
		// replace item
		const replaceItem = (content: string) => {
			if (hasTarget(removeTarget, element)) {
				return;
			}
			element.innerHTML = content;
			item.content = element.outerHTML;
			if (hasTarget(replaceTarget, errorIndex)) {
				return;
			}
			replaceTarget.push(errorIndex);
		};

		callback({
			target,
			element,
			items,
			item,
			itemIndex: errorIndex,
			replace,
			replaceItem,
			remove,
			removeItem,
		});
	}
	private _end(
		removeTarget: HTMLElement[],
		replaceTarget: number[],
		items: IInfiniteGridItem[],
		callback: ILayoutManagerCallbacks["end"],
	) {
		const { attributePrefix } = this.options;

		const removeTargetLength = removeTarget.length;
		const replaceTargetLength = replaceTarget.length;

		if (!removeTargetLength && !replaceTargetLength) {
			callback({ remove: [] });
			return;
		}
		const layoutedItems = replaceTarget.map(itemIndex => items[itemIndex]);

		if (!replaceTargetLength) {
			callback({ remove: removeTarget, layout: true });
			return;
		}
		// wait layoutComplete beacause of error event.
		ImageLoaded.check(layoutedItems.map(v => v.el), {
			prefix: attributePrefix,
			complete: () => {
				this._renderer.updateSize(layoutedItems);
				callback({ remove: removeTarget, layout: true });
			},
		});
	}
	private _insert(
		{
			groups,
			items = ItemManager.pluck(groups, "items"),
			isAppend,
			isUpdate,
		}: {
			groups: IInfiniteGridGroup[],
			items: IInfiniteGridItem[],
			isAppend: boolean,
			isUpdate: boolean,
		},
		{
			error = () => void 0,
			complete = () => void 0,
			end = () => void 0,
		}: Partial<ILayoutManagerCallbacks>,
	) {
		if (!groups.length) {
			return;
		}
		const checkGroups = isAppend ? groups : groups.reverse();
		const replaceTarget: number[] = [];
		const removeTarget: HTMLElement[] = [];
		const elements = items.map(item => item.el);
		const type = this.options.isEqualSize && this._renderer._size.item ? CHECK_ONLY_ERROR : CHECK_ALL;
		const prefix = this.options.attributePrefix;

		ImageLoaded.check(elements, {
			prefix,
			type,
			complete: () => {
				if (!this._items) {
					return;
				}
				this._complete(checkGroups, items, isAppend, isUpdate, complete);
			},
			error: ({ target, itemIndex }) => {
				if (!this._items) {
					return;
				}
				this._error(removeTarget, replaceTarget, target, items, itemIndex, error);
			},
			end: () => {
				if (!this._items) {
					return;
				}
				this._end(removeTarget, replaceTarget, items, end);
			},
		});
	}
}
