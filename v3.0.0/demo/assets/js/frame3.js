var link = window.HOMELINK;
var template = '<div class="item"><img src="${link}../image/${no}.jpg"></div>';

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}

function getItems(length) {
	var arr = [];

	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, {no: i % 60 + 1, link: link}));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(".container");

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 30,
	frameFill: false,
	frame: [
		[1, 0, 2, 0, 3, 0, 4],
		[0, 5, 0, 6, 0, 7, 0]
	]
});
var num = 21;
var groups = {};

ig.on({
	"prepend": function(e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function(e) {
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
