import $ from "jquery";
import InfiniteGrid from "../../src/InfiniteGrid";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import PackingLayout from "../../src/layouts/PackingLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
import { getItems, insert, wait, waitInsert, waitEvent } from "./helper/TestHelper";
import { LOADING_APPEND, LOADING_PREPEND, DEFENSE_BROWSER, IDLE } from "../../src/consts";
import { scroll, innerHeight, innerWidth } from "../../src/utils";
import { expectConnectGroupsOutline } from "./helper/common";

/* eslint-disable */
describe("InfiniteGrid Test", function () {
	[true, false].forEach(isOverflowScroll => {
		describe("destroy Test", function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite'></div>";
			});
			afterEach(() => {
				cleanup();
			});
			it(`should check a initialization (isOverflowScroll: ${isOverflowScroll})`, done => {
				// Given
				let target = document.getElementById("infinite");
				const beforeStyle = {
					position: target.style.position,
					overflowX: target.style.overflowX,
					overflowY: target.style.overflowY,
					height: target.style.height,
					weight: target.style.weight,
				};
				this.inst = new InfiniteGrid(target, {
					isOverflowScroll,
				});
				this.inst.setLayout(GridLayout);

				insert(this.inst, true, () => {
					// When
					this.inst.clear();
					this.inst.destroy();

					// Then
					expect(beforeStyle.position).to.be.eql(target.style.position);
					done();
				}, 30, 1);
			});
		});
	});
	[true, false].forEach(isOverflowScroll => {
		describe(`initailization Test (onlayoutComplete)(isOverflowScroll: ${isOverflowScroll})`, function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite' style='height: 500px'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					isOverflowScroll,
					horizontal: true,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});
			it(`should check a initialization (setLayout(instance))(isOverflowScroll: ${isOverflowScroll})`, done => {
				const count = 10;
				const items = getItems(count);
				// When (layout)

				const el = sandbox();
				el.innerHTML = "<div id='infinite2'></div>";

				const inst = new InfiniteGrid("#infinite2", {
					isOverflowScroll,
					horizontal: true,
				});

				const layout = new GridLayout();
				inst.setLayout(layout);

				const layoutCompleteHandler2 = sinon.spy(e => {
					const item1 = inst._itemManager.getStatus()._data[0].items;
					const item2 = this.inst._itemManager.getStatus()._data[0].items;

					expect(item1.map(e1 => e1.rect))
						.to.be.deep.equals(item2.map(e1 => e1.rect));
					inst.destroy();
					done();
				});
				inst.on("layoutComplete", layoutCompleteHandler2);
				// Given

				const layoutCompleteHandler = sinon.spy(function (e) {
					// Then
					expect(e.target).to.have.lengthOf(count);
					expect(this.getItems(true)).to.have.lengthOf(count);
					expect(this.getItems(false)).to.have.lengthOf(count);
					expect(this._isProcessing()).to.be.false;

					inst._renderer.container.innerHTML = items.join("");
					inst.layout();
				});


				cleanup();
				// When
				this.inst.on("layoutComplete", layoutCompleteHandler);
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite'></div>";
				// Then
				expect(this.inst.isProcessing()).to.be.false;
				expect(layoutCompleteHandler.calledOnce).to.be.false;

				this.inst._renderer.container.innerHTML = items.join("");
				this.inst.layout();


			});
			it(`should check a initialization and getStatus, setStatus`, async () => {
				// Given
				await waitInsert(this.inst, true, 10, 10);

				// When
				const status = this.inst.getStatus();

				this.inst.setStatus(status);
				// Then
				expect(this.inst._status.processingStatus).to.be.equals(IDLE);

			});
			it(`should check a initialization and getStatus, setStatus with complete data`, async () => {
				// Given
				await waitInsert(this.inst, true, 10, 10);

				// When
				const status = this.inst.getStatus();

				this.inst.setStatus(status);

				// Then
				expect(this.inst._status.processingStatus).to.be.equals(IDLE);
			});
			it(`should check a initialization and getStatus, setStatus with resize`, async () => {
				// Given
				await waitInsert(this.inst, true, 10, 10);

				// When
				this.inst._infinite.setCursor("start", 1);

				const status = this.inst.getStatus();
				this.inst.clear();
				status._renderer._size.viewport = 300;
				this.inst.setStatus(status);

				// Then
				expect(this.inst.isProcessing()).to.be.true;

				await wait(300);
				expect(this.inst.isProcessing()).to.be.false;

				const outlines = this.inst._itemManager._groups[1].outlines.start;
				outlines.forEach(outline => {
					expect(outline).to.be.equals(outlines[0]);
				});
			});
			it(`should check no children and call 'append' event`, async () => {
				// Given
				const waitAppend = waitEvent(this.inst, "append");

				// When
				this.inst.layout();

				const rv = await waitAppend;

				// Then
				expect(rv.groupKey).to.be.equals("");
			})
			it(`should check children`, async () => {
				// Given
				const container = this.inst._renderer.container;
				container.innerHTML = `<div class="item">1</div><div class="item">2</div><div class="item">3</div>`;
				const children = Array.prototype.slice.call(container.children);
				const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

				// When
				this.inst.layout();

				const positions = children.map(el => ({ position: el.style.position, left: el.style.left }));
				const rv = await waitLayoutComplete;

				// Then
				// has 3 children
				expect(children.length).to.be.equals(3);
				// no change
				positions.forEach(style => {
					expect(style.position).to.be.not.ok;
					expect(style.left).to.be.not.ok;
				});
				// change position, top, left
				children.forEach(el => {
					expect(el.style.position).to.be.equals("absolute");
					expect(el.style.left).to.be.ok;
				});
			});
			it(`should set the big random group key when children don't have a group key.`, async () => {
				// Given
				const container = this.inst._renderer.container;
				container.innerHTML = `<div class="item">1</div><div class="item">2</div><div class="item">3</div>`;
				const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

				// When
				this.inst.layout();
				const rv = await waitLayoutComplete;

				// Then
				const groupKey = rv.target[0].groupKey;
				rv.target.forEach(item => {
					// All items have the same group key.
					expect(item.groupKey).to.be.equals(groupKey);
					// very big number
					expect(item.groupKey).to.be.above(100000000);
				});
			});
			it(`should set as children's groupkey when children have a groupkey.`, async () => {
				// Given
				const container = this.inst._renderer.container;
				container.innerHTML = `<div class="item" data-groupkey="1">1</div><div class="item">2</div><div class="item">3</div>`;
				const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

				// When
				this.inst.layout();
				const rv = await waitLayoutComplete;

				// Then
				rv.target.forEach(item => {
					// All items have the same group key.
					expect(item.groupKey).to.be.equals("1");
				});
			});
			it(`should set as children's groupkey even if children have an empty string groupkey.`, async () => {
				// Given
				const container = this.inst._renderer.container;
				container.innerHTML = `<div class="item" data-groupkey="">1</div><div class="item">2</div><div class="item">3</div>`;
				const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

				// When
				this.inst.layout();
				const rv = await waitLayoutComplete;

				// Then
				rv.target.forEach(item => {
					// All items have the same group key.
					expect(item.groupKey).to.be.equals("");
				});
			});
			it(`should check getStatus(startCursor, endCursor)`, async () => {
				// Given
				await waitInsert(this.inst, true, 10, 10);

				// When
				// items[1], items[2]
				const status = this.inst.getStatus(2, 3);
				const status2 = this.inst.getStatus(11, 12);
				const status3 = this.inst.getStatus(2);
				const status4 = this.inst.getStatus(undefined, 8);

				// Then
				expect(this.inst._infinite.getCursor("start")).to.be.equals(0);
				expect(this.inst._infinite.getCursor("end")).to.be.equals(9);

				expect(status._itemManager._data.length).to.be.equals(2);
				expect(status._itemManager._data[0].groupKey).to.be.equals(2);
				expect(status._itemManager._data[1].groupKey).to.be.equals(3);
				expect(status._infinite.startCursor).to.be.equals(0);
				expect(status._infinite.endCursor).to.be.equals(1);

				expect(status2._itemManager._data.length).to.be.equals(10);
				expect(status2._infinite.startCursor).to.be.equals(0);
				expect(status2._infinite.endCursor).to.be.equals(9);

				expect(status3._itemManager._data.length).to.be.equals(9);
				expect(status3._itemManager._data[0].groupKey).to.be.equals(2);
				expect(status3._itemManager._data[8].groupKey).to.be.equals(10);

				expect(status4._itemManager._data.length).to.be.equals(8);
				expect(status4._itemManager._data[0].groupKey).to.be.equals(1);
				expect(status4._itemManager._data[7].groupKey).to.be.equals(8);
			});
			it(`should check getStatus outside(startCursor, endCursor)`, async () => {
				// Given
				await waitInsert(this.inst, true, 10, 10);
				this.inst._infinite.setCursor("start", 5); // groupKey = 6
				this.inst._infinite.setCursor("end", 7); // groupKey = 8

				// When
				const status = this.inst.getStatus(6, 8);
				const status2 = this.inst.getStatus(3, 7);
				const status3 = this.inst.getStatus(3, 9);
				const status4 = this.inst.getStatus(7, 9);

				// Then
				expect(this.inst._infinite.getCursor("start")).to.be.equals(5);
				expect(this.inst._infinite.getCursor("end")).to.be.equals(7);

				expect(status._itemManager._data.length).to.be.equals(3);
				expect(status._itemManager._data[0].groupKey).to.be.equals(6);
				expect(status._itemManager._data[2].groupKey).to.be.equal(8);
				expect(status._infinite.startCursor).to.be.equals(0);
				expect(status._infinite.endCursor).to.be.equals(2);

				expect(status2._itemManager._data.length).to.be.equals(5);
				expect(status2._itemManager._data[0].groupKey).to.be.equals(3);
				expect(status2._itemManager._data[4].groupKey).to.be.equal(7);
				expect(status2._infinite.startCursor).to.be.equals(3);
				expect(status2._infinite.endCursor).to.be.equals(4);

				expect(status3._itemManager._data.length).to.be.equals(7);
				expect(status3._itemManager._data[0].groupKey).to.be.equals(3);
				expect(status3._itemManager._data[6].groupKey).to.be.equal(9);
				expect(status3._infinite.startCursor).to.be.equals(3);
				expect(status3._infinite.endCursor).to.be.equals(5);

				expect(status4._itemManager._data.length).to.be.equals(3);
				expect(status4._itemManager._data[0].groupKey).to.be.equals(7);
				expect(status4._itemManager._data[2].groupKey).to.be.equal(9);
				expect(status4._infinite.startCursor).to.be.equals(0);
				expect(status4._infinite.endCursor).to.be.equals(1);
			});

			it(`should check a initialization (isOverflowScroll: ${isOverflowScroll})`, done => {
				// Given
				const count = 10;
				const items = getItems(count);
				const layoutCompleteHandler = sinon.spy(function (e) {
					// Then
					expect(e.target).to.have.lengthOf(count);
					expect(this.getItems(true)).to.have.lengthOf(count);
					expect(this.getItems(false)).to.have.lengthOf(count);
					expect(this._isProcessing()).to.be.false;
					done();
				});

				// When
				this.inst.on("layoutComplete", layoutCompleteHandler);

				// Then
				expect(this.inst.isProcessing()).to.be.false;
				expect(layoutCompleteHandler.calledOnce).to.be.false;

				// When (layout)
				this.inst._renderer.container.innerHTML = items.join("");
				this.inst.layout();
			});
		});
	});
	[true, false].forEach(isOverflowScroll => {
		describe("When scrolling append/prepend event Test", function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite' style='height:600px;'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle: true,
					isOverflowScroll
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});

			[true, false].forEach(isAppend => {
				const ITEMCOUNT = 30;
				const RETRY = 7;
				it(`should trigger ${isAppend ? "append" : "prepend"} event when scrolling (isOverflowScroll: ${isOverflowScroll})`, async () => {
					// Given
					const callback = waitEvent(this.inst, isAppend ? "append" : "prepend");
					const handler = await waitInsert(this.inst, isAppend, ITEMCOUNT, RETRY);
					const lastParam = handler.getCall(handler.callCount - 1).args[0];

					// When
					if (isAppend) {
						const spot = lastParam.size;

						this.inst._watcher.scrollTo(spot / 2);
						await wait();
						this.inst._watcher.scrollTo(spot);
					} else {
						this.inst._watcher.scrollTo(this.inst._getEdgeValue("end") / 2);
						await wait();
						this.inst._watcher.scrollTo(0);
					}
					// Then
					const param = await callback;

					expect(param.isTrusted).to.a.true;
					expect(param.groupKey).to.be.equal(param.currentTarget.getGroupKeys()[isAppend ? "pop" : "shift"]());
				});
			});
		});
	});
	[true, false].forEach(isOverflowScroll => {
		describe(`When scrolling append event isScroll Test (isOverflowScroll: ${isOverflowScroll})`, function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite' style='width:100%;height: 250px;position:absolute;top:0;left:0;'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle: true,
					isOverflowScroll,
					margin: 5,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});
			it(`should trigger append method when appending (isOverflowScroll: ${isOverflowScroll}, defense:${DEFENSE_BROWSER})`, async () => {
				let i = 0;
				for (; ; ++i) {
					// When
					const event = waitEvent(this.inst, "layoutComplete");
					this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);
					const e = await event;
					const isScroll = e.isScroll;
					const size = isOverflowScroll ? 250 : innerHeight(window);

					// Then
					if (e.size <= size) {
						expect(isScroll).to.be.false;
					} else {
						expect(isScroll).to.be.true;
						break;
					}
				}
				expect(i).to.be.above(1);
			});
		});
	});
	[true, false].forEach(useRecycle => {
		describe(`When prepending fit test(DEFENSE_BROWSER: ${DEFENSE_BROWSER})`, function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle,
					margin: 5,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});
			it(`should trigger fit method(useRecycle=${useRecycle})`, done => {
				// Then
				this.inst.on("layoutComplete", e => {
					expect(e.target[0].rect.top).to.be.equals(0);
					this.inst._itemManager.fit(-100, false);
					expect(e.target[0].rect.top).to.be.equals(100);
					expect(this.inst._getEdgeValue("start")).to.be.equals(100);

					if (DEFENSE_BROWSER || !useRecycle) {
						expect(this.inst._fit("before")).to.be.equals(0);
						expect(e.target[0].rect.top).to.be.equals(100);
						expect(this.inst._fit("after")).to.be.equals(0);
					} else {
						expect(this.inst._fit("before")).to.be.equals(100);
						expect(e.target[0].rect.top).to.be.equals(0);
						expect(this.inst._fit("after")).to.be.equals(0);
					}
					done();
				});
				// Given
				this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);
			});
			it(`should trigger fit method with loadingBar(useRecycle=${useRecycle})`, done => {
				// Given
				this.inst.setLoadingBar({
					"prepend": `<div class="prepend" style="width: 100px;height: 100px;display:none;">PREPEND</div>`,
					"append": `<div class="append" style="height: 75px; height: 75px;display:none;">APPEND</div>`,
				});

				// Then
				this.inst.on("layoutComplete", e => {
					this.inst._itemManager.fit(-50, false);
					this.inst.startLoading(false);
					expect(e.target[0].rect.top).to.be.equals(100);
					expect(this.inst._getEdgeValue("start")).to.be.equals(100);

					if (DEFENSE_BROWSER || !useRecycle) {
						expect(this.inst._fit()).to.be.equals(0);
						expect(e.target[0].rect.top).to.be.equals(100);
						expect(this.inst._fit()).to.be.equals(0);
					} else {
						expect(this.inst._fit()).to.be.equals(100);
						expect(e.target[0].rect.top).to.be.equals(100);
					}
					this.inst.endLoading();
					this.inst.endLoading();
					expect(e.target[0].rect.top).to.be.equals(0);
					done();
				});

				// When
				this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);
			});
		});
	});
	describe(`When scroll is attached`, function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = `
      <div id="header" style="position:relative;width: 100%; height: ${window.innerHeight * 3}px;"></div>
      <div id='infinite'></div>
      <div id="footer" style="position:relative;width: 100%; height: ${window.innerHeight * 3}px;"></div>`;
			this.inst = new InfiniteGrid("#infinite", {
				margin: 5,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check scroll attached to the top`, async () => {
			// Given
			const scrollPos = this.inst._watcher.getScrollPos();

			// When
			window.scrollTo(0, 0);
			await wait(100);
			await waitInsert(this.inst, true, 10, 4);


			// Then
			expect(scrollPos).to.be.below(-100);
			expect(scroll(window)).to.be.equals(0);
			expect(this.inst._watcher.getScrollPos()).to.be.equals(scrollPos);

		});
		it(`should check scroll attached to the bottom`, async () => {
			// Given
			const scrollPos = document.body.offsetHeight - window.innerHeight;

			// When
			window.scrollTo(0, scrollPos);
			await wait(100);
			await waitInsert(this.inst, true, 10, 4);

			// Then
			expect(Math.max(document.body.scrollTop, document.documentElement.scrollTop)).to.be.equals(scrollPos);

		});
	});
	describe(`When appending, image test`, function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				margin: 5,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check append error images`, done => {
			this.inst.on("imageError", e => {
				expect(e.target.src).to.have.string("1.jpg");
				expect(e.itemIndex).to.be.equals(1);
				done();
			});
			this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg">`);
		});
		it(`should check append multiple error images`, done => {
			// Given
			let count = 0;

			// Then
			this.inst.on("imageError", e => {
				++count;

				expect(e.itemIndex).to.be.not.equals(0);
				if (count === 3) {
					done();
				}
			});

			// When
			this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg"><img src="/1.jpg"><img src="/2.jpg">`);
		});
		it(`should check append error image and test error event remove method`, done => {
			const error = sinon.spy(e => {
				e.remove();
			});
			const complete2 = e => {
				expect(error.callCount).to.be.equals(2);
				expect(this.inst._itemManager._groups[0].items[1].content).to.not.have.string("img");
				expect(this.inst._itemManager._groups[0].items).to.be.lengthOf(2);
				done();
			};
			const complete1 = e => {
				this.inst.on("layoutComplete", complete2);
				this.inst.off("layoutComplete", complete1);
			};
			this.inst.on("layoutComplete", complete1);
			this.inst.on("imageError", error);

			this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><div><img src="/1.jpg"></div><img src="/2.jpg">`);
		});
		it(`should check append error image and test error event removeItem method`, done => {
			const error = sinon.spy(e => {
				e.replaceItem("<div></div>");
				e.replaceItem("<div>2</div>");
				e.replace();
				e.replace();
				e.removeItem();

				// useless
				e.removeItem();
				e.remove();
				e.replace("1");
				e.replaceItem("<div></div>");
			});
			const complete2 = e => {
				expect(error.callCount).to.be.equals(2);
				expect(this.inst._itemManager._groups[0].items).to.be.lengthOf(1);
				done();
			};
			const complete1 = e => {
				this.inst.on("layoutComplete", complete2);
				this.inst.off("layoutComplete", complete1);
			};
			this.inst.on("layoutComplete", complete1);
			this.inst.on("imageError", error);

			this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><div><img src="/1.jpg"></div><img src="/2.jpg">`);
		});
		it(`should check append error image and test error event replace method`, done => {
			const error = sinon.spy(e => {
				e.replace("/base/test/unit/images/error.png");
			});
			const complete2 = e => {
				expect(error.calledOnce).to.be.true;
				expect(this.inst._itemManager._groups[0].items[1].content).to.have.string("error.png");
				expect(this.inst._itemManager._groups[0].items[1].el.src).to.have.string("error.png");
				done();
			};
			const complete1 = e => {
				this.inst.on("layoutComplete", complete2);
				this.inst.off("layoutComplete", complete1);
			};
			this.inst.on("layoutComplete", complete1);
			this.inst.on("imageError", error);

			this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg">`);
		});
		it(`should check append error image and test error event replace method(element)`, done => {
			const error = sinon.spy(e => {
				e.replace("<p>it's error</p>");
			});
			const complete2 = e => {
				expect(error.calledOnce).to.be.true;
				expect(this.inst._itemManager._groups[0].items[1].content).to.have.string("it's error");
				expect(this.inst._itemManager._groups[0].items[1].content).to.have.string("HEADER");
				expect(this.inst._itemManager._groups[0].items[1].content).to.have.string("FOOTER");
				expect(this.inst._itemManager._groups[0].items[1].el.innerHTML).to.have.string("it's error");
				done();
			};
			const complete1 = e => {
				this.inst.on("layoutComplete", complete2);
				this.inst.off("layoutComplete", complete1);
			};
			this.inst.on("layoutComplete", complete1);
			this.inst.on("imageError", error);

			this.inst.append(`<div>HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`);
		});
		it(`should check append error image and test error event replaceItem method`, done => {
			const error = sinon.spy(e => {
				e.replaceItem("<p>it's error</p>");
			});
			const complete2 = e => {
				expect(error.calledOnce).to.be.true;
				expect(this.inst._itemManager._groups[0].items[1].content).to.have.string("it's error");
				expect(this.inst._itemManager._groups[0].items[1].content).to.not.have.string("HEADER");
				expect(this.inst._itemManager._groups[0].items[1].content).to.not.have.string("FOOTER");
				expect(this.inst._itemManager._groups[0].items[1].el.innerHTML).to.have.string("it's error");
				done();
			};
			const complete1 = e => {
				this.inst.on("layoutComplete", complete2);
				this.inst.off("layoutComplete", complete1);
			};
			this.inst.on("layoutComplete", complete1);
			this.inst.on("imageError", error);

			this.inst.append(`<div>HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`);
		});
	});
	describe(`When image processing, fit test`, function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				margin: 5,
				isOverflowScroll: true,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check outline when image processing and fit occur at the same time`, done => {
			const item1 = `<div style="height:100px">HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`;
			const layoutComplete2 = sinon.spy(e => {
				const length = this.inst._itemManager._groups.length;

				const group1 = this.inst._itemManager._groups[length - 2];
				const group2 = this.inst._itemManager._groups[length - 1];
				expectConnectGroupsOutline(group1, group2);
				done();
			});
			insert(this.inst, true, () => {
				const container = this.el.querySelector("#infinite");

				container.scrollTop = 50000;

				const pos = this.inst._watcher.getScrollPos();

				setTimeout(() => {
					this.inst._infinite.recycle(pos, true);
					this.inst.on("layoutComplete", layoutComplete2);
					this.inst.append(item1);
					this.inst._fit();
				}, 10);

			}, 10, 20);

		});
	});
	describe(`if resize when infinitegrid has no item, size does not change.(DEFENSE_BROWSER: ${DEFENSE_BROWSER})`, function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				useRecycle: true,
				isOverflowScroll: true,
				margin: 5,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it("should check resize when no item", () => {


			const con = this.inst._renderer.container;
			const offsetWidth = con.offsetWidth;

			con.style.width = `${offsetWidth + 10}px`;
			con.style.padding = "0px";
			con.style.margin = "0px";
			const width = con.clientWidth;

			this.inst.layout(true);
			expect(this.inst._renderer.getViewportSize()).to.be.equals(width);
			expect(this.inst._layout._size).to.be.equals(width);
		});
	});
	[true, false].forEach(isOverflowScroll => {
		describe(`When appending/prepending loadingStart/loaingEnd event Test (isOverflowScroll: ${isOverflowScroll}, DEFENSE_BROWSER: ${DEFENSE_BROWSER})`, function () {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite' style='height: 500px'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle: true,
					isOverflowScroll,
					margin: 5,
				});
				this.inst.setLoadingBar({
					"prepend": `<div class="prepend" style="width: 100px;height: 100px;display:none;">PREPEND</div>`,
					"append": `<div class="append" style="height: 75px; height: 75px;display:none;">APPEND</div>`,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});

			[true, false].forEach(isAppend => {
				const ITEMCOUNT = 30;
				const RETRY = 1;
				it(`should trigger startLoading/endLoading method when ${isAppend ? "appending" : "prepending"} (isOverflowScroll: ${isOverflowScroll})`, async () => {
					// Given
					// When
					expect(this.inst.isLoading()).to.be.false;

					// Start Loading
					this.inst.startLoading(isAppend);
					this.inst.startLoading();

					expect(this.inst.getLoadingBar()).to.be.equal(this.inst.getLoadingBar(isAppend));
					expect(this.inst.getLoadingBar(isAppend).style.display).to.be.equal("block");
					expect(this.inst.isLoading()).to.be.true;
					expect(this.inst._getLoadingStatus()).to.be.equal(isAppend ? LOADING_APPEND : LOADING_PREPEND);
					expect(this.inst._status.loadingSize).to.be.equal(isAppend ? 75 : 100);

					const layoutCompleteHandler = sinon.spy(e => {
						if (!isOverflowScroll) {
							expect(innerHeight(this.inst._renderer.container)).to.be.equal(this.inst._getEdgeValue("end") - this.inst._getEdgeValue("start") + (isAppend ? 75 : 100));
						}
						expect(this.inst.isLoading()).to.be.true;
						if (isAppend) {
							expect(parseInt(this.inst.getLoadingBar().style.top, 10)).to.be.equal(this.inst._getEdgeValue("end"));
						}
					});
					this.inst.on("layoutComplete", layoutCompleteHandler);

					if (!isOverflowScroll) {
						expect(innerHeight(this.inst._renderer.container)).to.be.equal(isAppend ? 75 : 100);
					}
					const handler = await waitInsert(this.inst, isAppend, ITEMCOUNT, 2);
					// End Loading
					this.inst.endLoading();

					if (!isAppend) {
						expect(this.inst._getEdgeValue("start")).to.be.equal(0);
					}
					expect(this.inst.isLoading()).to.be.false;
					expect(this.inst._getLoadingStatus()).to.be.equal(0);
					expect(this.inst._status.loadingSize).to.be.equal(0);
					expect(this.inst.getLoadingBar(isAppend).style.display).to.be.equal("none");

					const lastParam = handler.getCall(handler.callCount - 1).args[0];
					const waitRequestInsert = waitEvent(this.inst, isAppend ? "append" : "prepend");

					if (isAppend) {
						const spot = lastParam.size;

						this.inst._watcher.scrollTo(spot / 2);
						await wait();
						this.inst._watcher.scrollTo(spot);
					} else {
						this.inst._watcher.scrollTo(this.inst._getEdgeValue("end") / 2);
						await wait();
						this.inst._watcher.scrollTo(0);
					}
					await waitRequestInsert;
					expect(this.inst.isLoading()).to.be.false;
					expect(this.inst._getLoadingStatus()).to.be.equal(0);
					expect(this.inst._status.loadingSize).to.be.equal(0);
				});
				it(`should check startLoading / endLoading parameter method when ${isAppend ? "appending" : "prepending"} (isOverflowScroll: ${isOverflowScroll})`, async () => {
					await waitInsert(this.inst, true, 5, 4);

					const waitAppend = waitEvent(this.inst, isAppend ? "append" : "prepend");
					const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

					this.inst._watcher.scrollTo(this.inst._getEdgeValue("end") / 2);
					await wait(100);
					this.inst._watcher.scrollTo(isAppend ? this.inst._getEdgeValue("end") : 0);
					const param1 = await waitAppend;

					param1.startLoading();
					const loading1 = this.inst.isLoading();
					param1.endLoading();
					const loading2 = this.inst.isLoading();
					param1.startLoading();
					const loading3 = this.inst.isLoading();

					waitInsert(this.inst, true, 1, 1);
					const param2 = await waitLayoutComplete;
					const loading4 = this.inst.isLoading();

					param2.endLoading();
					const loading5 = this.inst.isLoading();

					expect(loading1).to.be.true;
					expect(loading2).to.be.false;
					expect(loading3).to.be.true;
					expect(loading4).to.be.true;
					expect(loading5).to.be.false;
				});
			});
		});
	});
	describe("append/prepend Test on layoutComplete", function () {
		[true, false].forEach(isOverflowScroll => {
			beforeEach(() => {
				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle: true,
					isOverflowScroll,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
				}
				cleanup();
			});

			[true, false].forEach(isAppend => {
				const ITEMCOUNT = 30;
				const RETRY = 7;

				it(`should check a ${isAppend ? "append" : "prepend"} with recycle method (isOverflowScroll: ${isOverflowScroll})`, done => {
					// Given
					// When
					const handler = insert(this.inst, isAppend, () => {
						// Then
						expect(this.inst._infinite._status.startCursor).to.be.equal(0);
						expect(this.inst._infinite._status.endCursor).to.be.equal(RETRY - 1);
						expect(this.inst.getGroupKeys()).to.have.lengthOf(RETRY);

						// Given
						const centerEndValue = this.inst._itemManager
							.getEdgeValue(isAppend ? "end" : "start", this.inst._infinite._status.startCursor, 3);

						// When
						this.inst._watcher.scrollTo(centerEndValue);
						setTimeout(() => {
							this.inst._infinite.recycle(centerEndValue, isAppend);
							// Then
							expect(this.inst.getGroupKeys()).to.have.lengthOf.below(RETRY);
							done();
						}, 100);
					}, ITEMCOUNT, RETRY);
				});
			});
		});
	});
	describe("isConstantSize option Test", function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				isConstantSize: true,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check isConstantSize option`, async () => {
			// Given
			await waitInsert(this.inst, true, 5, 4);
			const datas = this.inst._itemManager._groups;


			// When
			datas.forEach(({ items }) => {
				items.forEach(({ el }) => {
					el.style.width = "10%";
				});
			});
			this.inst._renderer._size.viewport = 0;
			this.inst.layout();

			// Then
			datas.forEach(({ items }) => {
				items.forEach(({ size, orgSize }) => {
					expect(size).to.be.deep.equals(orgSize);
				});
			});
			expect(datas[0].outlines.start.every(p => p === datas[0].outlines.start[0])).to.be.true;
		});
		it(`should check isConstantSize option in cursor`, async () => {
			// Given
			this.inst.layout(true);
			await waitInsert(this.inst, true, 5, 4);

			// When
			const datas = this.inst._itemManager._groups;
			const rects = datas.map(data => data.items.map(item => item.rect.top));
			const waitLayout = waitEvent(this.inst, "layoutComplete");
			this.inst._infinite.setCursor("start", 1);
			this.inst._renderer._size.viewport = 0;
			this.inst._watcher._onResize();
			await waitLayout;

			const rects2 = datas.map(data => data.items.map(item => item.rect.top));

			// Then
			if (!DEFENSE_BROWSER) {
				expect(rects).to.be.deep.equals(rects2.map(data => data.map(top => top - rects2[0][0])));
			}
			expect(datas[0].outlines.start.every(p => p === datas[0].outlines.start[0])).to.be.true;
		});
		it(`should check resize width and isConstantSize option in cursor`, async () => {
			// Given
			this.inst.layout(true);
			await waitInsert(this.inst, true, 5, 4);

			// When
			const datas = this.inst._itemManager._groups;
			const size = datas.map(data => data.items.map(item => Object.assign(item.size)));
			const waitLayout = waitEvent(this.inst, "layoutComplete");
			const container = this.el.querySelector("#infinite");
			const width = innerWidth(container);
			container.style.width = `${width * 2}px`;
			datas[0].outlines.start = [0];
			this.inst._renderer._size.viewport = width * 2;
			this.inst._layout.setSize(width * 2);
			this.inst.layout(true);

			await waitLayout;
			const size2 = datas.map(data => data.items.map(item => Object.assign(item.size)));

			// Then
			expect(size).to.be.deep.equals(size2);
			expect(datas[0].outlines.start.length).to.be.ok;
			expect(isNaN(datas[0].outlines.start[0])).to.be.false;
			expect(isFinite(datas[0].outlines.start[0])).to.be.true;
			expect(datas[0].outlines.start.every(p => p === datas[0].outlines.start[0])).to.be.true;
		});
		it(`should check isEqualSize and isConstantSize option`, async () => {
			// Given
			this.inst.options.isEqualSize = true;
			this.inst._renderer.options.isEqualSize = true;

			// When
			await waitInsert(this.inst, true, 5, 4);
			const datas = this.inst._itemManager._groups;

			// Then
			const standardSize = datas[0].items[0].size;
			datas.forEach(({ items }) => {
				items.forEach(({ size }) => {
					expect(size).to.deep.equals(standardSize);
				});
			})
		});
		it(`should check resize and isEqualSize and isConstantSize option`, async () => {
			// Given
			this.inst.options.isEqualSize = true;
			this.inst._renderer.options.isEqualSize = true;

			await waitInsert(this.inst, true, 5, 4);

			// When
			const datas = this.inst._itemManager._groups;
			const standardSize = Object.assign(datas[0].items[0].size);
			const waitLayout = waitEvent(this.inst, "layoutComplete");

			this.inst._infinite.setCursor("start", 1);
			this.inst._renderer._size.viewport = 0;
			this.inst._watcher._onResize();

			await waitLayout;

			// Then
			datas.forEach(({ items }) => {
				items.forEach(({ size }) => {
					expect(size).to.deep.equals(standardSize);
				});
			});
		});
	});
	describe("isEqualSize option Test", function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				isEqualSize: true,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check isEqualSize option`, async () => {
			// Given
			// When
			await waitInsert(this.inst, true, 5, 4);
			const datas = this.inst._itemManager._groups;

			const standardSize = datas[0].items[0].size;
			datas.forEach(({ items }) => {
				items.forEach(({ size }) => {
					expect(size).to.deep.equals(standardSize);
				});
			})
		});
		it(`should check no items`, () => {
			// Given
			const inst = new InfiniteGrid("#infinite", {
				isEqualSize: true,
			});

			// When
			// no layout and no items
			inst.layout(true);
			const layout1 = inst._layout;
			// layout and no items
			inst.setLayout(GridLayout);
			inst._infinite._status.startCursor = -1;
			inst._infinite._status.endCursor = -1;
			inst.layout(true);

			// Then
			expect(layout1).is.not.ok;
			expect(inst.getItems().length).to.be.equals(0);

			inst.destroy();
		});
		it(`should check layout method`, async () => {
			// Given
			this.inst.layout(true);
			await waitInsert(this.inst, true, 5, 4);

			const datas = this.inst._itemManager._groups;
			const rects = datas.map(data => data.items.map(item => Object.assign(item.rect)));
			const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

			// When
			this.inst.layout(true);
			await waitLayoutComplete;

			const rects2 = datas.map(data => data.items.map(item => Object.assign(item.rect)));

			// Then
			expect(rects).to.be.deep.equals(rects2);
		});
		it(`should check layout method in cursor`, async () => {
			// Given
			this.inst.layout(true);

			await waitInsert(this.inst, true, 5, 4);

			// When
			const datas = this.inst._itemManager._groups;
			const rects = datas.map(data => data.items.map(item => item.rect.top));
			const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");

			this.inst._infinite.setCursor("start", 1);
			this.inst.layout(true);
			await waitLayoutComplete;

			// Then
			const rects2 = datas.map(data => data.items.map(item => item.rect.top));
			expect(rects).to.be.deep.equals(rects2.map(data => data.map(top => top - rects2[0][0])));
		});
		it(`should check resize and layout method with transition`, async () => {
			// Given
			this.inst.options.transitionDuration = 0.1;

			await waitInsert(this.inst, true, 5, 4);

			const datas = this.inst._itemManager._groups;
			const rects = datas.map(data => data.items.map(item => Object.assign({}, item.rect)));
			const prevRects = datas.map(data => data.items.map(item => Object.assign({}, item.prevRect)));

			// When
			const waitLayoutComplete = waitEvent(this.inst, "layoutComplete");
			const container = this.el.querySelector("#infinite");
			const width = innerWidth(container);
			container.style.width = `${width * 3}px`;
			datas[0].outlines.start = [];
			this.inst._renderer._size.viewport = width * 3;
			this.inst._layout.setSize(width * 3);
			this.inst.layout(true);

			await waitLayoutComplete;

			// Then
			const layoutCompleteRects = this.inst._itemManager._groups.map(data => data.items.map(item => item.rect));
			const layoutCompletePrevRects = this.inst._itemManager._groups.map(data => data.items.map(item => item.prevRect));

			expect(rects).to.be.deep.equals(prevRects);
			expect(layoutCompleteRects).to.be.not.deep.equals(layoutCompletePrevRects);
			expect(rects).to.be.deep.equals(layoutCompletePrevRects);
			expect(rects).to.be.not.deep.equals(layoutCompleteRects);

			await wait(300);
			const transitionEndPrevRects = this.inst._itemManager._groups.map(data => data.items.map(item => item.prevRect));

			expect(transitionEndPrevRects).to.be.deep.equals(layoutCompleteRects);
		});
	});

	describe(`resize Test`, function () {
		beforeEach(() => {
			document.body.style.marginBottom = "0px";
			document.body.style.padding = "0px";
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite' style='width: 500px;height: 500px;'></div>";
			this.inst = new InfiniteGrid("#infinite", {
				isOverflowScroll: true,
			});
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
				document.body.scrollTop = 0;
			}
			cleanup();
		});
		it(`should check resize and relayout`, async () => {
			// Given
			await waitInsert(this.inst, true, 10, 10);
			this.inst._infinite.recycle(0, false);

			// When
			await wait();
			this.el.querySelector("#infinite").style.width = "501px";
			// Karma window.dispatch(new Event("resize")) issue
			this.inst._watcher._onResize();


			// Then
			await wait();
			expect(this.inst._itemManager._groups[this.inst._itemManager._groups.length - 1].outlines.start.length).to.be.equals(0);
			expect(this.inst._itemManager._groups[this.inst._itemManager._groups.length - 1].items[0].rect.top).to.be.below(0);
		});
	});
	[true, false].forEach(useRecycle => {
		describe(`moveTo method Test(useRecycle=${useRecycle}, defense=${DEFENSE_BROWSER})`, function () {
			beforeEach(() => {
				document.body.insertAdjacentHTML("beforeend", `
        <style>
        html, body {
          height: 100%;
          box-sizing: border-box;
        }
        *, * * {
          padding-top: 0;
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 0;
          margin-left: 0;
          margin-top: 0;
          margin-right: 0;
          margin-bottom: 0;
        }
        </style>
        `);
				document.body.style.marginBottom = "0px";
				document.body.style.padding = "0px";

				// get scroll bar width
				var scrollDiv = document.createElement("div");
				scrollDiv.style.cssText = "width: 100px; height: 100px; overflow: scroll; position: absolute; top: -999px; border: 0;";
				document.body.appendChild(scrollDiv);
				this.scrollHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
				document.body.removeChild(scrollDiv);

				this.el = sandbox();
				this.el.innerHTML = "<div id='infinite' style='height: 500px; border: 0;'></div>";
				this.inst = new InfiniteGrid("#infinite", {
					useRecycle,
				});
				this.inst.setLayout(GridLayout);
			});
			afterEach(() => {
				if (this.inst) {
					this.inst.destroy();
					this.inst = null;
					document.body.scrollTop = 0;
				}
				cleanup();
			});
			[0, 2, 5, 7, 9].forEach(itemIndex => {
				it(`should moveTo in cursor inside(isAppend = true, itemIndex=${itemIndex})`, async () => {
					// Given, When
					await waitInsert(this.inst, true, 10, 10);

					const scrollPos = Math.max(...this.inst._itemManager._groups[5].outlines.start);
					let moveTo = this.inst._itemManager._groups[8].items[itemIndex].rect.top;

					this.inst._setScrollPos(scrollPos);
					this.inst._scrollTo(scrollPos);
					this.inst._infinite.recycle(scrollPos, true);
					this.inst.moveTo(8, itemIndex);
					await wait(20);
					// Then
					const end = this.inst._getEdgeValue("end");
					expect([moveTo, end - this.inst._renderer.getViewSize()]).to.include(this.inst._watcher.getScrollPos());
				});
				it(`should moveTo in cursor inside(isAppend = false, itemIndex=${itemIndex})`, async () => {
					// Given, When
					await waitInsert(this.inst, true, 10, 10);
					const scrollPos = Math.max(...this.inst._itemManager._groups[6].outlines.start);

					this.inst._watcher.setScrollPos(scrollPos);
					this.inst._watcher.scrollTo(scrollPos);
					this.inst._infinite.recycle(scrollPos, true);

					// fit
					this.inst.moveTo(5, itemIndex);

					await wait(100);
					const moveTo = this.inst._itemManager._groups[5].items[itemIndex].rect.top;

					// Then
					const end = this.inst._getEdgeValue("end");

					expect([moveTo, end - this.inst._renderer.getViewSize()]).to.include(this.inst._watcher.getScrollPos());
				});
				it(`should moveTo in cursor outside(isAppend = true, itemIndex = ${itemIndex})`, async () => {
					// Given, When
					await waitInsert(this.inst, true, 10, 10);
					this.inst._infinite.setCursor("end", 0);
					this.inst._recycle([{ start: 1, end: this.inst._itemManager.size() - 1 }]);
					this.inst.moveTo(5, itemIndex);

					await wait(100);
					const moveTo = this.inst._itemManager._groups[5].items[itemIndex].rect.top;
					const end = Math.max(...this.inst._itemManager._groups[5].outlines.end);
					const view = this.inst._renderer.getViewSize();
					const size = this.inst._getEdgeValue("end");

					expect([
						moveTo,
						size - view,
						end - view,
						size - view + this.scrollHeight,
						end - view + this.scrollHeight,
					]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
				});
				it(`should moveTo in cursor outside(isAppend = false, itemIndex = ${itemIndex})`, async () => {
					// Given, When
					await waitInsert(this.inst, true, 10, 10);
					const scrollPos = Math.max(...this.inst._itemManager._groups[6].outlines.start);

					this.inst._watcher.setScrollPos(scrollPos);
					this.inst._watcher.scrollTo(scrollPos);
					this.inst._infinite.recycle(scrollPos, true);

					this.inst.moveTo(1, itemIndex);

					await wait();
					let moveTo = this.inst._itemManager._groups[1].items[itemIndex].rect.top;
					const end = Math.max(...this.inst._itemManager._groups[1].outlines.end);
					const view = this.inst._renderer.getViewSize();
					const size = this.inst._getEdgeValue("end");

					// Then
					expect([
						moveTo,
						size - view,
						end - view,
						size - view + this.scrollHeight,
						end - view + this.scrollHeight,
					]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
				});

				it(`should resize and moveTo in cursor outside(isAppend = true, itemIndex = ${itemIndex})`, done => {
					insert(this.inst, true, () => {
						this.inst._infinite.recycle(0, false);
						this.inst.layout(true);

						setTimeout(() => {
							this.inst.moveTo(7, itemIndex);
							setTimeout(() => {
								let moveTo = itemIndex > -1 ? this.inst._itemManager._groups[7].items[itemIndex].rect.top :
									Math.max(...this.inst._itemManager._groups[7].outlines.start);


								const end = Math.max(...this.inst._itemManager._groups[7].outlines.end);
								const view = this.inst._renderer.getViewSize();
								const size = this.inst._getEdgeValue("end");

								expect([
									moveTo,
									size - view,
									end - view,
									size - view + this.scrollHeight,
									end - view + this.scrollHeight,
								]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
								done();
							}, 30);
						}, 30);
					}, 10, 10);
				});
				it(`should resize and moveTo in cursor outside(isAppend = false, itemIndex = ${itemIndex})`, done => {
					insert(this.inst, true, () => {
						const scrollPos = Math.max(...this.inst._itemManager._groups[7].outlines.start);

						this.inst._watcher.setScrollPos(scrollPos);
						this.inst._watcher.scrollTo(scrollPos);
						this.inst._infinite.recycle(scrollPos, true);
						this.inst._infinite.recycle(scrollPos, false);
						this.inst.layout(true);

						setTimeout(() => {
							this.inst.moveTo(3, itemIndex);
							setTimeout(() => {
								let moveTo = itemIndex > -1 ? this.inst._itemManager._groups[3].items[itemIndex].rect.top :
									Math.max(...this.inst._itemManager._groups[3].outlines.start);
								const end = Math.max(...this.inst._itemManager._groups[3].outlines.end);
								const view = this.inst._renderer.getViewSize();
								const size = this.inst._getEdgeValue("end");

								expect([
									0,
									moveTo,
									size - view,
									end - view,
									size - view + this.scrollHeight,
									end - view + this.scrollHeight,
								]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
								done();
							}, 30);
						}, 30);
					}, 10, 10);
				});
			});
			it(`should moveTo in cursor end(isAppend = true)`, async () => {
				// Given
				await waitInsert(this.inst, true, 11, 10);
				const event = waitEvent(this.inst, "layoutComplete");
				this.inst.append(
					[`<div style="width: 100px; height: 100px;">test1</div>`,
						`<div style="width: 100px; height: 100px;">test2</div>`]);
				await event;
				await wait(30);

				// When
				this.inst.moveTo(10);
				await wait(20);
				const moveTo = Math.max(...this.inst._itemManager._groups[10].outlines.start);
				const end = Math.max(...this.inst._itemManager._groups[10].outlines.end);
				const view = this.inst._renderer.view === window ? document.body : this.inst._renderer.view;
				const viewSize = view.clientHeight;
				const size = this.inst._getEdgeValue("end");
				// Then
				expect([moveTo, size - viewSize, end - viewSize, end - viewSize - this.scrollHeight]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
			});
			it(`should resize and moveTo in cursor end(isAppend = true)`, async () => {
				// Given
				await waitInsert(this.inst, true, 11, 10);
				const event = waitEvent(this.inst, "layoutComplete");

				this.inst.append(
					[`<div style="width: 100px; height: 100px;">test1</div>`,
						`<div style="width: 100px; height: 100px;">test2</div>`,
						`<div style="width: 100px; height: 100px;">test3</div>`,
						`<div style="width: 100px; height: 100px;">test4</div>`]);

				await event;
				this.inst._infinite.recycle(0, false);
				this.inst.layout(true);
				// When
				await wait(30);
				this.inst.moveTo(10);
				await wait(20);
				const moveTo = Math.max(...this.inst._itemManager._groups[10].outlines.start);
				const end = Math.max(...this.inst._itemManager._groups[10].outlines.end);
				const view = this.inst._renderer.view === window ? document.body : this.inst._renderer.view;
				const viewSize = view.clientHeight;
				const size = this.inst._getEdgeValue("end");

				// Then
				expect([moveTo, size - viewSize, end - viewSize, end - viewSize - this.scrollHeight]).to.include(Math.max(this.inst._watcher.getScrollPos(), 0));
			});
		});
	});
	describe(`getItem, updateItem, updateItems Test`, function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite");
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should check "getItem" method`, async () => {
			// Given, When
			// group 1 ~ 40
			await waitInsert(this.inst, true, 30, 40);

			// Only group1 is visible, group2 ~ 40 are invisible.
			this.inst._infinite.recycle(0, false);

			// Then
			const item1 = this.inst.getItem(0, 0);
			const item2 = this.inst.getItem(item1.el);

			// no item element
			const item3 = this.inst.getItem(1, 0);
			const item4 = this.inst.getItem(document.createElement("div"));
			expect(item1).to.be.equal(item2);
			expect(item1).to.be.not.equal(item3);
			expect(item3.el).to.be.not.ok;
			expect(item4).to.be.not.ok;
		});
		it(`should check "updateItem(el)" method`, async () => {
			// Given
			// group 1 ~ 40
			await waitInsert(this.inst, true, 30, 40);
			// Only group1 is visible, group2 ~ 40 are invisible.
			this.inst._infinite.recycle(0, false);

			const item1 = this.inst.getItem(0, 0);
			// group2 is below group1
			const { outlines: { start } } = this.inst._itemManager.getGroup(1);

			// When
			// change content
			item1.el.innerHTML = "updateItem1";

			// change size
			item1.el.style.height = `${parseInt(item1.el.style.height) + 200}px`;

			const height1 = item1.size.height;

			this.inst.updateItem(item1.el);

			const { outlines: { start: start2 } } = this.inst._itemManager.getGroup(1);
			// Then
			expect(item1.content).to.have.string("updateItem1");
			expect(height1).to.be.not.equal(item1.size.height);
			expect(start.length).to.be.equal(start2.length);
			expect(start).to.be.not.deep.equal(start2);
		});
		it(`should check "updateItem(groupIndex, itemIndex)" method`, async () => {
			// Given
			// group 1 ~ 40
			await waitInsert(this.inst, true, 30, 40);
			// Only group1 is visible, group2 ~ 40 are invisible.
			this.inst._infinite.recycle(0, false);

			const item1 = this.inst.getItem(0, 0);
			// group2 is below group1
			const { outlines: { start } } = this.inst._itemManager.getGroup(1);

			// When
			// change content
			item1.el.innerHTML = "updateItem1";

			// change size
			item1.el.style.height = `${parseInt(item1.el.style.height) + 200}px`;

			const height1 = item1.size.height;

			this.inst.updateItem(0, 0);

			const { outlines: { start: start2 } } = this.inst._itemManager.getGroup(1);
			// Then
			expect(item1.content).to.have.string("updateItem1");
			expect(height1).to.be.not.equal(item1.size.height);
			expect(start.length).to.be.equal(start2.length);
			expect(start).to.be.not.deep.equal(start2);
		});
		it(`should check "updateItems" method`, async () => {
			// Given
			// group 1 ~ 40
			await waitInsert(this.inst, true, 30, 40);
			// Only group1 is visible, group2 ~ 40 are invisible.
			this.inst._infinite.recycle(0, false);

			const item1 = this.inst.getItem(0, 0);
			const item2 = this.inst.getItem(0, 1);
			// group2 is below group1
			const { outlines: { start } } = this.inst._itemManager.getGroup(1);

			// When
			// change content
			item1.el.innerHTML = "updateItem1";
			item2.el.innerHTML = "updateItem2";

			// change size
			item1.el.style.height = `${parseInt(item1.el.style.height) + 200}px`;
			item2.el.style.height = `${parseInt(item2.el.style.height) + 200}px`;


			const height1 = item1.size.height;
			const height2 = item2.size.height;

			this.inst.updateItems();

			const { outlines: { start: start3 } } = this.inst._itemManager.getGroup(1);
			// Then
			expect(item1.content).to.have.string("updateItem1");
			expect(item2.content).to.have.string("updateItem2");
			expect(height1).to.be.not.equal(item1.size.height);
			expect(height2).to.be.not.equal(item2.size.height);
			expect(start.length).to.be.equal(start3.length);
			expect(start).to.be.not.deep.equal(start3);
		});
	});
	describe("setLayout method Test", function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			this.inst = new InfiniteGrid("#infinite");
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		[true, false].forEach(horizontal => {
			it(`should set '${horizontal}' horizontal of options`, () => {
				// Given
				this.inst.options.horizontal = horizontal;

				// When
				[
					GridLayout,
					FrameLayout,
					SquareLayout,
					PackingLayout,
					JustifiedLayout
				].forEach(v => {
					// Then
					this.inst.setLayout(v);
					expect(this.inst._layout.options.horizontal).to.be.equal(this.inst.options.horizontal);
					expect(this.inst._layout instanceof v).to.be.true;
				});
			});
		});
	});
	describe("data type Test", function () {
		const makeData = function (isHTMLElement) {
			const complicatedHTML = "<div class='item'><div class='thumbnail'><img class='img-rounded' src='#' /><div class='caption'><p><a href='http://www.naver.com'></a></p></div></div></div>";
			const data = [];

			for (let i = 0; i < 100; i++) {
				if (isHTMLElement) {
					const dummy = document.createElement("div");

					dummy.innerHTML = complicatedHTML;
					data.push(dummy.firstChild);
				} else {
					data.push(complicatedHTML);
				}
			}
			return data;
		}

		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite'></div>";
			window.jQuery = $;
			this.inst = new InfiniteGrid("#infinite");
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});

		const testcase = {
			"stringType": function () {
				return makeData().join("");
			},
			"arrryStringType": function () {
				return makeData();
			},
			"arrryHTMLElementType": function () {
				return makeData(true);
			},
			"jQueryType": function () {
				return $(makeData());
			}
		};
		Object.keys(testcase).forEach(v => {
			it(`should check type - '${v}'`, done => {
				// Given

				const layoutCompleteHandler = sinon.spy(function (e) {
					// Then
					expect(e.target).to.have.lengthOf(100);
					expect(this.getItems(true)).to.have.lengthOf(100);
					expect(this._isProcessing()).to.be.false;
					done();
				});

				// When
				this.inst.on("layoutComplete", layoutCompleteHandler);
				this.inst.append(testcase[v]());
			});
		});
	});
	describe("Test size if display is none", function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = `<div id='infinite' style="width:100%"></div>`;
			this.inst = new InfiniteGrid("#infinite");
			this.inst.setLayout(GridLayout);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it("should check size if display is none", async () => {
			// Given
			await waitInsert(this.inst, true, 10, 1);
			const container = this.el.querySelector("#infinite");
			const html = container.innerHTML;
			const height = container.style.height;
			// When
			container.style.display = "none";
			this.inst.layout(true);

			// Then
			// no changes
			expect(container.innerHTML).to.be.equals(html);
			expect(container.style.height).to.be.equals(height);
		});
	});
});
