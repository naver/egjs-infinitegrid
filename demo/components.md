## [@egjs/react-layout](https://github.com/naver/egjs-infinitegrid/tree/master/packages/react-layout)

A react component that can easily use egjs-infinitegrid's layouts

* [Drag Demo](https://naver.github.io/egjs-infinitegrid/assets/react/drag.html)
* [API Documentation](https://github.com/naver/egjs-infinitegrid/tree/master/packages/react-layout)


### Install
```
$ npm install @egjs/react-layout  --save
```

### How to use
```jsx
import {GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout} from "@egjs/react-layout";

<GridLayout tag="div" size="1000" horizontal={true} margin="10" isEqualSize={false} outline={[]}>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
</GridLayout>
```

## [@egjs/react-infinitegrid](https://github.com/naver/egjs-infinitegrid/tree/master/packages/react-infinitegrid)

A react component that can easily use egjs-infinitegrid

* [GridLayout Demo](https://codesandbox.io/s/030opyqkvw)
* [JustifiedLayout Demo(typescript)](https://codesandbox.io/s/5w7vrr0kwk)
* [Youtube Demo](https://codesandbox.io/s/935xz7zy8r)
* [API Documentation](https://github.com/naver/egjs-infinitegrid/wiki/react-infinitegrid-API-documentation)

### Install
```
$ npm install @egjs/react-infinitegrid  --save
```

### How to use
```jsx
// GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
import {GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout} from "@egjs/react-layout";

<GridLayout
	tag="div"
	threshold={100}
	isOverflowScroll={false}
	isEqualSize={false}
	isConstantSize={false}
	useFit={true}
	useRecycle={true}
	horizontal={false}
	percentage={false}
	onAppend={e => append}
	onPrepend={e => append}
	onLayoutComplete={e => layoutComplete}
	onImageError={e => imageError}
	onChange={e => chnage}>
	<Item groupKey={0} key={0}/>
	<Item groupKey={0} key={1}/>
	<Item groupKey={1} key={2}/>
	<Item groupKey={1} key={3}/>
	<Item groupKey={2} key={4}/>
	<Item groupKey={2} key={5}/>
	<Item groupKey={2} key={6}/>
</GridLayout>
```