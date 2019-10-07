import InfiniteGrid, { GridLayout } from "../../src";
import { wait } from "./helper/TestHelper";
import { DUMMY_POSITION } from "../../src/consts";


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
	})
	it("should check render children", async () => {
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
	it("should check render no children", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = "<div>1</div><div>2</div><div>3</div>";
				children = [].slice.call(this.container.children);
			}
			ig.sync(children, e.requestGroups);
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
	it("should check prepend items", async () => {
		// Given
		let children = [];
		const render = sinon.spy(e => {
			if (!children.length) {
				this.container.innerHTML = "<div>1</div><div>2</div><div>3</div>";
				children = [].slice.call(this.container.children);
			}
			ig.sync(children, e.requestGroups);
			e.next();
		});
		const prependRender = sinon.spy(e => {
			if (children.length === 3) {
				// 1 2 3 // 4 5 6
				this.container.insertAdjacentHTML("beforeend", "<div>4</div><div>5</div><div>6</div>");
				children = [].slice.call(this.container.children);
			} else if (!e.requestGroups.length) {
				this.container.appendChild(children[0]);
				this.container.appendChild(children[1]);
				this.container.appendChild(children[2]);
				// 1 2 3 // 4 5 6 => 4 5 6 // 1 2 3
				children = [].slice.call(this.container.children);
			}
			ig.sync(children, e.requestGroups);
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
});
