var template = '<div class="item"><img src="${link}../image/${no}.jpg"><div class="info"><div class="bg"></div><div class="title">${title}</div></div></div>';
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
		arr.push(getItem(template, { no: (i + no) % 60 + 1, title: "egjs post" + (i + no), link: link }));
	}
	return arr;
}
var num = 40;
var ig = new eg.InfiniteGrid(".container");
var layout = new eg.InfiniteGrid.JustifiedLayout({
	minSize: 100,
	maxSize: 300,
	margin: 10
});
ig.setLayout(layout);
ig.on({
	"append": function (e) {
		var groupKey = e.groupKey + 1;

		ig.append(getItems(groupKey * num, num), groupKey);
	}
});
ig.append(getItems(0, num), 0);