import {$, scrollTo, scroll} from "../../src/utils";
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
});
