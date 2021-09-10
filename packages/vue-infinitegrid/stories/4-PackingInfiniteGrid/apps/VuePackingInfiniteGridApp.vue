<template>
  <FrameInfiniteGrid
    class="container"
    v-bind:gap="5"
    v-bind:frame="[[1, 1, 2, 2, 3], [1, 1, 4, 5, 5]]"
    v-on:request-append="onRequestAppend"
  >
    <div
      class="item"
      v-for="item in items"
      :key="item.key"
      :data-grid-groupkey="item.groupKey"
    >
      <img
        v-bind:src="
          'https://naver.github.io/egjs-infinitegrid/assets/image/' +
          ((item.key % 33) + 1) +
          '.jpg'
        "
        alt="egjs"
        style="width: 100%; height: 100%;"
      />
    </div>
  </FrameInfiniteGrid>
</template>
<script lang="ts">
import { FrameInfiniteGrid } from "../../../src";

export default {
  components: {
    FrameInfiniteGrid,
  },
  data() {
    return {
      items: this.getItems(0, 10),
    };
  },
  methods: {
    getItems(nextGroupKey: number, count: number) {
      const nextItems: any[] = [];

      for (let i = 0; i < count; ++i) {
        const nextKey = nextGroupKey * count + i;

        nextItems.push({ groupKey: nextGroupKey, key: nextKey });
      }
      return nextItems;
    },
    onRequestAppend(e) {
      const nextGroupKey = (+e.groupKey! || 0) + 1;

      this.items = [...this.items, ...this.getItems(nextGroupKey, 10)];
    },
  },
};
</script>
<style>
@import "../../../../../stories/templates/default.css";
</style>
