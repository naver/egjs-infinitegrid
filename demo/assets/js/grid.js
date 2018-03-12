var template = '<div class="item"><div class="thumbnail"><img src="${link}../../assets/image/${no}.jpg"></div><div class="info">${text}</div></div>';
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
		arr.push(getItem(template, {no: i % 60 + 1, text: "egjs post " + (i + 1), link: link}));
	}
	return arr;
}
var ig = new eg.InfiniteGrid(".container");
var num = 21;
var groups = {};

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 30,
	align: "center"
});

ig.on({
	"append": function(e) {
		ig.append(getItems(num), e.groupKey);
	},
	"layoutComplete": function(e) {
		e.target.forEach(function(item) {
			if (!item.el) {
				return;
			}
			// add abunatuib
			item.el.setAttribute("class", "item animate");
		});
	}
});

ig.append(getItems(num * 2), 0);
