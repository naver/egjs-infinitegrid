import {Infinite} from "../../src/Infinite";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
// import PackingLayout from "../../src/layouts/PackingLayout";

const LAYOUTS = [
  GridLayout,
  FrameLayout,
  SquareLayout,
  // PackingLayout,
  JustifiedLayout
];

describe("Infinite Test", function() {
  describe("setLayout Test", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new Infinite("#infinite");
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });
    it("should set direction of options", () => {
      // Given
      this.inst.options.direction = "vertical";

      // When
      LAYOUTS.forEach(v => {
        this.inst.setLayout(v);
        expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
      })
      
      // Given
      this.inst.options.direction = "horizontal";
      
      // When
      LAYOUTS.forEach(v => {
        this.inst.setLayout(v);
        expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
      })
    });
  });
  describe("append/prepend Test", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new Infinite("#infinite");
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
    });
  //   it("should set direction of options", () => {
  //     // Given
  //     this.inst.options.direction = "vertical";

  //     // When
  //     LAYOUTS.forEach(v => {
  //       this.inst.setLayout(v);
  //       expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
  //     })
      
  //     // Given
  //     this.inst.options.direction = "horizontal";
      
  //     // When
  //     LAYOUTS.forEach(v => {
  //       this.inst.setLayout(v);
  //       expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
  //     })
  //   });
  });
});
