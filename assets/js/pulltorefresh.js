
var template = '<div class="post"><span class="opts"></span><span class="type">${type}</span><span class="date">${date}</span><span class="writer">${writer}</span><span class="title">${title}</span></div>';
var link = window.HOMELINK;
function getItem(template, options) {
	return template.replace(/\$\{([^\}]*)\}/g, function () {
		var replaceTarget = arguments[1];

		return options[replaceTarget];
	});
}

function getItems(no, length, isAppend) {
	var arr = [];

	for (var i = 0; i < length; ++i) {
		arr.push(getItem(template, {
			type: isAppend ? "append" : "prepend",
			title: "egjs post" + (no + i + 1),
			date: "10.30 16:28",
			writer: "egjs"
		}));
	}
	return arr;
}
var container = document.querySelector(".container");
var contents = document.querySelector(".contents");
var ig = new eg.InfiniteGrid(contents, {
	isOverflowScroll: true
});
ig.setLayout(eg.InfiniteGrid.GridLayout);
container.insertAdjacentHTML("beforeend", '<div id="prepend"></div><div id="append"></div>');
var prepend = document.getElementById("prepend");
var append = document.getElementById("append");
var axes = new eg.Axes({
	scroll: {
		range: [0, 0],
		bounce: 100
	}
});
var isTouch = false;

ig.on({
	"change": function (e) {
		if (isLoading) {
			return;
		}
		if (!isTouch) {
			axes.setTo({scroll: e.scrollPos}, 0);
		}
	},
	"layoutComplete": function (e) {
		axes.axis.scroll.range[1] = contents.scrollHeight - contents.clientHeight;
		axes.setTo({ scroll: e.scrollPos }, 0);
		if (isLoading) {
			isLoading = false;
			container.className = container.className.replace(/pull/g, "");
		}
	},
});

ig.append(getItems(0, 30, true), 0);

var isLoading = true;

function requestInsert(isAppend) {
	container.className = container.className + " pull";
	setTimeout(function (e) {
		var groupKeys = ig.getGroupKeys(true);
		var groupKey = isAppend ? (groupKeys[groupKeys.length - 1] || 0) + 1 :
			(groupKeys[0] || 0) - 1;

		ig[isAppend ? "append" : "prepend"](getItems(groupKey, 30, isAppend), groupKey);
	}, 1000);
}

var startBouncing = false;

axes.on({
	"change": function (e) {
		if (e.holding && isLoading) {
			return;
		}
		var pos = e.pos;
		var scroll = pos.scroll;
		var maxRange = axes.axis.scroll.range[1];
		
		isTouch = !!e.inputEvent;

		if (!axes.isBounceArea()) {
			append.style.height = "0px";
			prepend.style.height = "0px";
			contents.style.transform = "";
			if (isTouch) {
				contents.scrollTop = scroll;
			}
			return;
		}
		var bounce = (scroll < 0 ? scroll : scroll - maxRange);
		var weight = Math.abs(bounce);
		var isAppend = scroll > 0;
		var element = isAppend ? append : prepend;

		contents.style.transform = "translateY(" + (-bounce) + "px)";
		element.style.height = weight + "px";
		element.innerHTML = (weight > 80 ? "Release to " : "Pull to ") + (isAppend ? "append" : "prepend");
	},
	"release": function(e) {
		if (isLoading || !axes.isBounceArea()) {
			return;
		}
		var scroll = e.depaPos.scroll;
		var maxRange = axes.axis.scroll.range[1];
		var isAppend = scroll > 0;
		var weight = Math.abs(scroll < 0 ? scroll : maxRange - scroll);

		if (weight > 80) {
			isLoading = true;
			(isAppend ? append : prepend).innerHTML = "Loading...";
			requestInsert(isAppend);
		}
	},
	"animationStart": function (e) {
		if (isLoading) {
			e.stop();
			return;
		}
		isTouch = true;

		if (!axes.isBounceArea()) {
			var maxRange = axes.axis.scroll.range[1];

			if (e.destPos.scroll < 0) {
				e.setTo({scroll: 0}, e.duration);
			} else if (e.destPos.scroll > maxRange) {
				e.setTo({scroll: maxRange}, e.duration);
			}
		}
	},
	"animationEnd": function (e) {
		isTouch = false;
	}
});

axes.connect(["", "scroll"], new eg.Axes.PanInput(container, {scale: [0, -1]}));