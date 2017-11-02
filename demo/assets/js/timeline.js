var lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;
var backgrounds = [
	"#f55",
	"#3B63A1",
	"#8C532E",
];
function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";
	var className = options.className || "";
	
	var item = `<div class="item ${className}">
	<div class="info">
			<div class="anchor"></div>
			<p class="title">${title + no}</p>
		</div>
	</div>`;
		
	return item;
}
var no = 1;

function getItems(length) {
	var arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem({no: i + no, title: "egjs gallery item", subtitle: "egjs item", className: "b" + (no + i) % 4 + " " + ((no + i) % 2 === 0 ? "even": "odd") }));
	}
	no += length;

	return arr;
}

var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "horizontal",
});
ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 0,
	frameFill: false,
	frame: [
		[1, 1, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 2, 2],
	]
});
var groupKey = 1;
ig.on("append", function (e) {
	var items = getItems(30);
	ig.append(items, ++groupKey);
	no += 30;
});
ig.on("layoutComplete", function(e) {
	console.log(e);
});
var items = getItems(30);

ig.append(items, ++groupKey);
