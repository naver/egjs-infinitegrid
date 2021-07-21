import { GridItem, GridItemStatus } from "@egjs/grid";
import { InfiniteGridItemInfo } from "./types";

export interface InfiniteGridItemStatus extends GridItemStatus {
  groupKey: string | number;
  key: string | number;
  html: string;
}

export class InfiniteGridItem extends GridItem implements Required<InfiniteGridItemInfo> {
  public groupKey: string | number;
  public readonly html: string;
  constructor(horizontal: boolean, itemStatus?: Partial<InfiniteGridItemStatus>) {
    super(horizontal, {
      html: "",
      ...itemStatus,
    });
  }
  public getStatus(): Required<InfiniteGridItemStatus> {
    return {
      ...super.getStatus(),
      groupKey: this.groupKey,
      html: this.html,
    };
  }
}

export interface InfiniteGridItem extends Required<InfiniteGridItemStatus> {}
