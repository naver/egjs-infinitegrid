import {IS_IE} from "./consts";
import {addEvent, removeEvent, toArray} from "./utils";
import AutoSizer from "./AutoSizer";


export const CHECK_ALL = 1;
export const CHECK_ONLY_ERROR = 2;


function isDataAttribute(target, prefix) {
	return !!target.getAttribute(`${prefix}width`);
}

class ImageLoaded {
	static waitImageLoaded(needCheck, {prefix, length, type, complete, error}) {
		let checkCount = 0;

		if (type !== CHECK_ONLY_ERROR) {
			checkCount = length || needCheck.reduce((sum, element) => sum + element.length, 0);
		}
		const checkImage = function() {
			checkCount--;
			if (checkCount !== 0) {
				return;
			}
			complete && complete();
		};
		const onCheck = function(e) {
			if (e.type === "error") {
				error && error(e);
			}
			const target = e.target || e.srcElement;

			delete target.__ITEM_INDEX__;
			removeEvent(target, "error", onCheck);
			removeEvent(target, "load", onCheck);

			if (type === CHECK_ALL && isDataAttribute(target, prefix)) {
				AutoSizer.remove(target);
			} else {
				checkImage();
			}
		};

		// workaround for IE
		IS_IE && needCheck.forEach(v => v.setAttribute("src", v.getAttribute("src")));
		needCheck.forEach((images, i) => {
			images.forEach(v => {
				if (v.complete) {
					checkImage();
					return;
				}
				v.__ITEM_INDEX__ = i;
				if (type === CHECK_ALL && isDataAttribute(v, prefix)) {
					AutoSizer.add(v, prefix);
					checkImage();
				}
				addEvent(v, "load", onCheck);
				addEvent(v, "error", onCheck);
			});
		});
	}
	static checkImageLoaded(el) {
		if (el.tagName === "IMG") {
			return !el.complete ? [el] : [];
		} else {
			return toArray(el.querySelectorAll("img")).filter(v => {
				if (v.nodeType && ([1, 9, 11].indexOf(v.nodeType) !== -1)) {
					return !v.complete;
				} else {
					return false;
				}
			});
		}
	}
	static check(elements, {prefix, type = CHECK_ALL, complete, error}) {
		const images = elements.map(element => this.checkImageLoaded(element));
		const length = images.reduce((sum, element) => sum + element.length, 0);

		if (type === CHECK_ONLY_ERROR || length === 0) {
			// convert to async
			setTimeout(() => {
				complete && complete();
			}, 0);
		}
		if (length > 0) {
			this.waitImageLoaded(images, {prefix, length, type, complete, error});
		}
	}
}

export default ImageLoaded;
