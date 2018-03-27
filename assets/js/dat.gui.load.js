function loadGUI(text) {
	window.onload = function() {
		var gui = new dat.GUI();
		gui.width = 180;

		var change = function() {
			text.change(text);
		}
		for (var name in text) {

			var item;
			if (typeof text[name] === "function") {
				continue;
			} else if (typeof text[name] === "object") {
				var contents = text[name];
				text[name] = contents[0];
				if (typeof contents[1] === "object") {
					item = gui.add(text, name, contents[1]);
				} else {
					item = gui.add(text, name, contents[1], contents[2], contents[3] || 1);
				}
			} else {
				item = gui.add(text, name);
			}
			item.onFinishChange(change);
		}
	};
}