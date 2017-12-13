var template = '<div class="item"><div class="thumbnail"><img src="${link}assets/image/${no}.jpg"></div><div class="info">${text}</div></div>';
var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(length) {
	var arr = [];

	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, { no: i % 60 + 1, text: "egjs post " + (i + 1), link: link }));
	}
	return arr;
}
var ig = new eg.InfiniteGrid(".demobox", {
	isOverflowScroll: true
});
var num = 21;
var groups = {};

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 30,
	align: "center"
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
	}
});
groups[0] = getItems(num * 2);
ig.append(groups[0], 0);
