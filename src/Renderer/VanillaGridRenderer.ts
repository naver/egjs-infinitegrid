import { GridItem } from "@egjs/grid";
import { RendererItem } from "./Renderer";
import { VanillaRenderer } from "./VanillaRenderer";

export interface GridRendererItem extends RendererItem {
  orgItem: GridItem;
}

export class VanillaGridRenderer extends VanillaRenderer<GridRendererItem> {
  constructor() {
    super();
  }
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
