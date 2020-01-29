import ItemManager from "./ItemManager";
import { assign, find, findLast } from "./utils";
import { CursorType, IInfiniteGridGroup, IInfiniteStatus, IRemoveResult, IItem, IInfiniteOptions, IInfiniteGridItem } from "./types";
import { diff } from "@egjs/list-differ";

function isVisible(group: IInfiniteGridGroup, threshold: number, scrollPos: number, endScrollPos: number) {
	const { items, outlines } = group;
	const start = outlines.start;
	const end = outlines.end;

	if (start.length === 0 || end.length === 0 || !items.length || !items[0].el) {
		return 2;
	}
	const min = Math.min(...start);
	const max = Math.max(...end);

	if ((endScrollPos + threshold < min)) {
		return +1;
	} else if ((scrollPos - threshold > max)) {
		return -1;
	}
	return 0;
}

class Infinite {
	public options: Required<IInfiniteOptions>;
	private _itemManager: ItemManager;
	private _status: IInfiniteStatus;
	constructor(itemManger: ItemManager, options: IInfiniteOptions) {
		this.options = assign({
			useRecycle: true,
			threshold: 100,
			append: () => void 0,
			prepend: () => void 0,
			recycle: () => void 0,
		}, options);

		this._itemManager = itemManger;
		this.clear();
	}
	public setSize(size: number) {
		this._status.size = size;
	}
	public sync(items: IItem[]) {
		const status = this._status;
		const { startCursor, endCursor } = status;
		const itemManager = this._itemManager;
		const prevVisisbleGroups = itemManager.sliceGroups(startCursor, endCursor + 1);
		const prevVisibleItems = ItemManager.pluck(prevVisisbleGroups, "items");
		const result = itemManager.sync(items);
		const startGroup = find(
			prevVisisbleGroups,
			({ groupKey }) => itemManager.getGroupByKey(groupKey),
		);
		const endGroup = findLast(
			prevVisisbleGroups,
			({ groupKey }) => itemManager.getGroupByKey(groupKey),
		);
		let nextStartCursor = startGroup ? itemManager.indexOf(startGroup) : -1;
		let nextEndCursor = endGroup ? itemManager.indexOf(endGroup) : -1;

		if (nextStartCursor > -1 && nextEndCursor > -1) {
			// This is when the arrangement is inverted.
			// prevVisisbleGroups is [0, 1, 2, 3]
			// but currentGroups is [3, 2, 1, 0]
			// so, nextStartCursor is 3, and nextEndCursor is 0
			const minCursor = Math.min(nextStartCursor, nextEndCursor);
			const maxCursor = Math.max(nextStartCursor, nextEndCursor);

			nextStartCursor = minCursor;
			nextEndCursor = maxCursor;
		} else if (nextEndCursor > -1) {
			nextStartCursor = nextEndCursor;
		} else if (nextStartCursor > -1) {
			nextEndCursor = nextStartCursor;
		}

		status.startCursor = nextStartCursor;
		status.endCursor = nextEndCursor;

		if (result.removed.length > 0) {
			return "relayout";
		} else {
			const nextVisibleItems = itemManager.pluck("items", startCursor, endCursor);
			const visibleDiffResult = diff(prevVisibleItems, nextVisibleItems, ({ itemKey }) => itemKey);

			if (visibleDiffResult.removed.length > 0) {
				return "layout";
			} else {
				return "";
			}
		}
	}
	public recycle(scrollPos: number | null, isForward?: boolean) {
		if (!this.options.useRecycle || typeof scrollPos !== "number") {
			return;
		}
		const { startCursor, endCursor, size } = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return;
		}
		const endScrollPos = scrollPos + size;
		const { threshold, recycle } = this.options;
		const visibles = this._itemManager.sliceGroups(startCursor, endCursor + 1)
			.map(group => isVisible(group, threshold, scrollPos, endScrollPos));
		const length = visibles.length;
		let start = isForward ? 0 : visibles.lastIndexOf(0);
		let end = isForward ? visibles.indexOf(0) - 1 : visibles.length - 1;

		if (!isForward && start !== -1) {
			start += 1;
		}
		if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
			return;
		}
		start = startCursor + start;
		end = startCursor + end;

		if (isForward) {
			this.setCursor("start", end + 1);
		} else {
			this.setCursor("end", start - 1);
		}
		recycle({ start, end });
	}
	public scroll(scrollPos: number | null) {
		const [startCursor, endCursor] = this.getCursors();
		const items = this._itemManager;

		if (typeof scrollPos !== "number" || startCursor === -1 ||
			endCursor === -1 || !items.size()) {
			return;
		}
		const size = this._status.size;
		const { threshold, append, prepend } = this.options;
		const datas = items.getGroups();
		const endScrollPos = scrollPos + size;
		const startEdgePos = Math.max(...datas[startCursor].outlines.start);
		const endEdgePos = Math.min(...datas[endCursor].outlines.end);
		const visibles = datas.map((group, i) => {
			const { start, end } = group.outlines;

			if (!start.length || !end.length) {
				return false;
			}
			const startPos = Math.min(...start);
			const endPos = Math.max(...end);

			if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
				return true;
			}
			return false;
		});
		const startIndex = visibles.indexOf(true);
		const endIndex = visibles.lastIndexOf(true);

		if (~startIndex && startIndex < startCursor) {
			prepend({ cache: datas.slice(startIndex, Math.min(startCursor, endIndex + 1)) });
		} else if (endCursor < endIndex) {
			append({ cache: datas.slice(Math.max(startIndex, endCursor + 1), endIndex + 1) });
		} else {
			// if you have data(no cachedAppendData, has cachedPrependData) to pepend, request it.
			const cachedAppendData = datas.slice(endCursor + 1, endCursor + 2);
			const cachedPrependData = datas.slice(startCursor - 1, startCursor);
			const isPrepend = scrollPos <= startEdgePos + threshold;

			if (
				endScrollPos >= endEdgePos - threshold
				&& (!isPrepend || cachedAppendData.length || !cachedPrependData.length)
			) {
				append({ cache: cachedAppendData });
			} else if (isPrepend) {
				prepend({ cache: cachedPrependData });
			}
		}
	}
	public setCursor(cursor: CursorType, index: number) {
		const status = this._status;
		const items = this._itemManager;
		const size = items.size();

		if (!this.options.useRecycle) {
			status.startCursor = 0;
			if (items.getOutline(size - 1, "end").length) {
				status.endCursor = size - 1;
				return;
			}
			if (cursor !== "end") {
				return;
			}
		}
		if (cursor === "start") {
			status.startCursor = index;
		} else {
			status.endCursor = Math.min(size - 1, index);
		}
		status.startCursor = Math.max(0, status.startCursor);
	}
	public setStatus(status: IInfiniteStatus) {
		this._status = assign(this._status, status);
	}
	public getStatus(startKey?: string | number, endKey?: string | number): IInfiniteStatus {
		const { startCursor, endCursor, size } = this._status;
		const startIndex = Math.max(this._itemManager.indexOf(startKey), 0);
		const endIndex = (this._itemManager.indexOf(endKey) + 1 || this._itemManager.size()) - 1;
		const start = Math.max(startCursor - startIndex, ~startCursor ? 0 : -1);
		const end = Math.max(Math.min(endCursor - startIndex, endIndex - startIndex), start);

		return {
			startCursor: start,
			endCursor: end,
			size,
		};
	}
	public getEdgeOutline(cursor: CursorType) {
		const { startCursor, endCursor } = this._status;

		if (startCursor === -1 || endCursor === -1) {
			return [];
		}
		return this._itemManager.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
	}
	public getEdgeValue(cursor: CursorType) {
		const outlines = this.getEdgeOutline(cursor);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
	}
	public getVisibleItems(): IInfiniteGridItem[] {
		const { startCursor, endCursor } = this._status;

		return this._itemManager.pluck("items", startCursor, endCursor);
	}
	public getCursors() {
		const status = this._status;

		return [
			status.startCursor,
			status.endCursor,
		];
	}
	public getCursor(cursor: CursorType) {
		return this._status[cursor === "start" ? "startCursor" : "endCursor"];
	}
	public getVisibleData() {
		const { startCursor, endCursor } = this._status;

		return this._itemManager.sliceGroups(startCursor, endCursor + 1);
	}

	public remove(groupIndex: number, itemIndex: number): IRemoveResult {
		const status = this._status;
		const items = this._itemManager;
		const { startCursor, endCursor } = status;
		const result = items.remove(groupIndex, itemIndex);

		if (result.group) {
			if (groupIndex < startCursor) {
				this.setCursor("start", startCursor - 1);
			}
			if (groupIndex <= endCursor) {
				this.setCursor("end", endCursor - 1);
			}
		}
		if (!items.size()) {
			status.startCursor = -1;
			status.endCursor = -1;
		}
		return result;
	}
	public clear() {
		this._status = {
			startCursor: -1,
			endCursor: -1,
			size: -1,
		};
	}
}

export default Infinite;
