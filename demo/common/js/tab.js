
var Tab = {};

Tab.tabs = [".tab-home", ".tab-layouts", ".tab-started", ".tab-options"];
Tab.$tabs = $(".tab");
Tab.currentTab = "";
Tab.opens = {};
Tab.closes = {};
Tab.close = function(name) {
	Tab.closes[name] && Tab.closes[name]();
};
Tab.open = function(name) {
	Tab.$tabs.css("display", "none");
	$("." + name).css("display", "block");

	Tab.opens[name] && Tab.opens[name]();
	if (Tab.currentTab) {
		Tab.closeTab(Tab.currentTab);
	}
};

Tab.open("tab-home");

