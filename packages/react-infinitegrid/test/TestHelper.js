export function cleanHTML(html) {
	return html.replace(/(\>)(\<[^\/])/g, "$1\n$2");
}
