{% include_relative assets/html/grid.html %}

```js
var num = 21;
var groups = {};
// creating instance
var ig = new eg.InfiniteGrid(".container");

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 30,
	align: "center",
});
ig.on({
	"prepend": funtion (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			// prevent prepend
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		if (!(groupKey in groups)) {
			// allow append
			groups[groupKey] = getItems(num);
			return;
		}
		ig.append(groups[groupKey], groupKey);
	}
});

groups[0] = getItems(num * 2);

ig.append(groups[0], 0);
```
