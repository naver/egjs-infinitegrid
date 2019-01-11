import { IS_IE } from "./consts";
import { addEvent, removeEvent, toArray } from "./utils";
import AutoSizer from "./AutoSizer";

export const CHECK_ALL: 1 = 1;
export const CHECK_ONLY_ERROR: 2 = 2;

interface IImageLoadedOptions {
	prefix?: string;
	length?: number;
	type?: 1 | 2;
	complete?: () => void;
	end?: () => void;
	error?: (e: { target: LoadingImageElement, itemIndex: number }) => void;
}
interface LoadingImageElement extends HTMLImageElement {
	__ITEM_INDEX__?: number;
}

function isDataAttribute(target: HTMLElement, prefix: string) {
	return !!target.getAttribute(`${prefix}width`);
}

class ImageLoaded {
	public static CHECK_ALL = 1;
	public static CHECK_ONLY_ERROR = 2;
	public static waitImageLoaded(
		checklist: LoadingImageElement[][],
		{ prefix = "", length, type, complete, error, end }: IImageLoadedOptions,
	) {
		let checkCount = 0;
		let endCount = length;

		if (type !== CHECK_ONLY_ERROR) {
			checkCount = endCount;
		}
		const checkEnd = () => {
			if (--endCount !== 0) {
				return;
			}
			end && end();
		};
		const checkImage = () => {
			checkCount--;
			if (checkCount !== 0) {
				return;
			}
			complete && complete();
		};
		const onError = (target: LoadingImageElement, itemIndex = target.__ITEM_INDEX__) => {
			error && error({
				target,
				itemIndex,
			});
		};
		const onCheck = (e: Event) => {
			const target = (e.target || e.srcElement) as LoadingImageElement;

			removeEvent(target, "error", onCheck);
			removeEvent(target, "load", onCheck);

			if (type === CHECK_ALL && isDataAttribute(target, prefix)) {
				AutoSizer.remove(target, e.type === "error");
			} else {
				checkImage();
			}
			if (e.type === "error") {
				onError(target);
			}
			delete target.__ITEM_INDEX__;
			checkEnd();
		};

		checklist.forEach((images, i) => {
			images.forEach(v => {
				// workaround for IE
				if (v.complete && (!IS_IE || (IS_IE && v.naturalWidth))) {
					if (!v.naturalWidth) {
						onError(v, i);
					}
					checkImage();
					checkEnd();
					return;
				}
				v.__ITEM_INDEX__ = i;
				if (type === CHECK_ALL && isDataAttribute(v, prefix)) {
					AutoSizer.add(v, prefix);
					checkImage();
				}
				addEvent(v, "load", onCheck);
				addEvent(v, "error", onCheck);

				IS_IE && v.setAttribute("src", v.getAttribute("src"));
			});
		});
	}
	public static checkImageLoaded(el: HTMLElement) {
		if (el.tagName === "IMG") {
			return (el as HTMLImageElement).complete ? [] : [(el as HTMLImageElement)];
		} else {
			return toArray(el.querySelectorAll("img"));
		}
	}
	public static check(
		elements: HTMLElement[],
		{ prefix, type = CHECK_ALL, complete, error, end }: IImageLoadedOptions,
	) {
		const images = elements.map(element => this.checkImageLoaded(element));
		const length = images.reduce((sum, element) => sum + element.length, 0);

		if (type === CHECK_ONLY_ERROR || length === 0) {
			// convert to async
			setTimeout(() => {
				complete && complete();
				if (length === 0) {
					end && end();
				}
			}, 0);
		}
		if (length > 0) {
			setTimeout(() => {
				this.waitImageLoaded(images, { prefix, length, type, complete, error, end });
			}, 0);
		}
	}
}

export default ImageLoaded;
