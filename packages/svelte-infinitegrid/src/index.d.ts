import VanillaGrid, {
  FrameGridOptions, GridMethods, GridOptions, JustifiedGridOptions,
  MasonryGridOptions, PackingGridOptions,
} from "@egjs/grid";
import { SvelteComponentDev } from "svelte/internal";


export default abstract class Grid<T extends GridOptions> extends SvelteComponentDev {
  $$prop_def: T;
  getInstance(): VanillaGrid;
}

export default interface Grid<T extends GridOptions> extends GridMethods<Grid<T>> {
  // eslint-disable-next-line semi
}

export class MasonryGrid extends Grid<MasonryGridOptions> { }
export class JustifiedGrid extends Grid<JustifiedGridOptions> { }
export class FrameGrid extends Grid<FrameGridOptions> { }
export class PackingGrid extends Grid<PackingGridOptions> { }
