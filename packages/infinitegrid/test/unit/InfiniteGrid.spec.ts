import { cleanup, sandbox, waitEvent, waitFor } from "./utils/utils";
import InfiniteGrid from "../../src/InfiniteGrid";
import { SampleGrid, SampleGridOptions } from "./samples/SampleGrid";
import { flat, toArray } from "../../src/utils";
import {
  InfiniteGridOptions,
  OnRenderComplete,
  OnRequestAppend,
  OnRequestPrepend,
  OnContentError,
  OnChangeScroll,
  STATUS_TYPE,
  ITEM_TYPE,
} from "../../src";
import * as sinon from "sinon";
import { MOUNT_STATE } from "@egjs/grid";

describe("test InfiniteGrid", () => {
  let ig: InfiniteGrid | null;
  let container: HTMLElement | null;
  beforeEach(() => {
    container = sandbox({ class: "sample" })!;
    container!.style.cssText = "";
  });

  afterEach(() => {
    if (ig) {
      ig!.destroy();
    }
    ig = null;
    container = null;
    cleanup();
  });
  describe("Initialzation", () => {
    it("should check if container elements are the same", () => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 500px;">
        <div>11</div>
        <div>22</div>
        <div>33</div>
        <div>44</div>
        <div>55</div>
        <div>66</div>
      </div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
      });

      // When, Then
      expect(ig!.getWrapperElement()).to.be.equals(wrapper);
      expect(ig!.getScrollContainerElement()).to.be.equals(wrapper);
      expect(ig!.getItems().length).to.be.equals(0);
    });
    it("should check if scrollContainer changes the scroll area instead of window", async () => {
      // Given
      container!.innerHTML = `
      <div class="scroller" style="width: 100%; height: 500px;">
        <div class="wrapper" style="width: 100%;">
          <div>11</div>
          <div>22</div>
          <div>33</div>
          <div>44</div>
          <div>55</div>
          <div>66</div>
        </div>
      </div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;

      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        scrollContainer: ".scroller",
      });

      // When, Then
      expect(ig!.getWrapperElement()).to.be.equals(wrapper);
      expect(ig!.getContainerElement()).to.be.equals(wrapper);
      expect(ig!.getScrollContainerElement()).to.be.equals(wrapper.parentElement);
    });
  });
  describe("test rendering", () => {
    beforeEach(() => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 500px;">
      </div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
      });
    });
    it("should check to render children when items are not present", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      igContainer.innerHTML = `<div>11</div>
      <div>22</div>
      <div>33</div>
      <div>44</div>
      <div>55</div>
      <div>66</div>`;
      const children = toArray(igContainer.children);

      // When
      ig!.renderItems();

      await waitEvent(ig!, "renderComplete");


      const firstItem = ig!.getItems()[0];

      // Then
      ig!.getItems().forEach((item) => {
        expect(item.groupKey).to.be.equals(firstItem.groupKey);
      });
      ig!.getGroups().forEach((group) => {
        expect(group.groupKey).to.be.equals(firstItem.groupKey);
      });
      ig!.getVisibleGroups().forEach((group) => {
        expect(group.groupKey).to.be.equals(firstItem.groupKey);
      });

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
    });
    it("should check to render children when removing items immediately after rendering children", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      igContainer.innerHTML = `<div>11</div>
      <div>22</div>
      <div>33</div>
      <div>44</div>
      <div>55</div>
      <div>66</div>`;
      // When
      ig!.renderItems();
      ig!.removeByIndex(0);


      await waitEvent(ig!, "renderComplete");

      // Then
      // 2 3 4 5 6
      toArray(igContainer.children).forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
        expect(child.innerHTML).to.be.equals(`${i + 2}`);
      });
    });
    it("should check if items are rendered", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div>${child}${child}</div>`,
        };
      }));
      // When
      ig!.setCursors(0, 1);

      const e = await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      const children = toArray(igContainer.children);

      ig?.getItems().forEach(itm => {
        console.log(itm.cssRect, itm.mountState, itm.updateState);
      })
      // Then
      expect(e.startCursor).to.be.equals(0);
      expect(e.endCursor).to.be.equals(1);
      expect(ig!.getItems().map((item) => item.groupKey)).to.be.deep.equals([0, 0, 0, 1, 1, 1]);
      expect(ig!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(children.length).to.be.equals(6);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
    });
    it("should check if items are added in order even if items are added in own group", async () => {
      // Given
      ig!.syncItems([0, 2, 4, 6, 8, 10].map((child) => {
        return {
          key: child,
          html: `<div>${child}</div>`,
        };
      }));

      ig!.setCursors(0, 0);

      await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // When
      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((child) => {
        return {
          key: child,
          html: `<div>${child}</div>`,
        };
      }));
      await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // Then
      expect(ig!.getItems()).to.be.lengthOf(11);
      expect(ig!.getVisibleItems()).to.be.lengthOf(11);

      const firstGroupKey = ig!.getItems()[0].groupKey;

      ig!.getItems().forEach((item, i) => {
        // All items have the same group, and the key is the same as the index.
        expect(item.groupKey).to.be.equals(firstGroupKey);
        expect(item.key).to.be.equals(i);
      });
    });
    it("should check if only visible items are rendered", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div style="height: 250px">${child}</div>`,
        };
      }));

      ig!.setCursors(0, 1);

      // When
      await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // one more [0, 1] => [0]
      const e = await waitEvent<OnRenderComplete>(ig!, "renderComplete");
      const children = toArray(igContainer.children);

      // Then
      expect(e.startCursor).to.be.equals(0);
      expect(e.endCursor).to.be.equals(0);
      expect(e.items).to.be.deep.equals(ig!.getVisibleItems());
      expect(e.groups).to.be.deep.equals(ig!.getVisibleGroups());
      expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0]);
      expect(children.length).to.be.equals(3);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 250}px`);
      });
    });
    it("should check whether it is rendered even if gropukey is changed", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div style="height: 50px">${child}</div>`,
        };
      }));
      ig!.setCursors(0, 1);

      await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // When
      // 0, 1, 2, 3, 4, 5 => 3, 4, 5
      ig!.syncItems([3, 4, 5].map((child) => {
        return {
          groupKey: 0,
          key: child,
          html: `<div style="height: 250px">${child}</div>`,
        };
      }));

      const e = await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // Then
      expect(e.startCursor).to.be.equals(0);
      expect(e.endCursor).to.be.equals(0);
      expect(e.groups.length).to.be.deep.equals(1);
      expect(e.groups[0].groupKey).to.be.deep.equals(0);
    });
    it("should check whether it is rendered after changing options", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div>${child}</div>`,
        };
      }));

      ig!.setCursors(0, 1);

      await waitEvent(ig!, "renderComplete");


      // When
      // 0 => 5
      ig!.gap = 5;
      ig!.renderItems();

      await waitEvent(ig!, "renderComplete");

      // Then
      const children = toArray(igContainer.children);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 23}px`);
      });
    });
    it("should check that the mounte state is mounted only in the visible area after rendering.", async () => {
      // Given
      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div style="height: 250px">${child}</div>`,
        };
      }));

      // render [0, 2]
      ig!.setCursors(0, 2);
      await waitEvent(ig!, "renderComplete");

      // render only [0, 0]
      await waitEvent(ig!, "renderComplete");

      // When
      // Render elements
      setTimeout(() => {
        // Check ready
        setTimeout(() => {
          ig!.setCursors(0, 2);
        });
      });
      ig!.setCursors(0, 1);
      const e = await waitEvent<OnRenderComplete>(ig!, "renderComplete");

      // 1 ~ 1
      const mounteStates = e.mounted.map((item) => item.mountState);
      // 0 ~ 2
      const allMountStates = e.items.map((item) => item.mountState);

      await waitEvent(ig!, "renderComplete");

      // Then
      expect(mounteStates).to.be.lengthOf(3);
      // 0 ~ 5 MOUNTED
      for (let i = 0; i < 6; ++i) {
        expect(allMountStates[i]).to.be.equal(MOUNT_STATE.MOUNTED);
      }
      // 6 ~ 8 UNMOUNTED
      for (let i = 6; i < 9; ++i) {
        expect(allMountStates[i]).to.be.equal(MOUNT_STATE.UNMOUNTED);
      }
    });
    describe("test append, prepend, insert, insertByGroupIndex", () => {
      it("should check if render is complete after append", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.append([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: child,
            html: `<div style="height: 250px">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);
        expect(ig!.getItems().map((item) => item.groupKey)).to.be.deep.equals([0, 0, 0, 1, 1, 1]);
        expect(ig!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
        expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0]);
        expect(children.length).to.be.equals(3);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 250}px`);
        });
      });
      it("should check if startOutline is set to 0 when prepend", async () => {
        // Given
        ig!.destroy();
        container!.innerHTML = `<div class="wrapper" style="width: 100%; height: 500px;"></div>`;
        ig = new InfiniteGrid<InfiniteGridOptions>(container!.querySelector<HTMLElement>(".wrapper")!, {
          gridConstructor: SampleGrid,
          container: true,
          defaultDirection: "start",
        });
        ig!.prepend([0, 1, 2, 3, 4].map((child) => {
          return {
            groupKey: Math.floor(child / 5),
            key: child,
            html: `<div style="height: 200px;">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");

        // Then
        expect(ig!.getGroups()[0].grid.getOutlines()).to.be.deep.equals({
          start: [0],
          end: [1000],
        });
      });
      it("should check if the scroll position changes when prepend", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.append([0, 1, 2, 3, 4].map((child) => {
          return {
            groupKey: Math.floor(child / 5),
            key: child,
            html: `<div style="height: 200px;">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");


        ig!.prepend([5, 6, 7, 8, 9].map((child) => {
          return {
            groupKey: Math.floor(child / 5),
            key: child,
            html: `<div style="height: 200px;">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);

        expect(ig!.getItems().map((item) => item.groupKey)).to.be.deep.equals([1, 1, 1, 1, 1, 0, 0, 0, 0, 0]);
        expect(ig!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([1, 0]);
        expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([1, 0]);
        expect(ig!.getScrollContainerElement().scrollTop).to.be.equals(1000);
        expect(children.length).to.be.equals(10);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 200}px`);
        });
      });
      it("should check if item can be inserted in the center", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 6, 7, 8].map((child) => {
          return {
            groupKey: Math.floor(child / 5),
            key: child,
            html: `<div style="height: 10px;">${child}</div>`,
          };
        }));
        ig!.renderItems();

        await waitEvent(ig!, "renderComplete");

        // When
        // 0 1 2 [3 4 5] 6 7 8
        ig!.insert(3, [3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 5),
            key: child,
            html: `<div style="height: 10px;">${child}</div>`,
          };
        }));

        // Then
        const elements: HTMLElement[] = [].slice.call(ig!.getContainerElement().children);

        expect(elements.map((el) => el.innerHTML)).to.be.deep.equals(["0", "1", "2", "3", "4", "5", "6", "7", "8"]);
      });
      it("should check if the group is inserted to the center", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 6, 7, 8].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: child,
            html: `<div style="height: 10px;">${child}</div>`,
          };
        }));
        ig!.renderItems();

        await waitEvent(ig!, "renderComplete");

        // When
        // 0 1 2 [3 4 5] 6 7 8
        ig!.insertByGroupIndex(1, [3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: child,
            html: `<div style="height: 10px;">${child}</div>`,
          };
        }));

        // Then
        const elements: HTMLElement[] = [].slice.call(ig!.getContainerElement().children);

        expect(elements.map((el) => el.innerHTML)).to.be.deep.equals(["0", "1", "2", "3", "4", "5", "6", "7", "8"]);
      });
      it("should check if the offset is entered correctly when prepend", async () => {
        // Given
        // sufficient height so that scroll size does not occur
        const igScrollContainer = ig!.getScrollContainerElement();

        igScrollContainer.style.height = "1000px";
        ig!.isReachEnd = true;
        ig!.syncItems([3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: child,
            html: `<div style="height: 150px;">${child}</div>`,
          };
        }));
        ig!.renderItems({
          useResize: true,
        });

        await waitEvent(ig!, "renderComplete");

        const spy = sinon.spy();


        // When
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: child,
            html: `<div style="height: 150px;">${child}</div>`,
          };
        }));
        ig!.renderItems();

        // the requestPrepend event is fired because scrollPos is 0.
        ig!.once("requestPrepend", spy);
        await waitEvent(ig!, "renderComplete");

        // Then
        expect(ig!.getStartCursor()).to.be.equals(0);
        expect(ig!.getEndCursor()).to.be.equals(1);
        expect(spy.called).to.be.true;
      });
    });
    describe("test contentError event", () => {
      it("should check if contentError event occurs with error image", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: 0,
            key: `key${child}`,
            html: `<div style="height: 150px">${child === 2 ? `<img src="ERR" />` : ""}</div>`,
          };
        }));
        ig!.renderItems();

        // When
        const e = await waitEvent<OnContentError>(ig!, "contentError");


        // Then
        expect(e.item.key).to.be.equals("key2");
      });
      it("should check if it is recalculated if removed", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: 0,
            key: `key${child}`,
            html: `<div style="height: 150px; width: 150px;">${child === 2 ? `<img src="ERR" />` : ""}</div>`,
          };
        }));
        ig!.on("contentError", (e) => {
          e.remove();
        });

        // When
        ig!.renderItems();

        await waitEvent<OnRenderComplete>(ig!, "renderComplete");

        // Then
        const children = toArray(ig!.getContainerElement().children);

        expect(ig!.getItems().length).to.be.equals(5);
        expect(children.length).to.be.equals(5);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 150}px`);
        });
      });
    });
    describe("test scroll event", () => {
      it("should check if scroll event occurs when scrolling", async () => {
        // Given
        const igScrollContainer = ig!.getScrollContainerElement();
        const igContainer = ig!.getContainerElement();

        igContainer.style.marginTop = "10px";
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 150px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        ig!.renderItems();

        await waitEvent(ig!, "renderComplete");


        // When
        // start to end
        igScrollContainer.scrollTop = 200;

        const e1 = await waitEvent<OnChangeScroll>(ig!, "changeScroll");

        igScrollContainer.scrollTop = 0;

        // end to start
        const e2 = await waitEvent<OnChangeScroll>(ig!, "changeScroll");

        // Then
        expect(e1.direction).to.be.equals("end");
        expect(e1.scrollPos).to.be.equals(200);
        expect(e1.relativeScrollPos).to.be.equals(190);

        expect(e2.direction).to.be.equals("start");
        expect(e2.scrollPos).to.be.equals(0);
        expect(e2.relativeScrollPos).to.be.equals(-10);
      });
      it("should check if the requestAppend event occurs when scrolling to the end", async () => {
        // Given
        const igScrollContainer = ig!.getScrollContainerElement();
        const igContainer = ig!.getContainerElement();

        igContainer.style.marginTop = "10px";
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 150px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        ig!.renderItems();

        await waitEvent(ig!, "renderComplete");


        // When
        // scroll to end
        igScrollContainer.scrollTop = 800;

        const e1 = await waitEvent<OnRequestAppend>(ig!, "requestAppend");

        // Then
        expect(e1.groupKey).to.be.equals(1);
      });
      it("should check if the requestPrepend event occurs when scrolling to the start", async () => {
        // Given
        const igScrollContainer = ig!.getScrollContainerElement();
        const igContainer = ig!.getContainerElement();

        igContainer.style.marginTop = "10px";
        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 150px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        ig!.renderItems();

        await waitEvent(ig!, "renderComplete");

        // scroll to end
        igScrollContainer.scrollTop = 800;

        await waitEvent<OnRequestAppend>(ig!, "requestAppend");

        // When
        // end to start
        igScrollContainer.scrollTop = 0;

        const e = await waitEvent<OnRequestPrepend>(ig!, "requestPrepend");

        // Then
        expect(e.groupKey).to.be.equals(0);
      });
    });
    describe("test wait, ready for data", () => {
      it("should check if the requestAppend event is not called if it is in the wait state", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 2);
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        const requestAppendSpy1 = sinon.spy();
        const requestAppendSpy2 = sinon.spy();

        ig!.wait("end");
        ig!.on("requestAppend", requestAppendSpy1);

        // not call append
        ig!.getScrollContainerElement().scrollTop = 300;
        await waitFor(100);
        ig!.off("requestAppend", requestAppendSpy1);

        ig!.ready();
        ig!.on("requestAppend", requestAppendSpy2);

        // call append
        ig!.getScrollContainerElement().scrollTop = 301;
        await waitFor(100);

        // Then
        expect(requestAppendSpy1.callCount).to.be.equals(0);
        expect(requestAppendSpy2.callCount).to.be.equals(1);
      });
      it("should check if the loading bar appears in the wait state", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 2);
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.setLoading({
          html: `<div class="loading" style="width: 100%; height: 80px"></div>`,
        });
        ig!.wait("end");

        await waitEvent(ig!, "renderComplete");

        // Then
        const children = ig!.getContainerElement().children;
        const lastElement = children[children.length - 1];

        expect(lastElement.className).to.be.equals("loading");
      });
    });
    describe("test remove methods", () => {
      it("should checks whether the item is removed when the removeByKey method is called", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        await waitEvent(ig!, "renderComplete");

        // When
        // 0 1 3 4 5
        ig!.removeByKey("key2");
        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);

        expect(ig!.getItems().map((item) => item.key)).to.be.deep.equals([0, 1, 3, 4, 5].map((key) => `key${key}`));
        expect(igContainer.children.length).to.be.equals(5);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 100}px`);
        });
      });
      it("should checks whether the item is removed when the removeByIndex method is called", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        await waitEvent(ig!, "renderComplete");

        // When
        // 0 1 3 4 5
        ig!.removeByIndex(2);
        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);

        expect(ig!.getItems().map((item) => item.key)).to.be.deep.equals([0, 1, 3, 4, 5].map((key) => `key${key}`));
        expect(igContainer.children.length).to.be.equals(5);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 100}px`);
        });
      });
      it("should checks whether the item is removed when the removeGroupByKey method is called", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        await waitEvent(ig!, "renderComplete");

        // When
        // 3 4 5
        ig!.removeGroupByKey(0);
        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);

        expect(ig!.getItems().map((item) => item.key)).to.be.deep.equals([3, 4, 5].map((key) => `key${key}`));
        expect(igContainer.children.length).to.be.equals(3);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 100}px`);
        });
      });
      it("should check if invisible group can be removed when the removeGroupByIndex method is called", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        // render all items (0, 3)
        ig!.setCursors(0, 3);
        await waitEvent(ig!, "renderComplete");
        // (0, 2)
        await waitEvent(ig!, "renderComplete");

        // When
        // [1, 2, 3, 4] => [1, 2, 3]
        ig!.removeGroupByIndex(0);
        await waitEvent(ig!, "renderComplete");

        // Then
        expect(ig!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([1, 2, 3]);
      });
      it("should checks whether the item is removed when the removeGroupByIndex method is called", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 1);
        await waitEvent(ig!, "renderComplete");

        // When
        // 3 4 5
        ig!.removeGroupByIndex(0);
        await waitEvent(ig!, "renderComplete");

        // Then
        const children = toArray(igContainer.children);

        expect(ig!.getItems().map((item) => item.key)).to.be.deep.equals([3, 4, 5].map((key) => `key${key}`));
        expect(igContainer.children.length).to.be.equals(3);

        children.forEach((child, i) => {
          expect(child.style.top).to.be.equals(`${i * 100}px`);
        });
      });
    });
    describe("test getStatus, setStatus", () => {
      it("should check if status has data attribute", async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");

        // When
        const status = ig!.getStatus();

        // Then
        expect(status.groupManager.groups[0].items[0].data).to.be.undefined;
      });
      it("should check if recovery is possible When you get the full status and setStatus", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        const children = [].slice.call(igContainer.children);
        const html = igContainer.outerHTML;

        ig!.setStatus(ig!.getStatus());
        await waitEvent(ig!, "renderComplete");

        // Then
        const children2 = [].slice.call(igContainer.children);
        const html2 = igContainer.outerHTML;

        expect(html2).to.be.equals(html);
        expect(ig!.getItems().length).to.be.equals(15);
        expect(ig!.getVisibleItems().length).to.be.equals(9);
        expect(ig!.getGroups().length).to.be.equals(5);
        expect(ig!.getVisibleGroups().length).to.be.equals(3);
        children2.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
      });
      it("should check if recovery is possible When you get the partial status and setStatus", async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        const children = [].slice.call(igContainer.children);
        const html = igContainer.outerHTML;

        ig!.setStatus(ig!.getStatus(STATUS_TYPE.REMOVE_INVISIBLE_GROUPS));
        await waitEvent(ig!, "renderComplete");

        const children2 = [].slice.call(igContainer.children);
        const html2 = igContainer.outerHTML;

        ig!.renderItems();
        await waitEvent(ig!, "renderComplete");

        // update outlines
        const children3 = [].slice.call(igContainer.children);
        const html3 = igContainer.outerHTML;

        // Then
        expect(ig!.getItems().length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(9);
        expect(ig!.getGroups().length).to.be.equals(3);
        expect(ig!.getVisibleGroups().length).to.be.equals(3);

        expect(html2).to.be.equals(html);
        children2.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
        expect(html3).to.be.not.equals(html);
        children3.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
      });
      it(`should check if recovery is possible When you get the partial status with minimized invisible items and setStatus`, async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        const children = [].slice.call(igContainer.children);
        const html = igContainer.outerHTML;

        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));
        await waitEvent(ig!, "renderComplete");

        const children2 = [].slice.call(igContainer.children);
        const html2 = igContainer.outerHTML;

        ig!.renderItems();
        await waitEvent(ig!, "renderComplete");

        // update outlines
        const children3 = [].slice.call(igContainer.children);
        const html3 = igContainer.outerHTML;

        // Then
        // items (9) virtual items (6)
        expect(ig!.getItems(true).length).to.be.equals(15);
        expect(ig!.getItems().length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(9);
        // groups (3) virtual groups (2)
        expect(ig!.getGroups(true).length).to.be.equals(5);
        expect(ig!.getGroups().length).to.be.equals(3);
        expect(ig!.getVisibleGroups().length).to.be.equals(3);

        expect(html2).to.be.equals(html);
        children2.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
        expect(html3).to.be.equals(html);
        children3.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
      });
      it(`should check if recovery is possible When you get the partial status with minimized invisible groups and setStatus`, async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        const children = [].slice.call(igContainer.children);
        const html = igContainer.outerHTML;

        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS));
        await waitEvent(ig!, "renderComplete");

        const children2 = [].slice.call(igContainer.children);
        const html2 = igContainer.outerHTML;

        ig!.renderItems();
        await waitEvent(ig!, "renderComplete");

        // update outlines
        const children3 = [].slice.call(igContainer.children);
        const html3 = igContainer.outerHTML;

        // Then
        expect(ig!.getItems(true).length).to.be.equals(9);
        expect(ig!.getItems().length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(9);
        // groups (3) virtual groups (2)
        expect(ig!.getGroups(true).length).to.be.equals(5);
        expect(ig!.getGroups().length).to.be.equals(3);
        expect(ig!.getVisibleGroups().length).to.be.equals(3);

        expect(html2).to.be.equals(html);
        children2.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
        expect(html3).to.be.equals(html);
        children3.forEach((el, i) => {
          expect(el).to.be.not.equal(children[i]);
        });
      });

      it(`should check whether it is possible to restore all virtual groups in the minimized status`, async () => {
        // Given
        const nums = new Array(29).fill(0).map((_, i) => i);

        // 0 ~ 9
        ig!.syncItems(nums.map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        // 0 ~ 8
        ig!.setCursors(0, 8);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");


        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));
        // visible(0 ~ 2) invisible(3 ~ 8) unchecked(9)
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.getScrollContainerElement().scrollTop = 3000;

        const requestAppendEvent = await waitEvent<OnRequestAppend>(ig!, "requestAppend");

        // 3 ~ 8
        ig!.append(flat(requestAppendEvent.nextGroupKeys.map((groupKey) => {
          return [0, 1, 2].map((index) => {
            const child = (groupKey as number) * 3 + index;
            return {
              groupKey: groupKey,
              key: `key${child}`,
              html: `<div style="height: 100px">${child}</div>`,
            };
          });
        })));

        await waitEvent(ig!, "renderComplete");

        const items = ig!.getItems(true);
        const items0to26 = items.slice(0, 26);
        const items27 = items.slice(27);
        // Then
        expect(ig!.getStartCursor()).to.be.equals(6);
        expect(ig!.getEndCursor()).to.be.equals(8);
        expect(items0to26.every((item) => item.type !== ITEM_TYPE.VIRTUAL)).to.be.equals(true);
        expect(items27.every((item) => item.type === ITEM_TYPE.VIRTUAL)).to.be.equals(true);
      });
      it(`should check if requestAppend event for invisible items is triggered`, async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));
        await waitEvent(ig!, "renderComplete");

        ig!.getScrollContainerElement().scrollTop = 500;

        const e = await waitEvent<OnRequestAppend>(ig!, "requestAppend");

        // Then
        expect(ig!.getStartCursor()).to.be.equals(1);
        expect(ig!.getEndCursor()).to.be.equals(3);
        expect(e.groupKey).to.be.equals(2);
        expect(e.nextGroupKey).to.be.equals(3);
      });
      it(`should check if requestAppend event for invisible groups is triggered`, async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_GROUPS));
        await waitEvent(ig!, "renderComplete");

        ig!.getScrollContainerElement().scrollTop = 500;

        const e = await waitEvent<OnRequestAppend>(ig!, "requestAppend");

        // Then
        expect(ig!.getStartCursor()).to.be.equals(1);
        expect(ig!.getEndCursor()).to.be.equals(3);
        expect(e.groupKey).to.be.equals(2);
        expect(e.nextGroupKey).to.be.equals(3);
      });
      it(`should check if recovery is possible with placeholders When you get the partial status with minimized invisible items and setStatus`, async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");
        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // set place holder
        ig!.setPlaceholder({
          html: `<div class="placeholder"></div>`,
        });
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));
        // 0 ~ 9
        // restore status
        await waitEvent(ig!, "renderComplete");

        // render changed items
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.getScrollContainerElement().scrollTop = 500;
        await waitEvent(ig!, "renderComplete");

        // Then
        expect(ig!.getScrollContainerElement().scrollTop).to.be.equals(500);
        expect(ig!.getStartCursor()).to.be.equals(1);
        expect(ig!.getEndCursor()).to.be.equals(3);
        // items (6) virtual items (3)
        expect(ig!.getVisibleItems(true).length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(6);

        const children = [].slice.call(igContainer.children) as HTMLElement[];

        children.slice(0, 6).forEach((el) => {
          expect(el.classList.contains("placeholder")).to.be.false;
        });
        children.slice(6, 9).forEach((el) => {
          expect(el.classList.contains("placeholder")).to.be.true;
        });
      });
      it(`should check that the call requestAppend and replace placeholders`, async () => {
        // Given
        const igContainer = ig!.getContainerElement();

        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);

        // all cursors
        await waitEvent(ig!, "renderComplete");


        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // set place holder
        ig!.setPlaceholder({
          html: `<div class="placeholder" style="height: 100px; width: 100px;"></div>`,
        });
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));

        await waitEvent(ig!, "renderComplete");

        ig!.on("requestAppend", ({ nextGroupKey }) => {
          if (nextGroupKey) {
            const groupKey = nextGroupKey as number;

            ig!.append([0, 1, 2].map((child) => ({
              groupKey,
              key: `key${groupKey * 3 + child}`,
              html: `<div style="height: 100px; width: 100px;">${groupKey * 3 + child}</div>`,
            })));
          }
        });

        // When
        ig!.getScrollContainerElement().scrollTop = 500;

        await waitEvent(ig!, "requestAppend");
        await waitEvent(ig!, "renderComplete");


        // Then
        expect(ig!.getStartCursor()).to.be.equals(1);
        expect(ig!.getEndCursor()).to.be.equals(3);
        // items (12) virtual items (3)
        expect(ig!.getItems(true).length).to.be.equals(15);
        expect(ig!.getItems().length).to.be.equals(12);
        // items (9) virtual items (0)
        expect(ig!.getVisibleItems(true).length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(9);

        const children = [].slice.call(igContainer.children) as HTMLElement[];

        children.forEach((el) => {
          expect(el.classList.contains("placeholder")).to.be.false;
        });
      });
      it(`should check that the call requestAppend and remove placeholders`, async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // all cursors
        await waitEvent(ig!, "renderComplete");


        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        // set place holder
        ig!.setPlaceholder({
          html: `<div class="placeholder"></div>`,
        });
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS));

        await waitEvent(ig!, "renderComplete");

        ig!.once("requestAppend", ({ nextGroupKey }) => {
          if (nextGroupKey) {
            ig!.removePlaceholders({ groupKey: nextGroupKey });
          }
        });

        // When
        ig!.getScrollContainerElement().scrollTop = 500;

        await waitEvent(ig!, "requestAppend");
        await waitEvent(ig!, "renderComplete");


        // Then
        expect(ig!.getStartCursor()).to.be.equals(1);
        expect(ig!.getEndCursor()).to.be.equals(3);
        // items (9) virtual items (3) remove (3)
        expect(ig!.getItems(true).length).to.be.equals(12);
        expect(ig!.getItems().length).to.be.equals(9);
        // items (6) virtual items (3)
        expect(ig!.getVisibleItems(true).length).to.be.equals(9);
        expect(ig!.getVisibleItems().length).to.be.equals(6);
      });
      it(`should check if the placeholder is replaced when appending after adding the placeholder with no keys`, async () => {
        // Given
        // set place holder
        ig!.setPlaceholder({
          html: `<div class="placeholder"></div>`,
        });
        ig!.renderItems();

        // When
        // append placeholders
        ig!.appendPlaceholders(3, 1);
        await waitEvent(ig!, "renderComplete");
        // placeholders
        const length1 = ig!.getRenderingItems().length;

        ig!.append([0, 1, 2].map((child) => {
          return `<div style="height: 100px">${child}</div>`;
        }), 1);

        // items with placeholders
        const length2 = ig!.getRenderingItems().length;

        await waitEvent(ig!, "renderComplete");

        // When the items are rendered, the placeholder is removed.
        const length3 = ig!.getRenderingItems().length;
        await waitEvent(ig!, "renderComplete");

        // then
        expect(length1).to.be.equals(3);
        expect(length2).to.be.equals(6);
        expect(length3).to.be.equals(3);
        expect(ig!.getItems(true).map((item) => item.cssContentPos)).to.be.deep.equals([0, 100, 200]);
      });
      it(`should check if the placeholder is replaced when appending after adding the placeholder`, async () => {
        // Given
        ig!.append([0, 1, 2].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));
        // cursors (0, 0)
        await waitEvent(ig!, "renderComplete");

        // When
        // set place holder
        ig!.setPlaceholder({
          html: `<div class="placeholder"></div>`,
        });

        // append placeholders
        ig!.appendPlaceholders(3, 1);
        await waitEvent(ig!, "renderComplete");

        const itemsLength = ig!.getItems().length;
        const allItemsLength = ig!.getItems(true).length;

        ig!.append([3, 4, 5].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        await waitEvent(ig!, "renderComplete");

        const itemsLength2 = ig!.getItems().length;
        const allItemsLength2 = ig!.getItems(true).length;


        expect(itemsLength).to.be.equals(3);
        expect(allItemsLength).to.be.equals(6);
        expect(itemsLength2).to.be.equals(6);
        expect(allItemsLength2).to.be.equals(6);
      });
      it(`should check if it is included in status with virtual items`, async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 4);
        // render items for all cursors
        await waitEvent(ig!, "renderComplete");

        // partial cursors (0 ~ 2)
        await waitEvent(ig!, "renderComplete");

        ig!.getScrollContainerElement().scrollTop = 800;

        // scroll cursors (2 ~ 4)
        await waitEvent(ig!, "renderComplete");

        // When
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS, true));
        await waitEvent(ig!, "renderComplete");

        // restore cursors (2 ~ 4) with scroll 800
        const scrollTop1 = ig!.getScrollContainerElement().scrollTop;
        const startCursor1 = ig!.getStartCursor();
        const endCursor1 = ig!.getEndCursor();

        // restore with virtual items
        ig!.setStatus(ig!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS, true));
        await waitEvent(ig!, "renderComplete");

        // 800
        // restore cursors (2 ~ 4) with scroll 800
        const scrollTop2 = ig!.getScrollContainerElement().scrollTop;
        const startCursor2 = ig!.getStartCursor();
        const endCursor2 = ig!.getEndCursor();

        // Then
        expect(scrollTop1).to.be.equals(800);
        expect(startCursor1).to.be.equals(2);
        expect(endCursor1).to.be.equals(4);

        expect(scrollTop2).to.be.equals(800);
        expect(startCursor2).to.be.equals(2);
        expect(endCursor2).to.be.equals(4);
      });
    });
    describe("test scroll position", () => {
      it(`should check if it is included in status with virtual items`, async () => {
        // Given
        ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((child) => {
          return {
            groupKey: Math.floor(child / 3),
            key: `key${child}`,
            html: `<div style="height: 100px">${child}</div>`,
          };
        }));

        ig!.setCursors(0, 5);
        // render items for all cursors
        await waitEvent(ig!, "renderComplete");

        // change cursor (0, 2)
        await waitEvent(ig!, "renderComplete");


        // change scroll (1, 3)
        ig!.getScrollContainerElement().scrollTop = 500;

        await waitEvent(ig!, "renderComplete");

        ig!.getItems().forEach((item) => {
          item.element!.style.height = "200px";
        });

        ig!.renderItems({ useResize: true });

        // 100 100 100 100 100 100 100
        // to
        // 100 100 100 200 200 200 200
        await waitEvent(ig!, "renderComplete");


        // 500 to 700
        const correctedPos = ig!.getScrollContainerElement().scrollTop;


        expect(correctedPos).to.be.equals(700);
      });
    });
  });
  describe("test ResizeObserver", () => {
    it(`should check if renderComplete does trigger when useResizeObserver is enabled and container's size is changed`, async () => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 500px;">
        <div>11</div>
        <div>22</div>
        <div>33</div>
      </div>
      `;
      const spy = sinon.spy();
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        useResizeObserver: true,
      });

      ig.on("renderComplete", spy);

      // When
      // occur when resize inline direction
      container!.style.width = "90%";


      await waitFor(100);

      // not occur when resize content direction
      container!.style.height = "100px";
      await waitFor(100);

      // Then
      expect(spy.callCount).to.be.equals(1);
    });
    it(`should Check if ResizeObserver is also applied to children`, async () => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 500px;">
        <div>11</div>
        <div>22</div>
        <div>33</div>
      </div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        useResizeObserver: true,
        observeChildren: true,
      });

      ig.renderItems();

      await waitEvent(ig, "renderComplete");
      // When
      const item = ig.getItems()[0];

      // resize child element
      ig.getItems()[0].element!.style.height = "30px";

      const e = await waitEvent(ig, "renderComplete");

      // Then
      expect(e.updated.length).to.be.equals(1);
      expect(item.rect.height).to.be.equals(30);
    });
    it(`should check if ResizeObserver is applied only to visible items`, async () => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 500px;"></div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new InfiniteGrid<InfiniteGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        useResizeObserver: true,
        observeChildren: true,
      });

      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: `key${child}`,
          html: `<div style="height: 100px">${child}</div>`,
        };
      }));

      ig!.setCursors(0, 4);
      // all cursors
      await waitEvent(ig!, "renderComplete");

      // partial cursors (0 ~ 2)
      await waitEvent(ig!, "renderComplete");

      ig!.getScrollContainerElement().scrollTop = 500;

      // partial cursors (1 ~ 3)
      await waitEvent(ig!, "renderComplete");

      // When
      const visibleItem = ig.getVisibleItems()[0];
      const invisibleItem = ig.getItems()[0];

      // resize child element
      visibleItem.element!.style.height = "30px";
      invisibleItem.element!.style.height = "30px";

      const e = await waitEvent(ig, "renderComplete");

      // Then
      expect(e.updated.length).to.be.equals(1);
      expect(visibleItem.rect.height).to.be.equals(30);
      expect(invisibleItem.rect.height).not.to.be.equals(30);
      expect(ig!.getStartCursor()).to.be.equals(1);
      expect(ig!.getEndCursor()).to.be.equals(3);
    });
  });
  describe("test size group, equal size", () => {
    it("should check if isEqualSize calculates the size of the items in the invisible area.", async () => {
      // Given
      container!.innerHTML = `<div class="wrapper" style="width: 100%; height: 500px;"></div>`;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;

      ig = new InfiniteGrid<InfiniteGridOptions & SampleGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        isEqualSize: true,
        injectCSSSize: false,
      });

      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: `key${child}`,
          html: `<div style="height: ${100 + child * 10}px;width: 100%;">${child}</div>`,
        };
      }));

      ig!.setCursors(0, 4);
      // all cursors
      await waitEvent(ig!, "renderComplete");
      // partial cursors (0 ~ 2)
      await waitEvent(ig!, "renderComplete");

      ig!.getScrollContainerElement().scrollTop = 500;
      // partial cursors (1 ~ 3)
      await waitEvent(ig!, "renderComplete");
      // When
      // Based on the first item of the currently displayed item, the size of all items is determined to be the same.
      ig!.renderItems({
        useResize: true,
      });

      await waitEvent(ig!, "renderComplete");
      const visibleItem = ig!.getVisibleItems()[0];

      // Then
      expect(visibleItem.groupKey).to.be.equals(1);
      expect(visibleItem.key).to.be.equals("key3");

      ig!.getItems().forEach((item) => {
        // The size of all items is the same as the "key3" item
        expect(item.rect.height).to.be.equals(130);
      });
    });
    it("should checks if the sizes of the not-equal-size items are different.", async () => {
      // Given
      container!.innerHTML = `<div class="wrapper" style="width: 100%; height: 500px;"></div>`;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;

      ig = new InfiniteGrid<InfiniteGridOptions & SampleGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        isEqualSize: true,
        injectCSSSize: false,
      });

      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: `key${child}`,
          html: `<div style="height: ${100 + child * 10}px;width: 100%;" ${
            child === 7 ? `data-grid-not-equal-size="true"` : ""
          }>${child}</div>`,
        };
      }));

      ig!.setCursors(0, 4);
      // all cursors
      await waitEvent(ig!, "renderComplete");
      // partial cursors (0 ~ 2)
      await waitEvent(ig!, "renderComplete");

      ig!.getScrollContainerElement().scrollTop = 500;
      // partial cursors (1 ~ 3)
      await waitEvent(ig!, "renderComplete");
      // When
      // Based on the first item of the currently displayed item, the size of all items is determined to be the same.
      ig!.renderItems({
        useResize: true,
      });

      await waitEvent(ig!, "renderComplete");
      // Then
      ig!.getItems().forEach((item, i) => {
        // Except for item 7, all are the same size (130).
        if (i === 7) {
          expect(ig!.getItems()[7].rect.height).to.be.equals(170);
        } else {
          // The size of all items is the same as the "key3" item
          expect(item.rect.height).to.be.equals(130);
        }
      });
    });
    it("should check if size group calculates the size of the group of items in the invisible area.", async () => {
      // Given
      container!.innerHTML = `<div class="wrapper" style="width: 100%; height: 500px;"></div>`;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;

      ig = new InfiniteGrid<InfiniteGridOptions & SampleGridOptions>(wrapper, {
        gridConstructor: SampleGrid,
        container: true,
        injectCSSSize: false,
      });

      ig!.syncItems([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: `key${child}`,
          html: `<div style="height: ${100 + child * 10}px;width: 100%;" data-grid-size-group="${child % 2}">${child}</div>`,
        };
      }));

      ig!.setCursors(0, 4);
      // all cursors
      await waitEvent(ig!, "renderComplete");
      // partial cursors (0 ~ 2)
      await waitEvent(ig!, "renderComplete");

      ig!.getScrollContainerElement().scrollTop = 500;
      // partial cursors (1 ~ 3)
      await waitEvent(ig!, "renderComplete");
      // When
      // Based on the first item of the currently displayed item, the size of all items is determined to be the same.
      ig!.renderItems({
        useResize: true,
      });

      await waitEvent(ig!, "renderComplete");
      const [item1, item2] = ig!.getVisibleItems();

      // Then
      expect(item1.key).to.be.equals("key3");
      expect(item2.key).to.be.equals("key4");
      expect(item1.rect.height).to.be.equals(130);
      expect(item2.rect.height).to.be.equals(140);

      // The size of all items (even "0") is the same as the "key4" item
      // The size of all items (odd, "1") is the same as the "key3" item
      ig!.getItems().forEach((item, i) => {
        expect(item.rect.height).to.be.equals(i % 2 ? 130 : 140);
      });
    });
  });
});
