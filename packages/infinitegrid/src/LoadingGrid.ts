import Grid, { GridItem, GridOutlines } from "@egjs/grid";
import { ITEM_TYPE } from "./consts";
import { InfiniteGridItem, InfiniteGridItemStatus } from "./InfiniteGridItem";

export const LOADING_GROUP_KEY = "__INFINITEGRID__LOADING_GRID";
export const LOADING_ITEM_KEY = "__INFINITEGRID__LOADING_ITEM";

export class LoadingGrid extends Grid {
  public type: "start" | "end" | "" = "";
  public isWaitEnd = false;
  public initialDisplay: string | null = null;
  public getLoadingItem(): InfiniteGridItem | null {
    return this.items[0] as InfiniteGridItem || null;
  }
  public startLoading() {
    const element = this.items[0].element;

    if (element) {
      if (this.initialDisplay != null) {
        this.initialDisplay = element.style.display || "";
      } else if (this.initialDisplay) {
        element.style.display = this.initialDisplay;
      } else {
        element.style.removeProperty("display");
      }
    }
  }
  public endLoading() {
    if (this.type) {
      const element = this.items[0].element;

      if (element) {
        element.style.display = "none";
      }
    }
  }
  public setLoadingItem(item: Partial<InfiniteGridItemStatus> | null) {
    if (item) {
      const loadingItem = this.getLoadingItem();

      if (!loadingItem) {
        this.items = [new InfiniteGridItem(this.options.horizontal, {
          ...item,
          type: ITEM_TYPE.LOADING,
          key: LOADING_ITEM_KEY,
        })];
      } else {
        for (const name in item) {
          loadingItem[name] = item[name];
        }
      }
    } else {
      this.items = [];
    }
  }
  public applyGrid(items: GridItem[], direction: "start" | "end", outline: number[]): GridOutlines {
    if (!items.length) {
      return {
        start: outline,
        end: outline,
      };
    }
    const nextOutline = outline.length ? [...outline] : [0];
    const item = items[0];
    const offset = item.contentSize + this.getContentGap();

    item.cssInlinePos = this.getContainerInlineSize() / 2 - item.inlineSize / 2;

    if (direction === "end") {
      const maxPos = Math.max(...nextOutline);

      item.cssContentPos = maxPos;

      return {
        start: nextOutline,
        end: nextOutline.map((pos) => pos + offset),
      };
    } else {
      const minPos = Math.min(...nextOutline);

      item.cssContentPos = minPos - offset;

      return {
        start: nextOutline.map((pos) => pos - offset),
        end: nextOutline,
      };
    }
  }
}
