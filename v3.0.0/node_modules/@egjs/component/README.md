# egjs-component [![npm version](https://badge.fury.io/js/%40egjs%2Fcomponent.svg)](https://badge.fury.io/js/%40egjs%2Fcomponent) [![Build Status](https://travis-ci.org/naver/egjs-component.svg?branch=master)](https://travis-ci.org/naver/egjs-component) [![Coverage Status](https://coveralls.io/repos/github/naver/egjs-component/badge.svg?branch=master)](https://coveralls.io/github/naver/egjs-component?branch=master)


A class used to manage events and options in a component


## Documents
- [Get Started and Demos](https://naver.github.io/egjs-component/)
- [API documentation](https://naver.github.io/egjs-component/release/latest/doc/)


## Download and Installation

Download dist files from repo directly or install it via npm. 

### For development (Uncompressed)

You can download the uncompressed files for development

- Latest : https://naver.github.io/egjs-component/release/latest/dist/component.js
- Specific version : https://naver.github.io/egjs-component/release/[VERSION]/dist/component.js

### For production (Compressed)

You can download the compressed files for production

- Latest : https://naver.github.io/egjs-component/release/latest/dist/component.min.js
- Specific version : https://naver.github.io/egjs-component/release/[VERSION]/dist/component.min.js


### Installation with npm

The following command shows how to install egjs-component using npm.

```bash
$ npm install @egjs/component
```


## Supported Browsers
The following are the supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|7+|Latest|Latest|Latest|7+|2.1+(except 3.x)|


## How to Use

### 1. Load component.js
```html
<script src="../dist/component.js"></script>
```

### 2. Use eg.Component
```javascript
class Some extends eg.Component {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
}

var some = new Some();
some.thing();
some.trigger("hi");
// fire alert("hi");
some.trigger("hi");
// Nothing happens
```

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-component/issues) page on GitHub.


## License
eg.Component is released under the [MIT license](http://naver.github.io/egjs/license.txt).

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
