import DOMRenderer from "../../src/DOMRenderer";
import {getItems} from "./helper/TestHelper";
/* eslint-disable */

describe("DOMRender Test", function() {
	describe("updateSize method", function() {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = getItems(10).join("");
			this.items = Array.from(this.el.children).map(el => ({el}));
			this.inst = new DOMRenderer(this.el);
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});
		it(`should equal size updated when 'isEqualSize' option is true`, () => {
			// Given
			this.inst.options.isEqualSize = true;
			expect(this.items.every(v => !v.size)).to.be.true;
			expect(this.items.every(v => !v.orgSize)).to.be.true;

			// When
			const items = this.inst.updateSize(this.items);

			// Then
			const baseSize = items[0].size;

			expect(items.every(v => v.size.height == baseSize.height && v.size.width == baseSize.width)).to.be.true;
			expect(items.every(v => v.orgSize)).to.be.true;
		});
		it(`should equal size updated when 'isEqualSize' option is false`, () => {
			// Given
			this.inst.options.isEqualSize = false;
			expect(this.items.every(v => !v.size)).to.be.true;
			expect(this.items.every(v => !v.orgSize)).to.be.true;

			// When
			const items = this.inst.updateSize(this.items);

			// Then
			const baseSize = items[0].size;

			expect(items.every(v => v.size.height == baseSize.height && v.size.width == baseSize.width)).to.be.false;
			expect(items.every(v => v.orgSize)).to.be.true;
		});
		it(`should equal size updated when 'renderItems'`, () => {
			// Given
			this.inst.options.isEqualSize = false;
			expect(this.items.every(v => !v.size)).to.be.true;
			expect(this.items.every(v => !v.orgSize)).to.be.true;

			// When
			const items = this.inst.updateSize(this.items);
			items.forEach((item, i) => {
				item.rect = {
					left: i,
					top: i,
				}
			});
			DOMRenderer.renderItems(items);
			// Then
			const baseSize = items[0].size;

			expect(items.every(({el, rect}) => el.style.left === `${rect.left}px`)).to.be.true;
			expect(items.every(v => v.size.height == baseSize.height && v.size.width == baseSize.width)).to.be.false;
			expect(items.every(v => v.orgSize)).to.be.true;
		});
		it(`should equal size updated when 'renderItems' with transition`, (done) => {
			// Given
			this.inst.options.isEqualSize = false;
			expect(this.items.every(v => !v.size)).to.be.true;
			expect(this.items.every(v => !v.orgSize)).to.be.true;

			// When
			const items = this.inst.updateSize(this.items);
			items.forEach((item, i) => {
				item.rect = {
					left: i + 1,
					top: i,
				}
			});
			DOMRenderer.renderItems(items, 1);
			// Then
			expect(items.every(({el, rect, renderRect}) => el.style.left === `${rect.left}px` && rect.left === renderRect.left)).to.be.true;
			items.forEach((item, i) => {
				item.rect = {
					left: (i + 1) * 100,
					top: i * 100,
				}
			});
			// When
			DOMRenderer.renderItems(items, 0.3);

			// Then
			expect(items.every(({el, rect, renderRect}) => el.style.left === `${renderRect.left}px` && rect.left !== renderRect.left)).to.be.true;

			DOMRenderer.renderItems(items, 0.3);
			expect(items.every(({el, rect, renderRect}) => el.style.left === `${renderRect.left}px` && rect.left !== renderRect.left)).to.be.true;
			setTimeout(() => {
				expect(items.every(({el, rect, renderRect}) => el.style.left === `${rect.left}px` && rect.left === renderRect.left)).to.be.true;
				done();
			}, 400);
		});
	});
});
