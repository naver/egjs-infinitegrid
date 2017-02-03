# eg.InfiniteGrid
A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.  
You can implement a user interface by applying the logical coordinates provided. 

## Documentation
* API Documentation
    - Latest: [http://naver.github.io/egjs/latest/doc/eg.InfiniteGrid.html](http://naver.github.io/egjs/latest/doc/eg.InfiniteGrid.html)
    - Specific version: [http://naver.github.io/egjs/[VERSION]/doc/eg.InfiniteGrid.html](http://naver.github.io/egjs/[VERSION]/doc/eg.InfiniteGrid.html)
* An advanced demo is available here: [http://codepen.io/collection/AKpkGW/](http://codepen.io/collection/AKpkGW/)

## Supported Browsers
The following table shows browsers supported by eg.InfiniteGrid

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|



## Dependency
eg.InfiniteGrid has the dependencies for the following libraries:

|[eg.Component]()|[Hammer.JS](http://hammerjs.github.io/)|
|----|----|
|2.0.0+|2.0.4+|

## How to Use
### 1. Load dependency library before eg.infiniteGrid.js (or eg.infiniteGrid.min.js) load.
```html
<script src="../node_modules/eg.component/dist/eg.component.js"></script>
<script src="../node_modules/hammerjs/hammer.js"></script>
```
> #### How to supports IE8  
> The hammerjs supports [IE9+](http://hammerjs.github.io/browser-support/)  
if you want to use hammer.js in IE8, you should include `hammerjs-compatible` before using  
For more information about hammerjs-compatible, please check following link.  
[https://github.com/naver/hammerjs-compatible](https://github.com/naver/hammerjs-compatible)


### 2. Load eg.infiniteGrid.js
```html
<script src="../dist/eg.infiniteGrid.js"></script>
```

### 3. Make a target element
```html
<!-- Target DOM -->
<div id="area">
```

### 4. Use eg.InfiniteGrid
```javascript
// create MovableCoord with option
var instance = new eg.InfiniteGrid("#area", {
  max : [ 300, 400 ]
});

// call bind method
instance.bind(el, {
  direction : eg.InfiniteGrid.DIRECTION_ALL,
  scale: [1, 1.5]
});

// call unbind method
instance.unbind(el);
```

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/eg.infiniteGrid/issues) page on GitHub.


## License
eg.InfiniteGrid is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015 NAVER Corp.

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
