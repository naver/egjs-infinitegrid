import { Renderer, RendererItem } from "./Renderer";

export class VanillaRenderer<Item extends RendererItem = RendererItem> extends Renderer<Item> {
  public render(nextItems: Item[], state?: Record<string, any>) {
    const container = this.container!;
    const result = super.render(nextItems, state);
    const {
      prevList,
      removed,
      ordered,
      added,
      list,
    } = result;
    const diffList = [...prevList];


    removed.forEach((index) => {
      diffList.splice(index, 1);
      container.removeChild(prevList[index].element!);
    });
    ordered.forEach(([prevIndex, nextIndex]) => {
      const item = diffList.splice(prevIndex, 1)[0];

      diffList.splice(nextIndex, 0, item);
      container.insertBefore(item.element!, diffList[nextIndex + 1]?.element ?? null);
    });
    added.forEach((index) => {
      const item = list[index];

      diffList.splice(index, 0, item);
      container.insertBefore(item.element!, diffList[index + 1]?.element ?? null);
    });

    this.updated(container.children);
    return result;
  }
}
