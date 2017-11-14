var template = '<div class="item"><img src="${link}../image/${no}.jpg"><div class="info"><div class="bg"></div><div class="title">${title}</div></div></div>';
var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}
function getItems(no, length) {
	var arr = [];
	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, { no: Math.abs(i + no) % 60 + 1, title: "egjs post" + (i + no), link: link }));
	}
	return arr;
}

var REQUEST_CHANGE = 0;
var REQUEST_APPEND = 1;
var REQUEST_PREPEND = 2;
var REQUEST_APPEND_ANIMATE = 3;
var REQUEST_PREPEND_ANIMATE = 4;
var groups = {};
var deltaPull = 10;
var container = document.querySelector(".container");
var contents = document.querySelector(".contents");
var ig = new eg.InfiniteGrid(contents);
var prevScrollPosition = 0;
var pullScrollPosition = 0;
var isRequestPull = REQUEST_PREPEND;
var isLoading = false;

ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	minSize: 100,
	maxSize: 300,
	margin: 10,
});
ig.on({
	"change": function (e) {
		var scrollPosition = e.orgScrollPos;

		prevScrollPosition = scrollPosition;

		if (isLoading || isRequestPull >= REQUEST_APPEND_ANIMATE ||
			(isRequestPull >= REQUEST_APPEND_ANIMATE) ||
			(isRequestPull > 0 && Math.abs(scrollPosition - pullScrollPosition) < deltaPull)) {
			return;
		}
		isRequestPull = REQUEST_CHANGE;
	},
	"prepend": function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			isRequestPull = REQUEST_PREPEND;
			pullScrollPosition = prevScrollPosition;
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": function(e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			isRequestPull = REQUEST_APPEND;
			pullScrollPosition = prevScrollPosition;
			return;
		}
		ig.append(groups[groupKey], groupKey);
	},
	"layoutComplete": function (e) {
		if (ig.getGroupKeys().length === 1) {
			return;
		}
		if (isRequestPull === REQUEST_APPEND) {
			contents.scrollTop += 20;
			isRequestPull = REQUEST_APPEND_ANIMATE;
		} else if (isRequestPull === REQUEST_PREPEND) {
			contents.scrollTop -= 20;
			isRequestPull = REQUEST_PREPEND_ANIMATE;
		}
	}
});
groups[0] = getItems(0, 60, true);
ig.append(groups[0], 0);


var axes = new eg.Axes({
	scroll: {
		range: [0, 0],
		bounce: 100
	}
});

container.insertAdjacentHTML("beforeend", `<div id="prepend"></div><div id="append"></div>`);
var prepend = document.getElementById("prepend");
var append = document.getElementById("append");
var isLoading = false;

function requestInsert(isAppend) {
	container.classList.add("pull");
	setTimeout(function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = isAppend ? (groupKeys[groupKeys.length - 1] || 0) + 1 :
			(groupKeys[0] || 0) - 1;

		groups[groupKey] = getItems(groupKey, 30, isAppend);
		ig[isAppend ? "append" : "prepend"](groups[groupKey], groupKey);
		isLoading = false;
		axes.setTo({ scroll: 0 }, 500);
		container.classList.remove("pull");
	}, 1000);
}
axes.on({
	"change": function (e) {
		var pos = e.pos;
		if (!isRequestPull || isLoading || !axes.isBounceArea()) {
			return;
		}
		var scroll = pos.scroll;
		var height = Math.abs(scroll);
		var isAppend = scroll > 0;


		if (isAppend &&
			(isRequestPull !== REQUEST_APPEND && isRequestPull !== REQUEST_APPEND_ANIMATE)) {
			return;
		}
		if (!isAppend &&
			(isRequestPull !== REQUEST_PREPEND && isRequestPull !== REQUEST_PREPEND_ANIMATE)) {
			return;
		}

		contents.style.transition = "";
		contents.style.transform = "translateY(" + (-scroll) + "px)";

		var element = isAppend ? append : prepend;

		element.style.height = `${height}px`;
		if (height < 80) {
			element.innerHTML = "Pull to " + (isAppend ? "append" : "prepend");
		} else {
			element.innerHTML = "Release to " + (isAppend ? "append" : "prepend");
		}
	},
	"release": function (e) {
		var depaPos = e.depaPos;

		if (!isRequestPull || isLoading || !axes.isBounceArea() || !depaPos) {
			return;
		}
		var scroll = depaPos.scroll;
		var height = Math.abs(scroll);
		var isAppend = scroll > 0;

		if ((isRequestPull === REQUEST_PREPEND && isAppend) ||
			(isRequestPull === REQUEST_APPEND && !isAppend)) {
			return;
		}
		if (height < 80) {
			return;
		}
		isLoading = true;
		(isAppend ? append : prepend).innerHTML = "Loading...";
		requestInsert(isAppend);
	},
	"animationStart": function (e) {
		if (isLoading) {
			e.stop();
		}
	},
	"animationEnd": function (e) {
		if (isRequestPull >= REQUEST_APPEND_ANIMATE) {
			isRequestPull = REQUEST_CHANGE;
		}
	},
});


axes.connect(["", "scroll"], new eg.Axes.PanInput(container, { scale: [0, -1] }));
