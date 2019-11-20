# svelte-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Fsvelte-infinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Fsvelte-infinitegrid)

A Svelte component that can easily use [egjs-infinitegrid](https://github.com/naver/egjs-infinitegrid)


* [GridLayout Demo](https://codesandbox.io/s/svelte-infinitegrid-demo-gridlayout-7ycgd)
* [GridLayout with Parallax Demo](https://codesandbox.io/s/svelte-infinitegrid-demo-gridlayout-with-parallax-wnl8p)
* [JustifiedLayout Demo](https://codesandbox.io/s/svelte-infinitegrid-demo-justifiedlayout-e4com)
* [Youtube Demo](https://codesandbox.io/s/svelte-infinitegrid-demo-youtube-svrus)
* [API Documentation](https://naver.github.io/egjs-infinitegrid/release/latest/doc/)


## Install
```bash
$ npm install @egjs/svelte-infinitegrid  --save
```

## How to use
```html
<script>
    import InfiniteGrid, {
        GridLayout,
        JustifiedLayout,
        SquareLayout,
        FrameLayout,
        PackingLayout
    } from "@egjs/svelte-infinitegrid";

    let ig;
    let loading;
    let items = [
        { groupKey: 0, key: 0},
        { groupKey: 0, key: 1},
        { groupKey: 0, key: 2},
    ];
    function onAppend(e) {
        const nextGroupKey = (parseFloat(groupKey) || 0) + 1;
        const nextKey = items.length;

        items = [
            ...items,
            { groupKey: nextGroupKey, key: nextKey },
            { groupKey: nextGroupKey, key: nextKey + 1 },
            { groupKey: nextGroupKey, key: nextKey + 2 },
        ];
    }
</script>
```
```jsx
<GridLayout
    items={items}
    itemBy={item => item.key}
    groupBy={item => item.groupKey}
    useFirstRender={false}
    status={null}
    options={{
        threshold: 100,
        isOverflowScroll: false,
        isEqualSize: false,
        isContantSize: false,
        useFit: false,
        useRecycle: false,
        horizontal: false,
    }}
    layoutOptions={{
        align: "center",
    }}
    onAppend = {({ detail }) => onAppend(detail)}
    onPrepend = {({ detail }) => onPrepend(detail)}
    onLayoutComplete = {({ detail }) => onLayoutComplete(detail)}
    onImageError = {({ detail }) => onImageError(detail)}
    onChange = {({ detail }) => onChange(detail)}
    let:item
>
    {#each visibleItems as item (item.key)}
        <div class="item">
            {`item ${item.key}`}</div>
        </div>
    {/each}
    <div slot="loading">Loading</div>
</GridLayout>
```

* Add `slot = "loading"` if you want to show the loading bar when calling the `startLoading()` method.

## Props


|name|type|default|description|
|---|---|---|---|
|itemBy|Function|get itemKey|Get a unique key that defines how to track changes for items in the iterable.|
|groupBy|Function|get groupKey or data-groupkey|Get a unique key to distinguish between groups.|
|useFirstRender|boolean|false|The useFirstRender option determines whether the markup will be shown on the first rendering or after loading is complete.|
|status|IInfiniteGridStatus|null|State object of the react-infinitegrid module|
|layoutType|Class|GridLayout|Specifies the Layout class to use.|
|options|IInfiniteGridOptions|{}|The option object of the eg.InfiniteGrid module|
|layoutOptions|IInfiniteGridOptions|{}|Options to apply to the Layout.|


### Options
* [InfiniteGrid's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html)
* [InfiniteGrid's events](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html#event:append)
* [GridLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.GridLayout.html)
* [JustifiedLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.JustifiedLayout.html)
* [SquareLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.SquareLayout.html)
* [FrameLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.FrameLayout.html)
* [PackingLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.PackingLayout.html)




## ⚙️ Developments
### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-infinitegrid/issues) page on GitHub.


## License
react-infinitegrid is released under the [MIT license](https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE).


```
Copyright (c) 2019-present NAVER Corp.

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

