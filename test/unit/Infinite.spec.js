import Infinite from "../../src/Infinite";
import ItemManager from "../../src/ItemManager";
import {wait, createElement} from "./helper/TestHelper";
/* eslint-disable */
[true, false].forEach(useRecycle => {
	[0, 50, 100, 200].forEach(threshold => {
		describe(`Infinite Test(useRecycle=${useRecycle}, threshold=${threshold})`, function() {
			beforeEach(() => {
				this.items = new ItemManager();
				this.infinite = new Infinite(this.items, {
					useRecycle,
					threshold,
				});
				this.infinite.setSize(400);
			});
			afterEach(() => {
				this.infinite = null;
			});
			it (`should check infinite append`, async () => {
				const spy = sinon.spy();
				this.infinite.options.append = spy;
				// Given
				this.items.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 0);

				// When
				this.infinite.scroll(80);
				this.infinite.scroll(100);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold - 10, true);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold + 1, true);

				await wait();
				expect(spy.callCount).to.be.equal(1);
			});
			it(`should check infinite append(cache)`, async () => {
				const spy = sinon.spy(({cache}) => {
					if (useRecycle) {
						expect(cache.length).to.be.ok;
						expect(cache[0].outlines.start[0]).to.be.equal(1000);
					} else {
						expect(cache.length).to.be.not.ok;
					}
				});
				this.infinite.options.append = spy;
				// Given
				this.items.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.setCursor("start", 0)
				this.infinite.setCursor("end", 0);
				// When
				this.infinite.scroll(80);
				this.infinite.scroll(100);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold - 10);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold + 1);
				this.infinite.scroll(2000 - this.infinite._status.size - threshold - 20);
				this.infinite.scroll(2000 - this.infinite._status.size);

				// Then
				expect(this.infinite.getCursor("end")).to.be.equal(useRecycle ? 0 : 1);

				await wait();
				expect(spy.callCount).to.be.equal(useRecycle ? 3 : 1);
			});
			it (`should check infinite prepend`, async () => {
				const spy = sinon.spy();
				this.infinite.options.prepend = spy;
				// Given
				this.items.prepend({
					groupKey: 1,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.items.prepend({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});

				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 1);

				// When
				this.infinite.scroll(2000);
				this.infinite.scroll(1000);
				this.infinite.scroll(500);
				this.infinite.scroll(400);
				this.infinite.scroll(threshold + 2);
				this.infinite.scroll(threshold);
				this.infinite.scroll(threshold - 50);
				this.infinite.scroll(0);


				await wait();
				expect(this.infinite.getCursor("start")).to.be.equal(0);
				expect(this.infinite.getCursor("end")).to.be.equal(1);
				expect(spy.callCount).to.be.equal(3);
			});
			it(`should check infinite prepend(cache)`, async () => {
				this.infinite.options.append = sinon.spy();
				this.infinite.options.prepend = sinon.spy(({cache}) => {
					if (useRecycle) {
						expect(cache.length).to.be.ok;
						expect(cache[0].outlines.start[0]).to.be.equal(0);
					} else {
						expect(cache.length).to.be.not.ok;
					}
				});
				// Given
				this.items.prepend({
					groupKey: 1,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.items.prepend({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});

				this.infinite.setCursor("start", 1);
				this.infinite.setCursor("end", 1);

				// When
				this.infinite.scroll(2000);
				this.infinite.scroll(1000);
				this.infinite.scroll(500);
				this.infinite.scroll(400);
				this.infinite.scroll(threshold + 2);
				this.infinite.scroll(threshold);
				this.infinite.scroll(threshold - 50);
				this.infinite.scroll(0);

				// Then
				expect(this.infinite.getCursor("start")).to.be.equal(useRecycle ? 1 : 0);
				expect(this.infinite.getCursor("end")).to.be.equal(1);
				await wait();
				expect(this.infinite.options.append.callCount).to.be.equal(1);
				expect(this.infinite.options.prepend.callCount).to.be.equal(useRecycle ? 7 : 3);
			});
			it(`should check infinite prepend for small size(cache)`, async () => {
				this.infinite.options.append = sinon.spy();
				this.infinite.options.prepend = sinon.spy(({cache}) => {
					if (useRecycle) {
						expect(cache.length).to.be.not.equal(0)
						expect(cache[0].outlines.start[0]).to.be.equal(0);
					} else {
						expect(cache.length).to.be.equal(0);
					}
				});
				// Given
				this.items.prepend({
					groupKey: 1,
					items: [],
					outlines: {
						start: [1000],
						end: [1100],
					},
				});
				this.items.prepend({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});

				this.infinite.setCursor("start", 1);
				this.infinite.setCursor("end", 1);

				// When
				// request append
				this.infinite.scroll(2000);
				// useRecycle: true, request prepend
				// useRecycle: false, request append
				this.infinite.scroll(1000);
				// useRecycle: true, request prepend
				// useRecycle: false request append
				this.infinite.scroll(400);
				// useRecycle: true, request prepend
				// useRecycle: false
				this.infinite.scroll(threshold + 2);
				// useRecycle: true, request prepend
				// useRecycle: false, request prepend
				this.infinite.scroll(threshold);
				// useRecycle: true, request prepend
				// useRecycle: false, request prepend
				this.infinite.scroll(threshold - 50);
				// useRecycle: true, request prepend
				// useRecycle: false, request prepend
				this.infinite.scroll(0);

				// Then
				expect(this.infinite.getCursor("start")).to.be.equal(useRecycle ? 1 : 0);
				expect(this.infinite.getCursor("end")).to.be.equal(1);
				await wait();
				expect(this.infinite.options.append.callCount).to.be.equal(useRecycle ? 1: 2);
				expect(this.infinite.options.prepend.callCount).to.be.equal(useRecycle ? 6 : 3);
			});
			it("should check scroll append multiple", async () => {
				// Given
				this.items.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [100],
						end: [200],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [],
					outlines: {
						start: [200],
						end: [300],
					},
				});
				this.items.append({
					groupKey: 2,
					items: [],
					outlines: {
						start: [300],
						end: [400],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 0);

				this.items.append({
					groupKey: 3,
					items: [],
					outlines: {
						start: [],
						end: [],
					},
				});

				// When
				this.infinite.options.append = sinon.spy(({cache}) => {
					// Then
					if (!useRecycle) {
						expect(cache.length).to.be.equals(1);
						expect(cache[0].groupKey).to.be.equals(3);
						return;
					}
					expect(cache.length).to.be.equals(2);
					expect(cache[0].groupKey).to.be.equals(1);
					expect(cache[1].groupKey).to.be.equals(2);
				});
				this.infinite.scroll(0);

				this.infinite.options.append = sinon.spy(({cache}) => {
					// Then
					expect(cache.length).to.be.equals(1);
					expect(cache[0].groupKey).to.be.equals(3);
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);
				this.infinite.scroll(0);


				this.items.get(3).outlines = {start:[400], end:[800]};

				this.infinite.options.append = () => {};
				this.infinite.options.prepend = sinon.spy(({cache}) => {
					// Then
					if (!useRecycle) {
						expect(cache.length).to.be.equals(0);
						return;
					}
					expect(cache.length).to.be.equals(3);
					expect(cache[0].groupKey).to.be.equals(0);
					expect(cache[1].groupKey).to.be.equals(1);
					expect(cache[2].groupKey).to.be.equals(2);
				});

				this.infinite.setCursor("start", 3);
				this.infinite.setCursor("end", 3);
				this.infinite.scroll(0);
			});
			it(`should check recycle method (append)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					expect(start).to.be.equal(0);
					expect(end).to.be.equal(0);
				});
				// Given
				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);
				this.infinite.recycle(0, true);
				this.infinite.recycle(500, true);
				this.infinite.recycle(1000 - threshold, true);
				this.infinite.recycle(1000 - threshold / 2, true);
				this.infinite.recycle(1000, true);
				this.infinite.recycle(1100 + threshold, true);
				this.infinite.recycle(1100 + threshold + 1, true);

				expect(this.infinite.getCursor("start")).to.be.equal(useRecycle ? 1 : 0);
				expect(this.infinite.getCursor("end")).to.be.equal(2);
				expect(this.infinite.options.recycle.callCount).to.be.equal(useRecycle ? 1 : 0);
			});
			it(`should check append and remove method`, () => {
				// Given
				this.items.append({
					groupKey: 0,
					items: [
						{
							el: createElement(0),
						},
						{
							el: createElement(0),
						},
					],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [
						{
							el: createElement(1),
						},
						{
							el: createElement(1),
						},
					],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 1);

				// When
				const size1 = this.items.size(); // 2

				// remove group0 item0
				const group0 = this.items.getData(0);
				const indexes0 = this.items.indexOfElement(group0.items[0].el);
				this.infinite.remove(indexes0.groupIndex, indexes0.itemIndex);
				const length1 = group0.items.length; // 1

				// remove group0 item1
				this.infinite.remove(indexes0.groupIndex, indexes0.itemIndex);
				const length2 = group0.items.length; // 0

				const startCursor1 = this.infinite.getCursor("start");
				const endCursor1 = this.infinite.getCursor("end");

				const size2 = this.items.size(); // 1
				const group1 = this.items.getData(0);

				// remove group1 item0
				const indexes1 = this.items.indexOfElement(group1.items[0].el)
				this.infinite.remove(indexes1.groupIndex, indexes1.itemIndex);
				const length3 = group1.items.length; // 1

				// remove group1 item1
				this.infinite.remove(indexes1.groupIndex, indexes1.itemIndex);
				const length4 = group1.items.length; // 0

				const startCursor2 = this.infinite.getCursor("start");
				const endCursor2 = this.infinite.getCursor("end");
				// no groups, no items
				const size3 = this.items.size(); // 0

				// Then
				expect(size1).to.be.equals(2);
				expect(size2).to.be.equals(1);
				expect(size3).to.be.equals(0);
				expect(length1).to.be.equals(1);
				expect(length2).to.be.equals(0);
				expect(length3).to.be.equals(1);
				expect(length4).to.be.equals(0);
				expect(startCursor1).to.be.equals(0);
				expect(endCursor1).to.be.equals(0);
				expect(startCursor2).to.be.equals(-1);
				expect(endCursor2).to.be.equals(-1);

			});
			it(`should check recycle method (multiple/append)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					expect(start).to.be.equal(0);
					expect(end).to.be.equal(1);
				});
				// Given
				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);
				this.infinite.recycle(2100 + threshold + 1, true);

				expect(this.infinite.getCursor("start")).to.be.equal(useRecycle ? 2 : 0);
				expect(this.infinite.getCursor("end")).to.be.equal(2);
				expect(this.infinite.options.recycle.callCount).to.be.equal(useRecycle ? 1 : 0);
			});
			it(`should check recycle method (prepend)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					expect(start).to.be.equal(2);
					expect(end).to.be.equal(2);
				});
				// Given
				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);

				this.infinite.recycle(3000, false);
				expect(this.infinite.options.recycle.callCount).to.be.equal(0);

				this.infinite.recycle(2100, false);
				expect(this.infinite.options.recycle.callCount).to.be.equal(0);

				this.infinite.recycle(2000 - this.infinite._status.size, false);
				expect(this.infinite.options.recycle.callCount).to.be.equal(0);

				this.infinite.recycle(2000 - this.infinite._status.size - threshold, false);
				expect(this.infinite.options.recycle.callCount).to.be.equal(0);

				this.infinite.recycle(2000 - this.infinite._status.size - threshold - 0.5, false);


				expect(this.infinite.getCursor("start")).to.be.equal(0);
				expect(this.infinite.getCursor("end")).to.be.equal(useRecycle ? 1 : 2);
				expect(this.infinite.options.recycle.callCount).to.be.equal(useRecycle ? 1 : 0);
			});
			it(`should check recycle method (multiple/prepend)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					// Then
					expect(start).to.be.equal(1);
					expect(end).to.be.equal(2);
				});
				// Given
				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);
				this.infinite.recycle(1000 - this.infinite._status.size - threshold - 0.5, false);


				// Then
				expect(this.infinite.getCursor("start")).to.be.equal(0);
				expect(this.infinite.getCursor("end")).to.be.equal(useRecycle ? 0 : 2);
				expect(this.infinite.options.recycle.callCount).to.be.equal(useRecycle ? 1 : 0);
			});
			it(`should check getEdgeOutline method`, () => {

				// Given
				const start = this.infinite.getEdgeOutline("start");
				const end = this.infinite.getEdgeOutline("end");

				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);

				// Then
				expect(start).to.be.equal(start);
				expect(end).to.be.equal(end);
				expect(this.infinite.getEdgeOutline("start")).to.be.deep.equal([0, 0]);
				expect(this.infinite.getEdgeOutline("end")).to.be.deep.equal([3000, 3100]);
			});
			it(`should check getEdgeValue method`, () => {
				// Given
				const start = this.infinite.getEdgeValue("start");
				const end = this.infinite.getEdgeValue("end");

				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);

				// Then
				expect(start).to.be.equal(0);
				expect(end).to.be.equal(0);
				expect(this.infinite.getEdgeValue("start")).to.be.equal(0);
				expect(this.infinite.getEdgeValue("end")).to.be.equal(3100);
			});
			it(`should check visible method`, () => {
				// Given
				const visibleItems = this.infinite.getVisibleItems();
				const visibleData = this.infinite.getVisibleData();

				this.items.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.append({
					groupKey: 1,
					items: [{el: 1}, {el: 2}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);
				// Then
				expect(visibleItems).to.have.lengthOf(0);
				expect(visibleData).to.have.lengthOf(0);
				expect(this.infinite.getVisibleItems()).to.have.lengthOf(4);
				expect(this.infinite.getVisibleData()).to.have.lengthOf(3);
			});
		});
	});
});
