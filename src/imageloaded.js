import {IS_IE} from "./consts";
import {utils} from "./utils";

const ImageLoaded = {
	checkImageLoaded(el) {
		return Array.prototype.slice.call(el.querySelectorAll("img"))
			.filter(v => {
				if (v.nodeType && ([1, 9, 11].indexOf(v.nodeType) !== -1)) {
					return !v.complete;
				} else {
					return false;
				}
			});
	},
	waitImageLoaded(needCheck, callback) {
		let checkCount = needCheck.length;
		const onCheck = function(e) {
			checkCount--;
			utils.removeEvent(e.target, "load", onCheck);
			utils.removeEvent(e.target, "error", onCheck);
			checkCount <= 0 && callback && callback();
		};

		needCheck.forEach(v => {
			// workaround for IE
			if (IS_IE) {
				const url = v.getAttribute("src");

				v.setAttribute("src", "");
				v.setAttribute("src", url);
			}
			utils.addEvent(v, "load", onCheck);
			utils.addEvent(v, "error", onCheck);
		});
	},
};

export default ImageLoaded;
