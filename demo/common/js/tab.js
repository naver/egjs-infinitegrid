/* eslint-disable */
var Watcher = eg.InfiniteGrid.Watcher;
var items = [];
var innerHeight = window.innerHeight;
var onScroll = function(e) {
	var scrollPos = e.scrollPos;
	if (scrollPos === null) {
		return;
	}
	var endScrollPos = scrollPos + innerHeight;
	var visibleItems = items.filter(function (item) {
		return item.start <= endScrollPos && scrollPos <= item.end;
	}).map(function (item) {
		return item.el;
	});

	$(visibleItems).addClass("appear");
};
var watcher = new Watcher(window, {
	container: document.querySelector(".contents"),
	check: onScroll,
	resize: function(e) {
		innerHeight = window.innerHeight;
		openTab(Tab.currentTab);
	}
});
function openTab(tab) {
	var scrollView = $(".tab-" + tab + ".scroll-view, .tab-" + tab + " .scroll-view");
	var scrollPos = watcher.getOrgScrollPos();
	var offset = watcher.getContainerOffset();

	items = scrollView.map(function (index, el) {
		var rect = el.getBoundingClientRect();
		var start = rect.top + scrollPos - offset;
		var end = start + rect.height;

		return {
			el: el,
			start: start,
			end: end,
		};
	}).toArray();

	onScroll({scrollPos: watcher.getScrollPos()});
}
function closeTab(tab) {
	var scrollView = $(".tab-" + tab + ".scroll-view, .tab-" + tab + " .scroll-view");

	scrollView.removeClass("appear");
}

var Tab = {};

Tab.$tabs = $(".tab");
Tab.currentTab = "";
Tab.opens = {
	"home": function () {
		demoIg.trigger("refresh");
	}	
};
Tab.closes = {};
Tab.close = function(name) {
	if (!name) {
		return;
	}
	closeTab(name);
	Tab.closes[name] && Tab.closes[name]();
};
Tab.items = [];
Tab.open = function(name) {
	if (Tab.currentTab === name) {
		return;
	}
	Tab.$tabs.css("display", "none");
	var target = $(".tab-" + name);

	target.css("display", "block");

	var currentTab = Tab.currentTab;
	Tab.currentTab = name;
	
	Tab.opens[name] && Tab.opens[name]();
	openTab(name);
	if (currentTab) {
		Tab.close(currentTab);
	}
	
};