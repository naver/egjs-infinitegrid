import $ from "jquery";
import InfiniteGrid from "../../src/InfiniteGrid";
import GridLayout from "../../src/layouts/GridLayout";
import FrameLayout from "../../src/layouts/FrameLayout";
import SquareLayout from "../../src/layouts/SquareLayout";
import PackingLayout from "../../src/layouts/PackingLayout";
import JustifiedLayout from "../../src/layouts/JustifiedLayout";
import {getItems, insert, checkLayoutComplete} from "./helper/TestHelper";
import {APPEND, PREPEND, LOADING_APPEND, LOADING_PREPEND} from "../../src/consts";
import {innerWidth, innerHeight} from "../../src/utils";
import {DEFENSE_BROWSER} from "../../src/consts";
import {expectConnectGroupsOutline} from "./helper/common";

/* eslint-disable */
describe("InfiniteGrid Test", function() {
  [true, false].forEach(isOverflowScroll => {
    describe("destroy Test", function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
      });
      afterEach(() => {
        cleanup();
      });
      it(`should check a initialization (isOverflowScroll: ${isOverflowScroll})`, done => {
        // Given
        let target = document.getElementById("infinite");
        const beforeStyle = {
          position: target.style.position,
          overflowX: target.style.overflowX,
          overflowY: target.style.overflowY,
          height: target.style.height,
          weight: target.style.weight,
        };
        this.inst = new InfiniteGrid(target, {
          isOverflowScroll,
        });
        this.inst.setLayout(GridLayout);
        
        insert(this.inst, true, () => {
          // When
          this.inst.destroy();

          // Then
          Object.keys(beforeStyle).forEach(v => {
            expect(beforeStyle.position).to.be.eql(target.style.position);
          });  
          done();
        }, 30, 1);
      });
    });
  });
  [true, false].forEach(isOverflowScroll => {
    describe(`initailization Test (onlayoutComplete)(isOverflowScroll: ${isOverflowScroll})`, function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          isOverflowScroll,
          horizontal: true,
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
      it(`should check a initialization (setLayout(instance))(isOverflowScroll: ${isOverflowScroll})`, done => {
        const count = 10;
        const items = getItems(count);
        // When (layout)

        const el = sandbox();
        el.innerHTML = "<div id='infinite'></div>";

        const inst = new InfiniteGrid("#infinite", {
          isOverflowScroll,
          horizontal: true,
        });

        const layout = new GridLayout();
        inst.setLayout(layout);

        const layoutCompleteHandler2 = sinon.spy(e => {
          const item1 = inst._items.getStatus()._data[0].items;
          const item2 = this.inst._items.getStatus()._data[0].items;

          expect(item1.map(e1 => e1.rect))
            .to.be.deep.equals(item2.map(e1 => e1.rect));
          done();
        });
        inst.on("layoutComplete", layoutCompleteHandler2);
        // Given
        
        const layoutCompleteHandler = sinon.spy(function(e) {
          // Then
          expect(e.target).to.have.lengthOf(count);
          expect(this.getItems(true)).to.have.lengthOf(count);
          expect(this.getItems(false)).to.have.lengthOf(count);
          expect(this._isProcessing()).to.be.false;

          inst._renderer.container.innerHTML = items.join("");
          inst.layout();
        });
  

        cleanup();
        // When
        this.inst.on("layoutComplete", layoutCompleteHandler);
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        // Then
        expect(this.inst.isProcessing()).to.be.false;
        expect(layoutCompleteHandler.calledOnce).to.be.false;

        this.inst._renderer.container.innerHTML = items.join("");
        this.inst.layout();
        

      });
      it(`should check a initialization (isOverflowScroll: ${isOverflowScroll})`, done => {
        // Given
        const count = 10;
        const items = getItems(count);
        const layoutCompleteHandler = sinon.spy(function(e) {
          // Then
          expect(e.target).to.have.lengthOf(count);
          expect(this.getItems(true)).to.have.lengthOf(count);
          expect(this.getItems(false)).to.have.lengthOf(count);
          expect(this._isProcessing()).to.be.false;
          done();
        });
  
        // When
        this.inst.on("layoutComplete", layoutCompleteHandler);
  
        // Then
        expect(this.inst.isProcessing()).to.be.false;
        expect(layoutCompleteHandler.calledOnce).to.be.false;
        
        // When (layout)
        this.inst._renderer.container.innerHTML = items.join("");
        this.inst.layout();
      });
    });
  });
  [true, false].forEach(isOverflowScroll => {
    describe("When scrolling append/prepend event Test", function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle: true,
          isOverflowScroll
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
      
      [APPEND, PREPEND].forEach(isAppend => {
        const ITEMCOUNT = 30;
        const RETRY = 7;
        it(`should trigger ${isAppend ? "append" : "prepend"} event when scrolling (isOverflowScroll: ${isOverflowScroll})`, done => {
          // Given
          // When
          this.inst.on(isAppend ? "append" : "prepend", param => {
            expect(param.isTrusted).to.a.true;
            expect(param.groupKey).to.be.equal(param.currentTarget.getGroupKeys()[isAppend ? "pop" : "shift"]());
            done();
          });
          const handler = insert(this.inst, isAppend, () => {
            const lastParam = handler.getCall(handler.callCount - 1).args[0];

            if (isAppend) {
              const spot = lastParam.size;

              this.inst._watcher.scrollTo(spot / 2);
              setTimeout(() => {
                this.inst._watcher.scrollTo(spot);
              }, 100);
            } else {
              this.inst._watcher.scrollTo(this.inst._getEdgeValue("end") / 2);
              setTimeout(() => {
                this.inst._watcher.scrollTo(0);  
              }, 100);
              
              
            }
          }, ITEMCOUNT, RETRY);
        });
      });
    });
  });  
  [true, false].forEach(isOverflowScroll => {
    describe(`When scrolling append event isScroll Test (isOverflowScroll: ${isOverflowScroll})`, function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite' style='height: 250px;position:absolute;top:0;left:0;'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle: true,
          isOverflowScroll,
          margin: 5,
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
      it(`should trigger append method when appending (isOverflowScroll: ${isOverflowScroll}, defense:${DEFENSE_BROWSER})`, done => {
        this.inst.on("layoutComplete", e => {
          const isScroll = e.isScroll;
          const size = isOverflowScroll ? 250 : innerHeight(window);

          if (e.size <= size) {
            expect(isScroll).to.be.false;
          } else {
            expect(isScroll).to.be.true;
          }
          if (!isScroll) {
            
            this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);    
          } else {
            done();
          }
        });
        this.inst.append(`<div class="item" style="width: 100%; height: 100px;">Item</div>`);
      });
    });
  });
  [true, false].forEach(useRecycle => {
    describe(`When prepending fit test(DEFENSE_BROWSER: ${DEFENSE_BROWSER})`, function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle,
          margin: 5,
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
      it(`should trigger fit method(useRecycle=${useRecycle})`, done => {
        // Then
        this.inst.on("layoutComplete", e => {
          expect(e.target[0].rect.top).to.be.equals(0);
          this.inst._items.fit(-100, false);
          expect(e.target[0].rect.top).to.be.equals(100);
          expect(this.inst._getEdgeValue("start")).to.be.equals(100);

          if (DEFENSE_BROWSER || !useRecycle) {
            expect(this.inst._fit("before")).to.be.equals(0);
            expect(e.target[0].rect.top).to.be.equals(100);
            expect(this.inst._fit("after")).to.be.equals(0);
          } else {
            expect(this.inst._fit("before")).to.be.equals(100);
            expect(e.target[0].rect.top).to.be.equals(0);
            expect(this.inst._fit("after")).to.be.equals(0);
          }
          done();
        });
        // Given
        this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);
      });
      it(`should trigger fit method with loadingBar(useRecycle=${useRecycle})`, done => {
        // Given
        this.inst.setLoadingBar({
          "prepend": `<div class="prepend" style="width: 100px;height: 100px;display:none;">PREPEND</div>`,
          "append": `<div class="append" style="height: 75px; height: 75px;display:none;">APPEND</div>`,
        });

        // Then
        this.inst.on("layoutComplete", e => {
          this.inst._items.fit(-50, false);
          this.inst.startLoading(false);
          expect(e.target[0].rect.top).to.be.equals(100);
          expect(this.inst._getEdgeValue("start")).to.be.equals(100);

          if (DEFENSE_BROWSER || !useRecycle) {
            expect(this.inst._fit()).to.be.equals(0);
            expect(e.target[0].rect.top).to.be.equals(100);
            expect(this.inst._fit()).to.be.equals(0);
          } else {
            expect(this.inst._fit()).to.be.equals(100);
            expect(e.target[0].rect.top).to.be.equals(100);
          }
          this.inst.endLoading();
          expect(e.target[0].rect.top).to.be.equals(0);
          done();
        });
        
        // When
        this.inst.append(`<div class="item" style="width: 100%; height: 50px;">Item</div>`);
      });
    });
  });
  describe(`When appending, image test`, function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new InfiniteGrid("#infinite", {
        margin: 5,
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
    it(`should check append error images`, done => {
      this.inst.on("imageError", e => {
        expect(e.target.src).to.have.string("1.jpg");
        expect(e.itemIndex).to.be.equals(1);
        done();
      });
      this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg">`);
    });
    it(`should check append multiple error images`, done => {
      // Given
      let count = 0;

      // Then
      this.inst.on("imageError", e => {
        ++count;

        expect(e.itemIndex).to.be.not.equals(0);
        if (count === 3) {
          done();
        }
      });

      // When
      this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg"><img src="/1.jpg"><img src="/2.jpg">`);
    });
    it(`should check append error image and test error event remove method`, done => {
      const error = sinon.spy(e => {
        e.remove();
      });
      const complete2 = e => {
        expect(error.callCount).to.be.equals(2);
        expect(this.inst._items._data[0].items[1].content).to.not.have.string("img");
        expect(this.inst._items._data[0].items).to.be.lengthOf(2);
        done();
      };
      const complete1 = e => {
        this.inst.on("layoutComplete", complete2);
        this.inst.off("layoutComplete", complete1);
      };
      this.inst.on("layoutComplete", complete1);
      this.inst.on("imageError", error);

      this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><div><img src="/1.jpg"></div><img src="/2.jpg">`);
    });
    it(`should check append error image and test error event removeItem method`, done => {
      const error = sinon.spy(e => {
        e.removeItem();
      });
      const complete2 = e => {
        expect(error.callCount).to.be.equals(2);
        expect(this.inst._items._data[0].items).to.be.lengthOf(1);
        done();
      };
      const complete1 = e => {
        this.inst.on("layoutComplete", complete2);
        this.inst.off("layoutComplete", complete1);
      };
      this.inst.on("layoutComplete", complete1);
      this.inst.on("imageError", error);

      this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><div><img src="/1.jpg"></div><img src="/2.jpg">`);
    });
    it(`should check append error image and test error event replace method`, done => {
      const error = sinon.spy(e => {
        e.replace("/base/test/unit/images/error.png");
      });
      const complete2 = e => {
        expect(error.calledOnce).to.be.true;
        expect(this.inst._items._data[0].items[1].content).to.have.string("error.png");
        expect(this.inst._items._data[0].items[1].el.src).to.have.string("error.png");
        done();
      };
      const complete1 = e => {
        this.inst.on("layoutComplete", complete2);
        this.inst.off("layoutComplete", complete1);
      };
      this.inst.on("layoutComplete", complete1);
      this.inst.on("imageError", error);

      this.inst.append(`<img src="/base/test/unit/image/3.jpg" /><img src="/1.jpg">`);
    });
    it(`should check append error image and test error event replace method(element)`, done => {
      const error = sinon.spy(e => {
        e.replace("<p>it's error</p>");
      });
      const complete2 = e => {
        expect(error.calledOnce).to.be.true;
        expect(this.inst._items._data[0].items[1].content).to.have.string("it's error");
        expect(this.inst._items._data[0].items[1].content).to.have.string("HEADER");
        expect(this.inst._items._data[0].items[1].content).to.have.string("FOOTER");
        expect(this.inst._items._data[0].items[1].el.innerHTML).to.have.string("it's error");
        done();
      };
      const complete1 = e => {
        this.inst.on("layoutComplete", complete2);
        this.inst.off("layoutComplete", complete1);
      };
      this.inst.on("layoutComplete", complete1);
      this.inst.on("imageError", error);

      this.inst.append(`<div>HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`);
    });
    it(`should check append error image and test error event replaceItem method`, done => {
      const error = sinon.spy(e => {
        e.replaceItem("<p>it's error</p>");
      });
      const complete2 = e => {
        expect(error.calledOnce).to.be.true;
        expect(this.inst._items._data[0].items[1].content).to.have.string("it's error");
        expect(this.inst._items._data[0].items[1].content).to.not.have.string("HEADER");
        expect(this.inst._items._data[0].items[1].content).to.not.have.string("FOOTER");
        expect(this.inst._items._data[0].items[1].el.innerHTML).to.have.string("it's error");
        done();
      };
      const complete1 = e => {
        this.inst.on("layoutComplete", complete2);
        this.inst.off("layoutComplete", complete1);
      };
      this.inst.on("layoutComplete", complete1);
      this.inst.on("imageError", error);

      this.inst.append(`<div>HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`);
    });
  });
  describe(`When image processing, fit test`, function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new InfiniteGrid("#infinite", {
        margin: 5,
        isOverflowScroll: true,
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
    it(`should check outline when image processing and fit occur at the same time`, done => {
      const item1 = `<div style="height:100px">HEADER<img src="/base/test/unit/image/3.jpg" />FOOTER</div><div>HEADER<img src="/1.jpg">FOOTER</div>`;
      const layoutComplete2 = sinon.spy(e => {
        const length = this.inst._items._data.length;

        const group1 = this.inst._items._data[length - 2];
        const group2 = this.inst._items._data[length - 1];
        expectConnectGroupsOutline(group1, group2);
        done();
      });
      insert(this.inst, true, () => {
        const container = this.el.querySelector("#infinite");

        container.scrollTop = 50000;

        const pos = this.inst._watcher.getScrollPos();

        setTimeout(() => {
          this.inst._infinite.recycle(pos, true);
          this.inst.on("layoutComplete", layoutComplete2);
          this.inst.append(item1);
          this.inst._fit();
        }, 10);

      }, 10, 20);
      
    });
  });
  [true, false].forEach(isOverflowScroll => {
    describe(`When appending/prepending loadingStart/loaingEnd event Test (isOverflowScroll: ${isOverflowScroll}, DEFENSE_BROWSER: ${DEFENSE_BROWSER})`, function() {
      beforeEach(() => {
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle: true,
          isOverflowScroll,
          margin: 5,
        });
        this.inst.setLoadingBar({
          "prepend": `<div class="prepend" style="width: 100px;height: 100px;display:none;">PREPEND</div>`,
          "append": `<div class="append" style="height: 75px; height: 75px;display:none;">APPEND</div>`,
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
      
      [APPEND, PREPEND].forEach(isAppend => {
        const ITEMCOUNT = 30;
        const RETRY = 1;
        it(`should trigger startLoading/endLoading method when ${isAppend ? "appending" : "prepending"} (isOverflowScroll: ${isOverflowScroll}, defense:${DEFENSE_BROWSER})`, done => {
          // Given
          // When
          expect(this.inst._isLoading()).to.be.false;
          this.inst.startLoading(isAppend);
          expect(this.inst.getLoadingBar()).to.be.equal(this.inst.getLoadingBar(isAppend));
          expect(this.inst.getLoadingBar(isAppend).style.display).to.be.equal("block");
          expect(this.inst._isLoading()).to.be.true;
          expect(this.inst._getLoadingStatus()).to.be.equal(isAppend ? LOADING_APPEND : LOADING_PREPEND);
          expect(this.inst._status.loadingSize).to.be.equal(isAppend ? 75 : 100);
          if (!isOverflowScroll) {
            expect(innerHeight(this.inst._renderer.container)).to.be.equal(isAppend ? 75 : 100);
          }

          const layoutCompleteHandler = sinon.spy(e => {
            const lastParam = layoutCompleteHandler.getCall(layoutCompleteHandler.callCount - 1).args[0];

            if (!isOverflowScroll) {
              expect(innerHeight(this.inst._renderer.container)).to.be.equal(this.inst._getEdgeValue("end") - this.inst._getEdgeValue("start") + (isAppend ? 75 : 100));
            }
            expect(this.inst._isLoading()).to.be.true;
            if (isAppend) {
              expect(parseInt(this.inst.getLoadingBar().style.top, 10)).to.be.equal(this.inst._getEdgeValue("end"));
            }
          });
          const insertHandler = sinon.spy(e => {
            expect(this.inst._isLoading()).to.be.false;
            expect(this.inst._getLoadingStatus()).to.be.equal(0);
            expect(this.inst._status.loadingSize).to.be.equal(0);
            done();
          });
          this.inst.on("layoutComplete", layoutCompleteHandler);
          this.inst.on(isAppend ? "append" : "prepend", insertHandler);
          const handler = insert(this.inst, isAppend, () => {
            const base = this.inst._getEdgeValue("start");

            this.inst.endLoading();
            if (!isAppend) {
              expect(this.inst._getEdgeValue("start")).to.be.equal(0);
            }
            expect(this.inst._isLoading()).to.be.false;
            expect(this.inst._getLoadingStatus()).to.be.equal(0);
            expect(this.inst._status.loadingSize).to.be.equal(0);
            expect(this.inst.getLoadingBar(isAppend).style.display).to.be.equal("none");

            expect(layoutCompleteHandler.callCount).to.be.equal(2);
            expect(insertHandler.callCount).to.be.equal(0);

            const lastParam = handler.getCall(handler.callCount - 1).args[0];

            if (isAppend) {
              const spot = lastParam.size;
              this.inst._watcher.scrollTo(spot / 2);
              setTimeout(() => {
                this.inst._watcher.scrollTo(spot);
              }, 100);
            } else {
              this.inst._watcher.scrollTo(this.inst._getEdgeValue("end") / 2);
              setTimeout(() => {
                this.inst._watcher.scrollTo(0);
              }, 100);
            }
          }, ITEMCOUNT, 2);
        });
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
      
      [APPEND, PREPEND].forEach(isAppend => {
        const ITEMCOUNT = 30;
        const RETRY = 7;
  
        it(`should check a ${isAppend ? "append" : "prepend"} with recycle method (isOverflowScroll: ${isOverflowScroll})`, done => {
          // Given
          // When
          const handler = insert(this.inst, isAppend, () => {
            // Then
            expect(this.inst._infinite._status.startCursor).to.be.equal(0);
            expect(this.inst._infinite._status.endCursor).to.be.equal(RETRY - 1);
            expect(this.inst.getGroupKeys()).to.have.lengthOf(RETRY);
    
            // Given
            const centerEndValue = this.inst._items
              .getEdgeValue(isAppend ? "end" : "start", this.inst._infinite._status.startCursor, 3);
    
            // When
            this.inst._watcher.scrollTo(centerEndValue);
            setTimeout(() => {
              this.inst._infinite.recycle(centerEndValue, isAppend);
              // Then
              expect(this.inst.getGroupKeys()).to.have.lengthOf.below(RETRY);
              done();
            }, 100);
          }, ITEMCOUNT, RETRY);
        });
      });
    });
  });  
  describe("isEqualSize option Test", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      this.inst = new InfiniteGrid("#infinite", {
        isEqualSize: true,
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
    it(`should check isEqualSize option`, done => {
      // Given
      // When
      insert(this.inst, true, () => {
        const datas = this.inst._items._data;

        const standardSize = datas[0].items[0].size;
        datas.forEach(({items}) => {
          items.forEach(({size}) => {
            expect(size).to.deep.equals(standardSize);
          });
        })
        done();
      }, 5, 4);
    });
  });
  [true, false].forEach(useRecycle => {
    describe(`moveTo method Test(useRecycle=${useRecycle}, defense=${DEFENSE_BROWSER})`, function() {
      beforeEach(() => {
        document.body.style.marginBottom = "0px";
        document.body.style.padding = "0px";
        document.body.insertAdjacentHTML("beforeend", `
        <style>
        * {
          box-sizing:border-box;
        }
        </style>
        `);
        this.el = sandbox();
        this.el.innerHTML = "<div id='infinite'></div>";
        this.inst = new InfiniteGrid("#infinite", {
          useRecycle,
        });
        this.inst.setLayout(GridLayout);
      });
      afterEach(() => {
        if (this.inst) {
          this.inst.destroy();
          this.inst = null;
          document.body.scrollTop = 0;
        }
        cleanup();
      });
      [-1, 0, 2, 5, 7, 9].forEach(itemIndex => {
        it(`should moveTo in cursor inside(isAppend = true, itemIndex=${itemIndex})`, done => {
            insert(this.inst, true, () => {1

              const scrollPos = Math.max(...this.inst._items._data[5].outlines.start);
              const moveTo = itemIndex === -1 ? Math.max(...this.inst._items._data[8].outlines.start) :
                this.inst._items._data[8].items[itemIndex].rect.top;

              this.inst._setScrollPos(scrollPos);
              this.inst._scrollTo(scrollPos);
              this.inst._infinite.recycle(scrollPos, true);
              this.inst.moveTo(8, itemIndex);

              setTimeout(() => {
                // not fit
                expect(this.inst._watcher.getScrollPos()).to.equal(moveTo);
                done();
              }, 20);
            }, 10, 10);
        });
        it(`should moveTo in cursor inside(isAppend = false, itemIndex=${itemIndex})`, done => {
          insert(this.inst, true, () => {
            const scrollPos = Math.max(...this.inst._items._data[6].outlines.start);

            this.inst._watcher.setScrollPos(scrollPos);
            this.inst._watcher.scrollTo(scrollPos);
            this.inst._infinite.recycle(scrollPos, true);

            // fit
            this.inst.moveTo(5, itemIndex);

            setTimeout(() => {
              const moveTo = itemIndex === -1 ? Math.max(...this.inst._items._data[5].outlines.start) :
              this.inst._items._data[5].items[itemIndex].rect.top;

              expect(this.inst._watcher.getScrollPos()).to.be.at.most(moveTo);
              done();
            }, 20);
          }, 10, 10);
        });
        it(`should moveTo in cursor outside(isAppend = true, itemIndex = ${itemIndex})`, done => {
          insert(this.inst, true, () => {
            const start = Math.max(...this.inst._items._data[5].outlines.start);
            let moveTo = itemIndex === -1 ? Math.max(...this.inst._items._data[5].outlines.start) :
              this.inst._items._data[5].items[itemIndex].rect.top;


            this.inst._watcher.setScrollPos(1);
            this.inst._watcher.scrollTo(1);
            this.inst._infinite.recycle(1, false);
            this.inst.moveTo(5, itemIndex);
            
            setTimeout(() => {
              if (moveTo < start) {
                moveTo = this.inst._items._data[5].items[itemIndex].rect.top;
              }
              const end = Math.max(...this.inst._items._data[5].outlines.end);

              if (useRecycle && moveTo + this.inst._renderer.getViewSize() > end) {
                moveTo = end - this.inst._renderer.getViewSize();
                if (moveTo !== this.inst._watcher.getScrollPos()) {
                  moveTo = this.inst._getEdgeValue("end") - this.inst._renderer.getViewSize();  
                }
              }
              
              const scrollPos = this.inst._watcher.getScrollPos();
              expect(this.inst._watcher.getScrollPos()).to.equal(moveTo);
              done();
            }, 40);
          }, 10, 10);
        });
        it(`should moveTo in cursor outside(isAppend = false, itemIndex = ${itemIndex})`, done => {
          insert(this.inst, true, () => {
            const scrollPos = Math.max(...this.inst._items._data[6].outlines.start);

            this.inst._watcher.setScrollPos(scrollPos);
            this.inst._watcher.scrollTo(scrollPos);
            this.inst._infinite.recycle(scrollPos, true);

            this.inst.moveTo(1, itemIndex);
            
            setTimeout(() => {
              const size = this.inst._getEdgeValue("end");
              let moveTo = itemIndex === -1 ? Math.max(...this.inst._items._data[1].outlines.start) :
              this.inst._items._data[1].items[itemIndex].rect.top;

              expect(this.inst._watcher.getScrollPos()).to.equal(moveTo);
              done();
            }, 30);
          }, 10, 10);
        });
      
        it(`should resize and moveTo in cursor outside(isAppend = true, itemIndex = ${itemIndex})`, done => {
          insert(this.inst, true, () => {
            const scrollPos = Math.max(...this.inst._items._data[4].outlines.start);

            this.inst._watcher.setScrollPos(scrollPos);
            this.inst._watcher.scrollTo(scrollPos);
            this.inst._infinite.recycle(scrollPos, true);
            this.inst._infinite.recycle(scrollPos, false);
            this.inst.layout(true);

            setTimeout(() => {
              this.inst.moveTo(7, itemIndex);
              setTimeout(() => {
                let moveTo = itemIndex > -1 ? this.inst._items._data[7].items[itemIndex].rect.top :
                  Math.max(...this.inst._items._data[7].outlines.start);


                const end = Math.max(...this.inst._items._data[7].outlines.end);
  
                if (useRecycle && moveTo + this.inst._renderer.getViewSize() > end) {
                  moveTo = end - this.inst._renderer.getViewSize();
                }
                expect(this.inst._watcher.getScrollPos()).to.equal(moveTo);
                done();
              }, 30);
            }, 30);
          }, 10, 10);
        });
        it(`should resize and moveTo in cursor outside(isAppend = false, itemIndex = ${itemIndex})`, done => {
          insert(this.inst, true, () => {
            const scrollPos = Math.max(...this.inst._items._data[7].outlines.start);

            this.inst._watcher.setScrollPos(scrollPos);
            this.inst._watcher.scrollTo(scrollPos);
            this.inst._infinite.recycle(scrollPos, true);
            this.inst._infinite.recycle(scrollPos, false);
            this.inst.layout(true);

            setTimeout(() => {
            this.inst.moveTo(3, itemIndex);
              setTimeout(() => {
                let moveTo = itemIndex > -1 ? this.inst._items._data[3].items[itemIndex].rect.top :
                  Math.max(...this.inst._items._data[3].outlines.start);
                const end = Math.max(...this.inst._items._data[3].outlines.end);

                if (useRecycle && moveTo + this.inst._renderer.getViewSize() > end) {
                  moveTo = end - this.inst._renderer.getViewSize();
                }                
                expect(this.inst._watcher.getScrollPos()).to.equal(moveTo);
                done();
              }, 30);
            }, 30);
          }, 10, 10);
        });
      });
      it(`should moveTo in cursor end(isAppend = true)`, done => {
        insert(this.inst, true, () => {
          this.inst.on("layoutComplete", e => {
            this.inst.off("layoutComplete");
            const scrollPos = Math.max(...this.inst._items._data[10].outlines.start);

            this.inst._infinite.recycle(scrollPos, false);

            setTimeout(() => {
            this.inst.moveTo(10);
              setTimeout(() => {
                const moveTo = Math.max(...this.inst._items._data[10].outlines.start);

                expect(this.inst._watcher.getScrollPos()).to.be.not.equal(moveTo);
                expect(Math.max(...this.inst._items._data[10].outlines.end) - this.inst._watcher.getScrollPos()).to.be.equal(this.inst._renderer.getViewSize());
                done();
              }, 20);
            }, 30);  
          });
          this.inst.append(
            [`<div style="width: 100px; height: 100px;">test1</div>`,
            `<div style="width: 100px; height: 100px;">test2</div>`]);
        }, 15, 10);
      });
      it(`should resize and moveTo in cursor end(isAppend = true)`, done => {
        insert(this.inst, true, () => {
          this.inst.on("layoutComplete", e => {
            this.inst.off("layoutComplete");
            const scrollPos = Math.max(...this.inst._items._data[10].outlines.start);

            this.inst._infinite.recycle(scrollPos, false);
            this.inst.layout(true);

            setTimeout(() => {
            this.inst.moveTo(10);
              setTimeout(() => {
                const moveTo = Math.max(...this.inst._items._data[10].outlines.start);

                expect(this.inst._watcher.getScrollPos()).to.be.not.equal(moveTo);
                expect(Math.max(...this.inst._items._data[10].outlines.end) - this.inst._watcher.getScrollPos()).to.be.equal(this.inst._renderer.getViewSize());
                done();
              }, 20);
            }, 30);  
          });
          this.inst.append(
            [`<div style="width: 100px; height: 100px;">test1</div>`,
            `<div style="width: 100px; height: 100px;">test2</div>`,
            `<div style="width: 100px; height: 100px;">test3</div>`,
            `<div style="width: 100px; height: 100px;">test4</div>`]);
        }, 15, 10);
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
    [true, false].forEach(horizontal => {
      it(`should set '${horizontal}' horizontal of options`, () => {
        // Given
        this.inst.options.horizontal = horizontal;
        this.inst._isVertical = !horizontal;
        
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
          if (this.inst.options.horizontal) {
            expect(this.inst._layout.options.horizontal).to.be.equal(true);
          } else {
            expect(this.inst._layout.options.horizontal).to.be.equal(false);
          }
          
          expect(this.inst._layout instanceof v).to.be.true;
        });
      });
    });
  });
  describe("data type Test", function() {
    const makeData = function(isHTMLElement) {
      const complicatedHTML = "<div class='item'><div class='thumbnail'><img class='img-rounded' src='#' /><div class='caption'><p><a href='http://www.naver.com'></a></p></div></div></div>";
      const data = [];
      
      for (let i = 0; i < 100; i++) {
        if (isHTMLElement) {
          const dummy = document.createElement("div");

          dummy.innerHTML = complicatedHTML;
          data.push(dummy.firstChild);
        } else {
          data.push(complicatedHTML);
        }
      }
      return data;
    }

    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = "<div id='infinite'></div>";
      window.jQuery = $;
      this.inst = new InfiniteGrid("#infinite");
      this.inst.setLayout(GridLayout);      
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    const testcase = {
      "stringType": function() {
        return makeData().join("");
      },
      "arrryStringType": function() {
        return makeData();
      },
      "arrryHTMLElementType": function() {
        return makeData(true);
      },
      "jQueryType": function() {
        return $(makeData());
      }
    };
    Object.keys(testcase).forEach(v => {
      it(`should check type - '${v}'`, done => {
        // Given
        
        const layoutCompleteHandler = sinon.spy(function(e) {
          // Then
          expect(e.target).to.have.lengthOf(100);
          expect(this.getItems(true)).to.have.lengthOf(100);
          expect(this._isProcessing()).to.be.false;
          done();
        });
        
        // When
        this.inst.on("layoutComplete", layoutCompleteHandler);
        this.inst.append(testcase[v]());
      });
    });
  });
});
