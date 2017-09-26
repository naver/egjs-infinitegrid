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

describe("GoogleLayout Test", function() {
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
});
