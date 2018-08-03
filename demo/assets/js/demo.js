var demoIg;

(function () {
	var requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame	||
			function(callback) {
				setTimeout(() => {
					callback();
				}, 100);
			};
	})();
	var template = '<div class="item"><a href="${url}"><span class="thumbnail"><img src="' + window.HOMELINK + 'assets/image/showcase/${target}.png"></span><span class="info">${name}</span></a></div>';
		function getItem(template, options) {
		return template.replace(/\$\{([^\}]*)\}/g, function () {
			var replaceTarget = arguments[1];

			return options[replaceTarget];
		});
	}
	function getItems(items) {
		var arr = [];
		var length = items.length;

		for (var i = 0; i < length; ++i) {
			arr.push(getItem(template, items[i]));
		}
		return arr;
	}
	demoIg = new eg.InfiniteGrid(".demobox", {
		isConstantSize: true,
		transitionDuration: 0.2
	});
	demoIg.setLayout(eg.InfiniteGrid.GridLayout, {
		margin: 20,
		align: "center"
	});
	demoIg.on({
		"layoutComplete": function (e) {
			var targets = e.target;

			for (var i = 0, length = targets.length; i < length; ++i) {
				targets[i].el.setAttribute("class", "item animate");
			}
		},
		"append": function (e) {
			var groupKey = (e.groupKey || 0) + 1;

			if (!groups[groupKey]) {
				return;
			}
			demoIg.append(getItems(groups[groupKey].slice(0, -1)), groupKey);
		},
		"refresh": function (e) {
			demoIg.layout(true);
			if (!demoIg.getItems().length) {
				demoIg.append(getItems(groups[0].slice(0, -1)), 0);
			}
		}
	});

})();