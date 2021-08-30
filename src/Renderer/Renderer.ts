import Component from "@egjs/component";
import { diff, DiffResult } from "@egjs/list-differ";
import { toArray } from "../utils";

export interface RendererItem {
  key: string | number;
  renderKey?: string;
  element?: Element | null;
}

export interface OnRendererUpdated<T extends RendererItem = RendererItem> {
  items: T[];
  elements: Element[];
  isChanged: boolean;
  state: Record<string, any>;
  diffResult: DiffResult<T>;
}

export interface OnRendererUpdate {
  state: Record<string, any>;
}
export interface RendererEvents<T extends RendererItem = RendererItem> {
  update: OnRendererUpdate;
  updated: OnRendererUpdated<T>;
  requestUpdate: OnRendererUpdate;
}

export class Renderer<Item extends RendererItem = RendererItem> extends Component<RendererEvents> {
  protected items: Item[] = [];
  protected container: Element | null = null;
  protected rendererKey = 0;
  private _diffResult: DiffResult<Item>;
  private _updateTimer = 0;
  private _state: Record<string, any> = {};

  public updateKey() {
    this.rendererKey = Date.now();
  }

  public getItems() {
    return this.items;
  }
  public setContainer(container: Element) {
    this.container = container;
  }
  public render(nextItems: Item[], state?: Record<string, any>) {
    if (state) {
      this._state = state;
    }
    return this.syncItems(nextItems);
  }
  public update(state: Record<string, any> = {}) {
    this._state = state;
    this.trigger("update", {
      state,
    });

    clearTimeout(this._updateTimer);
    this._updateTimer = window.setTimeout(() => {
      this.trigger("requestUpdate", {
        state,
      });
    });
  }
  public updated(nextElements: ArrayLike<Element> = this.container?.children ?? []) {
    const diffResult = this._diffResult;
    const isChanged = !!(diffResult.added.length || diffResult.removed.length || diffResult.changed.length);
    const state = this._state;

    this._state = {};

    const nextItems = diffResult.list;

    this.items = nextItems;
    nextItems.forEach((item, i) => {
      item.element = nextElements[i];
    });

    this.trigger("updated", {
      items: nextItems,
      elements: toArray(nextElements),
      diffResult: this._diffResult,
      state,
      isChanged,
    });

    return isChanged;
  }
  public destroy() {
    this.off();
  }
  protected syncItems(items: Item[]) {
    const rendererKey = this.rendererKey;
    const prevItems = this.items;
    const nextItems = items.map((item) => ({
      ...item,
      renderKey:  `${rendererKey}_${item.key}`,
    }));

    const result = diff(prevItems, nextItems, (item) => item.renderKey!);

    this._diffResult = result;

    return result;
  }
}
