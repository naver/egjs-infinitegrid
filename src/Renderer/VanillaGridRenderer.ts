import { InfiniteGridItem } from "../InfiniteGridItem";
import { RendererItem } from "./Renderer";
import { VanillaRenderer } from "./VanillaRenderer";

export interface GridRendererItem extends RendererItem {
  orgItem: InfiniteGridItem;
}

export class VanillaGridRenderer extends VanillaRenderer<GridRendererItem> {
  public syncItems(nextItems: GridRendererItem[]) {
    const result = super.syncItems(nextItems);
    const {
      added,
      list,
    } = result;
    added.forEach((index) => {
      const orgItem = nextItems[index].orgItem;

      // createElement(orgItem.element);

      list[index].element = orgItem.element!;
    });

    return result;
  }
}
