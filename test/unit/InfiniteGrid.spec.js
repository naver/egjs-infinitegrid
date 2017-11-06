import InfiniteGrid from "../../src/InfiniteGrid";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import PackingLayout from "../../src/layouts/PackingLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
import {insert, checkLayoutComplete} from "./helper/TestHelper";
import {APPEND, PREPEND} from "../../src/consts";

describe("InfiniteGrid Test", function() {
  describe("setStatus/getStatus Test", function() {
    [true, false].forEach(isOverflowScroll => {
      beforeEach(() => {
        // document.body.style.height = "10000px"; // for Scroll
        // window.scrollTo(0, 0);
        // this.el = sandbox();
        // this.el.innerHTML = "<div id='infinite'></div>";
        // this.inst = new InfiniteGrid("#infinite", {
        //   useRecycle: true,
        //   isOverflowScroll,
        // });
        // this.inst.setLayout(GridLayout);
      });
      afterEach(() => {
        if (this.inst) {
          this.inst.destroy();
          this.inst = null;
        }
        cleanup();
      });
    });
  });
  describe("append/prepend Test on layoutComplete", function() {
    [true, false].forEach(isOverflowScroll => {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle: true,
          isOverflowScroll,
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
      
      [APPEND, PREPEND].forEach(v => {
        const ITEMCOUNT = 30;
        const RETRY = 7;
  
        it(`should check a ${v ? "append" : "prepend"} with recycle method (isOverflowScroll: ${isOverflowScroll})`, done => {
          // Given
          // When
          const handler = insert(this.inst, v, () => {
            // Then
            expect(this.inst._status.startCursor).to.be.equal(0);
            expect(this.inst._status.endCursor).to.be.equal(RETRY - 1);
            expect(this.inst.getGroupKeys()).to.have.lengthOf(RETRY);
    
            // Then: check layout property
            checkLayoutComplete(handler, v, ITEMCOUNT);
    
            // Given
            const centerIdx = Number.parseInt(RETRY / 2);
            const centerEndValue = this.inst._items
              .getEdgeValue(v ? "end" : "start", this.inst._status.startCursor, centerIdx);
    
            // When
            this.inst._watcher.scrollTo(centerEndValue);
            setTimeout(() => {
              this.inst._recycle(v);
              // Then
              expect(this.inst.getGroupKeys()).to.have.lengthOf.below(RETRY);
              done();
            }, 100);
          }, ITEMCOUNT, RETRY);
        });
      });
    });
  });  
  describe("setLayout method Test", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new InfiniteGrid("#infinite");
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    ["vertical", "horizontal"].forEach(v => {
      it(`should set '${v}' direction of options`, () => {
        // Given
        this.inst.options.direction = v;
        
        // When
        [
          GridLayout,
          FrameLayout,
          SquareLayout,
          PackingLayout,
          JustifiedLayout
        ].forEach(v => {
          // Then
          this.inst.setLayout(v);
          expect(this.inst._layout.options.direction).to.be.equal(this.inst.options.direction);
          expect(this.inst._layout instanceof v).to.be.true;
        });
      });
    });
  });
});
