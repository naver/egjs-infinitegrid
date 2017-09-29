import JustifiedLayout from "../../src/layouts/JustifiedLayout";

function getItem(groupNo, i) {
	const item = {
		groupKey: groupNo,
		size: {
			width: parseInt(Math.random() * 200 + 300, 10),
			height: parseInt(Math.random() * 200 + 300, 10),
		},
		rect: {

		},
	};

	return item;
}
function getItems() {
	const group = parseInt(Math.random() * 100, 10);
	const items = [];

	for (let i = 0; i < 22; ++i) {
		items.push(getItem(group, i));
	}
	return items;
}
function round(num) {
	return parseInt(num * 10000, 10);
}
function expectDimension(expect, target, object) {
	return expect(round(target)).to.be.equal(round(object));
}
describe("JustifiedLayout Test", function() {
	describe("Vertical Layout Test", function() {
		describe("append/prepend on outline test", function() {
			before(() => {
				this.inst = new JustifiedLayout({
					margin: 10,
				});
				this.items = [];
				this.inst.width = 800;
				this.inst.height = 800;
			});
			after(() => {
				if (this.inst) {
					this.inst = null;
				}
			});
			it("shoud check a append above outline", () => {
				// Given
				const items = getItems();
				// When
				const result = this.inst.append(items, [0]);
				this.items = this.items.concat(result.items);
				// Then
				console.log(result);
				expectDimension(expect, result.items[0].rect.top, 0);
				expectDimension(expect, result.items[0].rect.bottom, result.items[0].rect.height);
				expectDimension(expect, result.items[1].rect.left, result.items[0].rect.right + 10);
			});
//			it("shoud check a append above bottom outline", () => {
//				// Given
//				const items = getItems();
//				const top = this.items[this.items.length - 1].rect.bottom;
//				// When
//				this.inst.append(items, [{top: top, left: 0}]);
//				this.items = this.items.concat(items);
//				// Then
//				expectDimension(expect, items[0].rect.top, top + 10);
//			});
//			it("shoud check a prepend on outline", () => {
//				// Given
//				const items = getItems();
//				// When
//				this.inst.prepend(items, [{top:0, left: 0}]);
//				this.items = items.concat(this.items);
//				// Then
//				expectDimension(expect, items[items.length - 1].rect.bottom, -10); // margin
//			});
//			it("shoud check a prepend on top outline", () => {
//				// Given
//				const items = getItems();
//				const top = this.items[0].rect.top;
//				// When
//				this.inst.prepend(items, [{top: top, left: 0}]);
//				this.items = items.concat(this.items);
//				// Then
//				expectDimension(expect, items[items.length - 1].rect.bottom, top - 10); // margin
//			});
		});
//		describe("remove item in layout", function() {
//			before(() => {
//				this.inst = new JustifiedLayout({
//					margin: 10,
//				});
//				this.items = [];
//				this.inst.width = 800;
//				this.inst.height = 800;
//			});
//			after(() => {
//				if (this.inst) {
//					this.inst = null;
//				}
//			});
//			it("shoud check a remove 1 item / relayout group", () => {
//				// Given
//				const items = getItems();
//				const items2 = getItems();
//				// When
//				this.inst.append(items, [{top:0, left: 0}]);
//				this.inst.append(items2, [{top:items[items.length - 1].rect.bottom, left: 0}]);
//				this.items = this.items.concat(items);
//				this.items = this.items.concat(items2);
//
//				const bottom1 = items[items.length - 1].rect.bottom;
//				const bottom2 = items2[items2.length - 1].rect.bottom;
//
//				this.inst.remove(items[items.length - 1], this.items, [{top: 0, left: 0}]);
//
//				const dist = bottom1 - items[items.length - 2].rect.bottom;
//				const dist2 = bottom2 - items2[items2.length - 2].rect.bottom;
//
//				// Then
//				expect(items[items.length - 3].rect.bottom).to.be.equal(items[items.length - 2].rect.bottom);
//				expect(items[items.length - 2].rect.bottom).not.to.be.equal(items[items.length - 1].rect.bottom);
//				expect(items[items.length - 2].rect.bottom).not.to.be.equal(bottom1);
//				expectDimension(expect, dist, dist2);
//			});
//		});
	});
//	describe("Horizontal Layout Test", function() {
//		describe("append/prepend on outline test", function() {
//			before(() => {
//				this.inst = new JustifiedLayout({
//					margin: 10,
//					direction: "horizontal",
//				});
//				this.items = [];
//				this.inst.width = 800;
//				this.inst.height = 800;
//			});
//			after(() => {
//				if (this.inst) {
//					this.inst = null;
//				}
//			});
//			it("shoud check a append above outline", () => {
//				// Given
//				const items = getItems();
//				// When
//				this.inst.append(items, [{top:0, left: 0}]);
//				this.items = this.items.concat(items);
//				// Then
//				expect(items[0].rect.left).to.be.equal(0);
//			});
//			it("shoud check a append above right outline", () => {
//				// Given
//				const items = getItems();
//				const left = this.items[this.items.length - 1].rect.right;
//				// When
//				this.inst.append(items, [{top: 0, left: left}]);
//				this.items = this.items.concat(items);
//				// Then
//				expect(items[0].rect.left).to.be.equal(left + 10);
//			});
//			it("shoud check a prepend on outline", () => {
//				// Given
//				const items = getItems();
//				// When
//				this.inst.prepend(items, [{top:0, left: 0}]);
//				this.items = items.concat(this.items);
//				// Then
//				expect(items[items.length - 1].rect.right).to.be.equal(-10); // margin
//			});
//			it("shoud check a prepend on left outline", () => {
//				// Given
//				const items = getItems();
//				const left = this.items[0].rect.left;
//				// When
//				this.inst.prepend(items, [{top: 0, left: left}]);
//				this.items = items.concat(this.items);
//				// Then
//				expect(round(items[items.length - 1].rect.right)).to.be.equal(round(left - 10)); // margin
//			});
//		});
//		describe("remove item in layout", function() {
//			before(() => {
//				this.inst = new JustifiedLayout({
//					margin: 10,
//					direction: "horizontal",
//				});
//				this.items = [];
//				this.inst.width = 800;
//				this.inst.height = 800;
//			});
//			after(() => {
//				if (this.inst) {
//					this.inst = null;
//				}
//			});
//			it("shoud check a remove 1 item / relayout group", () => {
//				// Given
//				const items = getItems();
//				const items2 = getItems();
//
//				// When
//				this.inst.append(items, [{top:0, left: 0}]);
//				this.inst.append(items2, [{top:0, left: items[items.length - 1].rect.right}]);
//				this.items = this.items.concat(items);
//				this.items = this.items.concat(items2);
//
//				const right1 = items[items.length - 1].rect.right;
//				const right2 = items2[items2.length - 1].rect.right;
//
//				this.inst.remove(items[items.length - 1], this.items, [{top: 0, left: 0}]);
//
//				const dist = right1 - items[items.length - 2].rect.right;
//				const dist2 = right2 - items2[items2.length - 2].rect.right;
//
//				expect(items[items.length - 3].rect.right).to.be.equal(items[items.length - 2].rect.right);
//				expect(items[items.length - 2].rect.right).not.to.be.equal(items[items.length - 1].rect.right);
//				expect(items[items.length - 2].rect.right).not.to.be.equal(right1);
//				expectDimension(expect, dist, dist2);
//			});
//		});
//	});
});
