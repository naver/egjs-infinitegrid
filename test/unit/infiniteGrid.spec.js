import InfiniteGrid from "../../src/infiniteGrid";
import {window} from "../../src/browser";
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

// describe("InfiniteGrid unit Test", function() {
// 	beforeEach(() => {
// 		this.inst = null;
// 		this.el = sandbox();
// 		this.el.innerHTML = `<ul id="grid">
// 			<li style="width:50%"><div>test</div></li>
// 			<li style="width:50%"><div>test</div></li>
// 			<li style="width:50%"><div>test</div></li>
// 			<li style="width:50%"><div>test</div></li>
// 			<li style="width:50%"><div>test</div></li>
// 			<li style="width:50%"><div>test</div></li>
// 		</ul>
// 		<ul id="nochildren_grid"></ul>`;
// 	});
// 	afterEach(() => {
// 		if (this.inst) {
// 			this.inst.destroy();
// 			this.inst = null;
// 		}
// 		cleanup();
// 	});

// 	it("should checka a clear after scrolling", () => {
// 	var done = assert.async();
// 	// Given
// 	// When
// 	var self = this;
// 	this.inst = new eg.InfiniteGrid("#grid");
// 	this.inst.on("layoutComplete",function(e) {
// 		// Then
// 		assert.equal(this.isProcessing(), false, "idel in layoutComplete");
// 		assert.equal(e.target.length, 6, "a number of elements are 6");
// 		assert.equal(this.items.length, 6, "a number of elements are 6");
// 		assert.equal(this.el.children.length, 6, "a number of DOM are 6");

// 		// When
// 		this.clear();

// 		assert.equal(this.items.length, 0, "a number of elements are 0");
// 		assert.equal(this.el.children.length, 0, "a number of DOM are 0");
// 		assert.equal(this._isRecycling, false, "_isRecycling is false");
// 		assert.equal(this._isProcessing, false, "_isProcessing is false");
// 		assert.equal(e.croppedCount, 0, "a number of removedContent are 0");
// 		self.fakeDoc.body.scrollTop = 100;
// 		$(window).trigger("scroll");
// 		setTimeout(function() {
// 			done();
// 		}, 100);
// 	});		
// 	});
// });

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
		this.inst = new eg.InfiniteGrid("#grid", {
			"count" : 18
		});
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
		cleanup();
	});

	it("should check object in restore method", function(assert) {
		// Given
		var before = this.inst.getStatus();
		this.inst.setStatus({});

		// Then
		assert.equal(this.inst.el.style.cssText, before.cssText, "check cssText");
		assert.equal(this.inst.el.innerHTML, before.html, "check html");

		// When
		this.inst.setStatus();

		// Then
		assert.equal(this.inst.el.style.cssText, before.cssText, "check cssText");
		assert.equal(this.inst.el.innerHTML, before.html, "check html");
	});

	// QUnit.test("restore status", function(assert) {
	// 	var done = assert.async();
	// 	var $el;
	// 	// Given
	// 	this.inst = new eg.InfiniteGrid("#grid", {
	// 		"count" : 18
	// 	});

	// 	// When
	// 	this.inst.on("layoutComplete",function(e) {
	// 		var parseCssText = function(str) {
	// 			var ht = {};
	// 			var $styles = $(str.split(";"));
	// 			$styles = $styles.map(function(i,v) {
	// 			return $.trim(v);
	// 			}).filter(function(i,v) {
	// 				return !$.isEmptyObject(v);
	// 			}).each(function(i,v) {
	// 			var a =v.split(":");
	// 			var val = $.trim(a[1]);
	// 			if(!$.isEmptyObject(val)) {
	// 				ht[a[0]] = $.trim(a[1]);
	// 			}
	// 			});
	// 			return ht;
	// 		};
	// 		var beforeStatus = this.getStatus();
	// 		// Then
	// 		assert.equal(beforeStatus.html, this.$el.html(), "check html");
	// 		assert.equal(beforeStatus.cssText, this.el.style.cssText, "check cssText");
	// 		var self = this;
	// 		beforeStatus.items.forEach( function(v,i) {
	// 			assert.deepEqual(v.position, self.items[i].position, "check html and position information");
	// 			assert.deepEqual(v.size, self.items[i].size,"check html and size information");
	// 		});
	// 		for(var v in beforeStatus.prop) {
	// 			assert.equal(this[v], beforeStatus.prop[v], "check infiniteGrid properties " + v);
	// 		};

	// 		// Given
	// 		this.destroy();
	// 		var infinite = new eg.InfiniteGrid("#grid", {
	// 			"count" : 18
	// 		});

	// 		// When
	// 		infinite.setStatus(beforeStatus);

	// 		// Then
	// 		assert.deepEqual(parseCssText(infinite.el.style.cssText), parseCssText(beforeStatus.cssText), "check cssText");
	// 		infinite.items.forEach( function(v,i) {
	// 			assert.deepEqual(v.position, beforeStatus.items[i].position, "check html and position information");
	// 			assert.deepEqual(v.size, beforeStatus.items[i].size,"check html and size information");
	// 			$el = $(v.el);
	// 			assert.deepEqual(v.position, {
	// 				"x" : parseInt(v.el.style.left, 10),
	// 				"y" : parseInt(v.el.style.top, 10)
	// 			}, "check html and position information-3");
	// 		});
	// 		assert.deepEqual(infinite.options, beforeStatus.options, "check options info");
	// 		for(var v in beforeStatus.prop) {
	// 			assert.equal(infinite[v], beforeStatus.prop[v], "check infiniteGrid properties " + v);
	// 		};
	// 		// infinite.destroy();
	// 		done();
	// 	});

	// 	// Then
	// 	this.inst.append(getContent("append",50));
	// });
});
