import Component from "@egjs/component";
import { CONTAINER_CLASS_NAME, IS_IOS } from "./consts";
import { isWindow } from "./utils";

export interface ScrollManagerOptions {
  container?: HTMLElement | boolean | string;
  containerTag?: string;
  horizontal?: boolean;
}

export interface OnScroll {
  direction: "start" | "end";
  scrollPos: number;
  relativeScrollPos: number;
}

export interface ScrollManagerEvents {
  scroll: OnScroll;
}

export class ScrollManager extends Component<ScrollManagerEvents> {
  public options: Required<ScrollManagerOptions>;
  protected prevScrollPos: number | null = null;
  protected eventTarget: HTMLElement | Window;
  protected scrollOffset = 0;
  protected container: HTMLElement;
  protected scrollContainer: HTMLElement;
  private _orgCSSText: string;
  private _isScrollIssue = IS_IOS;
  private _isCreateElement: boolean;
  constructor(
    protected wrapper: HTMLElement,
    options: ScrollManagerOptions,
  ) {
    super();
    this.options = {
      container: false,
      containerTag: "div",
      horizontal: false,
      ...options,
    };

    this._init();
  }
  public getWrapper() {
    return this.wrapper;
  }
  public getContainer() {
    return this.container;
  }
  public getScrollContainer() {
    return this.scrollContainer;
  }
  public getScrollOffset() {
    return this.scrollOffset;
  }
  public getRelativeScrollPos() {
    return (this.prevScrollPos || 0) - this.scrollOffset;
  }
  public getScrollPos() {
    return this.prevScrollPos;
  }
  public setScrollPos(pos: number) {
    this.prevScrollPos = pos;
  }
  public getOrgScrollPos() {
    const eventTarget = this.eventTarget;
    const horizontal = this.options.horizontal;

    const prop = `scroll${horizontal ? "Left" : "Top"}` as "scrollLeft" | "scrollTop";

    if (isWindow(eventTarget)) {
      return window[horizontal ? "pageXOffset" : "pageYOffset"]
        || document.documentElement[prop] || document.body[prop];
    } else {
      return eventTarget[prop];
    }
  }
  public scrollTo(pos: number) {
    const eventTarget = this.eventTarget;
    const horizontal = this.options.horizontal;
    const [x, y] = horizontal ? [pos, 0] : [0, pos];

    if (isWindow(eventTarget)) {
      eventTarget.scroll(x, y);
    } else {
      eventTarget.scrollLeft = x;
      eventTarget.scrollTop = y;
    }
  }
  public scrollBy(pos: number) {
    const eventTarget = this.eventTarget;
    const horizontal = this.options.horizontal;
    const [x, y] = horizontal ? [pos, 0] : [0, pos];

    if (isWindow(eventTarget)) {
      eventTarget.scrollBy(x, y);
    } else {
      eventTarget.scrollLeft += x;
      eventTarget.scrollTop += y;
    }
  }
  public resize() {
    const scrollContainerRect = this.scrollContainer.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    this.scrollOffset = (this.prevScrollPos! || 0) + containerRect.top - scrollContainerRect.top;
  }
  public destroy() {
    const container = this.container;

    this.eventTarget.removeEventListener("scroll", this._onCheck);

    if (this._isCreateElement) {
      const scrollContainer = this.scrollContainer;

      const fragment = document.createDocumentFragment();
      const childNodes = [].slice.call(container.childNodes);

      scrollContainer.removeChild(container);
      childNodes.forEach((childNode) => {
        fragment.appendChild(childNode);
      });
      scrollContainer.appendChild(fragment);
    } else if (this.options.container) {
      container.style.cssText = this._orgCSSText;
    }
  }
  private _init() {
    const {
      container: containerOption,
      containerTag,
      horizontal,
    } = this.options;
    const wrapper = this.wrapper;
    let scrollContainer = wrapper;
    let container = wrapper;

    if (!containerOption) {
      scrollContainer = document.body;
    } else {
      if (containerOption instanceof HTMLElement) {
        // Container that already exists
        container = containerOption;
      } else if (containerOption === true) {
        // Create Container
        container = document.createElement(containerTag) as HTMLElement;

        container.style.position = "relative";
        container.className = CONTAINER_CLASS_NAME;
        const childNodes = [].slice.call(scrollContainer.childNodes);

        childNodes.forEach((childNode) => {
          container.appendChild(childNode);
        });
        scrollContainer.appendChild(container);

        this._isCreateElement = true;
      } else {
        // Find Container by Selector
        container = scrollContainer.querySelector(containerOption) as HTMLElement;
      }
      const style = scrollContainer.style;

      [style.overflowX, style.overflowY] = horizontal ? ["scroll", "hidden"] : ["hidden", "scroll"];
    }
    const eventTarget = scrollContainer === document.body ? window : scrollContainer;

    eventTarget.addEventListener("scroll", this._onCheck);
    this._orgCSSText = container.style.cssText;
    this.container = container;
    this.scrollContainer = scrollContainer;
    this.eventTarget = eventTarget;
    this.resize();
    this.setScrollPos(this.getOrgScrollPos());
  }
  private _onCheck = () => {
    const prevScrollPos = this.getScrollPos();
    const nextScrollPos = this.getOrgScrollPos();

    this.setScrollPos(nextScrollPos);

    if (prevScrollPos === null || (this._isScrollIssue && nextScrollPos === 0) || prevScrollPos === nextScrollPos) {
      nextScrollPos && (this._isScrollIssue = false);
      return;
    }
    this._isScrollIssue = false;
    this.trigger("scroll", {
      direction: prevScrollPos < nextScrollPos ? "end" : "start",
      scrollPos: nextScrollPos,
      relativeScrollPos: this.getRelativeScrollPos(),
    });
  }
}
