var backgrounds = [
	"#f55",
	"#3B63A1",
	"#8C532E",
];
var template ='<div class="item ${className}"><div class="info"><div class="anchor"></div><p class="title">${title}</p></div></div>';

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(no, length) {
	var arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem(template, {no: i + no, title: "egjs gallery item" + (i + no + 1), className: "b" + (no + i) % 4 + " " + ((no + i + 1) % 2 === 0 ? "even": "odd") }));
	}
	no += length;

	return arr;
}
var num = 30;
var groups = {};
var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	horizontal: true
});
ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 0,
	frameFill: false,
	frame: [
		[1, 1, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 2, 2],
	]
});

ig.on("append", function (e) {
	var groupKey = e.groupKey + 1;

	if (!(groupKey in groups)) {
		// allow append
		groups[groupKey] = getItems(groupKey * num, num);
	}
	ig.append(groups[groupKey], groupKey);
});
groups[0] = getItems(0, num);
ig.append(groups[0], 0);