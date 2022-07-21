import Grid, {
  GridOptions,
  PROPERTY_TYPE,
  Properties,
  GetterSetter,
  GridItem,
} from "@egjs/grid";

export interface SampleGridOptions extends GridOptions {
  renderProperty?: number;
  property?: string;
}

@GetterSetter
export class SampleGrid extends Grid<SampleGridOptions> {
  public static propertyTypes = {
    ...Grid.propertyTypes,
    renderProperty: PROPERTY_TYPE.RENDER_PROPERTY,
    property: PROPERTY_TYPE.PROPERTY,
  };
  public static defaultOptions: Required<SampleGridOptions> = {
    ...Grid.defaultOptions,
    renderProperty: -1,
    property: "property1",
  };

  public applyGrid(items: GridItem[], direction: "start" | "end", outline: number[]) {
    let startOutline = outline.length ? [...outline] : [0];
    let endOutline = [...startOutline];

    if (direction === "end") {
      items.forEach((item) => {
        const prevPos = endOutline[0] || 0;
        const rect = item.rect;


        item.setCSSGridRect({
          inlineSize: item.inlineSize,
          contentSize: item.contentSize,
          contentPos: prevPos,
          inlinePos: 0,
        });

        endOutline = [prevPos + (rect?.height ?? 0) + this.gap];
      });
    } else {
      items.forEach((item) => {
        const prevPos = startOutline[0] || 0;
        const rect = item.rect;

        startOutline = [prevPos - (rect?.height ?? 0) - this.gap];
        
        item.setCSSGridRect({
          inlineSize: item.inlineSize,
          contentSize: item.contentSize,
          contentPos: startOutline[0],
          inlinePos: 0,
        });
      });
    }
    return {
      start: startOutline,
      end: endOutline,
    };
  }
}

export interface SampleGrid extends Properties<typeof SampleGrid> {}
