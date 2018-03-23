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

	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, {no: i + no, title: "egjs gallery item" + (i + no + 1), className: "b" + (no + i) % 4 + " " + ((no + i + 1) % 2 === 0 ? "even": "odd") }));
	}
	no += length;

	return arr;
}
var num = 30;
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

	ig.append(getItems(groupKey * num, num), groupKey);
});
ig.append(getItems(0, num), 0);