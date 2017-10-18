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
      e.currentTarget.prepend(getItems(2), count++);
    }
  });



		// this._layout = new FrameLayout({
		// 	direction: "vertical",
		// 	margin: 20,
		// 	frame: [
		// 		["C", "", "A", "A", "A"],
		// 		["C", "B", "B", "E", "E"],
		// 		["C", "D", "D", "E", "E"],
		// 		["F", "F", "", "H", "H"],
		// 	],
		// });

// 테스트를 위한 코드
var gui = new dat.GUI();
var guioption = {
	requestAppend: function() {
		infinite._requestAppend();
	},
	requestPrepend: function() {
    infinite._requestPrepend();
  },
  clear: function() {
    infinite.clear();
  },
  layout: function() {
    infinite.layout();
  },
  width: 800,
  height: 1000,
  direction: "vertical",
  margin: 10,
};

function setViewport() {
  infinite.setViewport(guioption.width, guioption.height);
}
var justified = {
  minSize: 100,
  maxSize: 200,
  set: function() {
    infinite.setLayout(new eg.InfiniteGrid.JustifiedLayout({
      direction: guioption.direction,
      margin: guioption.margin,
      minSize: justified.minSize,
      maxSize: justified.maxSize
    }));
    setViewport();
  }
};
var grid = {
  align: "start",
  set: function() {
    infinite.setLayout(new eg.InfiniteGrid.GridLayout({
      direction: guioption.direction,
      margin: guioption.margin,
      align: grid.align
    }));
    setViewport();
  }
};
var packing = {
  aspectRatio: 1.2,
  set: function() {
    infinite.setLayout(new eg.InfiniteGrid.PackingLayout({
      direction: guioption.direction,
      margin: guioption.margin,
      aspectRatio: packing.aspectRatio
    }));
    setViewport();
  }
};
var facebook = {
  column: 1,
  set: function() {
    infinite.setLayout(new eg.InfiniteGrid.FacebookLayout({
      direction: guioption.direction,
      margin: guioption.margin,
      column: facebook.column
    }));
    setViewport();
  }
};
var frame = {
  frame: [[]],
  set: function() {
    infinite.setLayout(new eg.InfiniteGrid.FrameLayout({
      direction: guioption.direction,
      margin: guioption.margin,
      frame: facebook.column
    }));
    setViewport();
  }
};

var fold0 = gui.addFolder("Action");
fold0.add(guioption, "requestPrepend");
fold0.add(guioption, "requestAppend");
fold0.add(guioption, "clear");
fold0.add(guioption, "layout");
fold0.open();

var fold1 = gui.addFolder("Data");
fold1.add(guioption, "width", 800, 1600).onFinishChange(() => setViewport());
fold1.add(guioption, "height", 1000, 2000).onFinishChange(() => setViewport());
fold1.add(guioption, "direction", ["vertical", "horizontal"]).onFinishChange(() => infinite.clear());
fold1.add(guioption, "margin", 10, 50).onFinishChange(() => infinite.clear());
fold1.open();

var fold2 = gui.addFolder("JustifiedLayout");
fold2.add(justified, "minSize", 10, 300).onFinishChange(() => justified.set());
fold2.add(justified, "maxSize", 100, 2000).onFinishChange(() => justified.set());
fold2.add(justified, "set");
fold2.open();

var fold3 = gui.addFolder("GridLayout");
fold3.add(grid, "align", ["start", "center", "end", "justify"]).onFinishChange(() => grid.set());
fold3.add(grid, "set");
fold3.open();

var fold4 = gui.addFolder("PackingLayout");
fold4.add(packing, "aspectRatio", 1, 3).onFinishChange(() => packing.set());
fold4.add(packing, "set");
fold4.open();

var fold5 = gui.addFolder("FacebookLayout");
fold5.add(facebook, "column", 1, 10).onFinishChange(() => facebook.set());
fold5.add(facebook, "set");
fold5.open();

var fold6 = gui.addFolder("FrameLayout");
// fold5.add(facebook, "frame", 1, 10).onFinishChange(() => facebook.set());
fold6.add(frame, "set");
fold6.open();


// frame: [
//   // 		["C", "", "A", "A", "A"],
//   // 		["C", "B", "B", "E", "E"],
//   // 		["C", "D", "D", "E", "E"],
//   // 		["F", "F", "", "H", "H"],
//   // 	],