import InfiniteGrid from "../../src/infiniteGrid.js";
import {Content} from "../content.js";
import $ from "jquery";

describe("InfiniteGrid initailization/destroy Test", function() {
	beforeEach(() => {
		this.inst = null;
		this.el = sandbox();
		this.el.innerHTML = `<ul id="grid">
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
		</ul>
		<ul id="nochildren_grid"></ul>`;
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
		cleanup();
	});

	it("should check a initialization (there aren't children)", () => {
		// Given
		const layoutCompleteHandler = sinon.spy();

		// When
		this.inst = new InfiniteGrid("#nochildren_grid")
			.on("layoutComplete", layoutCompleteHandler);

		// Then
		expect(this.inst.isProcessing()).to.be.false;
		expect(layoutCompleteHandler.calledOnce).to.be.false;
		layoutCompleteHandler.reset();
	});

	it("should check a initialization (there are children)", done => {
		// Given
		// When
		this.inst = new InfiniteGrid("#grid");
		this.inst.on("layoutComplete", function(e) {
			// Then
			expect(e.target.length).to.be.equal(6);
			expect(this.layoutManager.items.length).to.be.equal(6);
			expect(this.isProcessing()).to.be.false;
			expect(this.el.style.width).to.be.equal("");
			done();
		});
		// Then
		expect(this.inst.isProcessing()).to.be.true;
	});

	it("should check a append after a initialization (there aren't children)", done => {
		// Given
		let appendedCount = 0;
		const elements = Content.append();

		this.inst = new InfiniteGrid("#nochildren_grid")
			.on("layoutComplete", function(e) {
				// Then
				expect(e.target.length).to.be.equal(elements.length);
				expect(this.layoutManager.items.length).to.be.equal(e.target.length);
				expect(this.isProcessing()).to.be.false;
				expect(this.el.style.width).to.be.equal("");
				done();
			});

		// When
		expect(this.inst.isProcessing()).to.be.false;
		appendedCount = this.inst.append(elements);

		// Then
		expect(elements.length).to.be.equal(appendedCount);
	});
});


describe("InfiniteGrid workaround Test", function() {
	beforeEach(() => {
		this.inst = null;
		this.el = sandbox();
		this.el.innerHTML = `<ul id="nochildren_grid"></ul>`;
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
		cleanup();
	});

	it("should check a prepend workaround code (doublecheck)", done => {
        // Given
        const prependHandler = sinon.spy();

        this.inst = new InfiniteGrid("#nochildren_grid", {
			"count" : 18
		}).on({
            "prepend": prependHandler,
            "layoutComplete": e => {
                // Then
                expect(e.isAppend).to.be.false;
                $(window).scrollTop(0);
                expect(prependHandler.callCount).to.be.equal(0);
            }
        });

        // When
        this.inst.prepend(Content.prepend(200));

        setTimeout(() => {
            // Then
            expect(prependHandler.callCount).to.be.equal(3);
            prependHandler.reset();
            done();
        }, 2000);
    });
});
