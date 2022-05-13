import { GridItem, GridItemStatus, MOUNT_STATE } from "@egjs/grid";
import { INVISIBLE_POS, ITEM_TYPE } from "./consts";
import { InfiniteGridItemInfo } from "./types";


export interface InfiniteGridItemStatus extends GridItemStatus {
  type?: ITEM_TYPE;
  groupKey?: string | number;
  key?: string | number;
  html?: string;
}

/**
 * @extends Grid.GridItem
 */
export class InfiniteGridItem extends GridItem implements Required<InfiniteGridItemInfo> {
  public groupKey: string | number;
  public readonly html: string;
  constructor(horizontal: boolean, itemStatus?: Partial<InfiniteGridItemStatus>) {
    super(horizontal, {
      html: "",
      type: ITEM_TYPE.NORMAL,
      cssRect: { top: INVISIBLE_POS, left: INVISIBLE_POS },
      ...itemStatus,
    } as GridItemStatus);

    if (this.type === ITEM_TYPE.VIRTUAL) {
      if (this.rect.width || this.rect.height) {
        this.mountState = MOUNT_STATE.UNMOUNTED;
      }
      const orgRect = this.orgRect;
      const rect = this.rect;
      const cssRect = this.cssRect;

      if (cssRect.width) {
        rect.width = cssRect.width;
      } else if (orgRect.width) {
        rect.width = orgRect.width;
      }
      if (cssRect.height) {
        rect.height = cssRect.height;
      } else if (orgRect.height) {
        rect.height = orgRect.height;
      }
    }
  }
  public getVirtualStatus(): Partial<InfiniteGridItemStatus> {
    return {
      type: ITEM_TYPE.VIRTUAL,
      groupKey: this.groupKey,
      key: this.key,
      orgRect: this.orgRect,
      rect: this.rect,
      cssRect: this.cssRect,
      attributes: this.attributes,
    };
  }
  public getMinimizedStatus(): Partial<InfiniteGridItemStatus> {
    const status: Partial<InfiniteGridItemStatus> = {
      ...super.getMinimizedStatus(),
      type: ITEM_TYPE.NORMAL,
      groupKey: this.groupKey,
    };
    if (this.html) {
      status.html = this.html;
    }
    return status;
  }
}

export interface InfiniteGridItem extends Required<InfiniteGridItemStatus> {}
