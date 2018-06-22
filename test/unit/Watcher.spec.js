import Watcher from "../../src/Watcher";
import { scrollTo, scroll } from "../../src/utils";
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
			this.wrapper.style.top = "1000px";
			this.wrapper.style.left = "1000px";
			this.watcher = new Watcher(window, {
				container: this.el.querySelector(".view"),
				horizontal,
			});

			// When, Then
			expect(this.watcher._getOffset()).to.be.equals(1000);
		});
		it (`should check containeroffset with offset and scroll`, () => {

			// Given
			this.wrapper.style.top = "4000.25px";
			this.wrapper.style.left = "4000.25px";
			this.watcher = new Watcher(window, {
				container: this.el.querySelector(".view"),
				horizontal,
			});

			// When
			scrollTo(window, 545, 545);


			// Then
			expect(scroll(window, horizontal)).to.be.equals(545);
			expect(this.watcher._getOffset()).to.be.equals(4000.25);
		});
		it (`should check containeroffset with offset and scroll`, (done) => {


			// Given
			this.wrapper.style.top = "4000.25px";
			this.wrapper.style.left = "4000.25px";
			scrollTo(window, 545, 545);
			this.watcher = new Watcher(window, {
				container: this.view,
				horizontal,
			});
			
			// When
			this.wrapper.style.top = "2000.25px";
			this.wrapper.style.left = "2000.25px";

			// Then
			expect(scroll(window, horizontal)).to.be.equals(545);
			expect(this.watcher.getContainerOffset()).to.be.equals(4000.25);

			this.watcher._onResize();

			setTimeout(() => {
				expect(scroll(window, horizontal)).to.be.equals(545);
				expect(this.watcher.getContainerOffset()).to.be.equals(2000.25);
				done();
			}, 100);
		});
	});
});