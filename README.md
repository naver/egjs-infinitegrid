# egjs-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Finfinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Finfinitegrid) [![Build Status](https://travis-ci.org/naver/egjs-infinitegrid.svg?branch=master)](https://travis-ci.org/naver/egjs-infinitegrid) [![Coverage Status](https://coveralls.io/repos/github/naver/egjs-infinitegrid/badge.svg?branch=master)](https://coveralls.io/github/naver/egjs-infinitegrid?branch=master)

A module used to arrange card elements including content **infinitely** according to layout type. With this module, you can implement **various layouts** composed of different card elements whose sizes vary. It guarantees **performance** by maintaining the number of DOMs the module is handling under any circumstance

![infinitegrid](https://github.com/naver/egjs-infinitegrid/raw/master/demo/assets/image/infinitegrid.gif)

## Layouts
The InfiniteGrid can use various layouts.

![layout](https://github.com/naver/egjs-infinitegrid/raw/master/demo/assets/image/layout.gif)

- [GridLayout](https://naver.github.io/egjs-infinitegrid/#GridLayout): The GridLayout is a layout that stacks cards with the same width as a stack of bricks.
- [JustifiedLayout](https://naver.github.io/egjs-infinitegrid/#JustifiedLayout): JustifiedLayout is a layout that the card is filled up on the basis of a line given a size.
- [FrameLayout](https://naver.github.io/egjs-infinitegrid/#FrameLayout): FrameLayout is a layout that allows you to place cards in a given frame.
- [SquareLayout](https://naver.github.io/egjs-infinitegrid/#SquareLayout): SquareLayout is a layout that places all cards like squares on a checkerboard, and important cards are n times larger.
- [PackingLayout](https://naver.github.io/egjs-infinitegrid/#PackingLayout): The PackingLayout is a layout that shows the important cards bigger without sacrificing the weight of the cards.

## Benchmark
[![eg.infiniteGrid benchmark](https://img.youtube.com/vi/6Kv-NV0dZXw/0.jpg)](http://www.youtube.com/watch?v=6Kv-NV0dZXw)

eg.infiniteGrid benchmark: append item performance with [masonry](https://masonry.desandro.com/)


## Documents
- [Get Started and Demos](https://naver.github.io/egjs-infinitegrid/)
- [API documentation](https://naver.github.io/egjs-infinitegrid/release/latest/doc/)
- [Migrating from v2.0 to v3.0](https://github.com/naver/egjs-infinitegrid/wiki/Migrating-from-v2.0-to-v3.0)
- Articles
  - [Introducing eg.InfiniteGrid, a new library for implementing a card layout](https://github.com/naver/egjs-infinitegrid/wiki/Introducing-eg.InfiniteGrid,-a-new-library-for-implementing-a-card-layout) [[Korean](http://d2.naver.com/helloworld/4874130)]
  - [Card-based design and eg.InfiniteGrid 3.0](https://medium.com/@sculove/card-based-design-and-eg-infinitegrid-3-0-a84616496671) [[Korean](http://d2.naver.com/helloworld/0637045)]



## Download and Installation

Download dist files from repo directly or install it via npm. 

### For development (Uncompressed)

You can download the uncompressed files for development

- Latest : https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.js
- Specific version : https://naver.github.io/egjs-infinitegrid/release/[VERSION]/dist/infinitegrid.js

### For production (Compressed)

You can download the compressed files for production

- Latest : https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.min.js
- Specific version : https://naver.github.io/egjs-infinitegrid/release/[VERSION]/dist/infinitegrid.min.js


### Packaged version (with Dependencies)
> Packaged version is not an official distribution.
> Is just to provide for ease use of 'egjs-infinitegrid' with dependency.

 - **Latest**
    - https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.pkgd.js
    - https://naver.github.io/egjs-infinitegrid/release/latest/dist/infinitegrid.pkgd.min.js

 - **Specific version**
    - https://naver.github.io/egjs-infinitegrid/release/[VERSION]/dist/infinitegrid.pkgd.js
    - https://naver.github.io/egjs-infinitegrid/release/[VERSION]/dist/infinitegrid.pkgd.min.js

### Installation with npm

The following command shows how to install egjs-infinitegrid using npm.

```bash
$ npm install @egjs/infinitegrid
```


## Supported Browsers
The following are the supported browsers.

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|8+|Latest|Latest|Latest|7+|2.3+(except 3.x)|

* If you want to use in IE8, please use polyfill.

## Dependency

egjs-infinitegrid has the dependencies for the following libraries:

|[egjs-component](https://github.com/naver/egjs-component)|
|----|
|2.0.0+|


## How to start developing egjs-infinitegrid?

For anyone interested to develop egjs-infinitegrid, follow the instructions below.

### Development Environment

#### 1. Clone the repository

Clone the egjs-infinitegrid repository and install the dependency modules.

```bash
# Clone the repository.
$ git clone https://github.com/naver/egjs-infinitegrid.git
```

#### 2. Install dependencies
`npm` is supported.

```
# Install the dependency modules.
$ npm install
```

#### 3. Build

Use npm script to build billboard.js

```bash
# Run webpack-dev-server for development
$ npm start

# Build
$ npm run build

# Generate jsdoc
$ npm run jsdoc
```

Two folders will be created after complete build is completed.

- **dist** folder: Includes the **infinitegrid.js** and **infinitegrid.min.js** files.
- **doc** folder: Includes API documentation. The home page for the documentation is **doc/index.html**.

### Linting

To keep the same code style, we adopted [ESLint](http://eslint.org/) to maintain our code quality. The [rules](https://github.com/naver/eslint-config-naver/tree/master/rules) are modified version based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
Setup your editor for check or run below command for linting.

```bash
$ npm run lint
```

### Test

Once you created a branch and done with development, you must perform a test running `npm run test` command before you push code to a remote repository.

```bash
$ npm run test
```
Running a `npm run test` command will start [Mocha](https://mochajs.org/) tests via [Karma-runner](https://karma-runner.github.io/).


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-infinitegrid/issues) page on GitHub.


## License
egjs-infinitegrid is released under the [MIT license](https://raw.githubusercontent.com/naver/egjs/master/LICENSE.txt).


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
