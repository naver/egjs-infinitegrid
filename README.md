# egjs-infinitegrid
A module used to arrange card elements including content infinitely on a grid layout. With this module, you can implement a grid-pattern user interface composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance

![](https://sculove.github.io/slides/university/image/infinitegrid.gif)

## Documentation
* API Documentation
    - Latest: [http://naver.github.io/egjs/latest/doc/eg.InfiniteGrid.html](http://naver.github.io/egjs/latest/doc/eg.InfiniteGrid.html)
    - Specific version: [http://naver.github.io/egjs/[VERSION]/doc/eg.InfiniteGrid.html](http://naver.github.io/egjs/[VERSION]/doc/eg.InfiniteGrid.html)
* An advanced demo is available here: [http://codepen.io/collection/AKpkGW/](http://codepen.io/collection/AKpkGW/)

## Supported Browsers
The following table shows browsers supported by eg.InfiniteGrid

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|8+|Latest|Latest|Latest|7+|2.3+(except 3.x)|



## Dependency
eg.InfiniteGrid has the dependencies for the following libraries:

|[eg.Component]()|
|----|
|2.0.0+|

## How to Use
### 1. Make a target element
```html
<!-- Target DOM -->
<ul id="grid">
    <li class="card">
        <div>test1</div>
    </li>
    <li class="card">
        <div>test2</div>
    </li>
    <li class="card">
        <div>test3</div>
    </li>
    <li class="card">
        <div>test4</div>
    </li>
    <li class="card">
        <div>test5</div>
    </li>
    <li class="card">
        <div>test6</div>
    </li>
</ul>
```

### 2. load/import library 
#### ES5
```html
<script src="../node_modules/@egjs/infinitegrid/dist/infinitegrid.pkgd.min.js"></script>
<!--<script src="../node_modules/@egjs/component/dist/component.js"></script>
<script src="../node_modules/@egjs/infinitegrid/dist/infinitegrid.min.js"></script>-->
```

#### ES6+
```js
import InfiniteGrid from "@egjs/infinitegrid";
```

### 3. Use egjs-infinitegrid
#### ES5
```javascript
// create eg.InfiniteGrid with option
var instance = new eg.InfiniteGrid("#grid", {
  itemSelector: "card"
});
```
#### ES6+
```js
// create InfiniteGrid with option
const instance = new InfiniteGrid("#grid", {
  itemSelector: "card"
});
```

## Benchmark

[![eg.IniniteGrid vs Masonry](https://img.youtube.com/vi/6Kv-NV0dZXw/0.jpg)](https://www.youtube.com/watch?v=6Kv-NV0dZXw)

[Introducing eg.InfiniteGrid, a new library for implementing a card layout](https://github.com/naver/egjs/wiki/Introducing-eg.InfiniteGrid,-a-new-library-for-implementing-a-card-layout)


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-infinitegrid/issues) page on GitHub.


## License
egjs-infinitegrid is released under the [MIT license](http://naver.github.io/egjs/license.txt).

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
