import Component from "@egjs/component";
import { diff, DiffResult } from "@egjs/list-differ";

export interface RendererItem {
  key: string | number;
  element?: Element | null;
}

export interface OnRendererUpdated<T extends RendererItem = RendererItem> {
  items: T[];
  elements: Element[];
  isChanged: boolean;
  diffResult: DiffResult<T>;
}

export interface RendererEvents<T extends RendererItem = RendererItem> {
  update: void;
  updated: OnRendererUpdated<T>;
}

export class Renderer<T extends RendererItem = RendererItem> extends Component<RendererEvents> {
  protected items: T[] = [];
  protected container: Element | null = null;
  private _diffResult: DiffResult<T>;

  public getItems() {
    return this.items;
  }
  public setContainer(container: Element) {
    this.container = container;
  }
  public setItems(items: T[]) {
    this.items = items;
  }
  public render(nextItems: T[]) {
    return this.syncItems(nextItems);
  }
  public update() {
    this.trigger("update");
    return false;
  }
  public updated(nextElements: ArrayLike<Element>) {
    const items = this.items;
    const diffResult = this._diffResult;
    const isChanged = !!(diffResult.added.length || diffResult.removed.length || diffResult.changed.length);

    items.forEach((item, i) => {
      item.element = nextElements[i];
    });

    this.trigger("updated", {
      items,
      elements: [].slice.call(nextElements),
      diffResult: this._diffResult,
      isChanged,
    });

    return isChanged;
  }
  protected syncItems(nextItems: T[]) {
    const result = diff(this.items, nextItems, (item) => item.key);

    this._diffResult = result;
    this.items = nextItems;

    return result;
  }
}
