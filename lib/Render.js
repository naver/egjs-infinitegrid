function render(items) {
	items.forEach(item => {
		const css = [];
		if ("_width" in item.size) {
			css.push(`width:${item.size._width}px;`);
		}
		if ("_height" in item.size) {
			css.push(`height:${item.size._height}px;`);
		}
		if ("_top" in item.position) {
			css.push(`top:${item.position._top}px;`);
		}
		if ("_left" in item.position) {
			css.push(`left:${item.position._left}px;`);
		}
		item.el.style.cssText += css.join("");
	});
}
