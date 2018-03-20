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

ig.setLayout(eg.InfiniteGrid.GridLayout);
ig.on({
	"append": function (e) {
		var groupKey = (e.groupKey || 0) + 1;

		ig.append(getItems(groupKey * num, num), groupKey);
	}
});

var tempStatus = persist.get("status");

if (tempStatus) {
	ig.setStatus(tempStatus, true);
} else {
	ig.append(getItems(0, num), 0);
}

container.addEventListener("click", function (e) {
	if (e.target.tagName !== "A") {
		return;
	}
	const status = ig.getStatus();

	persist.set("status", status);
});
