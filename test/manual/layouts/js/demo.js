function imgSrc(v) {
	return "../../../demo/assets/image/" + (((v + 1) % 60) + 1) + ".jpg";
}
function getItems(groupNo) {
groupNo *= 30;
var items = [];

for (var i = 0; i < 30; i++) {
  items.push('<div class="item"><div class="thumbnail"><img src="' + imgSrc(groupNo + i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>');
}
return items;
}

var timer;
var grid = document.getElementById("grid");
var ig = new eg.InfiniteGrid("#grid", {
		count: 4000,
  defaultGroupKey: 0
	});


ig.once("layoutComplete", function (e) {
	grid.style.opacity = 1;
});
ig.append(getItems(0), 0);
