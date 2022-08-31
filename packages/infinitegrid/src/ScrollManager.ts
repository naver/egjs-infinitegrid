import { findTarget, Ref } from "@cfcs/core";
import Component, { ComponentEvent } from "@egjs/component";
import { CONTAINER_CLASS_NAME, IS_IOS } from "./consts";
import { OnChangeScroll } from "./types";
import { isWindow, toArray } from "./utils";

export interface ScrollManagerOptions {
  scrollContainer?: HTMLElement | string | Ref<HTMLElement> | null;
  container?: boolean | HTMLElement | string | Ref<HTMLElement>;
  containerTag?: string;
  horizontal?: boolean;
}

export interface ScrollManagerStatus {
  contentSize: number;
  scrollOffset: number;
  prevScrollPos: number;
}


export interface ScrollManagerEvents {
  scroll: OnChangeScroll;
}

export class ScrollManager extends Component<ScrollManagerEvents> {
  public options: Required<ScrollManagerOptions>;
  protected prevScrollPos: number | null = null;
  protected eventTarget: HTMLElement | Window;
  protected scrollOffset = 0;
  protected contentSize = 0;
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
      scrollContainer: null,
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
  public getContentSize() {
    return this.contentSize;
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
  public setStatus(status: ScrollManagerStatus) {
    this.contentSize = status.contentSize;
    this.scrollOffset = status.scrollOffset;
    this.prevScrollPos = status.prevScrollPos;

    this.scrollTo(this.prevScrollPos);
  }
  public getStatus(): ScrollManagerStatus {
    return {
      contentSize: this.contentSize,
      scrollOffset: this.scrollOffset,
      prevScrollPos: this.prevScrollPos!,
    };
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
    if (!pos) {
      return;
    }
    const eventTarget = this.eventTarget;
    const horizontal = this.options.horizontal;
    const [x, y] = horizontal ? [pos, 0] : [0, pos];


    this.prevScrollPos! += pos;

    if (isWindow(eventTarget)) {
      eventTarget.scrollBy(x, y);
    } else {
      eventTarget.scrollLeft += x;
      eventTarget.scrollTop += y;
    }
  }
  public resize() {
    const scrollContainer = this.scrollContainer;
    const horizontal = this.options.horizontal;
    const isBody = scrollContainer === document.body;
    const scrollContainerRect = isBody
      ? { top: 0, left: 0 }
      : scrollContainer.getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    this.scrollOffset = (this.prevScrollPos! || 0) + (horizontal
      ? containerRect.left - scrollContainerRect.left
      : containerRect.top - scrollContainerRect.top);

    if (isBody) {
      this.contentSize = horizontal ? window.innerWidth : window.innerHeight;
    } else {
      this.contentSize = horizontal ? scrollContainer.offsetWidth : scrollContainer.offsetHeight;
    }
  }
  public destroy() {
    const container = this.container;

    this.eventTarget.removeEventListener("scroll", this._onCheck);

    if (this._isCreateElement) {
      const scrollContainer = this.scrollContainer;

      const fragment = document.createDocumentFragment();
      const childNodes = toArray(container.childNodes);

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
      scrollContainer: scrollContainerOption,
    } = this.options;
    const wrapper = this.wrapper;
    let scrollContainer = wrapper;
    let container = wrapper;
    let containerCSSText = "";

    if (!containerOption) {
      scrollContainer = findTarget(scrollContainerOption) || document.body;
      containerCSSText = container.style.cssText;
    } else {
      if (containerOption === true) {
        // Create Container
        container = document.createElement(containerTag) as HTMLElement;

        container.style.position = "relative";
        container.className = CONTAINER_CLASS_NAME;
        const childNodes = toArray(scrollContainer.childNodes);

        childNodes.forEach((childNode) => {
          container.appendChild(childNode);
        });
        scrollContainer.appendChild(container);

        this._isCreateElement = true;
      } else {
        // Find Container
        container = findTarget(containerOption)!;
      }
      containerCSSText = container.style.cssText;

      const style = scrollContainer.style;

      [style.overflowX, style.overflowY] = horizontal ? ["scroll", "hidden"] : ["hidden", "scroll"];

      if (horizontal) {
        container.style.height = "100%";
      }
    }
    const eventTarget = scrollContainer === document.body ? window : scrollContainer;

    eventTarget.addEventListener("scroll", this._onCheck);
    this._orgCSSText = containerCSSText;
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
    this.trigger(new ComponentEvent("scroll", {
      direction: prevScrollPos < nextScrollPos ? "end" : "start",
      scrollPos: nextScrollPos,
      relativeScrollPos: this.getRelativeScrollPos(),
    }));
  }
}
