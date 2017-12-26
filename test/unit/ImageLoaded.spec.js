import ImageLoaded, {CHECK_EQUAL_SIZE, CHECK_ONLY_ERROR} from "../../src/ImageLoaded";
import {$, innerWidth, innerHeight} from "../../src/utils";
/* eslint-disable */

describe.only("ImageLoaded Test", function() {
    describe("ImageLoaded Test(type = CHECK_ALL)", function() {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="container" style="position:relative;width: 1000px; height: 1000px;">
                </div>
            `;
            this.container = document.body.querySelector(".container");
        });
        afterEach(() => {
            document.body.innerHTML = ``;
        });
        it(`should check image fail`, done => {
            const img = $(`<img src="http://12345"/>`);
            this.container.appendChild(img);

            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            ImageLoaded.check([img], {complete, error});
        });
        it(`should check image sucess`, done => {
            const img = $(`<img src="/base/test/unit/image/3.jpg">`);
            this.container.appendChild(img);

            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(img.complete).to.be.true;
                done();
            });
            const error = sinon.spy();

            ImageLoaded.check([img], {complete, error});
        });
        it(`should check image included size sucess`, done => {
            const img = $(`<img src="/base/test/unit/image/3.jpg" data-width="400" data-height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();

            ImageLoaded.check([img], {complete, error});
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            }, 5);
        });
        it(`should check image included other prefix size sucess`, done => {
            const img = $(`<img src="/base/test/unit/image/3.jpg" width="400" height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();

            ImageLoaded.check([img], {type:"", complete, error});
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            }, 5);
        });
        it(`should check item included image`, done => {
            const div = $(`<div><img src="/base/test/unit/image/3.jpg"/><img src="/base/test/unit/image/3.jpg"/></div>`);
            this.container.appendChild(div);

            const complete = sinon.spy(e => {
                div.querySelectorAll("img").forEach(element => {
                    expect(element.complete).to.be.true;
                });
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            ImageLoaded.check([div], {complete, error});
        });
    });
    describe("ImageLoaded Test(type = CHECK_EQUAL_SIZE)", function() {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="container" style="position:relative;width: 1000px; height: 1000px;">
                </div>
            `;
            this.container = document.body.querySelector(".container");
        });
        afterEach(() => {
            document.body.innerHTML = ``;
        });
        it(`should check image fail`, done => {
            const div = $(`<div><img src="/base/test/unit/image/3.jpg"/><img src="/base/test/unit/image/3.jpg"/><img src="http://0000.jpg"/></div>`);
            this.container.appendChild(div);

            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            ImageLoaded.check([div], {type: CHECK_EQUAL_SIZE, complete, error});
        });
    });
    describe("ImageLoaded Test(type = CHECK_ONLY_ERROR)", function() {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="container" style="position:relative;width: 1000px; height: 1000px;">
                </div>
            `;
            this.container = document.body.querySelector(".container");
        });
        afterEach(() => {
            document.body.innerHTML = ``;
        });
        it(`should check image fail`, done => {
            const div = $(`<div><img src="/base/test/unit/image/3.jpg"/><img src="/base/test/unit/image/3.jpg"/><img src="http://0000.jpg"/></div>`);
            this.container.appendChild(div);

            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
            });
            const error = sinon.spy(e => {
                expect(e.target.src).to.be.equals("http://0000.jpg/");
                expect(complete.calledOnce).to.be.true;
                done();
            });

            ImageLoaded.check([div], {type: CHECK_ONLY_ERROR, complete, error});
        });
    });
});