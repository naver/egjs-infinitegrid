var lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

function getImage(options) {
	var no = options.no || 1;
	return `<div class="item">
		<img src="../image/${no % 60 + 1}.jpg">
	</div>`;
}
function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";
	var className = options.className || "";
	
	var item = `<div class="item ${className}">
		<div class="info">
			<p class="title">${title + no}</p>
			<p class="description">${lorem}</p>
		</div>
	</div>`;
		
	return item;
}
var no = 1;

function getItems(length) {
	var arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getImage({no: i + no}));
		arr.push(getItem({no: i + no, title: "egjs gallery item", subtitle: "egjs item"}));
	}
	no += length;

	return arr;
}

var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "vertical",
});
ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 0, 
	frame: [
		[1, 2],
		[4, 3],
	]
});
var groupKey = 1;
var parallax = new Parallax(window, {
	container: document.querySelector(".container"),
	direction: "vertical",
	// strength: 0.5,
});



ig.on("append", function (e) {
	var items = getItems(30);
	ig.append(items, ++groupKey);
	no += 30;
});
ig.on("layoutComplete", function (e) {
	console.log(e);
	parallax.refresh(e.target, document.body.scrollTop);
});
var items = getItems(30);

ig.append(items, ++groupKey);




window.addEventListener("resize", function (e) {
	ig._infinite._items._data.forEach(function (group) {
		parallax.resize(group.items);
		parallax.refresh(group.items, document.body.scrollTop);
	});
})
ig.on("change", function (e) {
	var scrollPos = e.orgScrollPos;

	ig._infinite._items._data.forEach(function (group) {
		parallax.refresh(group.items, scrollPos);
	});
});