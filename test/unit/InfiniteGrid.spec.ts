import { cleanup, sandbox, waitEvent } from "./utils/utils";
import InfiniteGrid from "../../src/InfiniteGrid";
import { SampleGrid } from "./samples/SampleGrid";
import { toArray } from "../../src/utils";
import { InfiniteGridOptions } from "../../src/types";

describe("test InfiniteGrid", () => {
  let ig: InfiniteGrid | null;
  let container: HTMLElement | null;
  beforeEach(() => {
    container = sandbox("")!;
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
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
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

      igContainer.innerHTML = `<div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>`;
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
    it("should check if items are rendered", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div>${child}</div>`,
        };
      }));
      // When
      ig!.setCursors(0, 1);

      await waitEvent(ig!, "renderComplete");
      const children = toArray(igContainer.children);

      // Then
      expect(ig!.getItems().map((item) => item.groupKey)).to.be.deep.equals([0, 0, 0, 1, 1, 1]);
      expect(ig!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(children.length).to.be.equals(6);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
    });
    it("should check if only visible items are rendered", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.syncItems([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div style="height: 200px">${child}</div>`,
        };
      }));

      ig!.setCursors(0, 1);

      // When
      await waitEvent(ig!, "renderComplete");

      // one more [0, 1] => [0]
      await waitEvent(ig!, "renderComplete");
      const children = toArray(igContainer.children);

      // Then
      expect(ig!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0]);
      expect(children.length).to.be.equals(3);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 200}px`);
      });
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
    it("should check if render is complete after append", async () => {
      // Given
      const igContainer = ig!.getContainerElement();

      ig!.append([0, 1, 2, 3, 4, 5].map((child) => {
        return {
          groupKey: Math.floor(child / 3),
          key: child,
          html: `<div style="height: 200px">${child}</div>`,
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
        expect(child.style.top).to.be.equals(`${i * 200}px`);
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
  });
});
