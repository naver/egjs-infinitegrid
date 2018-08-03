(function() {
	var hash = (location.hash || "#home").replace("#", "");
	var tab = $('.tab[id="' + hash + '"], .tab [id="' + hash + '"]');


	console.log(tab, tab.hasClass("tab"));
	if (!tab.hasClass("tab")) {
		tab = tab.parent(".tab");
	}

	console.log(tab);
	var tabName = tab.attr("data-tab") || "home";


	document.querySelector(".tabs li[data-tab='" + tabName +"']").setAttribute("class", "checked");
	Tab.open(tabName);
})();