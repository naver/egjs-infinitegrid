<script lang="ts">
  /**
   * egjs-infinitegrid
   * Copyright (c) 2021-present NAVER Corp.
   * MIT license
   */
  import {
    onMount,
    beforeUpdate,
    createEventDispatcher,
    onDestroy,
    afterUpdate,
  } from "svelte";
  import VanillaInfiniteGrid, {
    INFINITEGRID_EVENTS,
    InfiniteGridFunction,
    InfiniteGridOptions,
    Renderer,
    CONTAINER_CLASS_NAME,
    InfiniteGridItem,
    InfiniteGridItemInfo,
    getRenderingItems,
    mountRenderingItems,
  } from "@egjs/infinitegrid";
  import { SVELTE_INFINITEGRID_PROPS } from "./consts";
  export let GridClass: InfiniteGridFunction;

  const dispatch = createEventDispatcher();
  const renderer = new Renderer();
  let wrapper: HTMLElement;
  let container: HTMLElement;
  let grid: VanillaInfiniteGrid;
  let isFirstMount = false;
  let attributes = {};
  let visibleItems: InfiniteGridItem[] = [];

  function updateAttributes() {
    attributes = { ...$$props };

    const defaultOptions = GridClass.defaultOptions;

    delete attributes["GridClass"];
    for (const name in defaultOptions) {
      delete attributes[name];
    }
    SVELTE_INFINITEGRID_PROPS.forEach((name) => {
      delete attributes[name];
    });
  }
  function getItemInfos(): InfiniteGridItemInfo[] {
    const items = $$props.items || [];
    const itemBy = $$props.itemBy || ((item) => item.key);
    const groupBy = $$props.groupBy || ((item) => item.groupKey);


    return items.map((item, i) => {
      return {
        groupKey: groupBy(item, i),
        key: itemBy(item, i),
        data: item,
      };
    });
  }
  function updateVisibleChildren() {
    visibleItems = getRenderingItems(getItemInfos(), {
      grid,
      status: $$props.status,
      usePlaceholder: $$props.usePlaceholder,
      useFirstRender: $$props.useFirstRender,
      useLoading: $$props.useLoading,
      horizontal: $$props.horizontal,
    });
  }

  beforeUpdate(() => {
    updateAttributes();
    updateVisibleChildren();
  });
  onMount(() => {
    const defaultOptions = GridClass.defaultOptions;
    const options: Partial<InfiniteGridOptions> = {};

    for (const name in defaultOptions) {
      if (name in $$props) {
        (options as any)[name] = $$props[name];
      }
    }
    if (container) {
      options.container = container;
    }
    options.renderer = renderer;
    grid = new GridClass(wrapper!, options);

    for (const name in INFINITEGRID_EVENTS) {
      const eventName = INFINITEGRID_EVENTS[name];

      grid.on(eventName as any, (e: any) => {
        dispatch(eventName, e);
      });
    }
    renderer.on("requestUpdate", () => {
      updateVisibleChildren();
    });
    mountRenderingItems(getItemInfos(), {
      grid,
      status: $$props.status,
      usePlaceholder: $$props.usePlaceholder,
      useFirstRender: $$props.useFirstRender,
      useLoading: $$props.useLoading,
      horizontal: $$props.horizontal,
    });
    renderer.updated();
  });
  afterUpdate(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    const propertyTypes = GridClass.propertyTypes;

    for (const name in propertyTypes) {
      if (name in $$props) {
        (grid as any)[name] = ($$props as any)[name];
      }
    }
    renderer.updated();
  });
  onDestroy(() => {
    grid.destroy();
  });
  export function getInstance() {
    return grid;
  }
</script>

<div bind:this={wrapper} {...attributes}>
  {#if $$props.container === true}
    <div class={CONTAINER_CLASS_NAME} bind:this={container}>
      <slot {visibleItems} />
    </div>
  {:else}
    <slot {visibleItems} />
  {/if}
</div>
