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
		arr.push(getItem(template, {no: (i % 60 + 1), link: link}));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(".container", {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 10,
	frame: [
		[1, 1, 3, 4, 8, 8],
		[2, 2, 5, 6, 8, 8],
		[2, 2, 7, 7, 9, 9],
	]
});
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
			groups[groupKey] = getItems(27);
		}
		ig.append(groups[groupKey], groupKey);
	}
});

groups[0] = getItems(27);

ig.append(groups[0], 0);
