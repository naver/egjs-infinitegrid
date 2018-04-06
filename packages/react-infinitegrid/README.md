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
	useRecycle = {true}
	horizontal = {false}
	percentage = {false}
	onAppend = {e => append}
	onPrepend = {e => append}
	onLayoutComplete = {e => layoutComplete}
	onImageError = {e => imageError}
	onChange = {e => imageError}>
	<Item/>
	<Item/>
	<Item/>
	<Item/>
	<Item/>
	<Item/>
	<Item/>
</GridLayout>
```

### More examples
```jsx
this.loading = (<LoadingBar append>Loading... append</LoadingBar>);
this.state = {
	loading: false,
	list: loadItems(0, 0),
};
this.onAppend = this.onAppend.bind(this);
this.onLayoutComplete = this.onLayoutComplete.bind(this);
loadItems(groupKey, start) {
	const items = [];

	for (let i = 0; i < 20; ++i) {
		items.push(<Item groupKey={groupKey} key={start + i} />);
	}
	return items;
}
onAppend({groupKey}) {
	const list = this.state.list;
	const start = list.length;
	const items = this.loadItems(groupKey + 1, start);

	this.setState({loading: this.loading, list: list.concat(items)});
}
onLayoutComplete() {
	this.setState({loading: false});
}
render() {
	return (<GridLayout onAppend={this.onAppend}
	onLayoutComplete={this.onLayoutComplete}
	loading={this.state.loading}>
		{this.state.list}
	</GridLayout>);
}

```
