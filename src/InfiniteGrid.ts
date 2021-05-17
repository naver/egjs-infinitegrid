import { ContainerManager } from "@egjs/grid";
import { ScrollManager } from "./ScrollManager";
import { isString } from "./utils";

export class InfiniteGrid {
  protected wrapperElement: HTMLElement;
  protected scrollManager: ScrollManager;
  protected containerManager: ContainerManager;

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

    this.wrapperElement = wrapperElement;
    this.scrollManager = scrollManager;
    this.containerManager = containerManager;
  }
}
