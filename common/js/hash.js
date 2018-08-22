(function() {
	var headers = $("h1[id], h2[id], h3[id]");
	
	headers.html(function (index, html) {
		return "<a href=\"#" + headers.eq(index).attr("id") + "\">" + html + "</a>";
	});
	var hash = (location.hash || "#home").replace("#", "");
	var tab = $('.tab[id="' + hash + '"], .tab [id="' + hash + '"]');


	if (!tab.hasClass("tab")) {
		tab = tab.parents(".tab");
	}

	var tabName = tab.attr("data-tab") || "home";

	document.querySelector(".tabs li[data-tab='" + tabName +"']").setAttribute("class", "checked");
	Tab.open(tabName);



})();