import {utils} from "../../src/utils";
import {window} from "../../src/browser";

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
  it("should check `scrollTop/scrollTo` method", () => {
      // Given
      const view = utils.$("#view");
      expect(utils.scrollTop(view)).to.be.not.equal(100);
      // When 
      
      utils.scrollTo(view, 0, 100);
      // Then
      expect(utils.scrollTop(view)).to.be.equal(100);
  });
});
