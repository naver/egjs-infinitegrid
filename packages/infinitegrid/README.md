<h1 align="center" style="max-width: 100%;">
  <img width="256" alt="InfiniteGrid Logo" src="https://naver.github.io/egjs-infinitegrid/img/infinitegrid_logo.png" style="max-width: 100%;" /><br/>
  <a href="https://naver.github.io/egjs-infinitegrid/">@egjs/infinitegrid</a>
</h1>

<p align="center" style="line-height: 2;">
  <a href="https://www.npmjs.com/package/@egjs/infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/infinitegrid.svg?style=flat-square&color=007acc&label=version&logo=NPM" alt="version" /></a>
  <a href="https://www.npmjs.com/package/@egjs/infinitegrid" target="_blank"><img alt="npm weekly downloads" src="https://img.shields.io/npm/dw/@egjs/infinitegrid?logo=npm&style=flat-square&color=007acc" /></a>
  <a href="https://www.npmjs.com/package/@egjs/infinitegrid" target="_blank"><img alt="npm bundle size (scoped)" src="https://img.shields.io/bundlephobia/minzip/@egjs/infinitegrid.svg?style=flat-square&label=%F0%9F%92%BE%20gzipped&color=007acc" /></a>
  <a href="https://github.com/naver/egjs-infinitegrid/actions" target="_blank"><img alt="Github actions" src="https://img.shields.io/github/actions/workflow/status/naver/egjs-infinitegrid/run-e2e.yml?branch=master&style=flat-square" /></a>
  <a href="https://coveralls.io/github/naver/egjs-infinitegrid?branch=master&style=flat-square" target="_blank"><img alt="Coveralls github" src="https://img.shields.io/coveralls/github/naver/egjs-infinitegrid.svg?style=flat-square&label=%E2%9C%85%20coverage" /></a>
    <a href="https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE" target="_blank"><img alt="GitHub" src="https://img.shields.io/github/license/naver/egjs-infinitegrid.svg?style=flat-square&label=%F0%9F%93%9C%20license&color=08CE5D" /></a>
</p>
<p align="center" style="line-height: 2;">
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/ngx-infinitegrid/README.md" target="_blank"><img alt="Angular" src="https://img.shields.io/static/v1.svg?label=&message=Angular&style=flat-square&logo=Angular&color=dd0031" /></a>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/react-infinitegrid/README.md" target="_blank"><img alt="React" src="https://img.shields.io/static/v1.svg?label=&message=React&style=flat-square&logo=React&logoColor=white&color=61dafb" /></a>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/vue-infinitegrid/README.md" target="_blank"><img alt="Vue" src="https://img.shields.io/static/v1.svg?label=&message=Vue&style=flat-square&logo=Vue.js&logoColor=white&color=42b883" /></a>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/svelte-infinitegrid/README.md" target="_blank"><img alt="Svelte" src="https://img.shields.io/static/v1.svg?label=&message=Svelte&style=flat-square&logo=svelte&logoColor=white&color=FF3E00" /></a>
  <img src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript" />
</p>

<h3 align="center">
  <a href="https://naver.github.io/egjs-infinitegrid/">Demo</a> / <a href="https://naver.github.io/egjs-infinitegrid/docs/api/InfiniteGrid">Documentation</a> / <a href="https://naver.github.io/egjs/"><img height="20" src="https://naver.github.io/egjs/img/logo.svg"/> Other components</a>
</h3>

<p align="center">
  <b>A module used to arrange elements including content infinitely according to grid type. With this module, you can implement various grids composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance</b><br />📱💻🖥
</p>

<p align="center">
  <b>Supported Frameworks</b><br/>
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/ngx-infinitegrid/README.md"><img width="45" src="https://naver.github.io/egjs-infinitegrid/img/icons/angular.svg" alt="AngularJS" /></a>&nbsp;&nbsp;
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/react-infinitegrid/README.md"><img width="45" src="https://naver.github.io/egjs-infinitegrid/img/icons/react.svg" alt="React" /></a>&nbsp;&nbsp;
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/vue-infinitegrid/README.md"><img width="45" src="https://naver.github.io/egjs-infinitegrid/img/icons/vue.svg" alt="Vue.js" /></a>&nbsp;&nbsp;
  <a href="https://github.com/naver/egjs-infinitegrid/blob/master/packages/svelte-infinitegrid/README.md"><img width="45" src="https://naver.github.io/egjs-infinitegrid/img/icons/svelte.svg" alt="Svelte" /></a>
</p>

-----

## ✨ Features
- Use it in a framework you like.
  - We supports all major JS frameworks like React, Vue, Angular
- Restore state like position and active slide with [persist](https://naver.github.io/egjs-persist/)
- Supports both Desktop & Mobile
- Support Dynamic Options
- Rich API

## 📖 Articles
* [InfiniteGrid 4 Release!!](https://medium.com/naver-fe-platform/infinitegrid-4-release-f4e2d05b0292)
## ⚙️ Installation
#### npm
```bash
$ npm install --save @egjs/infinitegrid
```

#### CDN
- jsDelivr: https://cdn.jsdelivr.net/npm/@egjs/infinitegrid/dist/
- unpkg: https://unpkg.com/@egjs/infinitegrid/dist/
- cdnjs: https://cdnjs.com/libraries/egjs-infinitegrid

## 🏃 Quick Start
#### HTML

```html
<div class="container"></div>
```

#### ES Modules
```ts
import { MasonryInfiniteGrid } from "@egjs/infinitegrid";

const ig = new MasonryInfiniteGrid(".container", { gap: 5 });
```

#### With CDN
```html
<!-- Packaged with all dependencies -->
<!-- https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js -->
<script src="https://unpkg.com/@egjs/infinitegrid/dist/infinitegrid.min.js"></script>
```

```js
var ig = new InfiniteGrid.MasonryInfiniteGrid(".container", { gap: 5 });
```


```js
import { MasonryInfiniteGrid } from "@egjs/infinitegrid";

function getItems(nextGroupKey, count) {
  const nextItems = [];

  for (let i = 0; i < count; ++i) {
    const num = nextGroupKey * count + i;
    nextItems.push(`<div class="item"></div>`);
  }
  return nextItems;
}
const ig = new MasonryInfiniteGrid(".container", {
  gap: 5,
});

ig.on("requestAppend", (e) => {
  const nextGroupKey = (+e.groupKey || 0) + 1;

  ig.append(getItems(nextGroupKey, 10), nextGroupKey);
});
ig.renderItems();
```

### Use Faster & Lazy Rendering

* When the `loading="lazy"` or `data-grid-lazy="true"`(external lazy loading) attribute is used, Rendering of the items occurs immediately. When items are loaded, they are rendered sequentially.
```html
<img src="..." />
<img src="..." />
<img src="..." loading="lazy" />
<img data-grid-lazy="true" />
```
* If you use `data-grid-width` and `data-grid-height` attributes, the size of self, child image, and video elements is automatically adjusted until loading is complete.
```html
<div data-grid-width="100" data-grid-height="100">
   <img src="..." />
   <img src="..." />
   <img src="..." />
</div>
```

* If you use `data-grid-skip="true"` attribute, you can omit it even if there are images in itself and child image, and video elements.
```html
<div data-grid-skip="true">
   <img src="..." />
   <img src="..." />
   <img src="..." />
</div>
```

### Detect resize of Container & Children
InfiniteGrid calculates the size of container and children by window resizing event. However, even if the size of the window does not change, the size of the event container and children can change. Most of the first rendering issues are also like this.

In this case, I recommend [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) for you.

Provides `useResizeObserver` option to detect size change of container and `observeChildren` option to detect size change of children.


```js
import { MasonryInfiniteGrid, JustifiedInfiniteGrid, FrameInfiniteGrid, PackingInfiniteGrid } from "@egjs/infinitegrid";


// InfiniteGrid.MasonryInfiniteGrid
const grid = new MasonryInfiniteGrid(container, {
  gap: 5,
  useResizeObserver: true,
  observeChildren: true,
});

grid.renderItems();
```


## Pre-guess size for performance or invisible items.
### What if all items were the same size?
If you use the `isEqualSize` option, all items are considered to be the same size.
Each resize only calculates the size of one item.
Add `data-grid-not-equal-size="true"` attribute if there is an exceptional item whose size needs to be calculated while using isEqualSize.
```html
<div class="item item1"></div>
<div class="item item1"></div>
<div class="item item1"></div>
<!--item2 is a different size than item1.-->
<div class="item item2" data-grid-not-equal-size="true"></div>
```

### What if a size group exists?

`isEqualSize` assumes all items are equal. But if there are more than two size-groups, use `data-grid-size-group`.


```html
<!--item1 has the same size.-->
<div class="item item1" data-grid-size-group="1"></div>
<div class="item item1" data-grid-size-group="1"></div>
<!--item2 has the same size.-->
<div class="item item2" data-grid-size-group="2"></div>
<div class="item item2" data-grid-size-group="2"></div>
```


### What if all items don't change size?

If all items do not have a constant size, use the `isConstantSize` option. Resizing doesn't calculate the item's size.
If you want to recalculate, use `.updateItems(items, { useOrgResize: true })` method or `.renderItems({ useOrgResize: true })` method.



## 📦 Packages
|Package|Version|Description|
|:-----:|:-----:|:-----:|
|[**@egjs/infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/infinitegrid.svg?style=flat-square&color=dddd31&label=%F0%9F%94%96" alt="version" /></a>|Vanilla Module of InfiniteGrid|
|[**@egjs/ngx-infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/ngx-infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/ngx-infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/ngx-infinitegrid.svg?style=flat-square&color=dd0031&label=%F0%9F%94%96" alt="version" /></a>|<img width="15" src="https://naver.github.io/egjs-infinitegrid/img/icons/angular.svg" valign="middle" alt="Angular" /> [Angular](https://angular.io/) port of @egjs/infinitegrid|
|[**@egjs/react-infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/react-infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/react-infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/react-infinitegrid.svg?style=flat-square&color=00d8ff&label=%F0%9F%94%96" alt="version" /></a>|<img width="15" src="https://naver.github.io/egjs-infinitegrid/img/icons/react.svg" valign="middle" alt="React" /> [React](https://reactjs.org/) port of @egjs/infinitegrid|
|[**@egjs/vue-infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/vue-infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/vue-infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/vue-infinitegrid.svg?style=flat-square&color=42b883&label=%F0%9F%94%96" alt="version" /></a>|<img width="15" src="https://naver.github.io/egjs-infinitegrid/img/icons/vue.svg" valign="middle" alt="Vue.js" /> [Vue.js@2](https://vuejs.org/v2/guide/index.html) port of @egjs/infinitegrid|
|[**@egjs/vue3-infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/vue3-infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/vue3-infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/vue3-infinitegrid.svg?style=flat-square&color=42b883&label=%F0%9F%94%96" alt="version" /></a>|<img width="15" src="https://naver.github.io/egjs-infinitegrid/img/icons/vue.svg" valign="middle" alt="Vue.js" /> [Vue.js@3](https://v3.vuejs.org/) port of @egjs/infinitegrid|
|[**@egjs/svelte-infinitegrid**](https://github.com/naver/egjs-infinitegrid/blob/master/packages/svelte-infinitegrid/README.md)|<a href="https://www.npmjs.com/package/@egjs/svelte-infinitegrid" target="_blank"><img src="https://img.shields.io/npm/v/@egjs/svelte-infinitegrid.svg?style=flat-square&color=FF3E00&label=%F0%9F%94%96" alt="version" /></a>|<img width="15" src="https://naver.github.io/egjs-infinitegrid/img/icons/svelte.svg" valign="middle" alt="Svelte" /> [Svelte](https://svelte.dev/) port of @egjs/infinitegrid|

## 🌐 Supported Browsers
|<img width="20" src="https://simpleicons.org/icons/internetexplorer.svg" alt="IE" />|<img width="20" src="https://simpleicons.org/icons/googlechrome.svg" alt="Chrome" />|<img width="20" src="https://simpleicons.org/icons/firefoxbrowser.svg" alt="Firefox" />|<img width="20" src="https://simpleicons.org/icons/safari.svg" alt="Safari" />|<img width="20" src="https://simpleicons.org/icons/apple.svg" alt="iOS" />|<img width="20" src="https://simpleicons.org/icons/android.svg" alt="Android" />|
|:---:|:---:|:---:|:---:|:---:|:---:|
|9+(With polyfill), 11+ for Angular & Svelte|Latest|Latest|Latest|7+|4+|

## 📼 Demos
Check our [Demos](https://naver.github.io/egjs-infinitegrid/).

## 📖 Documentation
See [Documentation](https://naver.github.io/egjs-infinitegrid/release/latest/doc/index.html) page.

## 🙌 Contributing
See [CONTRIBUTING.md](https://github.com/naver/egjs-infinitegrid/blob/master/CONTRIBUTING.md).

## 📝 Feedback
Please file an [Issue](https://github.com/naver/egjs-infinitegrid/issues).

## 🛣️ Roadmap
See our [Roadmap](https://github.com/naver/egjs-infinitegrid/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%F0%9F%9B%A3%EF%B8%8FRoadmap+).

## 📜 License
@egjs/infinitegrid is released under the [MIT license](https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE).

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
  <a href="https://naver.github.io/egjs/"><img height="50" src="https://naver.github.io/egjs/img/logotype1_black.svg" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/naver"><img height="50" src="https://naver.github.io/OpenSourceGuide/book/assets/naver_logo.png" /></a>
</p>

