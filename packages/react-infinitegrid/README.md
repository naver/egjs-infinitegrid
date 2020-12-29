# react-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Freact-infinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Freact-infinitegrid)

A react component that can easily use [egjs-infinitegrid](https://github.com/naver/egjs-infinitegrid)

* [Playground with Various Demos](https://naver.github.io/egjs-infinitegrid/storybook/)
* [GridLayout Demo](https://codesandbox.io/s/030opyqkvw)
* [GridLayout with Parallax Demo](https://codesandbox.io/s/v3y0jr2ony)
* [JustifiedLayout Demo](https://codesandbox.io/s/5w7vrr0kwk)
* [Youtube Demo](https://codesandbox.io/s/935xz7zy8r)
* [API Documentation](https://github.com/naver/egjs-infinitegrid/wiki/react-infinitegrid-API-documentation)


## Install
```bash
$ npm install @egjs/react-infinitegrid  --save
```

## How to use
```tsx
// GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
import {GridLayout} from "@egjs/react-infinitegrid";

<GridLayout
	tag = "div"
	useFirstRender={false}
	loading={<div>Loading...</div>}
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
		align: "justify",
	}}
	onAppend = {e => append}
	onPrepend = {e => append}
	onLayoutComplete = {e => layoutComplete}
	onImageError = {e => imageError}
	onChange = {e => chnage}>
	<Item groupKey={0} key={0}/>
	<Item groupKey={0} key={1}/>
	<Item groupKey={1} key={2}/>
	<Item groupKey={1} key={3}/>
	<Item groupKey={2} key={4}/>
	<Item groupKey={2} key={5}/>
	<Item groupKey={2} key={6}/>
</GridLayout>
```

### Props

|name|type|default|description|
|---|---|---|---|
|tag|string|"div"|The tag name of the wrapper element|
|containerTag|string|"div"|The tag name of the container element|
|groupBy|Function|get groupKey or data-groupkey|Get a unique key to distinguish between groups.|
|useFirstRender|boolean|false|The useFirstRender option determines whether the markup will be shown on the first rendering or after loading is complete.|
|loading|React.ReactElement||Specifies the Loading Bar to use for append or prepend items.|
|status|IInfiniteGridStatus|null|State object of the react-infinitegrid module|
|layoutType|Class|GridLayout|Specifies the Layout class to use.|
|options|IInfiniteGridOptions|{}|The option object of the eg.InfiniteGrid module|
|layoutOptions|IInfiniteGridOptions|{}|Options to apply to the Layout.|
|...others|DOM Attributes||You can set the attribute of the wrapper element.|

```tsx
export interface InfiniteGridProps<T extends ILayout = any> {
	tag?: string;
	containerTag?: string;
	useFirstRender?: boolean;
	status?: IInfiniteGridStatus | null;
	options?: Partial<IInfiniteGridOptions>;
	layoutOptions?: Partial<T["options"]>;
	loading?: React.ReactElement | null;
	layoutType?: new (...args: any[]) => ILayout;
	groupBy?: (item: any, index: number) => any;
	onAppend?: (param: OnAppend) => any;
	onPrepend?: (param: OnPrepend) => any;
	onLayoutComplete?: (param: OnLayoutComplete) => any;
	onImageError?: (param: OnImageError) => any;
	onChange?: (param: OnChange) => any;
	[others: string]: any;
}
```

#### Options
* [InfiniteGrid's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html)
* [InfiniteGrid's events](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html#event:append)
* [GridLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.GridLayout.html)
* [JustifiedLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.JustifiedLayout.html)
* [SquareLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.SquareLayout.html)
* [FrameLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.FrameLayout.html)
* [PackingLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.PackingLayout.html)


#### Restore status

If you want to restore the state, use the status prop.

* Save Status
```tsx
import { GridLayout } from "@egjs/react-infinitegrid";

// Save Status
const status = igRef.current.getStatus();

<GridLayout
	ref={igRef}></GridLayout>
```

* Restore Status (First mount)
```tsx
import { GridLayout } from "@egjs/react-infinitegrid";

<GridLayout
	status={status}></GridLayout>
```

* Dynamically restore status
```tsx
import { GridLayout } from "@egjs/react-infinitegrid";

// Save Status
React.useEffect(() => {
	igRef.current.setStatus(status);
}, []);

<GridLayout
	ref={igRef}></GridLayout>
```


### More examples
```jsx
this.state = {
	list: loadItems(0, 0),
};
loadItems = (groupKey, start) => {
	const items = [];

	for (let i = 0; i < 20; ++i) {
		items.push(<Item groupKey={groupKey} key={start + i} />);
	}
	return items;
}
onAppend = ({groupKey, startLoading}) => {
	const list = this.state.list;
	const start = list.length;
	const items = this.loadItems(groupKey + 1, start);

	startLoading();
	this.setState({list: list.concat(items)});
}
onLayoutComplete = ({isLayout, endLoading}) => {
	!isLayout && endLoading();
}
render() {
	return (<GridLayout onAppend={this.onAppend}
	onLayoutComplete={this.onLayoutComplete}
	loading={<div className="loading">Loading... append</div>}>
		{this.state.list}
	</GridLayout>);
}
```


### migration 1.x=> 3.x
#### InfiniteGris's props are bundled into `options`, `layoutOptions`.
* [InfiniteGrid's options](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.html)
* [GridLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.GridLayout.html)
* [JustifiedLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.JustifiedLayout.html)
* [SquareLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.SquareLayout.html)
* [FrameLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.FrameLayout.html)
* [PackingLayout's layoutOptions](https://naver.github.io/egjs-infinitegrid/release/latest/doc/eg.InfiniteGrid.PackingLayout.html)

```tsx
// 1.x
<GridLayout
	isOverflowScroll = {false}
	isEqualSize = {false}
	isConstantSize = {false}
	useFit = {true}
	useRecycle = {true}
	useFirstRender = {true}
	horizontal = {false}
	align = "justify"
/>
// 3.x
<GridLayout
	useFirstRender={true}
	options={{
		isOverflowScroll: false,
		isEqualSize: false,
		isContantSize: false,
		useFit: false,
		useRecycle: false,
		horizontal: true,
	}}
	layoutOptions={{
		align: "justify",
	}}
/>
```
#### InfiniteGrid's event types are changed.
```tsx
// 1.x
interface InfiniteGridProps {
	tag?: string,
	type?: (...args: any[]) => any,
	options?: object,
	margin?: number,
	threshold?: number,
	isOverflowScroll?: boolean,
	isEqualSize?: boolean,
	useRecycle?: boolean,
	isConstantSize?: boolean,
	horizontal?: boolean,
	loading?: React.ReactNode,
	transitionDuration?: number,
	onAppend?: (param: OnAppendParameter) => void,
	onPrepend?: (param: OnPrependParameter) => void,
	onLayoutComplete?: (param: OnLayoutCompleteParameter) => void,
	onImageError?: (param: any) => void,
	onChange?: (param: OnChangeParameter) => void,
	status?: object,
	useFit?: boolean,
	[others: string]: any,
}

// 3.x
export interface InfiniteGridProps<T extends ILayout = any> {
	tag?: string;
	containerTag?: string;
	useFirstRender?: boolean;
	status?: IInfiniteGridStatus | null;
	options?: Partial<IInfiniteGridOptions>;
	layoutOptions?: Partial<T["options"]>;
	loading?: React.ReactElement | null;
	layoutType?: new (...args: any[]) => ILayout;
	groupBy?: (item: any, index: number) => any;
	onAppend?: (param: OnAppend) => any;
	onPrepend?: (param: OnPrepend) => any;
	onLayoutComplete?: (param: OnLayoutComplete) => any;
	onImageError?: (param: OnImageError) => any;
	onChange?: (param: OnChange) => any;
	[others: string]: any;
}
```

#### itemIndex changed totalIndex in onImageError event.

```jsx
// 1.x
<InfiniteGrid onImageError={e => {
	this.items.splice(e.itemIndex, 1);

	this.setState({ items: [...this.items] });
}} />
// 3.x
<InfiniteGrid onImageError={e => {
	this.items.splice(e.totalIndex, 1);

	this.setState({ items: [...this.items] });
}}>
```


## Development

```bash
# Run webpack-dev-server server and see examples for development
$ npm run start
```


## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-infinitegrid/issues) page on GitHub.


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
