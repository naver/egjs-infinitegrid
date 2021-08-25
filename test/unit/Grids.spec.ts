import { cleanup, getItems, sandbox, waitEvent } from "./utils/utils";
import InfiniteGrid from "../../src/InfiniteGrid";
import { MasonryInfiniteGrid } from "../../src/grids/MasonryInfiniteGrid";
import { JustifiedInfiniteGrid } from "../../src/grids/JustifiedInfiniteGrid";
import { FrameInfiniteGrid } from "../../src/grids/FrameInfiniteGrid";
import { PackingInfiniteGrid } from "../../src/grids/PackingInfiniteGrid";

describe("test 4 grids", () => {
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
  [
    {
      name: "MasonryInfiniteGrid",
      GridConstructor: MasonryInfiniteGrid,
      options: {
        columnSize: 100,
      },
    },
    {
      name: "JustifiedInfiniteGrid",
      GridConstructor: JustifiedInfiniteGrid,
      options: {},
    },
    {
      name: "FrameInfiniteGrid",
      GridConstructor: FrameInfiniteGrid,
      options: {
        frames: [
          [1, 2, 3, 0, 0],
          [0, 0, 0, 4, 5],
        ],
      },
    },
    {
      name: "PackingInfiniteGrid",
      GridConstructor: PackingInfiniteGrid,
      options: {},
    },
  ].forEach((type) => {
    it(`should check if outlines are connected to each other (${type.name})`, async () => {
      // Given
      container!.innerHTML = `
        <div class="wrapper" style="width: 100%; height: 1000px;"></div>
        `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new type.GridConstructor(wrapper, {
        container: true,
        gap: 5,
        useRecycle: false,
        ...type.options,
      });

      // When
      ig.append(getItems(5));
      ig.append(getItems(5));
      ig.setCursors(0, 1);

      await waitEvent(ig, "renderComplete");

      const groups = ig.getVisibleGroups();
      const firstGroupOutline = groups[0].grid.getOutlines().end;
      const secondGroupOutline = groups[1].grid.getOutlines().start;

      // Then
      expect(firstGroupOutline).to.be.deep.equals(secondGroupOutline);
    });
    it(`should check if outlines do not match each other in FrameGrid`, async () => {
      // Given
      container!.innerHTML = `
      <div class="wrapper" style="width: 100%; height: 1000px;"></div>
      `;
      const wrapper = container!.querySelector<HTMLElement>(".wrapper")!;
      ig = new FrameInfiniteGrid(wrapper, {
        container: true,
        gap: 5,
        frame: [
          [1, 2, 3, 0, 0],
          [0, 0, 0, 0, 4],
          [0, 0, 0, 0, 5],
        ],
      });

      // When
      ig.append(getItems(5));
      ig.append(getItems(5));
      ig.setCursors(0, 1);
      ig.renderItems();

      await waitEvent(ig, "renderComplete");

      const groups = ig.getVisibleGroups();
      const firstGroupOutline = groups[0].grid.getOutlines().end;
      const secondGroupOutline = groups[1].grid.getOutlines().start;

      // Then
      expect(firstGroupOutline).to.be.not.deep.equals(secondGroupOutline);
    });
  });
});
