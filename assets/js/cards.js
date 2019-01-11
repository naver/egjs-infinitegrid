var template = '<div class="card"><img src="${link}../image/${no}.jpg"><div class="info"><p class="category">category</p><p class="title">${title}</p></div></div>';
var template2 = '<div class="item"><img src="${link}../image/${no}.jpg"></div>';
var template3 = '<div class="item"><div class="info"><img src="${link}../image/${no}.jpg"><p class="title">${title}</p></div></div>';

var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function() {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function createGrid(container, itemTemplate) {
	function getItems(length) {
		var arr = [];
		for (var i = 0; i < length; ++i) {
			arr.push(getItem(itemTemplate, {
				no: i % 60 + 1,
				title: "egjs post" + (i + 1),
				link: link
			}));
		}
		return arr;
	}
	var num = 21;
	var ig = new eg.InfiniteGrid(container, {
		horizontal: true,
		isOverflowScroll: true,	
	});
	ig.setLayout(eg.InfiniteGrid.GridLayout, {
		margin: 20,
	});
	ig.on("append", function (e) {
		var groupKey = (e.groupKey || 0) + 1;
		ig.append(getItems(num), groupKey);
	});

	ig.append(getItems(num * 2), 0);


	return ig;
}

var ig1 = createGrid(".container", template);
var ig2 = createGrid(".container2", template2);
var ig3 = createGrid(".container3", template3);


ig3.on({
	"change": function (e) {
		var pos = e.scrollPos;
		refresh(pos);
	},
	"layoutComplete": function (e) {
		var pos = e.scrollPos;
		refresh(pos);
	}
});
function refresh(pos) {
	var size = ig3._renderer._size.view;
	var csize = Math.pow(size / 2, 2);
	var centerPos = pos + size / 2;

	console.log(pos, size, csize, centerPos);
	ig3.getItems().forEach(function (item) {
		if (pos > item.rect.left + item.size.width || pos + size < item.rect.left) {
			return;
		}
		var center = item.rect.left + item.size.width / 2;

		var scale = Math.max((csize - Math.pow(center - centerPos, 2)) / csize, 0);

		if (!item.el.__INFO__) {
			item.el.__INFO__ = item.el.querySelector(".info");
		}
		item.el.__INFO__.style.transform = "scale(" + scale + ")";
	});
}