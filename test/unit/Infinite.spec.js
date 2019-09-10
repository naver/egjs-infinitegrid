import Infinite from "../../src/Infinite";
import ItemManager from "../../src/ItemManager";
import {wait, createElement} from "./helper/TestHelper";
/* eslint-disable */
[true, false].forEach(useRecycle => {
	[0, 50, 100, 200, 1000].forEach(threshold => {
		describe(`Infinite Test(useRecycle=${useRecycle}, threshold=${threshold})`, function() {
			beforeEach(() => {
				this.changeSpy = sinon.spy();
				this.requestSpy = sinon.spy();
				this.items = new ItemManager();
				this.infinite = new Infinite(this.items, {
					useRecycle,
					threshold,
					change: this.changeSpy,
					request: this.requestSpy,
				});
				this.size = 400;
				this.infinite.setSize(this.size);
			});
			afterEach(() => {
				this.infinite = null;
			});
			it (`should call request callback that item's length is 1 and cursor is {start: 0, end: 0}`, async () => {
				// Given
				this.items.appendGroup({
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
				this.infinite.scroll(Math.max(1000 - this.size - threshold - 10, 0));
				this.infinite.scroll(Math.max(1000 - this.size - threshold + 1, 0));
				this.infinite.scroll(1000 + threshold + 1);

				await wait();

				// Then
				if (threshold === 0 || threshold === 50) {
					// -
					// -
					// -
					// append
					// append
					expect(this.changeSpy.callCount).to.be.equal(0);
					expect(this.requestSpy.callCount).to.be.equal(2);
					expect(this.requestSpy.args[0][0]).to.be.true;
					expect(this.requestSpy.args[1][0]).to.be.true;
				} else if (threshold === 100 || threshold === 200) {
					// prepend
					// prepend
					// -
					// append
					// append
					expect(this.changeSpy.callCount).to.be.equal(0);
					expect(this.requestSpy.callCount).to.be.equal(4);
					expect(this.requestSpy.args[0][0]).to.be.false;
					expect(this.requestSpy.args[1][0]).to.be.false;
					expect(this.requestSpy.args[2][0]).to.be.true;
					expect(this.requestSpy.args[3][0]).to.be.true;
				} else if (threshold === 1000) {
					// append
					// append
					// append
					// append
					// append
					expect(this.changeSpy.callCount).to.be.equal(0);
					expect(this.requestSpy.callCount).to.be.equal(5);
					expect(this.requestSpy.args[0][0]).to.be.true;
					expect(this.requestSpy.args[1][0]).to.be.true;
					expect(this.requestSpy.args[2][0]).to.be.true;
					expect(this.requestSpy.args[3][0]).to.be.true;
					expect(this.requestSpy.args[4][0]).to.be.true;
				}

			});
			it(`should call change(append), request that item's length is 2 and cursor is {start: 0, end: 0}`, async () => {
				// Given
				this.items.appendGroup({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.items.appendGroup({
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

				this.infinite.scroll(Math.max(1000 - this.infinite._status.size - threshold - 10, 0));
				this.infinite.scroll(Math.max(1000 - this.infinite._status.size - threshold + 1, 0));

				this.infinite.scroll(2000 - this.infinite._status.size - threshold - 20);
				this.infinite.scroll(2000 - this.infinite._status.size);

				this.infinite.scroll(2001);

				await wait();

				// Then
				expect(this.infinite.getCursor("end")).to.be.equals(0);

				if (useRecycle === true) {
					expect(this.infinite.getCursor("end")).to.be.equals(0);

					if (threshold === 0 || threshold === 50) {
						// -
						// -
						// -
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 1, end: 1 } (range out)
						// change(append) { start: 1, end: 1 } (range out)
						// change(append) { start: 1, end: 1 } (range out)
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(0);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 1, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 1, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 1, end: 1 });
					} else if (threshold === 100 || threshold === 200) {
						// request(prepend)
						// request(prepend)
						// -
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 1, end: 1 } (range out)
						// change(append) { start: 1, end: 1 } (range out)
						// change(append) { start: 1, end: 1 } (range out)
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(2);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 1, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 1, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 1, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.false;
						expect(this.requestSpy.args[1][0]).to.be.false;
					} else if (threshold === 1000) {
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 1, end: 1 } (range out)

						expect(this.changeSpy.callCount).to.be.equal(7);
						expect(this.requestSpy.callCount).to.be.equal(0);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start : 1, end: 1 });
					}
				} else {
					// useRecycle: false
					if (threshold === 0 || threshold === 50) {
						// -
						// -
						// -
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(0);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });
					} else if (threshold === 100 || threshold === 200) {
						// request(prepend)
						// request(prepend)
						// -
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 } (range out)
						// change(append) { start: 0, end: 1 } (range out)
						// change(append) { start: 0, end: 1 } (range out)
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(2);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.false;
						expect(this.requestSpy.args[1][0]).to.be.false;
					} else if (threshold === 1000) {
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }
						// change(append) { start: 0, end: 1 }

						expect(this.changeSpy.callCount).to.be.equal(7);
						expect(this.requestSpy.callCount).to.be.equal(0);

						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start : 0, end: 1 });
					}
				}
			});
			it(`should call change(prepend), request that item's length is 2 and cursor is {start: 1, end: 1}`, async () => {
				// Given
				this.items.appendGroup({
					groupKey: 0,
					items: [],
					outlines: {
						start: [0],
						end: [1000],
					},
				});
				this.items.appendGroup({
					groupKey: 1,
					items: [],
					outlines: {
						start: [1000],
						end: [2000],
					},
				});
				this.infinite.setCursor("start", 1)
				this.infinite.setCursor("end", 1);
				// When
				this.infinite.scroll(80);
				this.infinite.scroll(100);

				this.infinite.scroll(Math.max(1000 - this.infinite._status.size - threshold - 10, 0));
				this.infinite.scroll(Math.max(1000 - this.infinite._status.size - threshold + 1, 0));

				this.infinite.scroll(2000 - this.infinite._status.size - threshold - 20);
				this.infinite.scroll(2000 - this.infinite._status.size);

				this.infinite.scroll(2001);

				await wait();

				// Then
				expect(this.infinite.getCursor("start")).to.be.equals(1);
				if (useRecycle === true) {
					if (threshold === 0 || threshold === 50 || threshold === 100 || threshold === 200) {
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 1 }
						// -
						// request(append)
						// request(append)
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(2);

						expect(this.changeSpy.args[0][0]).to.be.false;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 0 });

						expect(this.changeSpy.args[1][0]).to.be.false;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 0 });

						expect(this.changeSpy.args[2][0]).to.be.false;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 0 });

						expect(this.changeSpy.args[3][0]).to.be.false;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.true;
						expect(this.requestSpy.args[1][0]).to.be.true;
					} else if (threshold === 1000) {
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 0 } (range out)
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// request(append)

						expect(this.changeSpy.callCount).to.be.equal(6);
						expect(this.requestSpy.callCount).to.be.equal(1);

						expect(this.changeSpy.args[0][0]).to.be.false;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.false;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.false;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.false;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[4][0]).to.be.false;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[5][0]).to.be.false;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.true;
					}
				} else {
					// useRecycle: false
					if (threshold === 0 || threshold === 50 || threshold === 100 || threshold === 200) {
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// -
						// request(append)
						// request(append)
						expect(this.changeSpy.callCount).to.be.equal(4);
						expect(this.requestSpy.callCount).to.be.equal(2);

						expect(this.changeSpy.args[0][0]).to.be.false;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.false;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.false;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.false;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.true;
						expect(this.requestSpy.args[1][0]).to.be.true;
					} else if (threshold === 1000) {
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// change(prepend) { start: 0, end: 1 }
						// request(append)

						expect(this.changeSpy.callCount).to.be.equal(6);
						expect(this.requestSpy.callCount).to.be.equal(1);

						expect(this.changeSpy.args[0][0]).to.be.false;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[1][0]).to.be.false;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[2][0]).to.be.false;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[3][0]).to.be.false;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[4][0]).to.be.false;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.changeSpy.args[5][0]).to.be.false;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start : 0, end: 1 });

						expect(this.requestSpy.args[0][0]).to.be.true;
					}
				}
			});
			it("should call change multiple", async () => {
				// Given
				this.items.appendGroup({
					groupKey: 0,
					items: [],
					outlines: {
						start: [100],
						end: [200],
					},
				});
				this.items.appendGroup({
					groupKey: 1,
					items: [],
					outlines: {
						start: [200],
						end: [300],
					},
				});
				this.items.appendGroup({
					groupKey: 2,
					items: [],
					outlines: {
						start: [300],
						end: [400],
					},
				});

				this.items.appendGroup({
					groupKey: 3,
					items: [],
					outlines: {
						start: [],
						end: [],
					},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 0);

				this.infinite.scroll(0);
				this.infinite.scroll(300);
				this.infinite.scroll(900);

				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);

				this.infinite.scroll(0);
				this.infinite.scroll(300);
				this.infinite.scroll(900);

				this.items.getGroup(3).outlines = {start:[400], end:[800]};


				this.infinite.scroll(0);
				this.infinite.scroll(300);
				this.infinite.scroll(900);

				this.infinite.setCursor("start", 3);
				this.infinite.setCursor("end", 3);


				this.infinite.scroll(0);
				this.infinite.scroll(300);
				this.infinite.scroll(900);


				// Then
				if (useRecycle) {
					if (threshold === 0 || threshold === 50) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 1, end: 2})
						// 900 change(true, { start: 2, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 1, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 1, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// { start: 3 end: 3}
						// 0 change(false, { start: 0, end: 3 })
						// 300 change(false, { start: 1, end: 3 })
						// 900 request
						expect(this.changeSpy.callCount).to.be.equals(11);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 1, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 2, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 1, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 3, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 1, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 3, end: 3 });

						expect(this.changeSpy.args[9][0]).to.be.false;
						expect(this.changeSpy.args[9][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[10][0]).to.be.false;
						expect(this.changeSpy.args[10][1]).to.be.deep.equals({ start: 1, end: 3 });
					} else if (threshold === 100 || threshold === 200) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 0, end: 2})
						// 900 change(true, { start: 2, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// { start: 3 end: 3}
						// 0 change(false, { start: 0, end: 3 })
						// 300 change(false, { start: 0, end: 3 })
						// 900 request
						expect(this.changeSpy.callCount).to.be.equals(11);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 2, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 3, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 3, end: 3 });

						expect(this.changeSpy.args[9][0]).to.be.false;
						expect(this.changeSpy.args[9][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[10][0]).to.be.false;
						expect(this.changeSpy.args[10][1]).to.be.deep.equals({ start: 0, end: 3 });
					} else if (threshold === 1000) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 0, end: 2})
						// 900 change(true, { start: 0, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 3, end: 3})

						// { start: 3 end: 3}
						// 0 change(false, { start: 0, end: 3 })
						// 300 change(false, { start: 0, end: 3 })
						// 900 change(false, { start: 0, end: 3 })
						expect(this.changeSpy.callCount).to.be.equals(12);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 0, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 0, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 0, end: 3 });

						expect(this.changeSpy.args[9][0]).to.be.false;
						expect(this.changeSpy.args[9][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[10][0]).to.be.false;
						expect(this.changeSpy.args[10][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[11][0]).to.be.false;
						expect(this.changeSpy.args[11][1]).to.be.deep.equals({ start: 0, end: 3 });
					}

				} else {
					if (threshold === 0 || threshold === 50) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 0, end: 2})
						// 900 change(true, { start: 0, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// { start: 3 end: 3}
						// 0 -
						// 0 -
						// 900 request
						expect(this.changeSpy.callCount).to.be.equals(9);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 0, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 0, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 0, end: 3 });
					} else if (threshold === 100 || threshold === 200) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 0, end: 2})
						// 900 change(true, { start: 0, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// { start: 3 end: 3}
						// 0 -
						// 300 -
						// 900 request
						expect(this.changeSpy.callCount).to.be.equals(9);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 0, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 0, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 0, end: 3 });
					} else if (threshold === 1000) {
						// { start: 0, end: 0 }
						// 0 change(true, { start: 0, end: 2})
						// 300 change(true, { start: 0, end: 2})
						// 900 change(true, { start: 0, end: 2})

						// { start: 0, end: 2 }
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// Add group 3's outline
						// 0 change(true, {start: 0, end: 3})
						// 300 change(true, {start: 0, end: 3})
						// 900 change(true, {start: 0, end: 3})

						// { start: 3 end: 3}
						// 0 request
						// 300 request
						// 900 request
						expect(this.changeSpy.callCount).to.be.equals(9);
						expect(this.changeSpy.args[0][0]).to.be.true;
						expect(this.changeSpy.args[0][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[1][0]).to.be.true;
						expect(this.changeSpy.args[1][1]).to.be.deep.equals({ start: 0, end: 2 });
						expect(this.changeSpy.args[2][0]).to.be.true;
						expect(this.changeSpy.args[2][1]).to.be.deep.equals({ start: 0, end: 2 });

						expect(this.changeSpy.args[3][0]).to.be.true;
						expect(this.changeSpy.args[3][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[4][0]).to.be.true;
						expect(this.changeSpy.args[4][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[5][0]).to.be.true;
						expect(this.changeSpy.args[5][1]).to.be.deep.equals({ start: 0, end: 3 });

						expect(this.changeSpy.args[6][0]).to.be.true;
						expect(this.changeSpy.args[6][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[7][0]).to.be.true;
						expect(this.changeSpy.args[7][1]).to.be.deep.equals({ start: 0, end: 3 });
						expect(this.changeSpy.args[8][0]).to.be.true;
						expect(this.changeSpy.args[8][1]).to.be.deep.equals({ start: 0, end: 3 });
					}
				}
			});

			it(`should check getEdgeOutline method`, () => {

				// Given
				const start = this.infinite.getEdgeOutline("start");
				const end = this.infinite.getEdgeOutline("end");

				this.items.appendGroup({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.appendGroup({
					groupKey: 1,
					items: [{el: 2}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.appendGroup({
					groupKey: 2,
					items: [{el: 3}],
					outlines: {start: [2000, 2100], end: [3000, 3100]},
				});

				// When
				this.infinite.setCursor("start", 0);
				this.infinite.setCursor("end", 2);

				// Then
				expect(this.infinite.getCursor("start")).to.be.equals(0);
				expect(this.infinite.getCursor("end")).to.be.equals(2);
				expect(start).to.be.deep.equal([]);
				expect(end).to.be.deep.equal([]);
				expect(this.infinite.getEdgeOutline("start")).to.be.deep.equal([0, 0]);
				expect(this.infinite.getEdgeOutline("end")).to.be.deep.equal([3000, 3100]);
			});
			it(`should check getEdgeValue method`, () => {
				// Given
				const start = this.infinite.getEdgeValue("start");
				const end = this.infinite.getEdgeValue("end");

				this.items.appendGroup({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.appendGroup({
					groupKey: 1,
					items: [{el: 1}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.appendGroup({
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
				const visibleData = this.infinite.getVisibleGroups();

				this.items.appendGroup({
					groupKey: 0,
					items: [{el: 1}],
					outlines: {start: [0, 0], end: [1000, 1100]},
				});
				this.items.appendGroup({
					groupKey: 1,
					items: [{el: 1}, {el: 2}],
					outlines: {start: [1000, 1100], end: [2000, 2100]},
				});
				this.items.appendGroup({
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
				expect(this.infinite.getVisibleGroups()).to.have.lengthOf(3);
			});
		});
	});
});
