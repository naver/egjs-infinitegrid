import {IS_IE} from "./consts";
import {addEvent, removeEvent, toArray} from "./utils";

class ImageLoaded {
	static waitImageLoaded(needCheck, callback) {
		let checkCount = needCheck.length;
		const checkImage = function() {
			checkCount--;
			checkCount <= 0 && callback && callback();
		};
		const onCheck = function(e) {
			removeEvent(e.target || e.srcElement, "load", onCheck);
			removeEvent(e.target || e.srcElement, "error", onCheck);
			checkImage();
		};

		// workaround for IE
		IS_IE && needCheck.forEach(v => v.setAttribute("src", v.getAttribute("src")));
		needCheck.forEach(v => {
			if (v.complete) {
				checkImage();
			} else {
				addEvent(v, "load", onCheck);
				addEvent(v, "error", onCheck);
			}
		});
	}
	constructor(options) {
		Object.assign(this.options = {
			widthAttr: "data-width",
			heightAttr: "data-height",
		}, options);
	}
	checkImageLoaded(el) {
		const widthAttr = this.options.widthAttr;
		const heightAttr = this.options.heightAttr;
		let width;
		let height;

		return toArray(el.querySelectorAll("img")).filter(v => {
			if (v.nodeType && ([1, 9, 11].indexOf(v.nodeType) !== -1)) {
				width = v.getAttribute(widthAttr) || 0;
				height = v.getAttribute(heightAttr) || 0;

				if (width && height) {
					return false;
				} else {
					return !v.complete;
				}
			} else {
				return false;
			}
		});
	}
	check(elements, callback) {
		const needCheck = elements
			.reduce((acc, v) => acc.concat(this.checkImageLoaded(v)), []);

		if (needCheck.length > 0) {
			ImageLoaded.waitImageLoaded(needCheck, callback);
		} else {
			// convert to async
			setTimeout(() => {
				callback && callback();
			}, 0);
		}
	}
}

export default ImageLoaded;
