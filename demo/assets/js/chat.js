(function() {
	var link = window.HOMELINK;
	var receiveTemplate = '<div class="item receive">' +
	'<div class="profile" data-name="egjs">' +
		'<img src="${link}../image/1.jpg" data-width="100" data-height="100"/>' +
	'</div>' +
	'<div class="speech" data-time="10:00">' +
		'<p>${title}</p>' +
	'</div>' +
	'</div>';
	var sendTemplate = '<div class="item send">' +
	'<div class="speech" data-time="10:00">' +
		'<p>${title}</p>' + 
	'</div>' +
	'</div>';

	function getItem(template, options) {
		return template.replace(/\$\{([^\}]*)\}/g, function () {
			var replaceTarget = arguments[1];
	
			return options[replaceTarget];
		});
	}
	function getItems(length) {
		var arr = [];

		for (let i = 0; i < length; ++i) {
			arr.push(getItem(receiveTemplate, {title: "egjs post" + i, link: link}));
		}
		return arr;
	}
	var view = document.querySelector(".container");
	var ig = new eg.InfiniteGrid(view, {
		direction: "vertical",
		isOverflowScroll: true,	
	});
	ig.setLayout(eg.InfiniteGrid.GridLayout, {
		margin: 20,
	});
	ig.on("layoutComplete", function(e) {
		var isAppend = e.isAppend;
		var scrollPos = e.scrollPos;
		
		if (isAppend) {
			view.scrollTop = scrollPos + 200;
		}
	});
	ig.on("prepend", function (e) {
		var items = getItems(20);
		ig.prepend(items);
	});
	
	var input = document.querySelector("input");
	function sendMessage(text) {
		if (!text) {
			return;
		}
		ig.append([getItem(sendTemplate, { title: text }), getItem(receiveTemplate, { title: text, link: link })]);
	};
	input.addEventListener("keyup", function(e) {
		if (e.keyCode !== 13) {
			return;
		}
		sendMessage(input.value);
		input.value = "";
	});
	document.querySelector("button").addEventListener("click", function(e) {
		sendMessage(input.value);

		input.focus();
		input.value = "";
	});
	var items = getItems(30);

	ig.prepend(items);
	setTimeout(function() {
		ig.append(sendMessage("hi egjs!!!"));
	}, 150);
})();