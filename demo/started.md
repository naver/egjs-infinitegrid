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

```javascript
// create InfiniteGrid ui without option
new eg.InfiniteGrid("#grid");

// create InfiniteGrid ui with options
new eg.InfiniteGrid("#grid",{
  itemSelector: ".item"
});
```

### Initialize Layout

```javascript
// create InfiniteGrid
const ig = new eg.InfiniteGrid("#grid");

// initialize layout
// GridLayout(default), JustifiedLayout, FrameLayout, SquareLayout, PackingLayout
ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
    itemSize: 200,
});
```


For more information about API, please visit the **[link](//naver.github.io/egjs-view360/release/latest/doc/eg.view360.PanoViewer.html)**.
