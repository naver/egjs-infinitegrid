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
		arr.push(getItem({ no: i + no, title: "egjs gallery item", subtitle: "egjs item", className: className}));
	}
	no += length;

	return arr;
}

var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "horizontal",
});
var parallax = new Parallax(window, {
	container: document.querySelector(".container"),
	direction: "horizontal",
	// strength: 0.5,
	align: "center",
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: isSupportClipPath ? -80 : 0, 
});
var groupKey = 1;
ig.on("append", function (e) {
	var items = getItems(30);
	ig.append(items, ++groupKey);
	no += 30;
});
ig.on("layoutComplete", function(e) {
	console.log(e);
	parallax.refresh(e.target, document.body.scrollLeft);
});
var items = getItems(30);

ig.append(items, ++groupKey);

window.addEventListener("resize", function(e) {
	ig._infinite._items._data.forEach(function(group) {
		parallax.resize(group.items);
		parallax.refresh(group.items, document.body.scrollLeft);
	});
})
ig.on("change", function (e) {
	var scrollPos = e.orgScrollPos;

	ig._infinite._items._data.forEach(function (group) {
		parallax.refresh(group.items, scrollPos);
	});
});

