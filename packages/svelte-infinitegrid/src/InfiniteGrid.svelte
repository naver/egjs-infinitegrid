<script>
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
  import {
    INFINITEGRID_EVENTS,
    Renderer,
    CONTAINER_CLASS_NAME,
    getRenderingItems,
    mountRenderingItems,
  } from "@egjs/infinitegrid";
  import { SVELTE_INFINITEGRID_PROPS } from "./consts";
  export let GridClass;
  export let vanillaGrid  = null;

  const dispatch = createEventDispatcher();
  const renderer = new Renderer();
  let wrapper;
  let container;
  let isFirstMount = false;
  let attributes = {};
  let visibleItems = [];

  function updateAttributes(props) {
    attributes = { ...props };

    const defaultOptions = GridClass.defaultOptions;

    delete attributes["GridClass"];
    for (const name in defaultOptions) {
      delete attributes[name];
    }
    SVELTE_INFINITEGRID_PROPS.forEach((name) => {
      delete attributes[name];
    });
  }
  function getItemInfos() {
    const items = $$props.items || [];
    const itemBy = $$props.itemBy || ((item) => item.key);
    const groupBy = $$props.groupBy || ((item) => item.groupKey);
    const infoBy = $$props.infoBy || (() => ({}));

    return items.map((item, i) => {
      const {
        data,
        ...rest
      } = infoBy(child, i) || {};
      return {
        groupKey: groupBy(item, i),
        key: itemBy(item, i),
        ...rest,
        data: {
          ...data,
          ...item,
        },
      };
    });
  }
  function updateVisibleChildren(props) {
    visibleItems = getRenderingItems(getItemInfos(), {
      grid: vanillaGrid,
      status: props.status,
      usePlaceholder: props.usePlaceholder,
      useFirstRender: props.useFirstRender,
      useLoading: props.useLoading,
      horizontal: props.horizontal,
    });
  }

  beforeUpdate(() => {
    updateAttributes($$props);
    updateVisibleChildren($$props);
  });

  onMount(() => {
    const defaultOptions = GridClass.defaultOptions;
    const options = {};

    for (const name in defaultOptions) {
      if (name in $$props) {
        options[name] = $$props[name];
      }
    }
    if (container) {
      options.container = container;
    }
    options.renderer = renderer;
    vanillaGrid = new GridClass(wrapper, options);

    for (const name in INFINITEGRID_EVENTS) {
      const eventName = INFINITEGRID_EVENTS[name];

      vanillaGrid.on(eventName, (e) => {
        dispatch(eventName, e);
      });
    }
    renderer.on("requestUpdate", () => {
      updateVisibleChildren($$props);
    });

    mountRenderingItems(getItemInfos(), {
      grid: vanillaGrid,
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
        vanillaGrid[name] = $$props[name];
      }
    }
    renderer.updated();
  });
  onDestroy(() => {
    vanillaGrid && vanillaGrid.destroy();
  });
  export function getInstance() {
    return vanillaGrid;
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
