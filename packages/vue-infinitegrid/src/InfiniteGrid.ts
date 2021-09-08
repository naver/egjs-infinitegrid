/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
 import VanillaInfiniteGrid, {
  InfiniteGridFunction,
  InfiniteGridOptions,
  INFINITEGRID_EVENTS,
  INFINITEGRID_METHODS,
  ITEM_TYPE,
  Renderer,
  getRenderingItems,
  mountRenderingItems,
} from "@egjs/infinitegrid";
import { VUE_INFINITEGRID_PROPS } from "./consts";
import { FrameInfiniteGrid } from "./grids/FrameInfiniteGrid";
import { JustifiedInfiniteGrid } from "./grids/JustifiedInfiniteGrid";
import { MasonryInfiniteGrid } from "./grids/MasonryInfiniteGrid";
import { PackingInfiniteGrid } from "./grids/PackingInfiniteGrid";
import { VueInfiniteGridInterface, VueInnerInfiniteInterface } from "./types";
import { decamelize } from "./utils";

export function makeInfiniteGrid<T extends InfiniteGridFunction>(tagName: string, GridClass: T): VueInfiniteGridInterface<T> {
  const {
    propertyTypes,
    defaultOptions,
  } = GridClass;
  const watch: Record<string, any> = {};

  for (const name in propertyTypes) {
    watch[name] = function (this: any, value: any) {
      this.$_grid[name] = value;
    };
  }
  const methods: Record<string, any> = {};

  INFINITEGRID_METHODS.forEach(name => {
    methods[name] = function (this: any, ...args: any[]) {
      return this.$_grid[name](...args);
    };
  });

  methods.$_getItemInfos = function (this: VueInnerInfiniteInterface) {
    const props = this.$props;
    const slots = this.$slots.default as any[] | (() => any);
    const itemBy = props.itemBy || ((item: any, i: number) => {
      const key = item.key;

      return key == null ? i : key;
    });
    const attributePrefix = props.attributePrefix || VanillaInfiniteGrid.defaultOptions.attributePrefix;

    const groupBy = props.groupBy || ((item: any) => {
      const props = item.props || item.data?.attrs;

      return props ? props[`${attributePrefix}groupkey`] : undefined;
    });

    let children: any[] = [];

    if (Array.isArray(slots)) {
      children = slots;
    }
    // Check Vue3 Slot Type

    return children.map((child, i) => {
      return {
        groupKey: groupBy(child, i),
        key: itemBy(child, i),
        data: {
          vnode: child,
        },
      };
    });
  }

  methods.$_getVisibleChildren = function (this: VueInnerInfiniteInterface) {
    const props = this.$props;
    const scopedSlots = this.$scopedSlots || this.$slots;
    const placeholder = scopedSlots.placeholder;
    const loading = scopedSlots.loading;

    const visibleItems = getRenderingItems(this.$_getItemInfos(), {
      grid: "$_grid" in this ? this.$_grid : null,
      status: props.status,
      horizontal: props.horizontal,
      useFirstRender: props.useFirstRender,
      usePlaceholder: !!scopedSlots.placeholder,
      useLoading: !!scopedSlots.loading,
    })

    return visibleItems.map((item) => {
      if (item.type === ITEM_TYPE.VIRTUAL) {
        return placeholder!({ item });
      } else if (item.type === ITEM_TYPE.LOADING) {
        return loading!({ item });
      } else {
        return item.data.vnode;
      }
    });
  };
  methods.$_renderContainer = function (this: VueInnerInfiniteInterface, h: any) {
    const props = this.$props;
    const visibleChildren = this.$_getVisibleChildren();
    const container = props.container;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const containerTag = props.containerTag as any || "div";

    if (container === true) {
      return h(containerTag, {
        ref: "containerRef",
      }, visibleChildren);
    }
    return visibleChildren;
  }

  return {
    name: tagName,
    props: [...VUE_INFINITEGRID_PROPS, ...Object.keys(defaultOptions)],
    watch,
    methods,
    render(this: VueInnerInfiniteInterface, h: any) {
      const props = this.$props;
      const tag = props.tag || "div";

      return h(
        tag,
        {
          ref: "wrapperRef",
        },
        this.$_renderContainer(h),
      );
    },
    created(this: VueInnerInfiniteInterface) {
      this.$_renderer = new Renderer();
    },
    mounted(this: VueInnerInfiniteInterface) {
      const defaultOptions = GridClass.defaultOptions;
      const options: Partial<InfiniteGridOptions> = {};
      const props = this.$props;
      const containerElement = this.$refs.containerRef;

      for (const name in defaultOptions) {
        if (name in props && typeof props[name] !== "undefined") {
          (options as any)[name] = (props as any)[name];
        }
      }

      if (containerElement) {
        options.container = containerElement;
      }

      options.renderer = this.$_renderer;

      const grid = new GridClass(this.$refs.wrapperRef, options);

      for (const name in INFINITEGRID_EVENTS) {
        const eventName = (INFINITEGRID_EVENTS as any)[name];
        const vueEventName = decamelize(eventName);

        grid.on(eventName, (e: any) => {
          this.$emit(vueEventName, e);
        });
      }

      this.$_grid = grid;
      this.$_renderer.on("requestUpdate", () => {
        this.$forceUpdate();
      });
      const scopedSlot = this.$scopedSlots || this.$slots;

      mountRenderingItems(this.$_getItemInfos(), {
        grid: this.$_grid,
        status: props.status,
        horizontal: props.horizontal,
        useFirstRender: props.useFirstRender,
        usePlaceholder: !!scopedSlot.placeholder,
        useLoading: !!scopedSlot.loading,
      });
      this.$_renderer.updated();
    },
    updated(this: VueInnerInfiniteInterface) {
      this.$_renderer.updated();
    },
    beforeDestroy(this: any) {
      this.$_grid.destroy();
    },
  } as any;
}

export function install(app: { component: (name: string, module: any) => any }): void {
  app.component("masonry-infinite-grid", MasonryInfiniteGrid);
  app.component("justified-infinite-grid", JustifiedInfiniteGrid);
  app.component("frame-infinite-grid", FrameInfiniteGrid);
  app.component("packing-infinite-grid", PackingInfiniteGrid);
}
