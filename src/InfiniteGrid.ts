import { ContainerManager, GridItem } from "@egjs/grid";
import { Infinite } from "./Infinite";
import { ScrollManager } from "./ScrollManager";
import { isString } from "./utils";

export class InfiniteGrid {
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;
  protected infinite: Infinite;
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

    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
    this.infinite = infinite;
  }
  public syncItems() {
    // item sync
    // const {
    //   added,
    //   removed,
    //   ordered,
    // } = this.groupManager.syncItems([]);
    // infinite sync
    // const prevVisbleItems = this.getVisibleItems();
    this.infinite.sync([]);
    // const nextVisbleItems = this.getVisibleItems();
    // const container = this.scrollManager.getContainer();
    // const {
    //   added,
    //   ordered,
    //   removed,
    // } = diff(prevVisbleItems, nextVisbleItems, (item) => item.key);

    // if (added.length || ordered.length) {
    //   container.innerHTML = "";

    //   const fragment = document.createDocumentFragment();
    //   nextVisbleItems.forEach((item) => {
    //     if (!item.element) {
    //       // create element
    //     }
    //     fragment.appendChild(item.element!);
    //   });
    //   container.appendChild(fragment);
    // } else if (removed.length) {
    //   removed.forEach((index) => {
    //     const item = nextVisbleItems[index];


    //     if (item.mountState === MOUNT_STATE.MOUNTED) {
    //       const element = item.element;

    //       container.removeChild(element!);
    //     }
    //   });
    // }
    // save sync info
    // this.status.isChange = isChange;
  }
  public syncElements() {
    return;
  }
  public setCursors(startCursor: number, endCursor: number) {
    this.infinite.setCursors(startCursor, endCursor);
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
  private _onChange = () => {
    //
  }
  private _onRequestAppend = () => {
    //
  }
  private _onRequestPrepend = () => {
    //
  }
}
