#### infiniteGrid demo
This is a simple infiniteGrid demos

```javascript
// creating instance
var ig = new eg.InfiniteGrid("#grid", {
	count : 100,
	defaultGroupKey : 0
})
.on({
	"append" : function(e) {
		var gk = this.getGroupKeys();
		var lastGk = gk[gk.length-1];
		lastGk++;
		ig.append(template(data.getItems(lastGk)), lastGk);
	},
	"prepend" : function(e) {
		var firstGk = this.getGroupKeys()[0];
		firstGk--;
		if(firstGk >= 0) {
			ig.prepend(template(data.getItems(firstGk)), firstGk);
		}
	}
});
ig.append(template(data.getItems(0)), 0);
```

<!-- infinite grid -->
<div id="grid" class="row" style="opacity:0.01"></div>
