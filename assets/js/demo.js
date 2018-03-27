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

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 30,
	align: "center"
});

ig.on({
	"append": function (e) {
		var groupKey = (e.groupKey || 0) + 1;

		ig.append(getItems(num * 2), groupKey);
	}
});
ig.append(getItems(num * 2), 0);
