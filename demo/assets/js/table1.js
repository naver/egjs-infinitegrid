function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";
	var writer = options.writer || "egjs";
	var date = options.date || "10.30 16:28";

	var item = `<div class="post">
			<span class="opts"></span>
			<span class="no">${no}</span>
			<span class="date">${date}</span>
			<span class="writer">${writer}</span>
			<span class="title">${title + no}</span>
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
	count: 100,
});
ig.setLayout(eg.InfiniteGrid.GridLayout, {
	direction: "vertical",
});

var groupKey = 1;
ig.on("append", function (e) {
	var items = getItems(30);
	ig.append(items, ++groupKey);
	no += 30;
});
var items = getItems(30);
ig.append(items, ++groupKey);