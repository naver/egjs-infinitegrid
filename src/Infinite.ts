import ItemManager from "./ItemManager";
import { assign, findIndex, findLastIndex } from "./utils";
import { CursorType, IInfiniteStatus, IRemoveResult, IItem, IInfiniteGridItem, IInfiniteOptions, IInfiniteGridGroup } from "./types";

class Infinite {
	public options: Required<IInfiniteOptions>;
	private _items: ItemManager;
	private _status: IInfiniteStatus;
	constructor(itemManger: ItemManager, options: IInfiniteOptions) {
		this.options = assign({
			useRecycle: true,
			threshold: 100,
			request: () => void 0,
			change: () => void 0,
		}, options);

		this._items = itemManger;
		this.clear();
	}
	public setSize(size: number) {
		this._status.size = size;
	}
	public scroll(scrollPos: number | null, isTrusted: boolean = true) {
		const startCursor = this.getCursor("start");
		const endCursor = this.getCursor("end");
		const { threshold, request, change, useRecycle } = this.options;
		const itemManager = this._items;
		const groupLength = itemManager.size();

		if (!groupLength) {
			return;
		} else if (startCursor === -1 || endCursor === -1) {
			change(true, { start: 0, end: 0 }, isTrusted);
			return;
		}
		if (typeof scrollPos !== "number") {
			return;
		}
		const size = this._status.size;
		const groups = itemManager.getGroups();
		const endScrollPos = scrollPos + size;
		const startEdgePos = Math.max(...groups[startCursor].outlines.start);
		const endEdgePos = Math.min(...groups[endCursor].outlines.end);

		const visibles = groups.map(group => {
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

		let startIndex = visibles.indexOf(true);
		let endIndex = visibles.lastIndexOf(true);

		if (!useRecycle) {
			startIndex = startIndex < 0 ? startCursor : Math.min(startCursor, startIndex);
			endIndex = endIndex < 0 ? endCursor : Math.max(endCursor, endIndex);

			while (endIndex < groupLength - 1) {
				const outline = groups[endIndex + 1].outlines.end;

				if (!outline.length || scrollPos <= Math.max(...outline) + threshold) {
					break;
				}
				++endIndex;
			}
			while (startIndex >= 1) {
				const outline = groups[startIndex - 1].outlines.start;

				if (!outline.length || Math.min(...outline) - threshold <= endScrollPos) {
					break;
				}
				--startIndex;
			}
		}
		const isAppend = endScrollPos >= endEdgePos - threshold;
		const isPrepend = scrollPos <= startEdgePos + threshold;

		if (~startIndex && ~endIndex) {
			if (startIndex < startCursor) {
				// prepend prev item
				change(false, { start: startIndex, end: endIndex }, isTrusted);
				return;
			} else if (endCursor < endIndex) {
				// append next item
				change(true, { start: startIndex, end: endIndex }, isTrusted);
				return;
			} else if (isAppend && endCursor < endIndex + 1 && endIndex + 1 < groupLength) {
				// append next item(no outline)
				change(true, { start: startIndex, end: endIndex + 1 }, isTrusted);
				return;
			} else if (isPrepend && startIndex - 1 < startCursor && startIndex > 0) {
				// prepend prev item(no outline)
				change(false, { start: startIndex - 1, end: endIndex }, isTrusted);
				return;
			} else if (
				(startCursor !== startIndex || endCursor !== endIndex)
				&& startCursor <= startIndex && endIndex <= endCursor
			) {
				// only some items are shown as they are recycled.
				change(true, { start: startIndex, end: endIndex }, isTrusted);
				return;
			}
		}
		// if you have data(no cachedAppendData, has cachedPrependData) to prepend, request it.
		for (endIndex = endCursor + 1; endIndex < groupLength - 1; ++endIndex) {
			const outline = groups[endIndex + 1].outlines.end;

			if (!outline.length) {
				break;
			}
		}
		for (startIndex = startCursor - 1; startIndex >= 1; --startIndex) {
			const outline = groups[startIndex - 1].outlines.start;

			if (!outline.length) {
				break;
			}
		}

		const hasAppendData = endIndex < groupLength;
		const hasPrependData = startIndex >= 0;

		// Priority (Check if next item exists.)
		// 1. Append Cached Data (isAppend && hasAppendData)
		// 2. Prepend Cached Data (isPrepend && hasPrependData)
		// 3. Reqeust Append (isAppend)
		// 4. Reqeust Prepend (isPrepend)
		if (isAppend && (!isPrepend || hasAppendData || !hasPrependData)) {
			if (hasAppendData) {
				change(true, { start: useRecycle ? endIndex : startIndex, end: endIndex }, isTrusted);
			} else {
				request(true, isTrusted);
			}
		} else if (isPrepend) {
			if (hasPrependData) {
				change(false, { start: startIndex, end: useRecycle ? startIndex : endIndex }, isTrusted);
			} else {
				request(false, isTrusted);
			}
		}
	}
	public prependCursor() {
		const status = this._status;

		++status.startCursor;
		++status.endCursor;
	}
	public setCursor(cursor: CursorType, index: number) {
		const status = this._status;
		const items = this._items;
		const size = items.size();

		let { startCursor, endCursor } = status;

		if (!this.options.useRecycle) {
			startCursor = startCursor > -1 ? Math.min(index, startCursor) : index;
			endCursor = endCursor > - 1 ? Math.max(index, endCursor) : index;
		} else {
			if (cursor === "start") {
				startCursor = index;
			} else {
				endCursor = index;
			}
		}

		status.startCursor = Math.max(0, startCursor);
		status.endCursor = Math.min(size - 1, endCursor);
	}
	public setStatus(status: IInfiniteStatus) {
		this._status = assign(this._status, status);
	}
	public getStatus(startKey?: string | number, endKey?: string | number): IInfiniteStatus {
		const { startCursor, endCursor, size } = this._status;
		const startIndex = Math.max(this._items.indexOf(startKey), 0);
		const endIndex = (this._items.indexOf(endKey) + 1 || this._items.size()) - 1;
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
		return this._items.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
	}
	public getEdgeValue(cursor: CursorType) {
		const outlines = this.getEdgeOutline(cursor);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
	}
	public getVisibleItems(): IInfiniteGridItem[] {
		return this._items.pluck("items", this._status.startCursor, this._status.endCursor);
	}
	public getCursor(cursor: CursorType) {
		return this._status[cursor === "start" ? "startCursor" : "endCursor"];
	}
	public getVisibleGroups(): IInfiniteGridGroup[] {
		const { startCursor, endCursor } = this._status;

		return this._items.sliceGroups(startCursor, endCursor + 1);
	}
	public sync(items: IItem[]) {
		const status = this._status;
		const { startCursor, endCursor } = status;
		const itemManager = this._items;
		const prevVisisbleGroups = itemManager.sliceGroups(startCursor, endCursor + 1);

		this._items.sync(items);
		let nextStartCursor = findIndex(
			prevVisisbleGroups,
			({ groupKey }) => itemManager.getGroupByKey(groupKey),
		);
		let nextEndCursor = findLastIndex(
			prevVisisbleGroups,
			({ groupKey }) => itemManager.getGroupByKey(groupKey),
		);
		if (nextStartCursor > -1 && nextEndCursor > -1) {
			// This is when the arrangement is inverted.
			// prevVisisbleGroups is [0, 1, 2, 3]
			// but currentGroups is [3, 2, 1, 0]
			// so, nextStartCursor is 3, and nextEndCursor is 0
			nextStartCursor = Math.min(nextStartCursor, nextEndCursor);
			nextEndCursor = Math.max(nextStartCursor, nextEndCursor);
		} else if (nextEndCursor > -1) {
			nextStartCursor = nextEndCursor;
		} else if (nextStartCursor > -1) {
			nextEndCursor = nextStartCursor;
		} else {
			const size = itemManager.size();

			if (size > 0) {
				nextStartCursor = 0;
				nextEndCursor = 0;
			}
		}
		status.startCursor = nextStartCursor;
		status.endCursor = nextEndCursor;
	}
	public remove(groupIndex: number, itemIndex: number): IRemoveResult {
		const status = this._status;
		const items = this._items;
		const { startCursor, endCursor } = status;
		const result = items.remove(groupIndex, itemIndex);

		if (result.group) {
			if (groupIndex < startCursor) {
				--status.startCursor;
				--status.endCursor;
			} else if (groupIndex <= endCursor) {
				--status.endCursor;
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
