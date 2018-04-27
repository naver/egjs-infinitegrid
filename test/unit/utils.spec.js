import {$, scrollTo, scroll, innerWidth, innerHeight, outerWidth, outerHeight} from "../../src/utils";
import {VERTICAL} from "../../src/consts";

describe("Util Test", function() {
  beforeEach(() => {
    this.inst = null;
    this.el = sandbox();
    this.el.innerHTML = `<div id="view" style="height:10px; width:100%; overflow:scroll">
      <div style="height:300px">content</div>
    </div>`;
  });
  afterEach(() => {
    if (this.inst) {
      this.inst.destroy();
      this.inst = null;
    }
    cleanup();
  });
  it("should check `scrollTo/scroll` method", () => {
      // Given
      const view = $("#view");
      expect(scroll(view, !VERTICAL)).to.be.not.equal(100);
      // When 
      
      scrollTo(view, 0, 100);
      // Then
      expect(scroll(view, !VERTICAL)).to.be.equal(100);
  });
  it("should check innerWidth, innerHeight method", () => {
    // Given
    const view = $("#view div");
    
    view.style.width = "100px";
    view.style.height = "100px";
    // When
    // Then
    expect(innerWidth(view)).to.be.equal(100);
    expect(innerHeight(view)).to.be.equal(100);
    expect(view.clientWidth).to.be.equal(100);
    expect(view.clientHeight).to.be.equal(100);

    // When
    view.style.paddingLeft = "10px";
    view.style.paddingTop = "10px";
    // Then
    expect(innerWidth(view)).to.be.equal(110);
    expect(innerHeight(view)).to.be.equal(110);
    expect(view.clientWidth).to.be.equal(110);
    expect(view.clientHeight).to.be.equal(110);

    // When
    view.style.paddingRight = "10px";
    view.style.paddingBottom = "10px";
    // Then
    expect(innerWidth(view)).to.be.equal(120);
    expect(innerHeight(view)).to.be.equal(120);
    expect(view.clientWidth).to.be.equal(120);
    expect(view.clientHeight).to.be.equal(120);

    // When
    view.style.borderLeft = "10px solid black";
    view.style.borderTop = "10px solid black";
    // Then
    expect(innerWidth(view)).to.be.equal(120);
    expect(innerHeight(view)).to.be.equal(120);
    expect(view.clientWidth).to.be.equal(120);
    expect(view.clientHeight).to.be.equal(120);

    // When
    view.style.boxSizing = "border-box";
    // Then
    expect(innerWidth(view)).to.be.equal(90);
    expect(innerHeight(view)).to.be.equal(90);
    expect(view.clientWidth).to.be.equal(90);
    expect(view.clientHeight).to.be.equal(90);
  });
  it("should check outerWidth, outerHeight method", () => {
    // Given
    const view = $("#view div");
    
    view.style.width = "100px";
    view.style.height = "100px";
    // When
    // Then
    expect(outerWidth(view)).to.be.equal(100);
    expect(outerHeight(view)).to.be.equal(100);
    expect(view.offsetWidth).to.be.equal(100);
    expect(view.offsetHeight).to.be.equal(100);

    // When
    view.style.paddingLeft = "10px";
    view.style.paddingTop = "10px";
    // Then
    expect(outerWidth(view)).to.be.equal(110);
    expect(outerHeight(view)).to.be.equal(110);
    expect(view.offsetWidth).to.be.equal(110);
    expect(view.offsetHeight).to.be.equal(110);

    // When
    view.style.paddingRight = "10px";
    view.style.paddingBottom = "10px";
    // Then
    expect(outerWidth(view)).to.be.equal(120);
    expect(outerHeight(view)).to.be.equal(120);
    expect(view.offsetWidth).to.be.equal(120);
    expect(view.offsetHeight).to.be.equal(120);

    // When
    view.style.borderLeft = "10px solid black";
    view.style.borderTop = "10px solid black";
    // Then
    expect(outerWidth(view)).to.be.equal(130);
    expect(outerHeight(view)).to.be.equal(130);
    expect(view.offsetWidth).to.be.equal(130);
    expect(view.offsetHeight).to.be.equal(130);

    // When
    view.style.boxSizing = "border-box";
    // Then
    expect(outerWidth(view)).to.be.equal(100);
    expect(outerHeight(view)).to.be.equal(100);
    expect(view.offsetWidth).to.be.equal(100);
    expect(view.offsetHeight).to.be.equal(100);
  });
});
