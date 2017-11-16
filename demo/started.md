### Browser support
IE 8+ (possibly 9 also), latest of Chrome/FF/Safari, iOS 7+ and Android 2.1+ (except 3.x)

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

##### ES6+
```js
import InfiniteGrid from "@egjs/infinitegrid";
```

### Initialize

##### ES5
```javascript
// create InfiniteGrid
var ig = new eg.InfiniteGrid("#grid", {
    horizontal: false
});

// initialize layout
// GridLayout(default), JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
    itemSize: 200
});
```
##### ES6+
```javascript
import InfiniteGrid from "@egjs/infinitegrid";
import JustifiedLayout from "@egjs/infinitegrid/layouts/JustifiedLayout";

const ig = new InfiniteGrid("#grid", {
    horizontal: false,
});

// initialize layout
// GridLayout(default), JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(JustifiedLayout, {
    itemSize: 200,
});
```
For more information about API, please visit the **[link](//naver.github.io/egjs-infinitegrid/release/latest/doc/)**.
