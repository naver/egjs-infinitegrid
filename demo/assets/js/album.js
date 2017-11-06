(function() {
	function getItem(options) {
		var no = options.no || 1;
		var title = options.title || "egjs post";

		var item = `<div class="item">
			<div class="info">
				<img src="../image/${no % 60 + 1}.jpg">
				<p class="title">${title + no}</p>
			</div>
		</div>`;
			
		return item;
	}
	var no = 1;
	function getItems(length) {
		var arr = [];
		for (let i = 0; i < length; ++i) {
			arr.push(getItem({ no: i + no, title: "egjs post" }));
		}
		no += length;

		return arr;
	}
	var ig = new eg.InfiniteGrid(document.querySelector(".container3"), {
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
	ig.on("change", function(e) {
		var pos = e.scrollPos;
		refresh(pos);
	});
	ig.on("layoutComplete", function(e) {
		var pos = ig._watcher._prevPos;
		refresh(pos);
	});
	function refresh(pos) {
		var size = ig._renderer._size.view;
		var csize = Math.pow(size / 2, 2);
		var centerPos = pos + size / 2;
		ig._items._data.forEach(function (group) {
			group.items.forEach(function (item) {
				if (pos > item.rect.left + item.size.width || pos + size < item.rect.left) {
					return;
				}
				var center = item.rect.left + item.size.width / 2;

				var scale = (csize - Math.pow(center - centerPos, 2)) / csize;

				if (!item.el.__INFO__) {
					item.el.__INFO__ = item.el.querySelector(".info");
				}
				item.el.__INFO__.style.transform = "scale(" + scale + ")";
			});
		});
	}
})();