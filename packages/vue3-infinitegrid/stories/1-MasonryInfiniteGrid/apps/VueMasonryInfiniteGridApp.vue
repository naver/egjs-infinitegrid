<template>
  <masonry-infinite-grid
    class="container"
    v-bind:gap="5"
    v-on:request-append="onRequestAppend"
  >
    <div
      class="item"
      v-for="item in items"
      :key="item.key"
      :data-grid-groupkey="item.groupKey"
    >
      <div class="thumbnail">
        <img
          v-bind:src="
            'https://naver.github.io/egjs-infinitegrid/assets/image/' +
            ((item.key % 33) + 1) +
            '.jpg'
          "
          alt="egjs"
        />
      </div>
      <div class="info">egjs {{ item.key }}</div>
    </div>
  </masonry-infinite-grid>
</template>
<script lang="ts">
import { MasonryInfiniteGrid } from "../../../src";

export default {
  components: {
    MasonryInfiniteGrid,
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
