declare class ImageLoaded {
	static waitImageLoaded(needCheck: Element[], options: {
		prefix?: string,
		type: number,
		length: number,
		complete?: () => {},
		error?: (params?: {target?: Element, itemIndex?:number}) => {},
		end?: () => {},
	}): void;
	static checkImageLoaded(el: Element): void;
	static check(elements: Element[], options: {
		prefix?: string,
		type: number,
		complete?: () => {},
		error?: (params?: {target?: Element, itemIndex?:number}) => {},
		end?: () => {}
	}): void;
}

export default ImageLoaded;