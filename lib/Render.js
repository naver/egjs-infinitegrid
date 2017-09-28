function render(items) {
	items.forEach(item => {
		const css = [];
		for(const name in item.rect) {
			css.push(`${name}:${item.rect[name]}px;`);
		}
		item.el.style.cssText += css.join("");
	});
}
