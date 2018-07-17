declare class ImageLoaded {
	static waitImageLoaded(needCheck: Element[], options: {
		prefix?: string,
		type: number,
		length: number,
		complete?: () => {},
		error?: (params?: {target?: Element, itemIndex?:number}) => {},
		end?: () => {},
	});
	static checkImageLoaded(el: Element);
	static check(elements: Element[], options: {
		prefix?: string,
		type: number,
		complete?: () => {},
		error?: (params?: {target?: Element, itemIndex?:number}) => {},
		end?: () => {}
	});
}

export default ImageLoaded;