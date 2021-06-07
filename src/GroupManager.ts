import Grid, { GridItem } from "@egjs/grid";

export interface GroupManagerOptions {
  gridContructor: new (container, gridOptions) => Grid;
}
export interface Group {
  groupKey: number | string;
  grid: Grid;
}
export interface GroupManagerItem {
  groupKey: string | number;
  key: string | number;
  item?: GridItem | null;
}
export interface GroupManagerGroup {
  groupKey: string | number;
  items: GroupManagerItem[];
}

export function categorize(items: GroupManagerItem[]): GroupManagerGroup[] {
  const groups: GroupManagerGroup[] = [];

  const groupKeys: { [key: string]: GroupManagerGroup } = {};

  items.forEach((item) => {
    const { groupKey } = item;
    let group = groupKeys[groupKey];

    if (!group) {
      group = {
        groupKey,
        items: [],
      };
      groupKeys[groupKey] = group;
      groups.push(group);
    }

    group.items.push(item);
  });
  return groups;
}

export class GroupManager {
  protected groups: Group[] = [];
  protected groupKeys: Record<string | number, Group> = {};
  protected items: GroupManagerItem[] = [];

  constructor(protected container: HTMLElement, protected options: GroupManagerOptions) {}
  public getGroups(): Group[] {
    return this.groups;
  }
  public getItems(): GroupManagerItem[] {
    return this.items;
  }
  public syncItems(nextItems: GroupManagerItem[]) {
    const container = this.container;
    const prevGroupKeys = this.groupKeys;
    const nextManagerGroups = categorize(nextItems);
    const nextGroupKeys: Record<string | number, Group> = {};
    const GridContructor = this.options.gridContructor;
    const nextGroups: Group[] = nextManagerGroups.map(({ groupKey }) => {
      return {
        groupKey,
        grid: prevGroupKeys[groupKey]?.grid ?? new GridContructor(container, {}),
      };
    });

    nextGroups.forEach((group) => {
      nextGroupKeys[group.groupKey] = group;
    });

    this.items = nextItems;
    this.groups = nextGroups;
    this.groupKeys = nextGroupKeys;
  }
}
