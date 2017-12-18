var template = '<div class="post"><span class="opts"></span><span class="no">${no}</span><span class="title"><a href="http://m.naver.com">${title}</a></span></div>';
var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}

function getItems(no, length) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem(template, {
			no: no + i + 1,
			title: "egjs post" + (no + i + 1),
			date: "10.30 16:28",
			writer: "egjs"
		}));
	}

	return arr;
}
var container = document.querySelector(".container");
var ig = new eg.InfiniteGrid(container);
var persist = new eg.Persist("table");
var num = 80;
var groups = {};

ig.setLayout(eg.InfiniteGrid.GridLayout);
ig.on({
	"prepend": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;
		if (!(groupKey in groups)) {
			// allow append
			groups[groupKey] = getItems(groupKey * num, num);
		}
		ig.append(groups[groupKey], groupKey);
	}
});

var tempStatus = persist.get("status");

if (tempStatus) {
	groups = persist.get("groups");
	ig.setStatus(tempStatus, true);
} else {
	groups[0] = getItems(0, num);
	ig.append(groups[0], 0);
}

container.addEventListener("click", function (e) {
	if (e.target.tagName !== "A") {
		return;
	}
	const status = ig.getStatus();

	persist.set("status", status);
	persist.set("groups", groups);
});
