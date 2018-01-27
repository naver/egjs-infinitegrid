# react-layout [![npm version](https://badge.fury.io/js/%40egjs%2Freact-layout.svg)](https://badge.fury.io/js/%40egjs%2Freact-layout)

A react component that can easily use [egjs-infinitegrid's layouts](https://github.com/naver/egjs-infinitegrid)

- [API Documents for React](#)
- [Demo](https://naver.github.io/egjs-infinitegrid/)


## Install
```bash
$ npm install @egjs/react-layout
```

## Usage

```jsx
import {GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout} from "@egjs/react-layout";

<GridLayout size="1000" horizontal={true} margin="10" isEqualSize={} outline={[]}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</GridLayout>

```

### props
|name|type|description|
|---|---------------|---|
|size|number|The viewport size of container area where items are added to a layout
|horizontal|boolean|Direction of the scroll movement|
|margin|number|Margin used to create space around items|
|isEqualSize|boolean|Indicates whether sizes of all card elements are equal to one another. If true, the performance of layout arrangement can be improved.|
|outline|array|Array of outline points to be reference points
|other props||LayoutOptions|

> #### LayoutOptions
> * [GridLayout's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.GridLayout.html)
> * [JustifiedLayout's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.JustifiedLayout.html)
> * [FrameLayout's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.FrameLayout.html)
> * [SquareLayout's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.SquareLayout.html)
> * [PackingLayout's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.PackingLayout.html)

For more information, see the [API Documents for React](https://github.com/naver/egjs-infinitegrid/wiki/Axes-API-for-react-(react-axes))


## Development

```bash
# Run rc-tools server and see examples for development
$ npm run start
```


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-infinitegrid/issues) page on GitHub.


## License
react-layout is released under the [MIT license](https://github.com/naver/egjs-infinitegrid/blob/master/LICENSE).


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
