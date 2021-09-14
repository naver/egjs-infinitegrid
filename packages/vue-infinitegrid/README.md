<h1 align="center">
  <img width="256" alt="InfiniteGrid Logo" src="https://naver.github.io/egjs-infinitegrid/img/infinitegrid_logo.png"><br/>
  @egjs/vue-infinitegrid
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@egjs/vue-infinitegrid" target="_blank">
    <img src="https://img.shields.io/npm/v/@egjs/vue-infinitegrid.svg?style=flat-square&color=42b883&label=version&logo=NPM">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/vue-infinitegrid" target="_blank">
    <img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/vue-infinitegrid.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc">
  </a>
  <a href="https://github.com/naver/egjs-infinitegrid/graphs/commit-activity">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/naver/egjs-infinitegrid.svg?style=flat-square&label=%E2%AC%86%20commits&color=08CE5D">
  </a>
  <a href="https://www.npmjs.com/package/@egjs/vue-infinitegrid" target="_blank">
    <img src="https://img.shields.io/npm/dm/@egjs/vue-infinitegrid.svg?style=flat-square&label=%E2%AC%87%20downloads&color=08CE5D" alt="npm downloads per month">
  </a>
  <a href="https://github.com/naver/egjs-infinitegrid/graphs/contributors" target="_blank">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/naver/egjs-infinitegrid.svg?label=%F0%9F%91%A5%20contributors&style=flat-square&color=08CE5D"></a>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE" target="_blank">
    <img alt="GitHub" src="https://img.shields.io/github/license/naver/egjs-infinitegrid.svg?style=flat-square&label=%F0%9F%93%9C%20license&color=08CE5D">
  </a>
</p>

<p align="center">
  A Vue component that can arrange items infinitely according to the type of grids
</p>

<p align="center">
  <a href="https://naver.github.io/egjs-infinitegrid/">Demo</a> / <a href="https://naver.github.io/egjs-infinitegrid/docs/api/InfiniteGrid">Documentation</a> / <a href="https://naver.github.io/egjs/">Other components</a>
</p>

<p align=center>
  ⚠️ If you're looking for InfiniteGrid for Vue 3, check out <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/vue3-infinitegrid/README.md">@egjs/vue3-infinitegrid</a>
</p>

## ⚙️ Installation
```sh
npm install --save @egjs/vue-infinitegrid
```

## ❗ Changes from [@egjs/infinitegrid](https://github.com/naver/egjs-infinitegrid)
- All `camelCased` event names became **`kebab-case`**
  - e.g., `requestAppend` => **`request-append`**
- You can't use methods that manipulates DOM directly
  - e.g., `append()`, `prepend()`, `insert()`, `remove()`

## 🏃 Quick Start

```vue
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
      ...
    </div>
  </masonry-infinite-grid>
</template>
<script lang="ts">
import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";

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
```

## 🙌 Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-infinitegrid/blob/master/CONTRIBUTING.md).

## 📝 Feedback
Please file an [Issue](https://github.com/naver/egjs-infinitegrid/issues) with label "Vue".

## 📜 License
egjs-infinitegrid is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015-present NAVER Corp.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<p align="center">
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" ></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>
