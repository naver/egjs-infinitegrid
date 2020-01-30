# ngx-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Fngx-infinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Fngx-infinitegrid)

An Angular component that can easily use [egjs-infinitegrid](https://github.com/naver/egjs-infinitegrid)

* [Playground with Various Demos](https://naver.github.io/egjs-infinitegrid/storybook/)
* [GridLayout Demo](https://codesandbox.io/s/ngx-infinitegrid-demo-gridlayout-vu7pp)
* [GridLayout with Parallax Demo](https://codesandbox.io/s/ngx-infinitegrid-parallax-demo-gridlayout-cvxg5)
* [JustifiedLayout Demo](https://codesandbox.io/s/ngx-infinitegrid-demo-justifiedlayout-ypvf7)
* [Youtube Demo](https://codesandbox.io/s/ngx-infinitegrid-youtube-demo-m1npy)
* [API Documentation](https://naver.github.io/egjs-infinitegrid/release/latest/doc/)


## Install
```bash
$ npm install @egjs/ngx-infinitegrid  --save
```

## How to use

### Module
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {
  NgxInfiniteGridModule,
  NgxInfiniteGridComponent,
  NgxGridLayoutComponent,
  NgxJustifiedLayoutComponent,
  NgxSquareLayoutComponent,
  NgxFrameLayoutComponent,
  NgxPackingLayoutComponent,
} from '@egjs/ngx-infinitegrid';

@NgModule({
  declarations: [
    AppComponent,
    NgxGridLayoutComponent,
  ],
  imports: [
    BrowserModule,
    // NgxInfiniteGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### App

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options={
    threshold: 100,
    isOverflowScroll: false,
    isEqualSize: false,
    isContantSize: false,
    useFit: false,
    useRecycle: false,
    horizontal: false,
  };
  layoutOptions={
    align: "justify",
  };
  start = 0;
  items = [];
  loadItems(groupKey: number, num: number) {
    const items = this.items;
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push({
        groupKey,
        itemKey: start + i,
        no: start + i,
      });
    }
    this.items = [...items];
    this.start += num;
  }
  onAppend({ currentTarget, groupKey, startLoading }) {
    (window as any).a = this;
    if (currentTarget.isLoading()) {
      return;
    }
    startLoading();
    this.loadItems(parseFloat(groupKey || 0) + 1, 5);
  }
  onLayoutComplete({ isAppend, isLayout, endLoading, fromCache }) {
    if (!isLayout) {
      endLoading();
    }
  }
  onImageError({ totalIndex }) {
    this.items.splice(totalIndex, 1);
    this.items = [ ...this.items ];
  }
  onChange(e) {
    console.log(e);
  }
  onPrepend(e) {
    console.log(e);
  }
  trackBy(index: number, item: IItem): any {
    return item.itemKey;
  }
  groupBy(index: number, item: IItem): any {
    return item.groupKey;
  }
}

```

### Template
```html
<ngx-gridlayout #ig
  [loading]="loading"
  [options]="options"
  [layoutOptions]="layoutOptions"
  [items]="items"
  [trackBy]="trackBy"
  [groupBy]="groupBy"
  (append)="onAppend($event)"
  (prepend)="onPrepend($event)"
  (change)="onChange($event)"
  (layoutComplete)="onLayoutComplete($event)"
  (imageError)="onImageError($event)">
  <div class="loading" #loading>LOADING?</div>
  <div class="item" *ngFor ="let item of ig.visibleItems; trackBy: trackBy;">
      egjs {{item.no}}
  </div>
</ngx-gridlayout>
```


## Props

|name|type|default|description|
|---|---|---|---|
|trackBy|Function|get itemKey|Get a unique key that defines how to track changes for items in the iterable.|
|groupBy|Function|get groupKey or data-groupkey|Get a unique key to distinguish between groups.|
|useFirstRender|boolean|false|The useFirstRender option determines whether the markup will be shown on the first rendering or after loading is complete.|
|loading|HTMLElement||Specifies the Loading Bar to use for append or prepend items.|
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



## ⚙️ Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `npm run start(ng serve)` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



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

