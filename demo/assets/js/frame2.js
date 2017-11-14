var link = window.HOMELINK;
var template = '<div class="item"><img src="${link}../image/${no}.jpg"></div>';

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(length) {
	const arr = [];

	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, {no: (i % 60 + 1), link: link}));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(".container", {
	horizontal: true,
	direction: "horizontal"
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 10,
	frame: [
		[0, 0, 0, 0, 2, 2, 0, 0, 0],
		[0, 1, 1, 1, 2, 2, 0, 0, 0],
		[0, 1, 1, 1, 2, 2, 3, 3, 3],
		[0, 0, 4, 4, 0, 0, 3, 3, 3],
		[5, 5, 4, 4, 0, 0, 8, 8, 0],
		[5, 5, 4, 4, 7, 7, 8, 8, 0],
		[5, 5, 6, 6, 7, 7, 8, 8, 0],
		[0, 0, 6, 6, 7, 7, 0, 0, 0],
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
			groups[groupKey] = getItems(24);
		}
		ig.append(groups[groupKey], groupKey);
	}
});

groups[0] = getItems(24);

ig.append(groups[0], 0);
