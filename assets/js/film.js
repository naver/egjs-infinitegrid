(function() {
	function getItem(options) {
		var no = options.no || 1;
		var title = options.title || "egjs post";

		var item = `<div class="item">
			<img src="../image/${no % 60 + 1}.jpg">
		</div>`;
			
		return item;
	}
	var no = 1;
	function getItems(length) {
		var arr = [];
		for (let i = 0; i < length; ++i) {
			arr.push(getItem({ no: i + no, title: "egjs post"}));
		}
		no += length;

		return arr;
	}
	var ig = new eg.InfiniteGrid(document.querySelector(".container2"), {
		count: 100,
		direction: "horizontal",
		isOverflowScroll: true,	
	});
	ig.setLayout(eg.InfiniteGrid.GridLayout, {
		margin: 20,
	});
	var groupKey = 1;
	ig.on("append", function (e) {
		var items = getItems(30);
		ig.append(items, ++groupKey);
		no += 30;
	});
	var items = getItems(30);
	ig.append(items, ++groupKey);
})();