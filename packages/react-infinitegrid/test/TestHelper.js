export function cleanHTML(html) {
	return html.replace(/(\>)(\<[^\/])/g, "$1\n$2");
}
export function awaitTimer(callback, delay = 100) {
	return arg => new Promise(resolve => {
		setTimeout(() => {
			const rv = callback(arg);

			resolve(rv);
		}, delay);
	});
}