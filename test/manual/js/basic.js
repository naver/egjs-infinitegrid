/* eslint-disable */
// window.console = window.console || {log: function(){}};

var ig;
var parallax;

var template = '<div class="item" data-column="${column}" data-group=${group} data-g=${rgroup}><img src="../../demo/assets/image/${no}.jpg" ${data}></div >';
var num = 27;
var _status = 0;
var _groups = {};
var isParallax = false;
var _overflow = true;
var _layout;
var _horizontal;

var grid = document.querySelector("#grid");
$(grid).click(function (e) {
	var target = e.target;

	if ($(target).hasClass(".item")) {
		ig.remove(target);
	} else {
		var parent = $(target).parent(".item");
		if(parent.size() === 0) {
			return;
		}
		ig.remove(parent[0]);
	}
	ig.layout(false);
});
function createGrid() {
	ig && ig.destroy();
	ig = new eg.InfiniteGrid(grid, {
		horizontal: _horizontal,
		threshold: 50,
		isOverflowScroll: _overflow,
	});
	ig.setLoadingBar("<div class=\"loading_bar\">LOADING</div>");
	ig.on({
		"prepend": function (e) {
			// console.log("prepend");
			var groupKeys = ig.getGroupKeys(true);
			var groupKey = (groupKeys[0] || 0) - 1;

			if (!(groupKey in groups)) {
				return;
			}
			ig.startLoading(false);
			setTimeout(function() {
				ig.prepend(groups[groupKey], groupKey);
			}, 1000);
		},
		"append": function (e) {
			console.log("append");
			var groupKeys = ig.getGroupKeys(true);
			var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;
			if (!(groupKey in groups)) {
				// allow append
				groups[groupKey] = getItems(groupKey, num);
			}
			ig.startLoading(true);
			setTimeout(function () {
				ig.append(groups[groupKey], groupKey);
			}, 1000);
		},
		"layoutComplete": function (e) {
			ig.endLoading();
			// console.log("layoutComplete");
			if (!isParallax) {
				return;
			}
			parallax.refresh(e.target, e.scrollPos);
		},
		"change": function (e) {
			if (!isParallax) {
				return;
			}
			parallax.refresh(ig.getItems(), e.scrollPos);
		}
	});
	parallax = new eg.Parallax(window, {
		container: grid,
		horizontal: _horizontal,
	});
	parallax.resize();
}
createGrid(false);
$(window).on("resize", function (e) {
	parallax.resize(ig.getItems());
	if (!isParallax) {
		return;
	}
	parallax.refresh(ig.getItems(), document.body.scrollTop);
});
var groups = {};
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(group, length) {
	var arr = [];
	for (var i = 0; i < length; ++i) {
		var no = Math.round(Math.random() * 59 + 1);
		arr.push(getItem(template, { no: no, column: i % 5 === 0 ? 2 : 1, group: Math.abs(group) % 5, rgroup: group,
		data: images[no] ? 'data-width="'+images[no][0]+'" data-height="'+images[no][1]+'"' : ""
		}));
	}
	return arr;
}
function clear() {
	groups = {};
	ig.clear();
}
function changeLayout(className, options) {
	_layout = className;

	clear();
	$("#grid").attr("data-layout", className);
	ig.setLayout(eg.InfiniteGrid[className], options);
	append();
}
function GridLayout() {
	changeLayout("GridLayout", {
		margin: 5,
		align: "justify"
	});
}
function JustifiedLayout() {
	changeLayout("JustifiedLayout", {
		margin: 5
	});
}
function FrameLayout() {
	changeLayout("FrameLayout", {
		frame: [
			[1, 1, 2, 3, 4, 5],
			[1, 1, 6, 7, 8, 9]
		],
		margin: 5,
	});
}
function SquareLayout() {
	changeLayout("SquareLayout", {
		margin: 5,
		itemSize: 150,
	});
}
function PackingLayout() {
	changeLayout("PackingLayout", {
		aspectRatio: 1.5,
		ratioWeight: 1,
		sizeWeight: 2,
		margin: 5,
	});
}
function append() {
	var groupKeys = ig.getGroupKeys(true);
	var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

	if (!(groupKey in groups)) {
		// allow append
		groups[groupKey] = getItems(groupKey, num);
	}
	ig.startLoading(true);
	ig.append(groups[groupKey], groupKey);
}
function prepend() {
	var groupKeys = ig.getGroupKeys(true);
	var groupKey = (groupKeys[0] || 0) - 1;

	if (!(groupKey in groups)) {
		// allow prepend
		groups[groupKey] = getItems(groupKey, num);
	}
	ig.startLoading(false);
	ig.prepend(groups[groupKey], groupKey);
}
function layout() {
	ig.layout();
}
function layout_false() {
	ig.layout(false);
}
function setStatus() {
	if (!_status) {
		return;
	}
	groups = _groups;
	ig.setStatus(_status);
}
function enableParallax() {
	isParallax = true;
	parallax.refresh(ig.getItems(), document.body.scrollTop);
}
function disableParallax() {
	isParallax = false;
}
function getStatus() {
	_status = ig.getStatus();
	_groups = groups;
}
function vertical() {
	_horizontal = false;
	createGrid();
	$("#grid").attr("data-direction", "vertical");
	window[_layout]();
}
function horizontal() {
	_horizontal = true;
	createGrid();
	$("#grid").attr("data-direction", "horizontal");
	window[_layout]();
}
function overflow() {
	_overflow = true;
	createGrid();
	$("#grid").attr("data-overflow", "true");
	window[_layout]();
}
function overflow_false() {
	_overflow = false;
	createGrid();
	$("#grid").attr("data-overflow", "false");
	window[_layout]();
}


