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
	static checkImageLoaded(el, widthAttr, heightAttr) {
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
	static check(elements, options) {
		const opt = Object.assign({
			widthAttr: "data-width",
			heightAttr: "data-height",
		}, options);

		const needCheck = elements
			.reduce((acc, v) => acc.concat(this.checkImageLoaded(v, opt.widthAttr, opt.heightAttr)), []);

		if (needCheck.length > 0) {
			ImageLoaded.waitImageLoaded(needCheck, opt.callback);
		} else {
			// convert to async
			setTimeout(() => {
				opt.callback && opt.callback();
			}, 0);
		}
	}
}

export default ImageLoaded;
