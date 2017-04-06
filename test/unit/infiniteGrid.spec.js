import InfiniteGrid from "../../src/infiniteGrid";
import {window} from "../../src/browser";
import {utils} from "../../src/utils";
import {Content} from "../content";

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


describe("InfiniteGrid append/prepend on layoutComplete Test", function() {
	beforeEach(() => {
		this.el = sandbox();
		this.el.innerHTML = `<ul id="nochildren_grid"></ul>`;
		this.inst = new InfiniteGrid("#nochildren_grid", {
			"count": 18,
		});
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
		cleanup();
	});

	it("should check a append method", done => {
        // Given
		const REPEAT = 10;
		let retry = 0;
		let appendedCount = 0;
		let totalCroppedCount = 0;
		let beforeTotalCroppedCount = 0;

		this.inst.on("layoutComplete", e => {
			// Then
			const itemCount = this.inst.layoutManager.items.length;

			expect(e.isAppend).to.be.true;
			expect(e.distance).to.be.equal(0);
			expect(this.inst.el.children.length).to.be.equal(itemCount);
			if (this.inst.isRecycling()) {
				totalCroppedCount = appendedCount - itemCount;
				expect(itemCount).to.be.equal(this.inst.options.count); // a number of elements are always 18
				expect(e.croppedCount).to.be.equal(totalCroppedCount - beforeTotalCroppedCount); // check croppedCount
				beforeTotalCroppedCount = totalCroppedCount;
			} else {
				expect(appendedCount).to.be.equal(itemCount);
			}

			// When
			if (retry++ < REPEAT) {
				appendedCount += this.inst.append(Content.append());
			} else {
				done();
			}
		});

		// When
		appendedCount += this.inst.append(Content.append());
    });

	it("should check a append method with groupkey", done => {
        // Given
		const REPEAT = 10;
		let retry = 0;
		let appendedCount = 0;
		let totalCroppedCount = 0;
		let beforeTotalCroppedCount = 0;
		let groupkey = 0;
		const group = {};

		function appendWithGroup(inst) {
			const count = inst.append(Content.append(), ++groupkey);

			appendedCount += count;
			group[groupkey] = count;
		}

		function getTotalCount(inst) {
			const groupKeys = inst.getGroupKeys();
			let total = 0;

			for (let i = groupKeys[0]; i <= groupKeys[groupKeys.length - 1]; i++) {
				total += group[i];
			}
			return total;
		}

		this.inst.on("layoutComplete", e => {
			// Then
			const itemCount = this.inst.layoutManager.items.length;

			expect(e.isAppend).to.be.true;
			expect(e.distance).to.be.equal(0);
			expect(this.inst.el.children.length).to.be.equal(itemCount);
			if (this.inst.isRecycling()) {
				totalCroppedCount = appendedCount - itemCount;
				expect(e.croppedCount).to.be.equal(totalCroppedCount - beforeTotalCroppedCount); // check croppedCount
				expect(itemCount).to.be.equal(getTotalCount(this.inst));
				beforeTotalCroppedCount = totalCroppedCount;
			} else {
				expect(appendedCount).to.be.equal(itemCount);
			}

			// When
			if (retry++ < REPEAT) {
				appendWithGroup(this.inst);
			} else {
				done();
			}
		});

		// When
		appendWithGroup(this.inst);
    });

	it("should check a prepend method", done => {
        // Given
		const REPEAT = 10;
		let retry = 0;
		let prependedCount = 0;

		this.inst.on("layoutComplete", e => {
			// Then
			const itemCount = this.inst.layoutManager.items.length;
			const beforeItemY = itemCount > e.target.length ? 
				this.inst.layoutManager.items[e.target.length].position.y : 0;

			expect(e.isAppend).to.be.false;
			expect(e.distance).to.be.equal(beforeItemY);
			if (this.inst.isRecycling()) {
				expect(itemCount).to.be.equal(18); // a number of elements are always 18
				expect(this.inst.el.children.length).to.be.equal(18); // a number of elements(DOM) are always 18
			} else {
				expect(prependedCount).to.be.equal(itemCount);
			}
			expect(this.inst.el.children.length).to.be.equal(itemCount);

			// When
			if (retry++ < REPEAT) {
				prependedCount += this.inst.prepend(Content.prepend());
			} else {
				done();
			}
		});

		// When
		prependedCount += this.inst.prepend(Content.prepend());
    });

	it("should check a prepend method with groupkey", done => {
        // Given
		const REPEAT = 10;
		let retry = 0;
		let prependedCount = 0;
		let totalCroppedCount = 0;
		let beforeTotalCroppedCount = 0;
		let groupkey = 0;
		const group = {};

		function prependWithGroup(inst) {
			const count = inst.prepend(Content.prepend(), ++groupkey);

			prependedCount += count;
			group[groupkey] = count;
		}

		function getTotalCount(inst) {
			const groupKeys = inst.getGroupKeys();
			let total = 0;

			for (let i = groupKeys[groupKeys.length - 1]; i <= groupKeys[0]; i++) {
				total += group[i];
			}
			return total;
		}

		this.inst.on("layoutComplete", e => {
			// Then
			const itemCount = this.inst.layoutManager.items.length;
			const beforeItemY = itemCount > e.target.length ?
				this.inst.layoutManager.items[e.target.length].position.y : 0;

			expect(e.isAppend).to.be.false;
			expect(e.distance).to.be.equal(beforeItemY);
			if (this.inst.isRecycling()) {
				totalCroppedCount = prependedCount - itemCount;
				expect(e.croppedCount).to.be.equal(totalCroppedCount - beforeTotalCroppedCount); // check croppedCount
				expect(itemCount).to.be.equal(getTotalCount(this.inst));
				beforeTotalCroppedCount = totalCroppedCount;
			} else {
				expect(prependedCount).to.be.equal(itemCount);
			}
			expect(this.inst.el.children.length).to.be.equal(itemCount);

			// When
			if (retry++ < REPEAT) {
				prependWithGroup(this.inst);
			} else {
				done();
			}
		});

		// When
		prependWithGroup(this.inst);
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
                window.scrollTo(0, 0);
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

describe("InfiniteGrid setStatus/getStatue Test", function() {
	beforeEach(() => {
		this.el = sandbox();
		this.el.innerHTML = `<ul id="grid"></ul>`;
		this.inst = new InfiniteGrid("#grid", {
			"count": 18,
		});
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
		cleanup();
	});

	it("should check object in restore method", () => {
		// Given
		const before = this.inst.getStatus();

		this.inst.setStatus({});

		// Then
		expect(this.inst.el.style.cssText).to.be.equal(before.cssText);
		expect(this.inst.el.innerHTML).to.be.equal(before.html);

		// When
		this.inst.setStatus();

		// Then
		expect(this.inst.el.style.cssText).to.be.equal(before.cssText);
		expect(this.inst.el.innerHTML).to.be.equal(before.html);
	});

	it("should check getStatus values", done => {
		this.inst.on("layoutComplete", function (e) {
			// Given
			// When
			const beforeStatus = this.getStatus();
			const beforeLayoutStatus = beforeStatus.layoutManager;

			// Then
			expect(beforeStatus.html).to.be.equal(this.el.innerHTML);
			expect(beforeStatus.cssText).to.be.equal(this.el.style.cssText);

			beforeLayoutStatus.items.forEach((v, i) => {
				expect(v.position).to.be.deep.equal(this.layoutManager.items[i].position);
				expect(v.size).to.be.deep.equal(this.layoutManager.items[i].size);
			});
			for (let v in beforeStatus.status) {
				expect(this._status[v]).to.be.equal(beforeStatus.status[v]);
			}
			done();
		});
		this.inst.append(Content.append(50));
	});

	it("should check restore status", done => {
		function parseCssText(str) {
			const ht = {};

			str.split(";").map(v => v.trim())
				.filter(v => !utils.isEmptyObject(v))
				.forEach(v => {
					const a = v.split(":");
					const val = a[1].trim();

					if (!utils.isEmptyObject(val)) {
						ht[a[0]] = a[1].trim();
					}
				});
			return ht;
		}

		this.inst.on("layoutComplete", function(e) {
			// Given
			const beforeStatus = this.getStatus();
			const beforeLayoutStatus = beforeStatus.layoutManager;

			this.destroy();
			const infinite = new InfiniteGrid("#grid", {
				"count": 18,
			});

			// When
			infinite.setStatus(beforeStatus);

			// Then (check infiniteGrid)
			expect(infinite.options).to.be.deep.equal(beforeStatus.options);
			for(let v in beforeStatus.prop) {
				expect(infinite._status[v]).to.be.equal(beforeStatus.prop[v]); // check infiniteGrid properties
			};
			expect(parseCssText(infinite.el.style.cssText)).to.be.deep.equal(parseCssText(beforeStatus.cssText));

			// Then (check layoutManager)
			for (let v in beforeLayoutStatus.prop) {
				expect(infinite.layoutManager[v]).to.be.deep.equal(beforeLayoutStatus.prop[v]); // check LayoutManager properties
			};			
			infinite.layoutManager.items.forEach((v, i) => {
				expect(v.position).to.be.deep.equal(beforeLayoutStatus.items[i].position); // check html and position information
				expect(v.size).to.be.deep.equal(beforeLayoutStatus.items[i].size); // check html and size information
				expect(v.position).to.be.deep.equal({
					"x": parseInt(v.el.style.left, 10),
					"y": parseInt(v.el.style.top, 10),
				});
			});
			done();
		});
		this.inst.append(Content.append(50));
	});
});
