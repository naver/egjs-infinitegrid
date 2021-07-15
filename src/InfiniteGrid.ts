import { MasonryGrid, ContainerManager } from "@egjs/grid";
import { GroupManager } from "./GroupManager";
import { Infinite } from "./Infinite";
import { InfiniteGridItem } from "./InfiniteGridItem";
import { OnRendererUpdated, Renderer } from "./Renderer/Renderer";
import { GridRendererItem } from "./Renderer/VanillaGridRenderer";
import { ScrollManager } from "./ScrollManager";
import { InfiniteGridGroup } from "./types";
import { isString } from "./utils";

export class InfiniteGrid {
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
  protected renderer: Renderer;
  protected groupManager: GroupManager;
  constructor(wrapper: HTMLElement | string) {
    // options.container === false, wrapper = container, scrollContainer = document.body
    // options.container === true, wrapper = scrollContainer, container = wrapper's child
    // options.container === string,
    const wrapperElement = isString(wrapper) ? document.querySelector(wrapper) as HTMLElement : wrapper;
    const scrollManager = new ScrollManager(wrapperElement, {
      container: false,
      containerTag: "div",
      horizontal: false,
    });
    const container = scrollManager.getContainer();
    const containerManager = new ContainerManager(container, {
      horizontal: false,
    });
    const infinite = new Infinite({
      useRecyle: false,
    }).on({
      "change": this._onChange,
      "requestAppend": this._onRequestAppend,
      "requestPrepend": this._onRequestPrepend,
    });

    const groupManager = new GroupManager(container, {
      gridConstructor: MasonryGrid,
      externalContainerManager: containerManager,
      gridOptions: {},
    });

    groupManager.on({
      "renderComplete": this._onRenderComplete,
      "contentError": this._onContentError,
    });
    const renderer: Renderer = null as any;

    renderer.setContainer(container);
    renderer.on("updated", this._onRendererUpdated);

    this.groupManager = groupManager;
    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;
  }
  public syncItems() {
    this.groupManager.syncItems([]);

    const groups = this.groupManager.getGroups();

    this.infinite.sync(groups.map(({ groupKey, grid }) => {
      const outlines = grid.getOutlines();

      return {
        key: groupKey,
        startOutline: outlines.start,
        endOutline: outlines.end,
      };
    }));

    this._render();
  }

  public syncElements() {
    return;
  }

  public setCursors(startCursor: number, endCursor: number) {
    this.groupManager.setCursors(startCursor, endCursor);
    this.infinite.setCursors(startCursor, endCursor);
    this._update();
  }

  public getItems(): InfiniteGridItem[] {
    return this.groupManager.getGroupItems();
  }

  public getVisibleItems(): InfiniteGridItem[] {
    return this.groupManager.getItems();
  }

  public getGroups(): InfiniteGridGroup[] {
    return this.groupManager.getGroups();
  }

  public getVisibleGroups(): InfiniteGridGroup[] {
    return this.groupManager.getVisibleGroups();
  }

  private _render() {
    this.renderer.render(this.getVisibleItems().map((item) => {
      return {
        element: item.element,
        key: item.key,
        orgItem: item,
      };
    }));
  }
  private _update() {
    if (this.renderer.update()) {
      this._render();
    }
  }
  private _onChange = () => {
    //
  }
  private _onRequestAppend = () => {
    //
  }
  private _onRequestPrepend = () => {
    //
  }
  private _onRendererUpdated = (e: OnRendererUpdated<GridRendererItem>) => {
    if (!e.isChanged) {
      return;
    }
    const rendererItems = e.items;

    // const {
    //   added,
    //   removed,
    //   prevList,
    //   list,
    // } = e.diffResult;

    // removed.forEach((index) => {
    //   const orgItem = prevList[index].orgItem;

    //   orgItem.mountState = MOUNT_STATE.UNMOUNTED;
    // });
    // added.forEach((index) => {
    //   const orgItem = list[index].orgItem;

    //   orgItem.mountState = MOUNT_STATE.MOUNTED;
    // });

    rendererItems.forEach((item) => {
      if (item.key === "infinite_unique_loading") {
        // set loading element
      } else {
        // set grid element
        // const gridItem = this.groupManager.findItemByKey(item.key);

        // gridItem.element = item.element;
      }
    });
    // this.renderItems();
  }
  private _onContentError = () => {
    //
  }
  private _onRenderComplete = () => {
    //
  }
}
