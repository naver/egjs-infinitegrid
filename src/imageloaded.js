import {IS_IE} from "./consts";
import {addEvent, removeEvent} from "./utils";

const ImageLoaded = {
	checkImageLoaded(el) {
		return Array.from(el.querySelectorAll("img"))
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
			removeEvent(e.target, "load", onCheck);
			removeEvent(e.target, "error", onCheck);
			checkCount <= 0 && callback && callback();
		};

		needCheck.forEach(v => {
			// for IE
			if (IS_IE) {
				const url = v.getAttribute("src");

				v.setAttribute("src", "");
				v.setAttribute("src", url);
			}
			addEvent(v, "load", onCheck);
			addEvent(v, "error", onCheck);
		});
	}
};

export default ImageLoaded;
