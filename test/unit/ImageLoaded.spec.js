import ImageLoaded, {CHECK_ONLY_ERROR} from "../../src/ImageLoaded";
import {$, toArray} from "../../src/utils";
/* eslint-disable */

describe("ImageLoaded Test", function() {
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
            // Given
            const img = $(`<img src="http://12345"/>`);
            this.container.appendChild(img);

            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            // When
            ImageLoaded.check([img], {complete, error});
        });
        it(`should check image sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg">`);
            this.container.appendChild(img);

            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(img.complete).to.be.true;
                done();
            });
            const error = sinon.spy();

            // When
            ImageLoaded.check([img], {complete, error});
        });
        it(`should check image included size sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg" data-width="400" data-height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();

            // When
            ImageLoaded.check([img], {complete, error});

            // Then
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            }, 5);
        });
        it(`should check image included other prefix size sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg" width="400" height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();

            // When
            ImageLoaded.check([img], {type:"", complete, error});

            // Then
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            }, 5);
        });
        it(`should check item included image`, done => {
            // Given
            const div = $(`<div><img src="/base/test/unit/image/3.jpg"/><img src="/base/test/unit/image/3.jpg"/></div>`);
            this.container.appendChild(div);

            // Then
            const complete = sinon.spy(e => {
                div.querySelectorAll("img").forEach(element => {
                    expect(element.complete).to.be.true;
                });
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            // When
            ImageLoaded.check([div], {complete, error});
        });
        it("should check blank items", done => {
            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            // Given
            // When
            ImageLoaded.check([], {complete, error});
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
        it(`should check image complete`, done => {
            // Given
            const div = $(`<div><img src="/base/test/unit/image/5.jpg"/><img src="/base/test/unit/image/4.jpg"/></div>`);
            const children = toArray(div.children);

            // When
            this.container.appendChild(div);

            // Then
            const error = sinon.spy();
            const complete = sinon.spy(e => {
                // expect(children.map(e => e.complete)).to.not.include(true);
                expect(error.calledOnce).to.be.false;
                done();
            });
            
            ImageLoaded.check([div], {type: CHECK_ONLY_ERROR, complete, error});
        });
        it(`should check image fail`, done => {
            // Given
            const div = $(`<div><img src="/base/test/unit/image/3.jpg"/><img src="/base/test/unit/image/3.jpg"/><img src="http://${Math.random()}.jpg"/></div>`);
            this.container.appendChild(div);

            // Then
            const complete = sinon.spy(e => {});
            const error = sinon.spy(e => {
                expect(complete.calledOnce).to.be.true;
                done();
            });

            // When
            ImageLoaded.check([div], {type: CHECK_ONLY_ERROR, complete, error});
        });
        it("should check blank items", done => {
            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            // Given, When
            ImageLoaded.check([], {type: CHECK_ONLY_ERROR, complete, error});
        });
    });
});