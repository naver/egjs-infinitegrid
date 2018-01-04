/* eslint-disable */
// window.console = window.console || {log: function(){}};


var template = '<div class="item" data-column="${column}" data-i=${i} data-group=${group} data-g=${rgroup}><img src="../../demo/assets/image/${no}.jpg" ${data}></div >';
var num = 10;
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
		arr.push(getItem(template, {i:i, no: no % 5 === 0 ? 1000 : no, column: i % 5 === 0 ? 2 : 1, group: Math.abs(group) % 5, rgroup: group,
		data: images[no] ? 'data-width="'+images[no][0]+'" data-height="'+images[no][1]+'"' : ""
		}));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(grid, {
    threshold: 50,
});
ig.setLoadingBar("<div class=\"loading_bar\">LOADING</div>");
ig.on({
    "append": function (e) {
        console.log("append");
        var groupKey = e.groupKey + 1;
        if (!(groupKey in groups)) {
            // allow append
            groups[groupKey] = getItems(groupKey, num);
        }
        ig.startLoading(true);
        // setTimeout(function () {
            ig.append(groups[groupKey], groupKey);
        // }, 1000);
    },
    "layoutComplete": function (e) {
        console.log("layoutComplete");
        ig.endLoading();
        if (e.isAppend && !e.isScroll) {
            append();
        }
    },
    "imageError": function(e) {
        console.log("imageERR");
        console.log(e);
        // e.remove();
        // e.replace("../unit/image/error.png");
        e.replaceItem("에러를 받아라!!!!");
    }
});
ig.setLayout(eg.InfiniteGrid.GridLayout, {margin: 5});
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
