(function() {
	function receive(options) {
		var no = options.no || 1;
		var title = options.title || "egjs post";
		var time = options.time || "10:00 AM";

		var item = `<div class="item receive">
		<div class="profile" data-name="egjs">
			<img src="../image/1.jpg" />
		</div>
		<div class="speech" data-time="${time}">
			<p>
				${title}
			</p>
		</div>
		</div>`;
			
		return item;
	}
	function send(options) {
		var title = options.title || "egjs post";
		var time = options.time || "10:00 AM";
	
		var item = `<div class="item send">
		<div class="speech" data-time="${time}">
			<p>
				${title}
			</p>
		</div>
		</div>`;

		return item;
	}
	var no = 1;
	function getItems(length) {
		var arr = [];
		for (let i = 0; i < length; ++i) {
			arr.push(receive({ no: i + no, title: "egjs post" + i}));
		}
		no += length;

		return arr;
	}
	var ig = new eg.InfiniteGrid(document.querySelector(".container"), {
		direction: "vertical",
		isOverflowScroll: true,	
	});
	ig.setLayout(eg.InfiniteGrid.GridLayout, {
		margin: 20,
	});
	ig.on("layoutComplete", function(e) {
		var isAppend = e.isAppend;
		var view = ig._infinite._renderer.view;
		var pos = ig._infinite._watcher._prevPos;
		if (isAppend) {
			view.scrollTop = pos + 200;
		}
	});
	var groupKey = 1;
	ig.on("prepend", function (e) {
		var items = getItems(20);
		ig.prepend(items, ++groupKey);
		no += 20;
	});
	
	var input = document.querySelector("input");
	function sendMessage(text) {
		if (!text) {
			return;
		}
		ig.append([send({ title: text }), receive({ title: text })], ++groupKey);
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
	ig.prepend(items, ++groupKey);
	setTimeout(function() {
		ig.append(sendMessage("hi egjs!!!"), ++groupKey);
	}, 100);
})();