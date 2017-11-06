var isSupportClipPath = (function() {
	var body = document.body;
	if (!body) {
		return false;
	}
	var style = body.style;
	if (!style) {
		return false;
	}
	if ("clipPath" in style || "webkitClipPath" in style || "msClipPath" in style) {
		return true;
	}
	return false;
})();

function getItem(options) {
	var no = options.no || 1;
	var title = options.title || "egjs post";
	var subtitle = options.subtitle || "egjs post";
	var className = options.className || "";
	
	var item = `<div class="item ${className}">
		<img src="../image/${no % 60 + 1}.jpg">
		<div class="info">
			<p class="title">${title + no}</p>
			<p class="subtitle">${subtitle + no}</p>
		</div>
	</div>`;
		
	return item;
}
var no = 1;
var className = isSupportClipPath ? "item_clip" : "";
function getItems(length) {
	var arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(getItem({no: i + no, title: "egjs gallery item", subtitle: "egjs item", className}));
	}
	no += length;

	return arr;
}

var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "horizontal",
});
var parallax = new eg.Parallax(window, {
	container: document.querySelector(".container"),
	direction: "horizontal",
	// strength: 0.5,
	align: "center",
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: isSupportClipPath ? -80 : 0,
});
let groupKey = 1;
ig.on("append", e => {
	const items = getItems(30);

	ig.append(items, ++groupKey);
	no += 30;
});
ig.on("layoutComplete", e => {
	console.log(e);
	parallax.refresh(e.target, document.body.scrollLeft);
});
ig.append(getItems(30), ++groupKey);

window.addEventListener("resize", e => {
	const items = ig.getItems();

	parallax.resize(items);
	parallax.refresh(items, e.orgScrollPos);
});
ig.on("change", e => {
	const scrollPos = e.orgScrollPos;

	parallax.refresh(ig.getItems(), scrollPos);
});

