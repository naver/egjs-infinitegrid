### Browser support
IE 8+ (possibly 9 also), latest of Chrome/FF/Safari, iOS 7+ and Android 2.1+ (except 3.x)

### Quick steps to use:

#### Load files

``` html
<script src="http://naver.github.io/egjs-infinitegrid/dist/infinitegrid.pkgd.min.js"></script>
```

#### Set up your HTML

``` html
<!-- Target DOM -->
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
    <li class="card">
        <div>test4</div>
    </li>
    <li class="card">
        <div>test5</div>
    </li>
    <li class="card">
        <div>test6</div>
    </li>
</ul>
```

### Initialize it and all done!
```javascript
// create InfiniteGrid ui without option
new eg.InfiniteGrid("#grid");

// create InfiniteGrid ui with options
new eg.InfiniteGrid("#grid",{
  itemSelector: ".item",
  count: -1
});

// create InfiniteGrid ui and get instance of it
var instance = new eg.InfiniteGrid("#grid");

// call some methods
instance.getBottomElement();
instance.layout();
```