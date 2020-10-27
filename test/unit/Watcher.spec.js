import Watcher from "../../src/Watcher";
import { scrollTo, scroll } from "../../src/utils";
import WatcherInjection from "inject-loader!../../src/Watcher";
import { wait } from "./helper/TestHelper";

/* eslint-disable */

[true, false].forEach(horizontal => {
	describe(`Watcher Test(horizontal: ${horizontal})`, function() {
		beforeEach(() => {
			this.el = sandbox();
			this.el.innerHTML = `
			<style>
				body {
					margin: 0;
					padding: 0;
				}
				.wrapper {
					position: relative;
				}
				.view {
					width: 500px;
					height: 400px;
				}
				.container {
					width: 500px;
					height: 400px;
				}
			</style>
			<div class="wrapper">
				<div class="view">
					<div class="container">
					1
					</div>
				</div>
			</div>
			`;
			this.view = this.el.querySelector(".view");
			this.wrapper = this.el.querySelector(".wrapper");
			this.container = this.el.querySelector(".container");
		});
		afterEach(() => {
			this.watcher && this.watcher.destroy();
			cleanup();
		  });
		it (`should check containeroffset with no offset`, () => {
			// Given
			this.watcher = new Watcher(window, {
				container: this.view,
				horizontal,
			});

			// When, Then
			expect(this.watcher._getOffset()).to.be.equals(0);
		});
		it (`should check containeroffset with offset`, () => {
			// Given
			this.wrapper.style[horizontal ? "left" : "top"] = "1000px";
			this.watcher = new Watcher(window, {
				container: this.el.querySelector(".view"),
				horizontal,
			});

			// When, Then
			expect(this.watcher._getOffset()).to.be.equals(1000);
		});
		it (`should check containeroffset with offset and scroll`, () => {

			// Given
			this.wrapper.style[horizontal ? "left" : "top"] = "4000.25px";
			this.watcher = new Watcher(window, {
				container: this.el.querySelector(".view"),
				horizontal,
			});

			// When
			scrollTo(window, horizontal ? 545 : 0, horizontal ? 0 : 545);


			// Then
			expect(scroll(window, horizontal)).to.be.equals(545);
			expect(this.watcher._getOffset()).to.be.equals(4000.25);
		});
		[50, 100, 150].forEach(resizeDebounce => {
			it (`should check if it keeps debounce (resizeDebounce: ${resizeDebounce})`, (done) => {
				// Given
				const spy = sinon.spy();
				this.watcher = new Watcher(window, {
					container: this.el.querySelector(".view"),
					horizontal,
					resizeDebounce,
					resize: spy,
				});

				// When
				window.dispatchEvent(new Event("resize"));

				// debounce
				setTimeout(() => {
					window.dispatchEvent(new Event("resize"));
				}, resizeDebounce - 20);
				// debounce
				setTimeout(() => {
					window.dispatchEvent(new Event("resize"));
				}, resizeDebounce * 2 - 40);
				// debounce
				setTimeout(() => {
					window.dispatchEvent(new Event("resize"));
				}, resizeDebounce * 3 - 60);

				// Then
				// The event does not occur until the debounce is over.
				setTimeout(() => {
					expect(spy.callCount).to.be.equals(0);
				}, resizeDebounce * 4 - 80);
				// The event does occur when the debounce is over.
				setTimeout(() => {
					expect(spy.callCount).to.be.equals(1);
					done();
				}, resizeDebounce * 4);
			});
		});
		it ("should check maximum debounce time.", (done) => {
			// Given
			const spy = sinon.spy();
			this.watcher = new Watcher(window, {
				container: this.el.querySelector(".view"),
				horizontal,
				maxResizeDebounce: 200,
				resize: spy,
			});

			// When
			window.dispatchEvent(new Event("resize"));

			// debounce
			setTimeout(() => {
				window.dispatchEvent(new Event("resize"));
			}, 60);
			// debounce
			setTimeout(() => {
				window.dispatchEvent(new Event("resize"));
			}, 120);
			// debounce
			setTimeout(() => {
				window.dispatchEvent(new Event("resize"));
			}, 180);

			// Then
			// The maximum time to debounce is 200ms.
			setTimeout(() => {
				expect(spy.callCount).to.be.equals(1);
				done();
			}, 200);
		});
		it (`should check containeroffset with offset and scroll`, (done) => {


			// Given
			this.wrapper.style[horizontal ? "left" : "top"] = "4000.25px";
			scrollTo(window, horizontal ? 545 : 0, horizontal ? 0 : 545);
			this.watcher = new Watcher(window, {
				container: this.view,
				horizontal,
			});

			// When
			this.wrapper.style[horizontal ? "left" : "top"] = "2000.25px";

			// Then
			expect(scroll(window, horizontal)).to.be.equals(545);
			expect(this.watcher.getContainerOffset()).to.be.equals(4000.25);

			window.dispatchEvent(new Event("resize"));

			setTimeout(() => {
				expect(scroll(window, horizontal)).to.be.equals(545);
				expect(this.watcher.getContainerOffset()).to.be.equals(2000.25);
				done();
			}, 100);
		});
		[true, false].forEach(IS_IOS => {
			it(`should check scroll test(IS_IOS: ${IS_IOS})`, async () => {
				// Given
				this.view.style[horizontal ? "width" : "height"] = "4000.25px";
				const Watcher2 = WatcherInjection({
					"./consts": {
						IS_IOS,
					},
				}).default;
				//scrollTo(window, horizontal ? 545 : 0, horizontal ? 0 : 545);

				const spy = sinon.spy();
				scrollTo(window, 0, 0);
				this.watcher = new Watcher2(window, {
					container: this.view,
					horizontal,
					check: spy
				});

				const issue1 = this.watcher._isScrollIssue;

				// When
				this.watcher._prevPos = -1;
				window.dispatchEvent(new Event("scroll"));

				const issue2 = this.watcher._isScrollIssue;

				scrollTo(window, horizontal ? 545 : 0, horizontal ? 0 : 545);
				await wait(500);

				const issue3 = this.watcher._isScrollIssue;
				// Then


				expect(spy.callCount).to.be.equals(IS_IOS ? 1: 2);
				expect(issue1).to.be.equals(IS_IOS);
				expect(issue2).to.be.equals(IS_IOS);
				expect(issue3).to.be.false;
			});
		});
	});
});
