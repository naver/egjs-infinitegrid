import Grid, { GridItem } from "@egjs/grid";
import { diff } from "@egjs/list-differ";

export interface Group {
  key: number | string;
  grid: Grid;
}
export interface GroupManagerItem {
  groupkey: string | number;
  key: string | number;
  item?: null;
}

export class GroupManager {
  protected groups: Group[] = [];
  protected items: GroupManagerItem[] = [];

  public getGroups(): Group[] {
    return this.groups;
  }
  public getItems(): GroupManagerItem[] {
    return this.items;
  }
  public syncItems(nextItems: GroupManagerItem[]) {
    const result = diff(this.items, nextItems, ({ key }) => key);
  }
}
