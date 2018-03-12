var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';
var imageTemplate = '<div class="item"><img src="../image/${no}.jpg"></div>';
var postTemplate = '<div class="item"><div class="info"><p class="title">${title}</p><p class="description">${lorem}</p></div></div>';
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
		arr.push(getItem(imageTemplate, {no: (i + no) % 60 + 1, link: link}));
		arr.push(getItem(postTemplate, { no: i + no, title: "egjs item " + (i + no + 1), lorem: lorem }));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	horizontal: false
});
ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 0, 
	frame: [
		[1, 2, 3, 4, 5, 6],
		[10, 9, 12, 11, 14, 13],
	],
	itemSize: 200
});
var num = 36;
var parallax = new eg.Parallax(window, {
	container: document.querySelector(".container"),
	horizontal: false
});

ig.on({
	"append": function (e) {
		var groupKey = e.groupKey + 1;

		ig.append(getItems(groupKey * num, num), groupKey);
	},
	"layoutComplete": function(e) {
		parallax.refresh(e.target, e.orgScrollPos);
	},
	"change": function(e) {
		parallax.refresh(ig.getItems(), e.orgScrollPos);
	}
});

ig.append(getItems(0, num), 0);

window.addEventListener("resize", function(e) {
	var items = ig.getItems();

	parallax.resize(items);
	parallax.refresh(items, document.body.scrollTop);
});
