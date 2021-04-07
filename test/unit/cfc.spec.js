import InfiniteGrid, { GridLayout, withInfiniteGridMethods } from "../../src";
import { wait } from "./helper/TestHelper";
import { DUMMY_POSITION, CONTAINER_CLASSNAME } from "../../src/consts";


/* eslint-disable */
describe("InfiniteGrid CFC Test", function () {
	beforeEach(() => {
		this.el = sandbox();
		this.el.innerHTML = "<div id='infinite'></div>";
		this.container = this.el.querySelector("#infinite");
	});
	this.afterEach(() => {
		if (this.ig) {
			this.ig.destroy();
		}
		cleanup();
	});
	it("can initialize with the prepared(given) container element", async () => {
		// Given
		this.container.innerHTML = `<div class="${CONTAINER_CLASSNAME}"></div>`;
		const container = this.container.children[0];

		// When
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
			isOverflowScroll: true,
		});

		// Then
		expect(this.ig._renderer.container).to.be.equals(container);
	});
	it("can render children correctly", async () => {
		// Given
		this.container.innerHTML = "<div>1</div><div>2</div><div>3</div>";
		const children = [].slice.call(this.container.children);
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
		});
		const ig = this.ig;

		ig.setLayout(GridLayout);
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);
		// When
		// When rendering children, do not initially set the position.
		ig.layout(true);

		// Then
		expect(children.length).to.be.equals(3);
		expect(children[0].style.top).to.be.not.ok;

		await wait();
		expect(children[0].style.top).to.be.ok;
	});
	it("can render when there're no child elements", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = "<div>1</div><div>2</div><div>3</div>";
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
		}).on("render", render);

		const ig = this.ig;
		ig.setLayout(GridLayout);

		// When
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);

		// If there are no children, request render.
		ig.layout(true);

		// render => _renderComplete => render => _layoutComplete => layoutComplete
		// Then
		expect(render.callCount).to.be.equals(1);
		expect(children.length).to.be.equals(3);
		expect(parseFloat(children[0].style.top)).to.be.equals(DUMMY_POSITION);

		await wait();
		expect(render.callCount).to.be.equals(2);
		expect(children.length).to.be.equals(3);
		expect(children[0].style.top).to.be.equals("0px");
	});
	it("can prepend items", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = "<div>1</div><div>2</div><div>3</div>";
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		const prependRender = sinon.spy(e => {
			if (children.length === 3) {
				// 1 2 3 // 4 5 6
				this.container.insertAdjacentHTML("beforeend", "<div>4</div><div>5</div><div>6</div>");
				children = [].slice.call(this.container.children);
			} else if (!this.ig._requestGroups.length) {
				this.container.appendChild(children[0]);
				this.container.appendChild(children[1]);
				this.container.appendChild(children[2]);
				// 1 2 3 // 4 5 6 => 4 5 6 // 1 2 3
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		const layoutComplete = sinon.spy();
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
		})
			.on("render", render)
			.on("layoutComplete", layoutComplete);

		const ig = this.ig;
		ig.setLayout(GridLayout);

		// When
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);

		// If there are no children, request render.
		ig.layout(true);

		await wait();
		this.ig.off("render");
		this.ig.on("render", prependRender);
		ig.beforeSync([
			{ groupKey: 0, itemKey: 4 },
			{ groupKey: 0, itemKey: 5 },
			{ groupKey: 0, itemKey: 6 },
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);
		ig._infinite.scroll(0);
		await wait();


		// render => _renderComplete => render => _layoutComplete => layoutComplete
		// => prepend => render => _renderComplete => render => _layoutComplete => layoutComplete
		// Then

		expect(render.callCount).to.be.equals(2);
		expect(prependRender.callCount).to.be.equals(2);
		expect(layoutComplete.callCount).to.be.equals(2);
		expect(children.length).to.be.equals(6);
	});
	it("should check if the line is the same but is rendered when the order of items is changed", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = `<div style="width: 100%; height: 40px;">1</div><div style="width: 100%; height: 40px;">2</div><div style="width: 100%; height: 40px;">3</div>`;
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		const layoutComplete = sinon.spy();
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
		})
			.on("render", render)
			.on("layoutComplete", layoutComplete);

		const ig = this.ig;
		ig.setLayout(GridLayout);

		// When
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);

		// If there are no children, request render.
		ig.layout(true);

		await wait();
		this.ig.off("render");
		this.ig.on("render", e => {
			if (children.length === 3) {
				// 1 2 3 // 4 5 6
				this.container.insertAdjacentHTML("beforeend", `<div style="width: 100%; height: 40px;">4</div><div style="width: 100%; height: 40px;">5</div><div style="width: 100%; height: 40px;">6</div>`);
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
			{ groupKey: 2, itemKey: 4 },
			{ groupKey: 2, itemKey: 5 },
			{ groupKey: 2, itemKey: 6 },
		]);
		ig._infinite.scroll(100);
		await wait();

		// 1 2 3 // 4 6 5
		const result = ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
			{ groupKey: 2, itemKey: 4 },
			{ groupKey: 2, itemKey: 6 },
			{ groupKey: 2, itemKey: 5 },
		]);
		// 1 2 3 // 4 6 5
		this.container.insertBefore(children[5], children[4]);
		children = [].slice.call(this.container.children);

		ig.sync(children);
		ig.layout();

		await wait();


		expect(result).to.be.equals("layout");

		children.forEach((child, i) => {
			expect(child.style.top).to.be.equals(`${i * 40}px`);
		});
	});
	it("should check if the line is the same but is rendered when item is added, but outline is the same.", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = `<div style="width: 100%; height: 40px;">1</div><div style="width: 100%; height: 40px;">2</div><div style="width: 100%; height: 40px;">3</div>`;
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		const layoutComplete = sinon.spy();
		this.ig = new InfiniteGrid("#infinite", {
			renderExternal: true,
		})
			.on("render", render)
			.on("layoutComplete", layoutComplete);

		const ig = this.ig;
		ig.setLayout(GridLayout);

		// When
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
		]);

		// If there are no children, request render.
		ig.layout(true);

		await wait();
		this.ig.off("render");
		this.ig.on("render", e => {
			if (children.length === 3) {
				// 1 2 3 // 4 5 6
				this.container.insertAdjacentHTML("beforeend", `<div style="width: 100%; height: 40px;">4</div><div style="width: 100%; height: 40px;">5</div><div style="width: 100%; height: 40px;">6</div>`);
				children = [].slice.call(this.container.children);
			}
			ig.sync(children);
			e.next();
		});
		ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
			{ groupKey: 2, itemKey: 4 },
			{ groupKey: 2, itemKey: 5 },
			{ groupKey: 2, itemKey: 6 },
		]);
		ig._infinite.scroll(100);
		await wait();

		// 1 2 3 // 6 5 7
		const result = ig.beforeSync([
			{ groupKey: 1, itemKey: 1 },
			{ groupKey: 1, itemKey: 2 },
			{ groupKey: 1, itemKey: 3 },
			{ groupKey: 2, itemKey: 6 },
			{ groupKey: 2, itemKey: 5 },
			{ groupKey: 2, itemKey: 7 },
		]);
		// 1 2 3 // 4 6 5
		this.container.insertBefore(children[5], children[4]);
		// 1 2 3 // 6 5
		this.container.removeChild(children[3]);
		// 1 2 3 // 6 5 7
		this.container.insertAdjacentHTML("beforeend", `<div style="width: 100%; height: 40px;">7</div>`);
		children = [].slice.call(this.container.children);

		ig.sync(children);

		await wait();


		expect(result).to.be.equals("");

		children.forEach((child, i) => {
			expect(child.style.top).to.be.equals(`${i * 40}px`);
		});
	});
	describe("test beforeSync method", function () {
		beforeEach(() => {
			this.ig = new InfiniteGrid("#infinite", {
				renderExternal: true,
			});
		});
		it("can sync reversed list", () => {
			const ig = this.ig;
			// Given
			ig.beforeSync([
				{ groupKey: 1, itemKey: 1 },
				{ groupKey: 2, itemKey: 2 },
			]);
			ig._infinite.setCursor("end", 1);
			ig._infinite.setCursor("start", 0);

			// When
			ig.beforeSync([
				{ groupKey: 2, itemKey: 2 },
				{ groupKey: 1, itemKey: 1 },
			]);

			// Then
			expect(ig._infinite.getCursors()).to.be.deep.equals([0, 1]);
		});
		it("should check if rendering is possible even if the order of items is changed", () => {
			const ig = this.ig;
			// Given
			ig.beforeSync([
				{ groupKey: 1, itemKey: 1 },
				{ groupKey: 1, itemKey: 2 },
				{ groupKey: 1, itemKey: 3 },
			]);
			ig._infinite.setCursor("end", 0);
			ig._infinite.setCursor("start", 0);

			// When
			// added
			const result = ig.beforeSync([
				{ groupKey: 1, itemKey: 1 },
				{ groupKey: 1, itemKey: 3 },
				{ groupKey: 1, itemKey: 2 },
			]);

			// Then
			expect(result).to.be.equals("layout");
		});
		it("can sync list with intermediate inserted data", () => {
			const ig = this.ig;
			// Given
			ig.beforeSync([
				{ groupKey: 1, itemKey: 1 },
				{ groupKey: 2, itemKey: 2 },
			]);
			ig._infinite.setCursor("end", 1);
			ig._infinite.setCursor("start", 0);

			// When
			// added
			const result = ig.beforeSync([
				{ groupKey: 1, itemKey: 1 },
				{ groupKey: 3, itemKey: 3 },
				{ groupKey: 2, itemKey: 2 },
			]);

			// Then
			expect(result).to.be.equals("");
			expect(ig._infinite.getCursors()).to.be.deep.equals([0, 2]);
		});
		[0, 1, 2].forEach(index => {
			it(`can sync list with removed data (remove: ${index})`, () => {
				const ig = this.ig;
				// Given
				const list = [
					{ groupKey: 1, itemKey: 1 },
					{ groupKey: 2, itemKey: 2 },
					{ groupKey: 3, itemKey: 3 },
				];
				ig.beforeSync(list);
				ig._infinite.setCursor("end", 2);
				ig._infinite.setCursor("start", 0);

				// When
				list.splice(index, 1);

				// group removed layout
				const result = ig.beforeSync(list);


				// Then
				expect(result).to.be.equals("relayout");
				expect(ig._infinite.getCursors()).to.be.deep.equals([0, 1]);
			});
		});
	});
});
