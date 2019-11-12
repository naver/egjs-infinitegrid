<script lang="ts">
  import VanillaInfiniteGrid, {
    IInfiniteGridOptions,
    ILayout,
  } from "@egjs/infinitegrid";

  import {
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate,
    tick
  } from "svelte";

  export let options: Partial<GuidesProps> = {};
  export let layoutOptions: { [key: string]: any } = {};

  let ig: VanillaInfiniteGrid;

  beforeUpdate(() => {
  });
  onMount(() => {
    ig = new VanillaInfiniteGrid(viewer, options);
    ig.setLayout(layoutOptions);
  });
  onDestroy(() => {
    ig.destroy();
  });
</script>
