import { MULTI, GROUPKEY_ATT, IGNORE_CLASSNAME, DUMMY_POSITION } from "./consts";
import { $, toArray, isUndefined, assign } from "./utils";
import { CursorType, IJQuery, IInfiniteGridGroup, IInfiniteGridItem, IItemManagerStatus } from "./types";

export default class ItemManager {
	public static from(
		elements: HTMLElement[] | string | string[] | IJQuery, selector: string,
		{ groupKey }: { groupKey: string | number }) {
		const filted = ItemManager.selectItems($(elements, MULTI), selector);

		// Item Structure
		return toArray(filted).map(el => ({
			el,
			groupKey,
			content: el.outerHTML,
			rect: {
				top: DUMMY_POSITION,
				left: DUMMY_POSITION,
			},
		}));
	}
	public static selectItems(elements: HTMLElement[], selector?: string) {
		return elements.filter(v => {
			const classNames = v.className.split(" ");

			if (classNames.some(c => c === IGNORE_CLASSNAME)) {
				return false;
			} else if (!selector || selector === "*") {
				return v;
			} else {
				return classNames.some(c => c === selector);
			}
		});
	}
	public static pluck<A extends { [key: string]: any }, B extends keyof A>(data: A[], property: B):
		A[B] extends any[] ? A[B] : Array<A[B]> {
		return data.reduce((acc, v) => acc.concat(v[property]), []) as any;
	}
	public _data: IInfiniteGridGroup[];
	constructor() {
		this.clear();
	}
	public getStatus(startKey?: string | number, endKey?: string | number): IItemManagerStatus {
		const datas = this._data;
		const startIndex = Math.max(this.indexOf(startKey), 0);
		const endIndex = this.indexOf(endKey) + 1 || datas.length;

		return {
			_data: datas.slice(startIndex, endIndex).map(data => {
				const items = data.items.map(item => {
					const item2 = assign({}, item);

					delete item2.el;
					return item2;
				});
				const data2 = assign({}, data);

				data2.items = items;
				return data2;
			}),
		};
	}
	public setStatus(status: IItemManagerStatus) {
		const data = status._data;

		this.set(data);
	}
	public size() {
		return this._data.length;
	}
	public fit(base: number, horizontal: boolean) {
		if (!this._data.length) {
			return;
		}
		const property = horizontal ? "left" : "top";

		if (base !== 0) {
			this._data = this._data.map(v => {
				v.items = v.items.map(item => {
					item.rect[property] -= base;
					return item;
				});
				v.outlines.start = v.outlines.start.map(start => start - base);
				v.outlines.end = v.outlines.end.map(end => end - base);
				return v;
			});
		}
	}
	public pluck<T extends keyof IInfiniteGridGroup>(property: T, start?: number, end?: number) {
		const data = isUndefined(start) ? this._data :
			this._data.slice(start, (isUndefined(end) ? start : end) + 1);

		return ItemManager.pluck(data, property);
	}
	public getOutline(index: number, property: keyof IInfiniteGridGroup["outlines"]) {
		const data = this._data[index];

		return data ? data.outlines[property] : [];
	}
	public getEdgeIndex(cursor: CursorType, start: number, end: number) {
		const prop = cursor === "start" ? "min" : "max";
		let index = -1;
		let targetValue = cursor === "start" ? Infinity : -Infinity;

		for (let i = start; i <= end; i++) {
			const value = Math[prop](...this.getOutline(i, cursor));

			if ((cursor === "start" && targetValue > value) ||
				(cursor === "end" && targetValue < value)) {
				targetValue = value;
				index = i;
			}
		}
		return index;
	}
	public getEdgeValue(cursor: CursorType, start: number, end: number) {
		const outlines = this.pluck("outlines", this.getEdgeIndex(cursor, start, end))
			.reduce<number[]>((acc, v) => acc.concat(v[cursor]), []);

		return outlines.length ? Math[cursor === "start" ? "min" : "max"](...outlines) : 0;
	}
	public clearOutlines(startCursor = -1, endCursor = -1) {
		const datas = this.get();

		datas.forEach((group, cursor) => {
			if (startCursor <= cursor && cursor <= endCursor) {
				return;
			}
			group.items.forEach(item => {
				item.rect.top = DUMMY_POSITION;
				item.rect.left = DUMMY_POSITION;
			});
			group.outlines.start = [];
			group.outlines.end = [];
		});
	}
	public getMaxEdgeValue() {
		const groups = this.get();
		const length = groups.length;

		for (let i = length - 1; i >= 0; --i) {
			const end = groups[i].outlines.end;

			if (end.length) {
				const pos = Math.max(...end);

				return pos;
			}
		}
		return 0;
	}
	public append(layouted: IInfiniteGridGroup) {
		this._data.push(layouted);
		return layouted.items;
	}
	public prepend(layouted: IInfiniteGridGroup) {
		this._data.unshift(layouted);
		return layouted.items;
	}
	public clear() {
		this._data = [];
	}
	public remove(element: HTMLElement, start: number, end: number) {
		let items: IInfiniteGridItem[] = [];
		let groups: IInfiniteGridGroup[] = [];
		const key = element.getAttribute(GROUPKEY_ATT);
		const datas = this.get(start, end)
			.filter(v => String(v.groupKey) === key);

		if (!datas.length) {
			return { items, groups };
		}
		const data = datas[0];

		const length = data.items.length;
		let idx = -1;

		for (let i = 0; i < length; i++) {
			if (data.items[i].el === element) {
				idx = i;
				break;
			}
		}
		if (idx >= 0) {
			// remove item information
			items = data.items.splice(idx, 1);

			if (!data.items.length) {
				this._data.splice(this.indexOf(data), 1);
				groups = [data];
			} else {
				this.set(data, key);
			}
		}
		return { items, groups };
	}
	public indexOf(data: IInfiniteGridGroup | string | number) {
		const groupKey = typeof data === "object" ? data.groupKey : data;
		const datas = this._data;
		const length = datas.length;

		for (let i = 0; i < length; ++i) {
			if (groupKey === datas[i].groupKey) {
				return i;
			}
		}
		return -1;
	}
	public get(start?: number, end?: number) {
		return isUndefined(start) ? this._data :
			this._data.slice(start, (isUndefined(end) ? start : end) + 1);
	}
	public set(data: IInfiniteGridGroup | IInfiniteGridGroup[], key?: string | number) {
		if (!Array.isArray(data)) {
			if (!isUndefined(key)) {
				const len = this._data.length;
				let idx = -1;

				for (let i = 0; i < len; i++) {
					if (this._data[i].groupKey === key) {
						idx = i;
						break;
					}
				}
				idx > 0 && (this._data[idx] = data);
			}
		} else {
			this._data = data.concat();
		}
	}
	public getData(index: number) {
		return this._data[index];
	}
}
