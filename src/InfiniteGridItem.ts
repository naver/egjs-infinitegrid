import { GridItem, GridItemStatus } from "@egjs/grid";

export interface InfiniteGridItemStatus extends GridItemStatus {
  groupKey: string | number;
}
export class InfiniteGridItem extends GridItem {
  constructor(horizontal: boolean, itemStatus?: Partial<InfiniteGridItemStatus>) {
    super(horizontal, itemStatus);
  }
}
export interface InfiniteGridItem extends Required<InfiniteGridItemStatus> {}
