# vue-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Fvue-infinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Fvue-infinitegrid)

A Vue.js wrapper of [egjs-infinitegrid](https://github.com/naver/egjs-infinitegrid)

[Demo](https://codesandbox.io/s/egjsvue-infinitegrid-examples-itlw2) / [Documentation](https://naver.github.io/egjs-infinitegrid/release/latest/doc/) / [Other Components](https://naver.github.io/egjs/)

## Installation
```bash
$ npm install @egjs/vue-infinitegrid --save
```

## ❗ Changes from [@egjs/infinitegrid](https://github.com/naver/egjs-infinitegrid)
- All `camelCased` event names became **`kebab-case`**
  - e.g., `layoutComplete` => **`layout-complete`**
- You can't use methods that manipulates DOM directly
  - e.g., `append()`, `remove()`, ...
- Loading element can be used via named slot with name "loading"
```vue
<template>
  <GridLayout>
    <div slot="loading">Loading...</div>
  </GridLayout>
</template>
```

## 🏃 Quick Start
### Global registration
```js
import VueInfiniteGrid from "@egjs/vue-infinitegrid";
Vue.use(VueInfiniteGrid);
```

### Local registration
```js
// All available layouts are in src/layouts
import { GridLayout } from "@egjs/vue-flicking";

export default {
  components: {
    GridLayout: GridLayout,
  }
}
```

### Usage
See [demo source](https://github.com/naver/egjs-infinitegrid/tree/master/packages/vue-infinitegrid/demo) for detailed implementation.

```vue
<template>
  <GridLayout
    ref="ig"
    :options="{
      align: 'center',
      transitionDuration: 0.2,
      isOverflowScroll: false,
    }"
    @append="onAppend"
    @layout-complete="onLayoutComplete"
    @image-error="onImageError"
  >
    <!-- Loading element via named slot -->
    <div slot="loading">Loading...</div>
    <div class="item" v-for="(item, i) in list" :key="item.key"
      @click="remove(i)">
      <div class="thumbnail">
        <img :src="`https://naver.github.io/egjs-infinitegrid/assets/image/${(item.num + 1) % 59}.jpg`"/>
      </div>
      <div class="info">
        egjs {{ item.num }}
      </div>
    </div>
  </GridLayout>
</template>
<script>
export default {
  data() {
    return {
      start: 0,
      loading: false,
      list: [],
    };
  },
  methods: {
    loadItems(groupKey, num) {
      const items = [];
      const start = this.start || 0;

      for (let i = 0; i < num; ++i) {
        items.push({
          groupKey,
          num: start + i,
          key: start + i
        });
      }
      this.start = start + num;
      return items;
    },
    remove(index) {
      this.list.splice(index, 1);
    },
    onAppend({ groupKey }) {
      const list = this.list;
      const items = this.loadItems(parseFloat(groupKey || 0) + 1, 5);

      this.$refs.ig.startLoading();
      this.list = list.concat(items);
    },
    onLayoutComplete({ isLayout }) {
      if (!isLayout) {
        this.$refs.ig.endLoading();
      }
    },
    onImageError({ totalIndex }) {
      this.list.splice(totalIndex, 1);
    }
  }
}
</script>
```

## Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-infinitegrid/blob/master/CONTRIBUTING.md)

## Feedback
Please file an [issue](https://github.com/naver/egjs-flicking/issues).


## License
react-infinitegrid is released under the [MIT license](https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE).


```
Copyright (c) 2017 NAVER Corp.

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

<p align=center>
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" ></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>
