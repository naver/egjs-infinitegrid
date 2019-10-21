export function camelize(str: string) {
	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
}
