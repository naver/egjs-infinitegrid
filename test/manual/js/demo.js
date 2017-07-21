(function () {
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
			count: 40,
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
          clearTimeout(timer);
					timer = setTimeout(function() {
            ig.prepend(getItems(firstGk), firstGk);
          }, 1000);
				}
			}
		});
	ig.once("layoutComplete", function (e) {
		grid.style.opacity = 1;
	});
	ig.append(getItems(0), 0);
})();
