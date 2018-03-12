function loadGUI(text) {
	window.onload = function() {
		var gui = new dat.GUI();
		gui.width = 140;

		var change = function() {
			text.change(text);
		}
		for (var name in text) {
			if (typeof text[name] === "function") {
				continue;
			} else if (typeof text[name] === "object") {
				var apply = [text, name].concat(text[name].slice(1));

				text[name] = text[name][0];
				gui.add.apply(gui, apply).onFinishChange(change);
			} else {
				gui.add(text, name).onFinishChange(change);
			}
		}
	};
}