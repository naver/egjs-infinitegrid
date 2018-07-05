
import {ItemManager, LayoutManger, DOMRenderer, GridLayout} from "../../src/index";
import {$} from "../../src/utils";
import {makeGroup, wait} from "./helper/TestHelper";
/* eslint-disable */

describe("LayoutManger Test", function () {
	describe("should check append test with LayoutManger", function () {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = "<div id='infinite' style='width: 400px;'></div>";
			this.container = this.el.querySelector("#infinite");
			this._items = new ItemManager();
			this.inst = new LayoutManger(this._items, new DOMRenderer(this.container), {});
			this.inst.setLayout(new GridLayout());
			this.inst.setSize(400);
			
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
		});
		it(`should check append images`, async() => {
			// Given
			let isError = false;
			const group = makeGroup(`<img src="/base/test/unit/image/3.jpg" />`, true, "key1");
			const items = group.items;
			this._items.append(group);

			// When
			await new Promise(resolve => {
				this.inst.append({groups: [group], items}, {
					complete: () => {

					},
					error: () => {
						isError = true;
					},
					end: () => {
						resolve();
					}
				});
			});

			// Then
			expect(isError).to.be.false;
			expect(group.outlines.start.length).to.be.not.equals(0);
			expect(group.items[0].rect).to.be.deep.equals({top: 0, left: 0});
		});
		it(`should check append image with error and data-prefix`, async() => {
			// GIven
			let isError = false;
			const imgs = $(`<img src="http://naver.com/1" style="width: 100%;" data-width="400" data-height="400"/>`, true);
			imgs.forEach(img => this.container.appendChild(img));

			const group = makeGroup(imgs, true, "key1");
			const items = group.items;
			this._items.append(group);

			// When
			let afterError = false;

			await new Promise(resolve => {
				this.inst.append({groups: [group], items}, {
					complete: () => {
						afterError = isError;
					},
					error: () => {
						isError = true;
					},
					end: () => {
						resolve();	
					}
				});
			});

			await wait();

			// Then
			expect(afterError).to.be.false;
			expect(isError).to.be.true;
			expect(group.outlines.start.length).to.be.not.equals(0);
			expect(group.items[0].size).to.be.deep.equals({width: 400, height: 400});
		});
		it(`should check append image with error and data-prefix and replace`, async() => {
			// GIven
			let isError = false;
			const imgs = $(`<img src="http://naver.com/1" style="width: 100%;" data-width="400" data-height="400"/>`, true);
			imgs.forEach(img => this.container.appendChild(img));

			const group = makeGroup(imgs, true, "key1");
			const items = group.items;
			this._items.append(group);

			// When
			await new Promise(resolve => {
				this.inst.append({groups: [group], items}, {
					error: e => {
						e.replace("http://naver.com/2");
					},
					end: () => {
						resolve();	
					}
				});
			});

			// Then
			expect(items[0].content).to.have.string("http://naver.com/2");
		});
		it(`should check append image after destory`, async () => {
			// GIven
			const imgs = $(`<img src="1" style="width: 100%;" data-width="400" data-height="400"/>`, true);
			imgs.forEach(img => this.container.appendChild(img));

			const group = makeGroup(imgs, true, "key1");
			const items = group.items;
			this._items.append(group);

			// When
			let isComplete = false;

			this.inst.append({groups: [group], items}, {
				complete: () => {
					isComplete = true;
				},
				error: () => {
					isComplete = true;
				},
				end: () => {
					isComplete = true;
				}
			});
			this.inst.destroy();

			await wait();

			expect(isComplete).to.be.equals(false);
		});
	});
});
