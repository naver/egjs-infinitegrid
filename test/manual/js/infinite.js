function imgSrc(v) {
  return "../../demo/assets/image/" + (((v + 1) % 60) + 1) + ".jpg";
}
function getItems(groupNo) {
  groupNo *= 30;
  var items = [];

  for (var i = 0; i < 30; i++) {
    items.push('<div class="item"><div class="thumbnail"><img src="' + imgSrc(groupNo + i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>');
  }
  return items;
}



var count = 0;

var infinite = new eg.InfiniteGrid.Infinite("#infinite")
  .on({
    "append": function(e) {
      e.currentTarget.append(getItems(0), count++);
    },
    "prepend": function(e) {
      e.currentTarget.prepend(getItems(2), count);
    }
  });


// 테스트를 위한 코드
var gui = new dat.GUI();
var guioption = {
	requestAppend: function() {
		infinite.requestAppend();
	},
	requestPrepend: function() {
    infinite.requestPrepend();
	}
};

var fold = gui.addFolder("Data");
fold.add(guioption, "requestAppend");
fold.add(guioption, "requestPrepend");
fold.open();
