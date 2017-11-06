function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";

	var item = `<div class="item">
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
		arr.push(getItem({ no: i + no, title: "egjs post" }))
	}
	no += length;

	return arr;
}
var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	count: 140,
});
ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	direction: "vertical",
	minSize: 100,
	maxSize: 300,
	margin: 10,
});

var groupKey = 1;
ig.on("append", function (e) {
	var items = getItems(30);
	ig.append(items, ++groupKey);
	no += 30;
});
var items = getItems(60);
ig.append(items, ++groupKey);