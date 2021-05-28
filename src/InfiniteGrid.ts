import { ContainerManager, GridItem } from "@egjs/grid";
// import { MOUNT_STATE } from "@egjs/grid";
import { Infinite } from "./Infinite";
import { OnRendererUpdated, Renderer } from "./Renderer/Renderer";
import { GridRendererItem } from "./Renderer/VanillaGridRenderer";
import { ScrollManager } from "./ScrollManager";
import { isString } from "./utils";

export class InfiniteGrid {
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
  protected renderer: Renderer;
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
    const containerManager = new ContainerManager(scrollManager.getContainer(), {
      horizontal: false,
    });

    const infinite = new Infinite({
      useRecyle: false,
    }).on({
      "change": this._onChange,
      "requestAppend": this._onRequestAppend,
      "requestPrepend": this._onRequestPrepend,
    });
    const renderer: Renderer = null as any;

    renderer.setContainer(scrollManager.getContainer());
    renderer.on("updated", this._onRendererUpdated);

    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;
  }
  public syncItems() {
    // this.groupManager.syncItems(nextItems);
    const groups: any[] = [];

    this.infinite.sync(groups.map((item) => {
      return {
        key: item.key,
        startOutline: item.startOutline,
        endOutline: item.endOutline,
      };
    }));

    this._render();
  }

  public syncElements() {
    return;
  }
  public setCursors(startCursor: number, endCursor: number) {
    this.infinite.setCursors(startCursor, endCursor);
    this._update();
  }
  public getVisibleItems(): GridItem[] {
    return [];
    // return this.getVisibleGroups().map((group) => group.getItems());
  }
  public getVisibleGroups(): [] {
    return [];
    // return this.infinite.getVisibleItems().map(item => {
    //   // return this.groupManager.getItem(item.key);
    // });
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
}
