import ImageLoaded from "../../src/ImageLoaded";
import AutoSizer from "../../src/AutoSizer";
import {$, innerWidth, innerHeight} from "../../src/utils";
/* eslint-disable */

describe("ImageLoaded Test", function() {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="container" style="position:relative;width: 1000px; height: 1000px;">
            </div>
        `;
        this.container = document.body.querySelector(".container");
    });
    afterEach(() => {
        AutoSizer.removeAll();
        document.body.innerHTML = ``;
    });
    it(`should check image fail`, done => {
        const img = $(`<img src="http://12345"/>`);
        this.container.appendChild(img);

        const complete = sinon.spy(e => {
            expect(error.calledOnce).to.be.true;
            done();
        });
        const error = sinon.spy(e => {
            
        })
        ImageLoaded.check([img], "data-", complete, error);
    });
    it(`should check image sucess`, done => {
        const img = $(`<img src="/base/test/unit/image/3.jpg">`);
        this.container.appendChild(img);

        const complete = sinon.spy(e => {
            expect(error.calledOnce).to.be.false;
            done();
        });
        const error = sinon.spy(e => {
            
        })
        ImageLoaded.check([img], "data-", complete, error);
    });
});