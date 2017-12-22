import AutoSizer from "../../src/AutoSizer";
import {innerWidth, innerHeight} from "../../src/utils";
/* eslint-disable */

describe("AutoSizer Test", function() {
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
    ["", "width", "height"].forEach(fixed => {
        [undefined, "", "data-", "amuge-"].forEach(prefix => {
            it(`add test(fixed: ${fixed}, prefix: ${prefix})`, () => {
                const _prefix = prefix === undefined ? "data-" : prefix;
                this.container.insertAdjacentHTML("beforeend", `
                <div class="item1" ${_prefix}width="400" ${_prefix}height="500" ${_prefix}fixed="${fixed}" style="${fixed === "height" ? "height: 100%" : ""}">
                </div>
                `,);
                const item1 = this.container.querySelector(".item1");
                AutoSizer.add(item1, prefix);
                expect (item1.__PREFIX__).to.be.equal(prefix === undefined ? "data-" : prefix);
                expect (fixed === "height" ? innerHeight(item1) : innerWidth(item1)).to.be.equal(1000);
                expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 800 : 1250);
            });
            it(`resize test(fixed: ${fixed}, prefix: ${prefix})`, () => {
                const _prefix = prefix === undefined ? "data-" : prefix;
                this.container.insertAdjacentHTML("beforeend", `
                <div class="item1" ${_prefix}width="400" ${_prefix}height="500" ${_prefix}fixed="${fixed}" style="${fixed === "height" ? "height: 100%" : ""}">
                </div>
                `,);
                const item1 = this.container.querySelector(".item1");
                AutoSizer.add(item1, prefix);
                this.container.style.width = "800px";
                this.container.style.height = "800px";
                AutoSizer.resize(item1);
                expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 640 : 1000);
            });
        });
    });
});