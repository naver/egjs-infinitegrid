### Basic (overflow: scroll)

{% include_relative assets/html/demo.html %}

```js
// creating instance
var ig = new eg.InfiniteGrid("#grid", {
	count: 100,
	defaultGroupKey: 0,
	isOverflowScroll: true
})
.on({
	"append": function (e) {
		var gk = this.getGroupKeys();
		var lastGk = gk[gk.length - 1];
		lastGk++;
		ig.append(getItems(lastGk), lastGk);
	},
	"prepend": function (e) {
		var firstGk = this.getGroupKeys()[0];
		firstGk--;
		if (firstGk >= 0) {
			ig.prepend(getItems(firstGk), firstGk);
		}
	}
});
ig.append(getItems(0), 0);
```
