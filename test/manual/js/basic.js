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
var _useFit = true;

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
});
function createGrid() {
	ig && ig.destroy();
	ig = new eg.InfiniteGrid(grid, {
		horizontal: _horizontal,
		threshold: 50,
		isOverflowScroll: _overflow,
		useFit: _useFit,
		// useRecycle: false,
	});
	ig.setLoadingBar("<div class=\"loading_bar\">LOADING</div>");
	ig.on({
		"append": function (e) {
			if (ig.isProcessing()) {
				return;
			}
			console.log("append");
			var groupKey = e.groupKey + 1;
				
			ig.startLoading(true);
			setTimeout(function () {
				ig.append(getItems(groupKey, num), groupKey);
			}, 200);
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
		margin: 5,
		column: [2,5]
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

	ig.startLoading(true);
	ig.append(getItems(groupKey, num), groupKey);
}
function prepend() {
	var groupKeys = ig.getGroupKeys(true);
	var groupKey = (groupKeys[0] || 0) - 1;


	//setTimeout(function() {
		ig.prepend(getItems(groupKey, num), groupKey);
	//}, 5000);
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
function getStatus() {
	_status = ig.getStatus();
	_groups = groups;
}
function toggleParallax(target) {
	isParallax = !isParallax;
	isParallax && parallax.refresh(ig.getItems(), document.body.scrollTop);
	target.innerHTML = isParallax ? "disable Parallax" : "enable Parallax";
}
function toggleDirection(target) {
	_horizontal = !_horizontal;
	createGrid();
	$("#grid").attr("data-direction", _horizontal ? "horizontal" : "vertical");
	target.innerHTML = _horizontal ? "vertical" : "horizontal";
	window[_layout]();
}
function toggleOverflow(target) {
	_overflow = !_overflow;
	createGrid();
	$("#grid").attr("data-overflow", "true");
	target.innerHTML = _overflow ? "disable overflow" : "enable overflow";
	window[_layout]();
}
function toggleFit(target) {
	_useFit = !_useFit;
	createGrid();
	target.innerHTML = _useFit ? "disable useFit" : "enable useFit";
	window[_layout]();
}