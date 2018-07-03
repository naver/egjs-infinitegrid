
$("#controller").click(function(e) {
	var target = e.target;
	var tag = target.tagName;

	if (tag !== "BUTTON") {
		return;
	}
	var className = $(target).attr("class");

	window[className](target);

});

