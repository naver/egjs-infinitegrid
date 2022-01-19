import VanillaInfiniteGrid, {
  FrameInfiniteGridOptions, InfiniteGridMethods, InfiniteGridOptions, JustifiedInfiniteGridOptions,
  MasonryInfiniteGridOptions, PackingInfiniteGridOptions,
} from "@egjs/Infinitegrid";
import { SvelteComponentDev } from "svelte/internal";

export interface SveltInfiniteGridOptions {
  items?: any[];
  useFirstRender?: boolean;
  usePlaceholder?: boolean;
  useLoading?: boolean;
  status?: InfiniteGridStatus;
}

export default abstract class InfiniteGrid<T extends InfiniteGridOptions> extends SvelteComponentDev {
  $$prop_def: Record<string, any> & SveltInfiniteGridOptions & T;
  getInstance(): VanillaInfiniteGrid;
}

export default interface InfiniteGrid<T extends InfiniteGridOptions> extends InfiniteGridMethods<InfiniteGrid<T>> {
  // eslint-disable-next-line semi
}

export class MasonryInfiniteGrid extends InfiniteGrid<MasonryInfiniteGridOptions> { }
export class JustifiedInfiniteGrid extends InfiniteGrid<JustifiedInfiniteGridOptions> { }
export class FrameInfiniteGrid extends InfiniteGrid<FrameInfiniteGridOptions> { }
export class PackingInfiniteGrid extends InfiniteGrid<PackingInfiniteGridOptions> { }
