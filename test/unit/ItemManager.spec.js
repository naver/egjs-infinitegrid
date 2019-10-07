import ItemManager from "../../src/ItemManager";
import { IGNORE_CLASSNAME } from "../../src/consts";
import { createElement } from "./helper/TestHelper";
/* eslint-disable */

function initItems(groupKey = 1) {
	return {
		groupKey,
		outlines: { start: [100], end: [] },
		items: [
			{
				groupKey,
				el: createElement(groupKey),
				size: {
					width: 100,
					height: 50
				},
				type: 1,
				rect: {
					top: 0,
					left: 0,
					width: 200,
					height: 100
				}
			},
			{
				groupKey,
				el: createElement(groupKey),
				size: {
					width: 100,
					height: 50
				},
				type: 2,
				rect: {
					top: 0,
					left: 200,
					width: 200,
					height: 100
				}
			},
			{
				groupKey,
				el: createElement(groupKey),
				size: {
					width: 100,
					height: 50
				},
				type: 3,
				rect: {
					top: 100,
					left: 0,
					width: 200,
					height: 100
				}
			},
			{
				groupKey,
				el: createElement(groupKey),
				size: {
					width: 100,
					height: 50
				},
				type: 4,
				rect: {
					top: 100,
					left: 200,
					width: 200,
					height: 100
				}
			},
			{
				groupKey,
				el: createElement(groupKey),
				size: {
					width: 100,
					height: 50
				},
				type: 5,
				rect: {
					top: 200,
					left: 0,
					width: 200,
					height: 100
				}
			}
		]
	};
}

describe("ItemManager Test", function () {
	describe("append/prepend Test", function () {
		beforeEach(() => {
			this.inst = new ItemManager({
			});
		});
		afterEach(() => {
			if (this.inst) {
				this.inst = null;
			}
		});
		it("should have a groupKey all items", () => {
			// Given
			// When
			this.inst.appendGroup(initItems());

			// Then
			const items = this.inst.pluck("items");
			items.forEach(v => {
				expect(v.groupKey).to.be.exist;
			});
		});
		it("should check outline", () => {
			// Given
			// When
			const outline = this.inst.getOutline(0, "start");
			const edge = this.inst.getEdgeValue("start", 0, 1);
			this.inst.appendGroup(initItems());
			const outline2 = this.inst.getOutline(0, "start");
			const edge2 = this.inst.getEdgeValue("start", 0, 1);

			// Then
			expect(outline).to.be.deep.equals([]);
			expect(edge).to.be.deep.equals(0);
			expect(outline2).to.be.deep.equals([100]);
			expect(edge2).to.be.deep.equals(100);
		});
		it("should check indexOf", () => {
			// Given
			const item = initItems(1);
			const item2 = initItems(2);
			// When

			const index = this.inst.indexOf(item);

			this.inst.appendGroup(item);
			this.inst.appendGroup(item2);

			const index2 = this.inst.indexOf({});
			const index3 = this.inst.indexOf(item);
			const index4 = this.inst.indexOf(item.groupKey);
			const index5 = this.inst.indexOf(item2);
			const index6 = this.inst.indexOf(item2.groupKey);

			// Then
			expect(index).to.be.equals(-1);
			expect(index2).to.be.equals(-1);
			expect(index3).to.be.equals(0);
			expect(index4).to.be.equals(0);
			expect(index5).to.be.equals(1);
			expect(index6).to.be.equals(1);
		});
		it("should check append and remove", () => {
			// Given
			const group1 = initItems(1);
			const group2 = initItems(2);

			this.inst.appendGroup(group1);
			this.inst.appendGroup(group2);

			// When
			const groupsLength1 = this.inst.size();
			const length = group1.items.length;
			// remove all items1
			for (let i = 0; i < length; ++i) {
				const indexes = this.inst.indexesOfElement(group1.items[0].el);
				this.inst.remove(indexes.groupIndex, indexes.itemIndex);
			}
			const groupsLength2 = this.inst.size();


			const length2 = group2.items.length;
			// remove all items2

			const groupsLengths = [];
			for (let i = 0; i < length2; ++i) {
				const indexes = this.inst.indexesOfElement(group2.items[0].el);
				this.inst.remove(indexes.groupIndex, indexes.itemIndex);
				groupsLengths.push(this.inst.size());
			}


			// Then
			expect(groupsLength1).to.be.equals(2);
			expect(groupsLength2).to.be.equals(1);

			for (let i = 0; i < groupsLengths.length - 1; ++i) {
				expect(groupsLengths[i]).to.be.equals(1);
			}
			expect(groupsLengths[groupsLengths.length - 1]).to.be.equals(0);
		});
	});
	[true, false].forEach(horizontal => {
		describe(`fit Test(horizontal: ${horizontal})`, function () {
			beforeEach(() => {
				this.inst = new ItemManager({
				});
			});
			afterEach(() => {
				if (this.inst) {
					this.inst = null;
				}
			});
			it("should check position.", () => {
				// Given
				const vertical = [0, 0, 100, 100, 200];
				const horizontal = [0, 200, 0, 200, 0];
				// When
				this.inst.appendGroup(initItems());
				this.inst.fit(100, horizontal);
				// Then
				this.inst.getGroup(0).items.forEach((item, i) => {
					expect(item.rect[horizontal ? "left" : "top"]).to.be.equals((horizontal ? horizontal[i] : vertical[i]) - 100);
				});
			});
		});
	});
});
