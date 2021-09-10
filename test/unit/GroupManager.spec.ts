import { cleanup, sandbox, waitEvent } from "./utils/utils";
import { GroupManager } from "../../src/GroupManager";
import { SampleGrid } from "./samples/SampleGrid";
import { InfiniteGridItem } from "../../src/InfiniteGridItem";
import { toArray } from "../../src/utils";

describe("test GroupManager", () => {
  let manager: GroupManager | null;
  let container: HTMLElement | null;
  beforeEach(() => {
    container = sandbox("")!;
    container!.style.cssText = "";
  });

  afterEach(() => {
    if (manager) {
      manager!.destroy();
    }
    manager = null;
    container = null;
    cleanup();
  });
  describe("Initialzation", () => {
    it("should check if container elements are the same", () => {
      // Given
      manager = new GroupManager(container!, {
        gridConstructor: SampleGrid,
        gridOptions: {},
      });

      // When, Then
      expect(manager!.getContainerElement()).to.be.equals(container);
    });
  });
  describe("test rendering", () => {
    beforeEach(() => {
      // Given
      container!.innerHTML = `
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      `;
      manager = new GroupManager(container!, {
        gridConstructor: SampleGrid,
        gridOptions: {},
      });

      const children = toArray(container!.children);

      // 0 0 0 1 1 1
      manager!.syncItems(children.map((child, i) => {
        return new InfiniteGridItem(false, {
          groupKey: Math.floor(i / 3),
          key: i,
          element: child,
        });
      }));
    });
    it("should check if items are rendered", async () => {
      // Given
      const children = toArray(container!.children);

      // When
      manager!.setCursors(0, 1);
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");

      // Then
      expect(manager!.getItems().map((item) => item.groupKey)).to.be.deep.equals([0, 0, 0, 1, 1, 1]);
      expect(manager!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(manager!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(manager!.getOutlines().end).to.be.deep.equals([108]);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
    });
    it("should check if only visible items are rendered", async () => {
      // Given
      const children = toArray(container!.children);

      // When
      manager!.setCursors(0, 0);
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");

      // Then
      expect(manager!.getItems().map((item) => item.groupKey)).to.be.deep.equals([0, 0, 0]);
      expect(manager!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(manager!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([0]);
      expect(manager!.getOutlines().end).to.be.deep.equals([54]);

      children.slice(0, 3).forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
      children.slice(3, 6).forEach((child) => {
        expect(child.style.top).to.be.equals(``);
      });
    });
    it("should check whether invisible items are remembered after rendering all items", async () => {
      // Given
      const children = toArray(container!.children);

      // render all
      manager!.setCursors(0, 1);
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");

      // When
      // render some items
      manager!.setCursors(1, 1);
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");

      // Then
      expect(manager!.getItems().map((item) => item.groupKey)).to.be.deep.equals([1, 1, 1]);
      expect(manager!.getGroups().map((group) => group.groupKey)).to.be.deep.equals([0, 1]);
      expect(manager!.getVisibleGroups().map((group) => group.groupKey)).to.be.deep.equals([1]);
      expect(manager!.getOutlines().end).to.be.deep.equals([108]);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 18}px`);
      });
    });
    it("should check whether it is rendered after changing options", async () => {
      // Given
      const children = toArray(container!.children);

      manager!.setCursors(0, 1);
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");


      // When
      manager!.gridOptions = {
        gap: 5,
      };
      manager!.renderItems();

      await waitEvent(manager!, "renderComplete");

      // Then
      expect(manager!.getOutlines().end).to.be.deep.equals([138]);

      children.forEach((child, i) => {
        expect(child.style.top).to.be.equals(`${i * 23}px`);
      });
    });
  });
});
