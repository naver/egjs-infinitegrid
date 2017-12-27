import AutoSizer from "../../src/AutoSizer";
import {innerWidth, innerHeight} from "../../src/utils";
/* eslint-disable */

function getItem(prefix, fixed, style) {
    return `<div class="item1" ${prefix}width="400" ${prefix}height="500" ${prefix}fixed="${fixed}" style="${style}"></div>`;
}

describe("AutoSizer Test", function() {
    ["", "width", "height"].forEach(fixed => {
        [undefined, "", "data-", "amuge-"].forEach(prefix => {
            const _prefix = prefix === undefined ? "data-" : prefix;

            describe(`AutoSizer Test(fixed: ${fixed}, prefix: ${prefix})`, function() {
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
                it(`add test(fixed: ${fixed}, prefix: ${prefix})`, () => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, fixed === "height" ? "height: 100%" : ""));
                    const item1 = this.container.querySelector(".item1");

                    // When
                    AutoSizer.add(item1, prefix);

                    // Then
                    expect (item1.__PREFIX__).to.be.equal(prefix === undefined ? "data-" : prefix);
                    expect (fixed === "height" ? innerHeight(item1) : innerWidth(item1)).to.be.equal(1000);
                    expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 800 : 1250);
                    AutoSizer.remove(item1);
                });
                it(`add zero size test(fixed: ${fixed}, prefix: ${prefix})`, () => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, "width: 0px; height: 0px;"));
                    const item1 = this.container.querySelector(".item1");

                    // When
                    AutoSizer.add(item1, prefix);

                    // Then
                    expect (item1.__PREFIX__).to.be.equal(prefix === undefined ? "data-" : prefix);
                    expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 400 : 500);
                    AutoSizer.remove(item1);
                });
                it(`resize test(fixed: ${fixed}, prefix: ${prefix})`, () => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, fixed === "height" ? "height: 100%" : ""));
                    const item1 = this.container.querySelector(".item1");

                    // When
                    AutoSizer.add(item1, prefix);
                    this.container.style.width = "800px";
                    this.container.style.height = "800px";
                    AutoSizer.resize(item1);

                    // Then
                    expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 640 : 1000);
                    AutoSizer.remove(item1);
                });
                it(`resize test without add method(fixed: ${fixed}, prefix: ${prefix})`, () => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, fixed === "height" ? "height: 100%" : ""));
                    const item1 = this.container.querySelector(".item1");
                    this.container.style.width = "800px";
                    this.container.style.height = "800px";

                    // When
                    AutoSizer.resize(item1, prefix);

                    // Then
                    expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 640 : 1000);
                    AutoSizer.remove(item1);
                });
                it(`resize event test(fixed: ${fixed}, prefix: ${prefix})`, done => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, fixed === "height" ? "height: 100%" : ""));
                    const item1 = this.container.querySelector(".item1");

                    // When
                    AutoSizer.add(item1, prefix);
                    this.container.style.width = "800px";
                    this.container.style.height = "800px";
                    window.dispatchEvent(new Event("resize"));

                    // Then
                    setTimeout(() => {
                        expect(parseInt(item1.style[fixed === "height" ? "width" : "height"], 10)).to.be.equal(fixed === "height" ? 640 : 1000);
                        done();
                        AutoSizer.remove(item1);
                    }, 100);
                });
                it(`remove test(fixed: ${fixed}, prefix: ${prefix})`, done => {
                    // Given
                    this.container.insertAdjacentHTML("beforeend", getItem(_prefix, fixed, fixed === "height" ? "height: 100%" : ""));
                    const item1 = this.container.querySelector(".item1");

                    // When
                    // Then
                    AutoSizer.add(item1, prefix);
                    expect (fixed === "height" ? innerHeight(item1) : innerWidth(item1)).to.be.equal(1000);
                    AutoSizer.remove(item1);
                    this.container.style.width = "800px";
                    this.container.style.height = "800px";
                    window.dispatchEvent(new Event("resize"));
                    setTimeout(() => {
                        expect(item1.style[fixed === "height" ? "width" : "height"]).to.be.equal("");
                        done();
                    }, 100);
                });
            });
        });
    });
});