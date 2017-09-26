function render(items) {
	items.forEach(item => {
		const css = [];
<<<<<<< HEAD

		for (const name in item.rect) {
			css.push(`${name}:${item.rect[name]}px;`);
=======
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
>>>>>>> 4decb9a... chore(Layout): move Render file to lib
		}
		item.el.style.cssText += css.join("");
	});
}
