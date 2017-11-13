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

var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
var template = '<div class="item ${className}"><img src="${link}../image/${no}.jpg"><div class="info"><p class="title">${title}</p><p class="subtitle">${subtitle}</p></div></div>';
var className = isSupportClipPath ? "item_clip" : "";
function getItems(length) {
	var arr = [];
	for (let i = 1; i <= length; ++i) {
		arr.push(getItem(template, {
			no: i % 60,
			title: "egjs gallery item" + i,
			subtitle: "egjs item" + i,
			className: className,
			link: link
		}));
	}
	return arr;
}
var num = 21;
var groups = {};
var container = document.querySelector(".container");
var ig = new eg.InfiniteGrid(container, {
	horizontal: true,
});
var parallax = new eg.Parallax(window, {
	container: container,
	direction: "horizontal",
	align: "center",
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: isSupportClipPath ? -80 : 0,
});
ig.on({
	"prepend": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		if (!(groupKey in groups)) {
			// allow append
			groups[groupKey] = getItems(num);
		}
		ig.append(groups[groupKey], groupKey);
	},
	"layoutComplete": function (e) {
		parallax.refresh(e.target, e.orgScrollPos);
	},
	"change": function (e) {
		parallax.refresh(ig.getItems(), e.orgScrollPos);
	}
});
groups[0] = getItems(num * 2);
ig.append(groups[0], 0);


window.addEventListener("resize", function (e) {
	var items = ig.getItems();

	parallax.resize(items);
	parallax.refresh(items, e.orgScrollPos);
});
