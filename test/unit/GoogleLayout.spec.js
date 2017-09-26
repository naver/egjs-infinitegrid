import GoogleLayout from "../../src/layouts/GoogleLayout";

function getItem(groupNo, i) {
	const item = {
		groupKey: groupNo,
		size: {
			width: parseInt(Math.random() * 200 + 300, 10),
			height: parseInt(Math.random() * 200 + 300, 10),
		},
		position: {

		}
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
describe("GoogleLayout Test", function() {
	describe("Vertical Layout Test", function() {
		describe("append/prepend on outline test", function() {
			before(() => {
				this.inst = new GoogleLayout({
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
				const items = getItems();
				this.inst.append(items, [{top:0, left: 0}]);
				this.items = this.items.concat(items);
				expect(items[0].position._top).to.be.equal(0);
			});
			it("shoud check a append above bottom outline", () => {
				const items = getItems();
				const top = this.items[this.items.length - 1].position._bottom;
				this.inst.append(items, [{top: top, left: 0}]);
				this.items = this.items.concat(items);
				expect(items[0].position._top).to.be.equal(top + 10);
			});
			it("shoud check a prepend on outline", () => {
				const items = getItems();
				this.inst.prepend(items, [{top:0, left: 0}]);
				this.items = items.concat(this.items);
				expect(items[items.length - 1].position._bottom).to.be.equal(-10); // margin
			});
			it("shoud check a prepend on top outline", () => {
				const items = getItems();
				const top = this.items[0].position._top;
				this.inst.prepend(items, [{top: top, left: 0}]);
				this.items = items.concat(this.items);
				expect(items[items.length - 1].position._bottom).to.be.equal(top - 10); // margin
			});
		});
		describe("remove item in layout", function() {
			before(() => {
				this.inst = new GoogleLayout({
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
			it("shoud check a remove 1 item / relayout group", () => {
				const items = getItems();
				this.inst.append(items, [{top:0, left: 0}]);
				const items2 = getItems();
				this.inst.append(items2, [{top:items[items.length - 1].position._bottom, left: 0}]);
				this.items = this.items.concat(items);
				this.items = this.items.concat(items2);

				const bottom1 = items[items.length - 1].position._bottom;
				const bottom2 = items2[items2.length - 1].position._bottom;

				this.inst.remove(items[items.length - 1], this.items, [{top: 0, left: 0}]);
				expect(items[items.length - 3].position._bottom).to.be.equal(items[items.length - 2].position._bottom);
				expect(items[items.length - 2].position._bottom).not.to.be.equal(items[items.length - 1].position._bottom);
				expect(items[items.length - 2].position._bottom).not.to.be.equal(bottom1);

				const dist = bottom1 - items[items.length - 2].position._bottom;
				const dist2 = bottom2 - items2[items2.length - 2].position._bottom;

				expect(dist).to.be.equal(dist2);

			});
		});
	});
	describe("Horizontal Layout Test", function() {
		describe("append/prepend on outline test", function() {
			before(() => {
				this.inst = new GoogleLayout({
					margin: 10,
					direction: "horizontal",
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
				const items = getItems();
				this.inst.append(items, [{top:0, left: 0}]);
				this.items = this.items.concat(items);
				expect(items[0].position._left).to.be.equal(0);
			});
			it("shoud check a append above right outline", () => {
				const items = getItems();
				const left = this.items[this.items.length - 1].position._right;
				this.inst.append(items, [{top: 0, left: left}]);
				this.items = this.items.concat(items);
				expect(items[0].position._left).to.be.equal(left + 10);
			});
			it("shoud check a prepend on outline", () => {
				const items = getItems();
				this.inst.prepend(items, [{top:0, left: 0}]);
				this.items = items.concat(this.items);
				expect(items[items.length - 1].position._right).to.be.equal(-10); // margin
			});
			it("shoud check a prepend on left outline", () => {
				const items = getItems();
				const left = this.items[0].position._left;
				this.inst.prepend(items, [{top: 0, left: left}]);
				this.items = items.concat(this.items);
				expect(round(items[items.length - 1].position._right)).to.be.equal(round(left - 10)); // margin
			});
		});
		describe("remove item in layout", function() {
			before(() => {
				this.inst = new GoogleLayout({
					margin: 10,
					direction: "horizontal",
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
			it("shoud check a remove 1 item / relayout group", () => {
				const items = getItems();
				this.inst.append(items, [{top:0, left: 0}]);
				const items2 = getItems();
				this.inst.append(items2, [{top:0, left: items[items.length - 1].position._right}]);
				this.items = this.items.concat(items);
				this.items = this.items.concat(items2);

				const right1 = items[items.length - 1].position._right;
				const right2 = items2[items2.length - 1].position._right;

				this.inst.remove(items[items.length - 1], this.items, [{top: 0, left: 0}]);
				expect(items[items.length - 3].position._right).to.be.equal(items[items.length - 2].position._right);
				expect(items[items.length - 2].position._right).not.to.be.equal(items[items.length - 1].position._right);
				expect(items[items.length - 2].position._right).not.to.be.equal(right1);

				const dist = right1 - items[items.length - 2].position._right;
				const dist2 = right2 - items2[items2.length - 2].position._right;

				expect(round(dist)).to.be.equal(round(dist2));

			});
		});
	});
});
