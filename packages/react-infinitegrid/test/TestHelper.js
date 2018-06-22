export function cleanHTML(html) {
	return html.replace(/(\>)(\<[^\/])/g, "$1\n$2");
}
export function wait(time = 100) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
export function itemToArray(item) {
	return [item.size.width, item.size.height, item.rect.left, item.rect.top];
}
export function concatItems(items) {
	return items.reduce((arr, item) => arr.concat(itemToArray(item)), []);
}
