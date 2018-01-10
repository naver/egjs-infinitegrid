import {IS_IE} from "./consts";
import {addEvent, removeEvent, toArray} from "./utils";
import AutoSizer from "./AutoSizer";


export const CHECK_ALL = 1;
export const CHECK_ONLY_ERROR = 2;


const errorImages = [];

function isDataAttribute(target, prefix) {
	return !!target.getAttribute(`${prefix}width`);
}

class ImageLoaded {
	static waitImageLoaded(needCheck, {prefix, length, type, complete, error, end}) {
		let checkCount = 0;
		let endCount = length || needCheck.reduce((sum, element) => sum + element.length, 0);

		if (type !== CHECK_ONLY_ERROR) {
			checkCount = endCount;
		}
		const checkEnd = function() {
			if (--endCount !== 0) {
				return;
			}
			end && end();
		};
		const checkImage = function() {
			checkCount--;
			if (checkCount !== 0) {
				return;
			}
			complete && complete();
		};
		const onError = function(target) {
			error && error({
				target,
				itemIndex: target.__ITEM_INDEX__,
			});
		};
		const onCheck = function(e) {
			const target = e.target || e.srcElement;

			removeEvent(target, "error", onCheck);
			removeEvent(target, "load", onCheck);

			if (type === CHECK_ALL && isDataAttribute(target, prefix)) {
				AutoSizer.remove(target, e.type === "error");
			} else {
				checkImage();
			}
			if (e.type === "error") {
				errorImages.push(target.src);
				onError(target);
			}
			delete target.__ITEM_INDEX__;
			checkEnd();
		};

		needCheck.forEach((images, i) => {
			images.forEach(v => {
				// workaround for IE
				if (v.complete) {
					if (errorImages.indexOf(v.src) !== -1) {
						onError(v);
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
	static checkImageLoaded(el) {
		if (el.tagName === "IMG") {
			return !el.complete ? [el] : [];
		} else {
			return toArray(el.querySelectorAll("img"));
		}
	}
	static check(elements, {prefix, type = CHECK_ALL, complete, error, end}) {
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
			this.waitImageLoaded(images, {prefix, length, type, complete, error, end});
		}
	}
}

export default ImageLoaded;
