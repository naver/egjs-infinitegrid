import { diff } from "@egjs/list-differ";
import { GROUPKEY_ATT, DUMMY_POSITION, ITEM_STATE, GROUP_STATE } from "./consts";
import { isUndefined, assign, categorize } from "./utils";
import { CursorType, IInfiniteGridGroup, IInfiniteGridItem, IItemManagerStatus, IItem, IGroup } from "./types";

export default class ItemManager {
	public static toItems(elements: HTMLElement[], groupKey: string | number): IInfiniteGridItem[] {
		return elements.map(el => ({
			el,
			groupKey,
			mounted: false,
			content: el.outerHTML,
			state: ITEM_STATE.NOT_LOADED,
			rect: {
				top: DUMMY_POSITION,
				left: DUMMY_POSITION,
			},
		}));
	}
	public static pluck<A extends { [key: string]: any }, B extends keyof A>(data: A[], property: B):
		A[B] extends any[] ? A[B] : Array<A[B]> {
		return data.reduce((acc, v) => acc.concat(v[property]), []) as any;
	}
	// groups
	private _groups: IInfiniteGridGroup[] = [];
	// group keys
	private _groupKeys: { [key: string]: IInfiniteGridGroup } = {};

	public clear() {
		this._groups = [];
		this._groupKeys = {};
	}
	public getStatus(startKey?: string | number, endKey?: string | number): IItemManagerStatus {
		const datas = this._groups;
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

		this.clear();

		data.forEach((group, i) => {
			this.insertGroup(group, i);
		});
	}
	public size() {
		return this._groups.length;
	}
	public fit(base: number, horizontal: boolean) {
		const groups = this._groups;
		if (!groups.length) {
			return;
		}
		const property = horizontal ? "left" : "top";

		if (base !== 0) {
			groups.forEach(group => {
				const { items, outlines } = group;

				items.forEach(item => {
					item.rect[property] -= base;
				});
				outlines.start = outlines.start.map(start => start - base);
				outlines.end = outlines.end.map(end => end - base);
			});
		}
	}
	public pluck<T extends keyof IInfiniteGridGroup>(property: T, start?: number, end?: number) {
		const data = isUndefined(start) ? this._groups : this.sliceGroups(start, (isUndefined(end) ? start : end) + 1);

		return ItemManager.pluck(data, property);
	}
	public getOutline(index: number, property: keyof IInfiniteGridGroup["outlines"]) {
		const data = this._groups[index];

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
		const group = this.getGroup(this.getEdgeIndex(cursor, start, end));

		if (group) {
			const outlines = group.outlines[cursor];

			if (outlines.length) {
				return Math[cursor === "start" ? "min" : "max"](...outlines);
			}
		}
		return 0;
	}
	public clearOutlines() {
		this._groups.forEach(group => {
			group.outlines.start = [];
			group.outlines.end = [];
		});
	}
	public getMaxEdgeValue() {
		const groups = this._groups;
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
	public prependGroup(group: IGroup): IInfiniteGridGroup | null {
		return this.insertGroup(group, 0);
	}
	public appendGroup(group: IGroup): IInfiniteGridGroup | null {
		return this.insertGroup(group, this._groups.length);
	}
	public insertGroup(group: IGroup, groupIndex: number): IInfiniteGridGroup | null {
		if (groupIndex < 0) {
			return null;
		}
		const prevItems: IItem[] = group.items || [];
		const newGroup: IInfiniteGridGroup = {
			state: GROUP_STATE.NOT_CACHED,
			outlines: {
				start: [],
				end: [],
			},
			...group,
			items: [],
		};
		this._groups.splice(groupIndex, 0, newGroup);
		this._groupKeys[newGroup.groupKey] = newGroup;

		prevItems.forEach((item, i) => {
			this.insert(item, groupIndex, i);
		});
		return newGroup;
	}
	public sync(items: IItem[]) {
		const groups = this._groups;
		const newGroups = categorize(items);
		const {
			removed,
			added,
			ordered,
			maintained,
		} = diff(groups, newGroups, group => group.groupKey);

		removed.forEach(removedIndex => {
			this.removeGroup(removedIndex);
		});
		ordered.forEach(([prevIndex, nextIndex], i) => {
			const group = groups.splice(prevIndex, 1)[0];

			groups.splice(nextIndex, 0, group);
		});
		added.forEach(addedIndex => {
			this.insertGroup(newGroups[addedIndex], addedIndex);
		});
		maintained.forEach(([, toIndex]) => {
			this.syncItems(groups[toIndex].items, newGroups[toIndex].items, toIndex);
		});
	}
	public insert(newItem: IItem, groupIndex = -1, itemIndex = -1): IInfiniteGridItem | null {
		const { groupKey } = newItem;
		const groups = this._groups;
		const groupKeys = this._groupKeys;
		const group = (groupIndex > -1 ? groups[groupIndex] : groupKeys[groupKey])
			|| this.insertGroup({ groupKey }, groupIndex);

		if (!group) {
			return null;
		}
		const groupItem: IInfiniteGridItem = {
			content: "",
			state: ITEM_STATE.NOT_LOADED,
			mounted: false,
			rect: {
				top: DUMMY_POSITION,
				left: DUMMY_POSITION,
			},
			...newItem,
		};
		const groupItems = group.items;

		if (itemIndex === -1) {
			groupItems.push(groupItem);
		} else {
			group.items.splice(itemIndex, 0, groupItem);
		}

		return groupItem;
	}
	public removeGroup(groupIndex: number): IInfiniteGridGroup | null {
		const group = this._groups.splice(groupIndex, 1)[0];

		if (!group) {
			return null;
		}
		delete this._groupKeys[group.groupKey];

		return group;
	}
	public remove(groupIndex: number, itemIndex: number) {
		const data = this.getGroup(groupIndex);
		let group: IInfiniteGridGroup | null = null;
		let items: IInfiniteGridItem[] = [];

		if (!data) {
			return { items, group };
		}
		// remove item information
		items = data.items.splice(itemIndex, 1);

		if (!data.items.length) {
			group = this.removeGroup(groupIndex);
		}
		return { items, group };
	}
	public indexOf(data?: { groupKey: string | number } | string | number) {
		const groupKey = `${typeof data === "object" ? data.groupKey : data}`;
		const datas = this._groups;
		const length = datas.length;

		for (let i = 0; i < length; ++i) {
			if (groupKey === `${datas[i].groupKey}`) {
				return i;
			}
		}
		return -1;
	}
	public indexesOfElement(element: HTMLElement) {
		const groupKey = element.getAttribute(GROUPKEY_ATT)!;
		const groupIndex = this.indexOf({ groupKey });
		let itemIndex = -1;

		if (groupIndex > -1) {
			const data = this.getGroup(groupIndex);

			const length = data.items.length;

			for (let i = 0; i < length; i++) {
				if (data.items[i].el === element) {
					itemIndex = i;
					break;
				}
			}
		}
		return { groupIndex, itemIndex };
	}
	public sliceGroups(start?: number, end?: number) {
		return this._groups.slice(start, end);
	}
	public getGroups() {
		return this._groups;
	}
	public getGroupByKey(key: number | string) {
		return this._groupKeys[key];
	}
	public getGroup(index: number) {
		return this._groups[index];
	}
	public getLastGroup() {
		return this._groups[this.size() - 1];
	}
	public getFirstGroup() {
		return this._groups[0];
	}
	private syncItems(items: IItem[], newItems: IItem[], groupIndex: number) {
		const {
			removed,
			added,
			ordered,
		} = diff(items, newItems, item => item.itemKey);

		removed.forEach(removedIndex => {
			this.remove(groupIndex, removedIndex);
		});
		ordered.forEach(([prevIndex, nextIndex]) => {
			const item = items.splice(prevIndex, 1)[0];

			items.splice(nextIndex, 0, item);
		});
		added.forEach(addedIndex => {
			this.insert(newItems[addedIndex], groupIndex, addedIndex);
		});
	}
}
