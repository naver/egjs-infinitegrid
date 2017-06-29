(function () {
	var template = Handlebars.compile(
		'{{~#each items~}}<div class="item"><div class="thumbnail"><img class="img-rounded" src="{{imgSrc}}" /><div class="caption"><p><a href="{{href}}">{{desc}}</a></p></div></div></div>{{~/each~}}'
	);
	var data = {
		getItems: function (groupNo) {
			groupNo *= 30;
			var items = [];
			for (var i = 0; i < 30; i++) {
				items.push(groupNo + i);
			}
			items = items.map(function (v) {
				return {
					offset: v,
					imgSrc: "assets/image/" + (((v + 1) % 60) + 1) + ".jpg",
					href: "http://www.google.com/",
					desc: "Cras justo odio bla bla bla bla bla bla bla bla"
				};
			});
			return {
				items: items
			};
		}
	};

	var grid = document.getElementById("grid");
	var ig = new eg.InfiniteGrid("#grid", {
			count: 100,
			defaultGroupKey: 0
		})
		.on({
			"append": function (e) {
				var gk = this.getGroupKeys();
				var lastGk = gk[gk.length - 1];
				lastGk++;
				ig.append(template(data.getItems(lastGk)), lastGk);
			},
			"prepend": function (e) {
				var firstGk = this.getGroupKeys()[0];
				firstGk--;
				if (firstGk >= 0) {
					ig.prepend(template(data.getItems(firstGk)), firstGk);
				}
			},
			"layoutComplete": function (e) {
				grid.style.opacity = 1;
			}
		});
	ig.append(template(data.getItems(0)), 0);
})();
