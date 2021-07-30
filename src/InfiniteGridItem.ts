import { GridItem, GridItemStatus } from "@egjs/grid";
import { ITEM_TYPE } from "./consts";
import { InfiniteGridItemInfo } from "./types";

export interface InfiniteGridItemStatus extends GridItemStatus {
  type?: ITEM_TYPE;
  groupKey?: string | number;
  key?: string | number;
  html?: string;
}

export class InfiniteGridItem extends GridItem implements Required<InfiniteGridItemInfo> {
  public groupKey: string | number;
  public readonly html: string;
  constructor(horizontal: boolean, itemStatus?: Partial<InfiniteGridItemStatus>) {
    super(horizontal, {
      html: "",
      type: ITEM_TYPE.ITEM,
      ...itemStatus,
    });
  }
  public getVirtualStatus(): Partial<InfiniteGridItemStatus> {
    return {
      type: ITEM_TYPE.VIRTUAL,
      groupKey: this.groupKey,
      key: this.key,
      orgRect: this.orgRect,
      cssRect: this.cssRect,
      attributes: this.attributes,
    };
  }
  public getStatus(): Required<InfiniteGridItemStatus> {
    return {
      ...super.getStatus(),
      type: ITEM_TYPE.ITEM,
      groupKey: this.groupKey,
      html: this.html,
    };
  }
}

export interface InfiniteGridItem extends Required<InfiniteGridItemStatus> {}
