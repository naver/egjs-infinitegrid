import ItemManager from "./ItemManager";
import { matchHTML, $, assign } from "./utils";
import DOMRenderer from "./DOMRenderer";
import { ILayout, IInfiniteGridItem, IInfiniteGridGroup, RenderManagerEvents } from "./types";
import { check, removeAutoSizer } from "@egjs/lazyloaded";
import Infinite from "./Infinite";
import Component from "@egjs/component";

function hasTarget<T>(target: T[], value: T) {
	return ~target.indexOf(value);
}

export default class RenderManager {
	private _layout: ILayout;
	constructor(
		private _infinite: Infinite,
		private _itemManager: ItemManager,
		private _renderer: DOMRenderer,
		private options: {
			attributePrefix: string;
			isEqualSize: boolean;
			isConstantSize: boolean;
			horizontal: boolean;
		},
	) { }
	public setLayout(layout: ILayout) {
		this._layout = layout;
	}
	public render(
		callbackComponent: Component<RenderManagerEvents>,
		groups: IInfiniteGridGroup[],
		items = ItemManager.pluck(groups, "items"),
		isAppend?: boolean,
	) {
		const checkGroups = isAppend ? groups : groups.reverse();
		const replaceTarget: number[] = [];
		const removeTarget: HTMLElement[] = [];
		const elements = items.map(item => item.el!);
		const prefix = this.options.attributePrefix;

		check(
			elements,
			prefix,
		).on("ready", () => {
			if (!this._itemManager) {
				return;
			}
			this._complete(callbackComponent, checkGroups, items, isAppend);
		}).on("error", ({
			target,
			itemIndex,
		}: any) => {
			if (!this._itemManager) {
				return;
			}
			this._error(callbackComponent, removeTarget, replaceTarget, target, items, itemIndex);
		}).on("finish", () => {
			if (!this._itemManager) {
				return;
			}
			this._end(callbackComponent, removeTarget, replaceTarget, items);
		});

		return callbackComponent;
	}
	private _complete(
		callbackComponent: Component<RenderManagerEvents>,
		groups: IInfiniteGridGroup[],
		items: IInfiniteGridItem[],
		isAppend?: boolean,
	) {
		const infinite = this._infinite;
		const layout = this._layout;
		const itemManager = this._itemManager;
		const cursor = isAppend ? "end" : "start";
		const groupIndex = itemManager.indexOf(groups[0]);
		const prevGroup = itemManager.getGroup(groupIndex + (isAppend ? -1 : 1));
		let outline = prevGroup ? prevGroup.outlines[cursor] : [0];

		this._renderer.updateSize(items);
		groups.forEach(group => {
			const groupOutline = group.outlines[isAppend ? "start" : "end"];
			const isRelayout = !outline.length || (outline.length === groupOutline.length ?
				!outline.every((v, index) => v === groupOutline[index]) : true);

			if (!isRelayout) {
				outline = group.outlines[isAppend ? "end" : "start"];
				this._renderer.renderItems(group.items);
				return;
			}
			const groupItems = group.items;
			const groupInfo = layout[isAppend ? "append" : "prepend"](groupItems, outline, true);

			assign(group, groupInfo);
			this._renderer.renderItems(groupInfo.items);
			outline = groupInfo.outlines[isAppend ? "end" : "start"];
		});

		const startCursor = Math.max(infinite.getCursor("start"), 0);
		const endCursor = Math.max(infinite.getCursor("end"), 0);
		let requestStartCursor = itemManager.indexOf(groups[0].groupKey);
		let requestEndCursor = itemManager.indexOf(groups[groups.length - 1].groupKey);
		let isInCursor = true;

		if (requestStartCursor > endCursor + 1 || requestEndCursor < startCursor - 1) {
			isInCursor = false;
		}
		if (isInCursor) {
			if (isAppend) {
				requestStartCursor = startCursor;
				requestEndCursor = Math.max(endCursor, requestEndCursor);
			} else {
				requestStartCursor = Math.max(Math.min(startCursor, requestStartCursor), 0);
				requestEndCursor = endCursor;
			}
		}
		if (requestStartCursor > requestEndCursor) {
			const tempCursor = requestStartCursor;

			requestStartCursor = requestEndCursor;
			requestEndCursor = tempCursor;
		}
		callbackComponent.trigger("renderComplete", {
			start: requestStartCursor,
			end: requestEndCursor,
		});
		callbackComponent.trigger("layoutComplete", {
			items: ItemManager.pluck(groups, "items"),
			isAppend: !!isAppend,
		});
	}
	private _error(
		callbackComponent: Component<RenderManagerEvents>,
		removeTarget: HTMLElement[],
		replaceTarget: number[],
		target: HTMLImageElement,
		items: IInfiniteGridItem[],
		errorIndex: number,
	) {
		const itemManager = this._itemManager;
		const item = items[errorIndex];
		const element = item.el!;
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
			target.parentNode!.removeChild(target);
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
					const parentNode = target.parentNode!;

					parentNode.insertBefore($(src), target);
					parentNode.removeChild(target);
					item.content = element.outerHTML;
				} else {
					target.src = src;
					if (target.getAttribute(`${prefix}width`)) {
						removeAutoSizer(target, prefix);
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
		const totalIndex = itemManager.pluck("items").indexOf(item);

		callbackComponent.trigger("imageError", {
			target,
			element,
			items,
			item,
			itemIndex: errorIndex,
			replace,
			replaceItem,
			remove,
			removeItem,
			totalIndex,
		});
	}
	private _end(
		callbackComponent: Component<RenderManagerEvents>,
		removeTarget: HTMLElement[],
		replaceTarget: number[],
		items: IInfiniteGridItem[],
	) {
		const { attributePrefix } = this.options;
		const removeTargetLength = removeTarget.length;
		const replaceTargetLength = replaceTarget.length;

		if (!removeTargetLength && !replaceTargetLength) {
			callbackComponent.trigger("finish", { remove: [] });
			return;
		}
		const layoutedItems = replaceTarget.map(itemIndex => items[itemIndex]);

		if (!replaceTargetLength) {
			callbackComponent.trigger("finish", { remove: removeTarget, layout: true });
			return;
		}
		// wait layoutComplete beacause of error event.
		check(layoutedItems.map(v => v.el!), attributePrefix).on("ready", () => {
			this._renderer.updateSize(layoutedItems);
			callbackComponent.trigger("finish", { remove: removeTarget, layout: true });
		});
	}
}
