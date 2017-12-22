import {IS_IE} from "./consts";
import {addEvent, removeEvent, toArray} from "./utils";
import AutoSizer from "./AutoSizer";

class ImageLoaded {
	static waitImageLoaded(needCheck, prefix, complete, error) {
		let checkCount = needCheck.length;
		const checkImage = function() {
			checkCount--;
			if (checkCount > 0) {
				return;
			}
			complete && complete();
		};
		const onCheck = function(e) {
			if (e.type === "error") {
				error && error(e);
			}
			const target = e.target || e.srcElement;

			removeEvent(target, "load", onCheck);
			removeEvent(target, "error", onCheck);
			if (target.getAttribute(`${prefix}width`)) {
				AutoSizer.remove(target);
			} else {
				checkImage();
			}
		};

		// workaround for IE
		IS_IE && needCheck.forEach(v => v.setAttribute("src", v.getAttribute("src")));
		needCheck.forEach(v => {
			if (v.complete) {
				checkImage();
			} else {
				if (v.getAttribute(`${prefix}width`)) {
					AutoSizer.add(v, prefix);
					checkImage();
				}
				addEvent(v, "load", onCheck);
				addEvent(v, "error", onCheck);
			}
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
	static check(elements, prefix, complete, error) {
		const needCheck = elements
			.reduce((acc, v) => acc.concat(this.checkImageLoaded(v)), []);

		if (needCheck.length > 0) {
			ImageLoaded.waitImageLoaded(needCheck, prefix, complete, error);
		} else {
			// convert to async
			setTimeout(() => {
				complete && complete();
			}, 0);
		}
	}
}

export default ImageLoaded;
