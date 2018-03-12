var template = '<div class="item" data-column="${column}"><img src="${link}../image/${no}.jpg"><div class="info"><div class="bg"></div><div class="title">${title}</div></div></div>';
var link = window.HOMELINK;

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}

var groups = {};
var num = 28;
function getItems(no, length) {
	var arr = [];
	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, {no: (i + no) % 60 + 1, title: "egjs post" + (i + no), column: i % 10 === 0 ? 2 : 1, link: link }))
	}
	return arr;
}
var ig = new eg.InfiniteGrid(".gallery", {
	count: 140,
});
ig.setLayout(eg.InfiniteGrid.SquareLayout, {
	column: 4,
	margin: 10,
});

ig.on({
	"append": function (e) {
		var groupKey = e.groupKey + 1;

		ig.append(getItems(groupKey * num, num), groupKey);
	}
});
ig.append(getItems(0, num), 0);
