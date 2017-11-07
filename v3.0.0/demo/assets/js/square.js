function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";
	var column = options.column || 1;
	var item = `<div class="item" data-column="${column}">
		<img src="../image/${no % 60 + 1}.jpg">
		<div class="info">
			<div class="bg"></div>
			<div class="title">${title + no}</div>
		</div>
	</div>`;
	return item;
}
var no = 1;
function getItems(length) {
	var arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(getItem({ no: i + no, title: "egjs post", column: i % 10 === 0 ? 2 : 1 }))
	}
	no += length;

	return arr;
}
var ig = new eg.InfiniteGrid(document.querySelector(".gallery"), {
	count: 140,
});
ig.setLayout(eg.InfiniteGrid.SquareLayout, {
	direction: "vertical",
	itemSize: 300,
	margin: 10,
});

var groupKey = 1;
ig.on("append", function (e) {
	var items = getItems(28);
	ig.append(items, ++groupKey);
	no += 30;
});
var items = getItems(60);
ig.append(items, ++groupKey);