var link = window.HOMELINK;
var template = '<div class="item ${className}"><span>${date}</span></div>';

function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
var months = ["January", "Febaury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getItems(groupKey) {
	var date = new Date();
	if (groupKey !== 0) {
		date = new Date(date.getFullYear(), date.getMonth() + groupKey, date.getDate());
	}
	var year = date.getFullYear();
	var month = date.getMonth();
	var today = groupKey === 0 ? date.getDate() : -1;
	var lastDate = (new Date(year, month + 1, 0)).getDate();

	date.setDate(1);

	var startDay = date.getDay();
	var arr = [];

	date.setDate(0);
	var lastMonthDate = date.getDate();
	arr.push("<div class='item month'><span>" + months[month] + " " + year + "<span></div>");
	arr.push("<div class='item header'><span>Sun<span></div>");
	arr.push("<div class='item header'><span>Mon<span></div>");
	arr.push("<div class='item header'><span>Tue<span></div>");
	arr.push("<div class='item header'><span>Wed<span></div>");
	arr.push("<div class='item header'><span>Thu<span></div>");
	arr.push("<div class='item header'><span>Fri<span></div>");
	arr.push("<div class='item header'><span>Sat<span></div>");
	
	var day = 0;
	for (var i = 0; i < startDay; ++i) {
		arr.push(getItem(template, {className: "prev day" + i, date: lastMonthDate - startDay + i}));
	}
	for (var i = 1; i <= lastDate; ++i) {
		day = (startDay + i - 1) % 7;
		arr.push(getItem(template, {className: (today === i ? "now ": "") + "day" + day, date: i}));
	}
	for (var i = 1; i <= 42 - lastDate - startDay; ++i) {
		day = (startDay + lastDate + i - 1) % 7;
		arr.push(getItem(template, {className: "next day" + day, date: i}));
	}
	return arr;
}

var ig = new eg.InfiniteGrid(".container");

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	frameFill: true,
	frame: [
		[0, -1, -1, -1, -1, -1, -1, -1, 0],
		[0, 1, 2, 3, 4, 5, 6, 7, 0],
		[0, 8, 9, 10, 11, 12, 13, 14, 0],
		[0, 15, 16, 17, 18, 19, 20, 21, 0],
		[0, 22, 23, 24, 25, 26, 27, 28, 0],
		[0, 29, 30, 31, 32, 33, 34, 35, 0],
		[0, 36, 37, 38, 39, 40, 41, 42, 0],
		[0, 43, 44, 45, 46, 47, 48, 49, 0],
	]
});
var num = 21;
var groups = {};

ig.on({
	"prepend": function(e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			// allow prepend
			groups[groupKey] = getItems(groupKey);
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function(e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		if (!(groupKey in groups)) {
			// allow append
			groups[groupKey] = getItems(groupKey);
		}
		ig.append(groups[groupKey], groupKey);
	}
});

groups[0] = getItems(0);
ig.append(groups[0], 0);
setTimeout(function (e) {
	groups[1] = getItems(1);
	ig.append(groups[1], 1);
}, 100);
setTimeout(function (e) {
	groups[-1] = getItems(-1);
	ig.prepend(groups[-1], -1);
}, 200);
