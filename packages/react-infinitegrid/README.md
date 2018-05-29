# react-infinitegrid [![npm version](https://badge.fury.io/js/%40egjs%2Freact-infinitegrid.svg)](https://badge.fury.io/js/%40egjs%2Freact-infinitegrid)

A react component that can easily use [egjs-infinitegrid](https://github.com/naver/egjs-infinitegrid)

* Demo
* [API Documentation](https://github.com/naver/egjs-infinitegrid/wiki/react-infinitegrid-API-documentation)

## Install
```bash
$ npm install @egjs/react-infinitegrid  --save
```

## How to use
```js
// GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
import {GridLayout} from "@egjs/react-infinitegrid";
```

```jsx
<GridLayout
	tag = "div"
	threshold = {100}
	isOverflowScroll = {false}
	isEqualSize = {false}
	isConstantSize = {false}
	useRecycle = {true}
	horizontal = {false}
	percentage = {false}
	onAppend = {e => append}
	onPrepend = {e => append}
	onLayoutComplete = {e => layoutComplete}
	onImageError = {e => imageError}
	onChange = {e => chnage}>
	<Item groupKey={0} key={0}/>
	<Item groupKey={0} key={1}/>
	<Item groupKey={0} key={2}/>
	<Item groupKey={0} key={3}/>
	<Item groupKey={0} key={4}/>
	<Item groupKey={0} key={5}/>
	<Item groupKey={0} key={6}/>
</GridLayout>
```

### More examples
```jsx
this.loading = (<div className="loading">Loading... append</div>);
this.state = {
	loading: false,
	list: loadItems(0, 0),
};
loadItems = (groupKey, start) => {
	const items = [];

	for (let i = 0; i < 20; ++i) {
		items.push(<Item groupKey={groupKey} key={start + i} />);
	}
	return items;
}
onAppend = ({groupKey}) => {
	const list = this.state.list;
	const start = list.length;
	const items = this.loadItems(groupKey + 1, start);

	this.setState({loading: this.loading, list: list.concat(items)});
}
onLayoutComplete = ({isLayout}) => {
	!isLayout && this.setState({loading: false});
}
render() {
	return (<GridLayout onAppend={this.onAppend}
	onLayoutComplete={this.onLayoutComplete}
	loading={this.state.loading}>
		{this.state.list}
	</GridLayout>);
}

```

## Development

```bash
# Run webpack-dev-server server and see examples for development
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