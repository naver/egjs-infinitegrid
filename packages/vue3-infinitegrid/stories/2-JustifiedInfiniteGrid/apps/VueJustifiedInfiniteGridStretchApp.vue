<template>
  <JustifiedInfiniteGrid
    class="container"
    v-bind:gap="5"
    v-bind:stretch="true"
    v-bind:passUnstretchRow="true"
    v-bind:sizeRange="[228, 228]"
    v-bind:stretchRange="[144, 320]"
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
          data-grid-maintained-target="true"
          alt="egjs"
        />
      </div>
      <div class="info">egjs {{ item.key }}</div>
    </div>
  </JustifiedInfiniteGrid>
</template>
<script lang="ts">
import { JustifiedInfiniteGrid } from "../../../src";

export default {
  components: {
    JustifiedInfiniteGrid,
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
