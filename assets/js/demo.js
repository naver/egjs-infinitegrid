$(function () {
	function imgSrc(v) {
    return window.HOMELINK + "assets/image/" + (((v + 1) % 60) + 1) + ".jpg";
  }
  function getItems(groupNo) {
    groupNo *= 30;
    var items = [];
    for (var i = 0; i < 30; i++) {
      items.push('<div class="item"><div class="thumbnail"><img src="' + imgSrc(groupNo + i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>');
    }
    return items;
  }

	var ig = new eg.InfiniteGrid("#grid", {
		count: 100,
		defaultGroupKey: 0,
		isOverflowScroll: true
	})
	.on({
		"append": function (e) {
			var gk = this.getGroupKeys();
			var lastGk = gk[gk.length - 1];
			lastGk++;
			ig.append(getItems(lastGk), lastGk);
		},
		"prepend": function (e) {
			var firstGk = this.getGroupKeys()[0];
			firstGk--;
			if (firstGk >= 0) {
				ig.prepend(getItems(firstGk), firstGk);
			}
		}
	});
	ig.append(getItems(0), 0);
});
