import Infinite from "../../src/Infinite";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import PackingLayout from "../../src/layouts/PackingLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
import {insert} from "./TestHelper";
import {APPEND} from "../../src/consts";

const LAYOUTS = [
  GridLayout,
  FrameLayout,
  SquareLayout,
  PackingLayout,
  JustifiedLayout
];

describe("Infinite Test", function() {
  describe("append/prepend Test on layoutComplete (useRecycle:true)", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new Infinite("#infinite", {
        useRecycle: true
      });
      this.inst.setLayout(GridLayout);
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it("should check a append method", done => {
      // Given
      insert(this.inst, APPEND, () => {}, 30, 10);
    });
      
  });  
  describe("setLayout method Test", function() {
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
      cleanup();
    });
    it("should set direction of options", () => {
      // Given
      this.inst.options.direction = "vertical";
      
      // When
      LAYOUTS.forEach(v => {
        // Then
        this.inst.setLayout(v);
        expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
        expect(this.inst._layout instanceof v).to.be.true;
      })
      
      // Given
      this.inst.options.direction = "horizontal";
      
      // When
      LAYOUTS.forEach(v => {
        // Then
        this.inst.setLayout(v);
        expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
        expect(this.inst._layout instanceof v).to.be.true;
      })
    });
  });
});
