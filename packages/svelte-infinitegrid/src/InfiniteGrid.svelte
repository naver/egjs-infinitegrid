<script lang="ts">
  import VanillaInfiniteGrid, {
    IInfiniteGridOptions,
    ILayout,
    IInfiniteGridStatus,
    INFINITEGRID_EVENTS,
    GridLayout,
    categorize,
    IInfiniteGridItem,
    StyleType,
    ItemManager
  } from "@egjs/infinitegrid";
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    tick,
    createEventDispatcher
  } from "svelte";

  export let groupBy = (item, index) => item.groupKey;
  export let itemBy = (item, index) => item.key;
  export let items: any[] = [];
  export let useFirstRender = false;
  export let loading;
  export let status: IInfiniteGridStatus = null;
  export let layoutType: new () => ILayout = GridLayout;
  export let options: Partial<IInfiniteGridOptions> = {};
  export let layoutOptions: { [key: string]: any } = {};
  export let _forceCount = 0;

  let visibleItems = [];

  const dispatch = createEventDispatcher();
  let nextFunction = () => {};
  let layoutState;
  let wrapper;
  let container;
  let ig: VanillaInfiniteGrid;

  let l2;

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
  function getElements() {
    const el = container || wrapper;
    const elements = [].slice.call(el.children);

    if (loading) {
      return elements.filter(el => el !== loading);
    } else if (loading !== false) {
      return elements.slice(0, -1);
    }
    return elements;
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
    if (!ig) {
      return;
    }
    const result = beforeSync(items);

    layoutState = result === "relayout" ? result : layoutState || result;
    visibleItems = ig.getRenderingItems().map(item => item.data);

    if (loading) {
      ig.setLoadingBar({
        append: loading,
        prepend: loading
      });
    } else {
      ig.setLoadingBar();
    }
    setTimeout(() => {
      const currentNextFunction = nextFunction;
      nextFunction = () => {};
      ig.sync(getElements());

      if (layoutState) {
        layoutState = "";
        ig.layout(layoutState === "relayout");
      }
      currentNextFunction();
    });
  });
  onMount(() => {
    ig = new VanillaInfiniteGrid(wrapper, {
      ...options,
      renderExternal: true
    }).on("render", ({ next }) => {
      nextFunction = next;
      ++_forceCount;
    });
    INFINITEGRID_EVENTS.forEach(name => {
      ig.on(name, e => {
        dispatch(name, e);
      });
    });
    ig.setLayout(layoutType, layoutOptions);

    if (loading) {
      ig.setLoadingBar({
        append: loading,
        prepend: loading
      });
    }
    if (status) {
      ig.setStatus(status, true, getElements());
    } else {
      beforeSync(items);
      ig.layout(true);
    }
  });
  onDestroy(() => {
    ig.destroy();
  });
  function clearLoadingBar() {
    loading = false;
  }

  export function isLoading() {
    return ig.isLoading();
  }
  export function isProcessing() {
    return ig.isProcessing();
  }
  export function startLoading(
    isAppend?: boolean,
    userStyle: StyleType = { display: "block" }
  ) {
    ig.startLoading(isAppend, userStyle);
    return this;
  }
  export function endLoading(userStyle: StyleType = { display: "none" }) {
    ig.endLoading(userStyle);
    return this;
  }
  export function getItem(
    groupIndex: HTMLElement | number = 0,
    itemIndex?: number
  ): IInfiniteGridItem | undefined {
    return ig.getItem(groupIndex, itemIndex);
  }
  export function updateItem(groupIndex?: number, itemIndex?: number) {
    ig.updateItem(groupIndex, itemIndex);
    return this;
  }
  export function updateItems() {
    ig.updateItems();
    return this;
  }
  export function moveTo(index: number, itemIndex = 0) {
    ig.moveTo(index, itemIndex);
    return this;
  }
  export function layout(isRelayout = true) {
    ig.layout(isRelayout);
    return this;
  }
  export function getStatus(
    startKey?: string | number,
    endKey?: string | number
  ): IInfiniteGridStatus {
    return ig.getStatus(startKey, endKey);
  }
  export function setStatus(
    status: IInfiniteGridStatus,
    applyScrollPos = true,
    syncElements?: HTMLElement[]
  ) {
    ig.setStatus(status, applyScrollPos, syncElements);
    return this;
  }
  export function getItems(includeCached = false): IInfiniteGridItem[] {
    return ig.getItems(includeCached);
  }
  export function getGroupKeys(includeCached?: boolean) {
    return ig.getGroupKeys(includeCached);
  }
  export function getLoadingBar(isAppend?: boolean) {
    return ig.getLoadingBar(isAppend);
  }
</script>

<div class="wrapper" bind:this={wrapper}>
  <slot {visibleItems} />
  {#if ig}
    <slot name="loading">{(clearLoadingBar(), '')}</slot>
  {/if}
</div>
