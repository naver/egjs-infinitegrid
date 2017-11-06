/* global describe, beforeEach, afterEach, it, expect */
import {makeItems, VIEWPORT} from "./helper/data";
import Parallax from "../../src/Parallax";

function getItem({top = window.innerHeight, left = 0, width = 100, height = 400}) {
	const el = document.createElement("div");

	el.style.cssText = `positiohn:absolute;left:${left}px;top:${top}px;width:${width}px;height:${height}px;`;

	const img = document.createElement("div");

	img.className = "img";
	img.style.cssText = `positiohn:absolute;width: ${width * 3}px; height: ${height * 3}px;`;
	el.appendChild(img);

	const item = {
		el,
		size: {
			width,
			height,
		},
		rect: {
			top,
			left,
		},
	};

	return item;
}
function createContainer() {
	const container = document.createElement("div");

	container.style.cssText = "position:absolute; top: 0; width: 100%;height: 300%;";

	return container;
}
describe("Parallax Test", function () {
	describe("scroll test", function () {
		before(() => {
			this.parallax = new Parallax(window, {
				selector: ".img",
			});
			this.container = createContainer();
			this.items = [getItem({})];
			
			document.body.appendChild(this.container);
			this.items.forEach(item => {
				this.container.appendChild(item.el);
			});
			this.parallax.resize();
		});	
		after(() => {
			this.container.remove();
			this.items = null;
		});
		it("should check scroll above top", () => {
			// Given
			const item = this.items[0];
			
			// When
			this.parallax.refresh(this.items, window.innerHeight + item.size.height);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(1);
		});
		it("should check scroll below bottom", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, 0);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(-1);
		});
		it("should check scroll center", () => {
			// Given
			const item = this.items[0];
			this.parallax.resize();
			// When
			this.parallax.refresh(this.items, window.innerHeight / 2 + item.size.height / 2);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(0);
		});
	});
	describe("change range test", function() {
		before(() => {
			this.parallax = new Parallax(window, {
				selector: ".img",
				range: [-0.5, 0.5],
			});
			this.container = createContainer();
			this.items = [getItem({})];

			document.body.appendChild(this.container);
			this.items.forEach(item => {
				this.container.appendChild(item.el);
			});
			this.parallax.resize();
		});
		after(() => {
			this.container.remove();
			this.items = null;
		});	
		it("should check scroll above top", () => {
			// Given
			const item = this.items[0];

			// When
			this.parallax.refresh(this.items, window.innerHeight + item.size.height);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(0.5);
		});
		it("should check scroll below bottom", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, 0);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(-0.5);
		});
		it("should check scroll center", () => {
			// Given
			const item = this.items[0];
			this.parallax.resize();
			// When
			this.parallax.refresh(this.items, window.innerHeight / 2 + item.size.height / 2);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(0);
		});
	});
	describe("change center test", function () {
		before(() => {
			this.parallax = new Parallax(window, {
				selector: ".img",
				center: 0.2,
			});
			this.container = createContainer();
			this.items = [getItem({})];

			document.body.appendChild(this.container);
			this.items.forEach(item => {
				this.container.appendChild(item.el);
			});
			this.parallax.resize();
		});
		after(() => {
			this.container.remove();
			this.items = null;
		});
		it("should check scroll above top", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, window.innerHeight + item.size.height);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(0.8);
		});
		it("should check scroll below bottom", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, (window.innerHeight + item.size.height) / 2  * 0.2);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(-1);
		});
		it("should check scroll below bottom", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, 0);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(-1);
		});
		it("should check scroll center", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, window.innerHeight / 2 + item.size.height / 2);
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(-0.2);
		});
		it("should check scroll center", () => {
			// Given
			const item = this.items[0];
			// When
			this.parallax.refresh(this.items, (window.innerHeight + item.size.height) * 1/2 * (1 + 0.2));
			// Then
			expect(item.el.__IMAGE__.__RATIO__).to.be.equal(0);
		});
	});
});
