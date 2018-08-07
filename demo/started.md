### Browser support

|Internext Explorer|Chrome|Firefox|Safari|IOS|Android|
|---|---|---|---|---|---|
|8+ (possibly 9 also)|Yes|Yes|Yes|7+|2.1+ (except 3.x)|

### Quick steps to use:


#### Set up your HTML

``` html
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
    ....
</ul>
```

#### Load files or import library


##### ES5
``` html {% for dist in site.data.egjs.dist %}
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ dist }}"></script>
{% endfor %}```
```js
var InfiniteGrid = eg.InfiniteGrid;
var JustifiedLayout = InfiniteGrid.JustifiedLayout;
```
##### ES6+
```js
import InfiniteGrid, {JustifiedLayout} from "@egjs/infinitegrid";
```

### Initialize
```javascript
var ig = new InfiniteGrid("#grid", {
    horizontal: false,
});

// initialize layout
// GridLayout(default), JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(JustifiedLayout, {
    itemSize: 200,
});
```
For more information about API, please visit the **[link](//naver.github.io/egjs-infinitegrid/release/latest/doc/)**.
