<script lang="ts">
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate,
    createEventDispatcher
  } from "svelte";
  import VanillaInfiniteGrid, {
    INFINITEGRID_EVENTS,
    GridLayout,
    categorize,
    ItemManager,
    CONTAINER_CLASSNAME
  } from "@egjs/infinitegrid";
  import type {
    IInfiniteGridOptions,
    ILayout,
    IInfiniteGridStatus,
    IInfiniteGridItem,
  } from "@egjs/infinitegrid";
  import LoadingChecker from "./LoadingChecker.svelte";
  import { PROP_NAMES } from "./consts";

  export let groupBy = (item, index) => item.groupKey;
  export let itemBy = (item, index) => item.key;
  export let items: any[] = [];
  export let useFirstRender = false;
  export let status: IInfiniteGridStatus | null = null;
  export let layoutType: new () => ILayout = GridLayout;
  export let options: Partial<IInfiniteGridOptions> = {};
  export let layoutOptions: { [key: string]: any } = {};
  export let _forceCount = 0;

  const dispatch = createEventDispatcher();
  let viewer: HTMLElement;
  let container: HTMLElement;
  let nextFunction = () => {};
  let layoutState;
  let visibleItems: any[] = [];
  let ig: VanillaInfiniteGrid;
  let hasLoadingElement = true;
  let attributes = {};
  let isFirstMount = true;

  function toItems(items) {
    return items.map((item, i) => ({
      groupKey: groupBy(item, i),
      itemKey: itemBy(item, i),
      data: item
    }));
  }
  function beforeSync(items) {
    return ig.beforeSync(toItems(items));
  }
  function getLoadingElement() {
    if (hasLoadingElement) {
      const el = container || viewer;

      return el!.lastElementChild;
    }
  }
  function getElements() {
    const el = container || viewer;
    const elements = [].slice.call(el!.children);

    if (hasLoadingElement) {
      return elements.slice(0, -1);
    }
    return elements;
  }
  function updateAttributes() {
    attributes = { ...$$props };

    PROP_NAMES.forEach(name => {
      delete attributes[name];
    });
  }

  const groups = categorize(items);

  if (status) {
    const { startCursor, endCursor } = status._infinite;
    visibleItems = ItemManager.pluck(
      groups.slice(startCursor, endCursor + 1),
      "items"
    ).map(item => item.data);
  } else if (useFirstRender && groups[0]) {
    visibleItems = groups[0].items.map(item => item.data);
  }
  beforeUpdate(() => {
    updateAttributes();
    if (!ig) {
      return;
    }
    const result = beforeSync(items);

    layoutState = result === "relayout" ? result : layoutState || result;
    visibleItems = ig.getRenderingItems().map(item => item.data);

    const loadingElement = getLoadingElement();

    if (loadingElement) {
      ig.setLoadingBar({
        append: loadingElement,
        prepend: loadingElement
      });
    } else {
      ig.setLoadingBar();
    }
  });
  onMount(() => {
    ig = new VanillaInfiniteGrid(viewer!, {
      ...options,
      renderExternal: true
    }).on("render", ({ next }) => {
      setTimeout(() => {
        nextFunction = next;
        ++_forceCount;
      });
    });
    INFINITEGRID_EVENTS.forEach(name => {
      ig.on(name as any, (e: any) => {
        dispatch(name, e);
      });
    });
    ig.setLayout(layoutType, layoutOptions);

    const loadingElement = getLoadingElement();

    if (loadingElement) {
      ig.setLoadingBar({
        append: loadingElement,
        prepend: loadingElement
      });
    }
    if (status) {
      setStatus(status, true);
    } else {
      beforeSync(items);
      ig.layout(true);
    }
  });
  afterUpdate(() => {
    if (isFirstMount) {
      isFirstMount = false;
      return;
    }
    const currentNextFunction = nextFunction;
    nextFunction = () => {};
    ig.sync(getElements());

    if (layoutState) {
      layoutState = "";
      ig.layout(layoutState === "relayout");
    }
    currentNextFunction();
  });
  onDestroy(() => {
    ig.destroy();
  });

  export function getInstance() {
    return ig;
  }
  export function setStatus(status: IInfiniteGridStatus, applyScrollPos?: boolean, syncElements: HTMLElement[] = getElements()) {
    ig.setStatus(status, applyScrollPos, syncElements);
    return ig;
  }
</script>

<div {...attributes} bind:this={viewer}>
  {#if options.isOverflowScroll}
    <div class={CONTAINER_CLASSNAME} bind:this={container}>
      <slot {visibleItems} />
      <slot name="loading">
        <LoadingChecker bind:hasLoading={hasLoadingElement} />
      </slot>
    </div>
  {:else}
    <slot {visibleItems} />
    <slot name="loading">
      <LoadingChecker bind:hasLoading={hasLoadingElement} />
    </slot>
  {/if}
</div>
