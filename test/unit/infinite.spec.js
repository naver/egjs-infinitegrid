import Infinite from "../../src/Infinite";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import PackingLayout from "../../src/layouts/PackingLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
import {insert, checkLayoutComplete} from "./TestHelper";
import {APPEND, PREPEND} from "../../src/consts";

const LAYOUTS = [
  GridLayout,
  FrameLayout,
  SquareLayout,
  PackingLayout,
  JustifiedLayout
];

describe("Infinite (useRecycle:true) Test", function() {
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
    it("should check a append with recycle method", done => {
      // Given
      const itemCount = 30;
      const retry = 7;

      // When
      const handler = insert(this.inst, APPEND, () => {
        // Then
        expect(this.inst._status.startCursor).to.be.equal(0);
        expect(this.inst._status.endCursor).to.be.equal(retry - 1);
        expect(this.inst.getGroupKeys()).to.have.lengthOf(retry);

        // Then: check layout property
        checkLayoutComplete(handler, APPEND, itemCount);

        // Given
        const centerIdx = Number.parseInt(retry / 2);
        const centerEndValue = this.inst._items
          .getEdgeValue("end", this.inst._status.startCursor, centerIdx);

        // When
        this.inst._watcher.scrollTo(centerEndValue);
        setTimeout(() => {
          this.inst._recycle(APPEND);
          // Then
          expect(this.inst.getGroupKeys()).to.have.lengthOf.below(retry);
          done();
        }, 100);
      }, itemCount, retry);
    });
    it("should check a prepend with recycle method", done => {
      // Given
      const itemCount = 30;
      const retry = 7;
      // When
      const handler = insert(this.inst, PREPEND, () => {
        // Then
        expect(this.inst._status.startCursor).to.be.equal(0);
        expect(this.inst._status.endCursor).to.be.equal(retry - 1);
        expect(this.inst.getGroupKeys()).to.have.lengthOf(retry);

        // Then: check layout property
        checkLayoutComplete(handler, PREPEND, itemCount);

        // Given
        const centerIdx = Number.parseInt(retry / 2);
        const centerEndValue = this.inst._items
          .getEdgeValue("start", this.inst._status.startCursor, centerIdx);

        // When
        this.inst._watcher.scrollTo(centerEndValue);
        setTimeout(() => {
          this.inst._recycle(PREPEND);
          // Then
          expect(this.inst.getGroupKeys()).to.have.lengthOf.below(retry);
          done();
        }, 100);
      }, itemCount, retry);
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
