var template = '<div class="item" data-column="${column}"><img src="${link}../image/${no}.jpg"></div>';
var link = window.HOMELINK;

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(no, length) {
	var arr = [];
	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, { no: (i + no) % 60 + 1, title: "egjs post" + (i + no), link: link}));
	}
	no += length;

	return arr;
}

var groups = {};
var num = 28;
var ig = new eg.InfiniteGrid(".container");

ig.setLayout(eg.InfiniteGrid.PackingLayout);
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
			groups[groupKey] = getItems(groupKey * num, num);
		}
		ig.append(groups[groupKey], groupKey);
	}
});
groups[0] = getItems(0, num);
ig.append(groups[0], 0);


setTimeout(function() {
	groups[1] = getItems(num, num);
	ig.append(groups[1], 1);
}, 400);
