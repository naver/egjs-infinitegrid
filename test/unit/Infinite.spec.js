import Infinite from "../../src/Infinite";
import ItemManager from "../../src/ItemManager";
/* eslint-disable */
[true, false].forEach(useRecycle => {
	[0, 50, 100, 200].forEach(threshold => {
		describe(`InfiniteGrid Test(useRecycle=${useRecycle}, threshold=${threshold})`, function() {
			beforeEach(() => {
				this.infinite = new Infinite(new ItemManager(), {
					useRecycle,
					threshold,
				});
				this.infinite.setSize(400);
			});
			afterEach(() => {
				this.infinite = null;
			});
			it (`should check infinite append`, (done) => {
				const spy = sinon.spy();
				this.infinite.options.append = spy;
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				
				// When
				this.infinite.scroll(80, true);
				this.infinite.scroll(100, true);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold - 10, true);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold + 1, true);

				setTimeout(() => {
					expect(spy.callCount).to.be.equal(1);
					done();
				}, 50);
			});
			it (`should check infinite append(cache)`, (done) => {
				const spy = sinon.spy(({cache}) => {
					if (useRecycle) {
						expect(cache).to.be.ok;
						expect(cache.outlines.start[0]).to.be.equal(1000);
					} else {
						expect(cache).to.be.not.ok;
					}
				});
				this.infinite.options.append = spy;
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.setCursor("end", 0);
				// When
				this.infinite.scroll(80, true);
				this.infinite.scroll(100, true);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold - 10, true);
				this.infinite.scroll(1000 - this.infinite._status.size - threshold + 1, true);
				this.infinite.scroll(2000 - this.infinite._status.size - threshold - 20, true);
				this.infinite.scroll(2000 - this.infinite._status.size, true);

				// Then
				expect(this.infinite.getCursor("end")).to.be.equal(useRecycle ? 0 : 1);
				setTimeout(() => {
					expect(spy.callCount).to.be.equal(useRecycle ? 3 : 1);
					done();
				}, 50);
			});
			it (`should check infinite prepend`, (done) => {
				const spy = sinon.spy();
				this.infinite.options.prepend = spy;
				// Given
				this.infinite.prepend({
					groupKey: 0,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.prepend({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				
				// When
				this.infinite.scroll(2000, false);
				this.infinite.scroll(1000, false);
				this.infinite.scroll(500, false);
				this.infinite.scroll(400, false);
				this.infinite.scroll(threshold + 2, false);
				this.infinite.scroll(threshold, false);
				this.infinite.scroll(threshold - 50, false);
				this.infinite.scroll(0, false);


				setTimeout(() => {
					expect(this.infinite.getCursor("start")).to.be.equal(0);
					expect(this.infinite.getCursor("end")).to.be.equal(1);
					expect(spy.callCount).to.be.equal(3);
					done();
				}, 50);
			});
			it(`should check infinite prepend(cache)`, (done) => {
				this.infinite.options.append = sinon.spy();
				this.infinite.options.prepend = sinon.spy(({cache}) => {
					if (useRecycle) {
						expect(cache).to.be.ok;
						expect(cache.outlines.start[0]).to.be.equal(0);
					} else {
						expect(cache).to.be.not.ok;
					}
				});
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.setCursor("start", 1);
				// When
				this.infinite.scroll(2000, false);
				this.infinite.scroll(1500, false);
				this.infinite.scroll(1000 + threshold + 2, false);
				this.infinite.scroll(1000 + threshold, false);
				this.infinite.scroll(1000 + threshold - 50, false);
				this.infinite.scroll(0, false);

				// Then
				expect(this.infinite.getCursor("start")).to.be.equal(useRecycle ? 1 : 0);
				expect(this.infinite.getCursor("end")).to.be.equal(1);
				setTimeout(() => {
					expect(this.infinite.options.append.callCount).to.be.equal(0);
					expect(this.infinite.options.prepend.callCount).to.be.equal(useRecycle ? 3 : 1);
					done();
				}, 50);
			});
			it(`should check recycle method (append)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					expect(start).to.be.equal(0);
					expect(end).to.be.equal(0);
				});
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
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
			it(`should check recycle method (multiple/append)`, () => {
				this.infinite.options.recycle = sinon.spy(({start, end}) => {
					expect(start).to.be.equal(0);
					expect(end).to.be.equal(1);
				});
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
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
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
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
					expect(start).to.be.equal(1);
					expect(end).to.be.equal(2);
				});
				// Given
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [0, 0],
						end: [1000, 1100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [1000, 1100],
						end: [2000, 2100],
					},
				});
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {
						start: [2000, 2100],
						end: [3000, 3100],
					},
				});
				this.infinite.recycle(1000 - this.infinite._status.size - threshold - 0.5, false);

				expect(this.infinite.getCursor("start")).to.be.equal(0);
				expect(this.infinite.getCursor("end")).to.be.equal(useRecycle ? 0 : 2);
				expect(this.infinite.options.recycle.callCount).to.be.equal(useRecycle ? 1 : 0);
			});
			it(`should check getEdgeOutline method`, () => {

				expect(this.infinite.getEdgeOutline("start")).to.be.deep.equal([]);
				expect(this.infinite.getEdgeOutline("end")).to.be.deep.equal([]);
	
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.infinite.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.infinite.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});
				expect(this.infinite.getEdgeOutline("start")).to.be.deep.equal([0, 0]);
				expect(this.infinite.getEdgeOutline("end")).to.be.deep.equal([3000, 3100]);
			});
			it(`should check getEdgeValue method`, () => {
	
				expect(this.infinite.getEdgeValue("start")).to.be.equal(0);
				expect(this.infinite.getEdgeValue("end")).to.be.equal(0);
	
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.infinite.append({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.infinite.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});
				expect(this.infinite.getEdgeValue("start")).to.be.equal(0);
				expect(this.infinite.getEdgeValue("end")).to.be.equal(3100);
			});
			it(`should check visible method`, () => {
	
				expect(this.infinite.getVisibleItems()).to.have.lengthOf(0);
				expect(this.infinite.getVisibleData()).to.have.lengthOf(0);
	
				this.infinite.append({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.infinite.append({
					groupKey: 1,
					items: [{el: 1}, {el: 2}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.infinite.append({
					groupKey: 2,
					items: [{el: 1}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});
				expect(this.infinite.getVisibleItems()).to.have.lengthOf(4);
				expect(this.infinite.getVisibleData()).to.have.lengthOf(3);
			});
		});
	});
});