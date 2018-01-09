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
            const img = $(`<div><img src="http://${Math.random()}.jpg"/></div>`);
            this.container.appendChild(img);

            // Then
            // complete => error => end
            const complete = sinon.spy();
            const error = sinon.spy(e => {
                expect(complete.calledOnce).to.be.true;
            });
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.true;
                done();
            });

            // When
            ImageLoaded.check([img], {complete, error, end});
        });
        it(`should check image sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg">`);
            this.container.appendChild(img);

            // Then
            // error(x) /// complete => end 
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(img.complete).to.be.true;
            });
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                done();
            })
            const error = sinon.spy();

            // When
            ImageLoaded.check([img], {complete, error, end});
        });
        it(`should check image included size sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg" data-width="400" data-height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            // When
            ImageLoaded.check([img], {complete, error, end});

            // Then
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                
            }, 5);
        });
        it(`should check image included other prefix size sucess`, done => {
            // Given
            const img = $(`<img src="/base/test/unit/image/3.jpg" width="400" height="500" />`);
            this.container.appendChild(img);

            const complete = sinon.spy();
            const error = sinon.spy();
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            })

            // When
            ImageLoaded.check([img], {type:"", complete, error, end});

            // Then
            setTimeout(() => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
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
            });
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            });
            const error = sinon.spy();

            // When
            ImageLoaded.check([div], {complete, error, end});
        });
        it(`should check multi error image fail`, done => {
            // Given
            const div = $(`<div><img src="http://${Math.random()}.jpg"/><img src="1"/><img src="1"/><img src="1"/></div>`);
            this.container.appendChild(div);
            let count = 0;

            // Then
            const complete = sinon.spy(e => {});
            const error = sinon.spy(e => {
                expect(e.itemIndex).to.be.equals(0);
            });
            const end = sinon.spy(e => {
                expect(error.callCount).to.be.equals(4);
                expect(complete.calledOnce).to.be.true;
                done();
            })

            // When
            ImageLoaded.check([div], {complete, error, end});
        });
        it("should check blank items", done => {
            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
            });
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            })
            const error = sinon.spy();

            // Given
            // When
            ImageLoaded.check([], {complete, error, end});
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
            });
            const end = sinon.spy(e => {
                expect(complete.calledOnce).to.be.true;
                expect(error.calledOnce).to.be.false;
                done();
            });
            
            ImageLoaded.check([div], {type: CHECK_ONLY_ERROR, complete, error, end});
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
        it(`should check multi error image fail`, done => {
            // Given
            const div = $(`<div><img src="http://${Math.random()}.jpg"/><img src="1"/><img src="1"/><img src="1"/></div>`);
            this.container.appendChild(div);


            // Then
            const complete = sinon.spy(e => {});
            const error = sinon.spy(e => {
                expect(e.itemIndex).to.be.equals(0);
            });
            const end = sinon.spy(e => {
                expect(error.callCount).to.be.equals(4);
                expect(complete.calledOnce).to.be.true;
                done();
            });

            // When
            ImageLoaded.check([div], {type: CHECK_ONLY_ERROR, complete, error, end});
        });
        it("should check blank items", done => {
            // Then
            const complete = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;

            });
            const error = sinon.spy();
            const end = sinon.spy(e => {
                expect(error.calledOnce).to.be.false;
                expect(complete.calledOnce).to.be.true;
                done();
            })

            // Given, When
            ImageLoaded.check([], {type: CHECK_ONLY_ERROR, complete, error, end});
        });
    });
});