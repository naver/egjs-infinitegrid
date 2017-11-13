import $ from "jquery";
import InfiniteGridInjector from "inject-loader!../../src/InfiniteGrid";
import InfiniteGrid from "../../src/InfiniteGrid";
import {window} from "../../src/browser";
import {utils} from "../../src/utils";
import {CONTAINER_CLASSNAME} from "../../src/consts";
import {Content} from "../content";
import {compareStatus, checkGetStatus} from "./TestHelper";


describe("InfiniteGrid Test", function() {
		it("should check a count of remove contents", done => {
			// Given
			// When
			// Then
			expect(this.inst.isRecycling()).to.be.false;

			//When
			this.inst.once("layoutComplete",function(e) {
				// Then
				expect(this.layoutManager.items.length).to.be.equal(18);
				expect(e.croppedCount).to.be.equal(188);

				// When
				this.on("layoutComplete", function(e) {
					// Then
					expect(this.layoutManager.items.length).to.be.equal(18);
					expect(this.el.children.length).to.be.equal(18);
					expect(e.croppedCount).to.be.equal(200);
					done();
				});
				this.prepend(Content.prepend(200));
			});
			this.inst.append(Content.append(206));
		});
		
		it("should check item/element order and check removed parts", done => {
			function getUniqueX(target) {
				var temp = {};
				target.map(v => v.position.x)
					.forEach(v => {
						if (!(v in temp)) {
							temp[v] = v;
						} 
					});
				
				var ret = [];
				for(var p in temp) {
					ret.push(p);
				}
				return ret;
			}

			function getGroups(target) {
				var x = getUniqueX(target);
				var group = {};
				x.forEach(v => {
					group[v] = target.filter(gv => gv.position.x === ~~v)
						.sort((p, c) => p.position.y - c.position.y);
				});
				return group;
			}

			//When
			this.inst.once("layoutComplete", function(e) {
				this.on("layoutComplete", function(e) {
					// Then
					Array.prototype.slice.call(this.el.children).slice(0, e.target.length).forEach((v, i) => {
						expect(~~v.getAttribute("prepend-index")).to.be.equal(i); // check order
					});
					const groups = getGroups(e.target);

					for (let p in groups) {
						groups[p].forEach((v, i) => {
							if (i > 0) {
								expect(v.position.y >=  groups[p][i-1].position.y).to.be.true; // it's greater than or equal to previous value
								expect(~~v.el.getAttribute("prepend-index") >= ~~groups[p][i-1].el.getAttribute("prepend-index")).to.be.true; // it's greater than or equal to previous value
							}
						});
					}
					done();
				});

				// When
				const prependElement = Content.prepend(20);
				prependElement.forEach((v, i) => {
					v.setAttribute("prepend-index", i);
				});
				this.prepend(prependElement);
			});
			this.inst.append(Content.append(30));
		});
	});

	describe("workaround Test", function() {
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
			document.body.style.height = '10000px'; // for Scroll

			this.inst = new InfiniteGrid("#nochildren_grid", {
				"count" : 18
			}).on({
				"prepend": prependHandler,
				"layoutComplete": e => {
						// Then
						expect(e.isAppend).to.be.false;
						window.scrollTo(0,0);
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
		it("should check isOverflowScroll value when android 2.x", () => {
			// Given
			const MockInfiniteGrid = InfiniteGridInjector({
				"./consts": {
						"IS_ANDROID2": true
				}
			});
			this.inst = new MockInfiniteGrid("#nochildren_grid", {
				"isOverflowScroll": true
			});

			// Then
			expect(this.inst.options.isOverflowScroll).to.be.false;
			expect(this.inst.el).to.be.eql(utils.$("#nochildren_grid"));
			expect(this.inst.view).to.be.equal(window);
		});	
	});

	describe("setStatus/getStatue Test", function() {
		beforeEach(() => {
			document.body.style.height = "10000px"; // for Scroll
			window.scrollTo(0, 0);
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
			const data = {
				options: {},
				prop: {},
				layoutManager: {},
				html: "setStatus",
				cssText: "setStatus",
			};
			this.inst.setStatus(data);

			// Then (scrollPos is needed)
			expect(this.inst.el.style.cssText).to.be.equal(before.cssText);
			expect(this.inst.el.style.cssText).to.be.not.equal(data.cssText);
			expect(this.inst.el.innerHTML).to.be.equal(before.html);
			expect(this.inst.el.innerHTML).to.be.not.equal(data.html);

			// When
			this.inst.setStatus();

			// Then
			expect(this.inst.el.style.cssText).to.be.equal(before.cssText);
			expect(this.inst.el.innerHTML).to.be.equal(before.html);
		});

		it("should check getStatus values", done => {
			// Given
			const toScroll = 300;

			this.inst.on("layoutComplete", function(e) {
				// Given
				// When
				checkGetStatus(this, this.getStatus());
				done();
			});
			window.scrollTo(0, toScroll);
			this.inst.append(Content.append(50));
		});

		it("should check restore status", done => {
			this.inst.on("layoutComplete", function(e) {
				// Given
				const beforeScrollPos = 300;
				// When
				window.scrollTo(0, beforeScrollPos);
				// Then 
				expect(utils.scrollTop(window)).to.be.equal(beforeScrollPos);

				const beforeStatus = this.getStatus();
				
				window.scrollTo(0, 0);
				this.destroy();

				const infinite = new InfiniteGrid("#grid", {
					"count": 18,
				});

				// When
				infinite.setStatus(beforeStatus);

				// Then
				compareStatus(infinite, beforeStatus, beforeScrollPos);
				expect(utils.scrollTop(window)).to.be.equal(0);
				done();
			});
			this.inst.append(Content.append(50));
		});

		it("should check restore status (apply scroll position)", done => {
			this.inst.on("layoutComplete", function(e) {
				// Given
				const beforeScrollPos = 300;
				// When
				window.scrollTo(0, beforeScrollPos);
				// Then 
				expect(utils.scrollTop(window)).to.be.equal(beforeScrollPos);

				const beforeStatus = this.getStatus();
				const beforeLayoutStatus = beforeStatus.layoutManager;
				window.scrollTo(0, 0);
				this.destroy();
				const infinite = new InfiniteGrid("#grid", {
					"count": 18,
				});

				// When
				infinite.setStatus(beforeStatus, true);

				// Then
				compareStatus(infinite, beforeStatus, beforeScrollPos);
				expect(utils.scrollTop(window)).to.be.equal(beforeScrollPos);				
				done();
			});
			this.inst.append(Content.append(50));
		});
	});

	describe("setStatus/getStatue Test (isOverflowScroll: true)", function() {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = `<ul id="grid"></ul>`;
			this.inst = new InfiniteGrid("#grid", {
				"count": 18,
				"isOverflowScroll": true,
			});
			this.inst.el.style.height = "10000px";
			this.inst.view.style.height = "50px";
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});

		it("should check getStatus values", done => {
			// Given
			const toScroll = 100;

			this.inst.on("layoutComplete", function(e) {
				// Given
				// When
				checkGetStatus(this, this.getStatus());
				done();
			});
			utils.scrollTo(this.inst.view, 0, toScroll);
			this.inst.append(Content.append(50));
		});

		it("should check restore status", done => {
			this.inst.on("layoutComplete", function(e) {
				// Given
				const beforeScrollPos = 100;
				// When
				utils.scrollTo(this.view, 0, beforeScrollPos);
				// Then 
				expect(utils.scrollTop(this.view)).to.be.equal(beforeScrollPos);

				const beforeStatus = this.getStatus();
				
				utils.scrollTo(this.view, 0, 0);
				this.destroy();

				const infinite = new InfiniteGrid("#grid", {
					"count": 18,
					"isOverflowScroll": true,
				});
				// infinite.el.style.height = "10000px";
				// infinite.view.style.height = "50px";

				// When
				infinite.setStatus(beforeStatus);

				// Then
				compareStatus(infinite, beforeStatus, beforeScrollPos);
				expect(utils.scrollTop(infinite.view)).to.be.equal(0);
				done();
			});
			this.inst.append(Content.append(50));
		});

		it("should check restore status (apply scroll position)", done => {
			this.inst.on("layoutComplete", function(e) {
				// Given
				const beforeScrollPos = 100;
				// When
				utils.scrollTo(this.view, 0, beforeScrollPos);
				// Then 
				expect(utils.scrollTop(this.view)).to.be.equal(beforeScrollPos);

				const beforeStatus = this.getStatus();
				
				utils.scrollTo(this.view, 0, 0);
				this.destroy();

				const infinite = new InfiniteGrid("#grid", {
					"count": 18,
					"isOverflowScroll": true,
				});
				
				// When
				infinite.setStatus(beforeStatus, true);

				// Then
				compareStatus(infinite, beforeStatus, beforeScrollPos);
				expect(utils.scrollTop(infinite.view)).to.be.equal(beforeScrollPos);
				done();
			});
			this.inst.append(Content.append(50));
		});
	});

	describe("layout(false) Test", function() {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = `<ul id="grid"></ul>`;
			this.inst = new InfiniteGrid("#grid", {
				"count": 30,
			});
		});
		afterEach(() => {
			if (this.inst) {
				this.inst.destroy();
				this.inst = null;
			}
			cleanup();
		});

		it("should check a remove method", done => {
			function getItem(items, position) {
				return items.filter(v => v.position.x === position.x && v.position.y === position.y);
			}

			// Given
			let beforePrependCols = null;
			let beforePosition = null;

			// Given
			// When
			this.inst.on("layoutComplete", function(e) {
				// prependCols values are zero
				this.layoutManager.prependCols.forEach(v => expect(v).to.be.equal(0));

				this.off();
				this.on("layoutComplete", function(e) {
					// Given
					beforePrependCols = [...this.layoutManager.prependCols];
					// prependCols values aren't zero
					this.layoutManager.prependCols.forEach(v => expect(v).to.be.not.equal(0));

					beforePosition = e.target[5].position;
					const beforeItemLen = this.layoutManager.items.length;
					const beforeElementLen = this.el.children.length;
					let ret = getItem(this.layoutManager.items, beforePosition);
					expect(ret.length).to.be.equal(1);
					
					// When 
					this.remove(e.target[5].el);
					
					// Then 
					ret = getItem(this.layoutManager.items, beforePosition);
					expect(ret.length).to.be.equal(0);
					expect(this.layoutManager.items.length).to.be.equal(beforeItemLen - 1);
					expect(this.el.children.length).to.be.equal(beforeElementLen - 1);

					this.off();
					this.on("layoutComplete", function(e) {
						beforePrependCols = [...this.layoutManager.prependCols];
						this.layoutManager.prependCols.forEach((v, i) => expect(v).to.be.equal(beforePrependCols[i]));
						
						// Then
						var ret = getItem(this.layoutManager.items, beforePosition);
						expect(ret.length).to.be.equal(1);
						done();
					});
					// Then
					this.layout(false);
				});
				this.append(Content.append(25));
			});

			// Then
			this.inst.append(Content.append(25));
		});
	});