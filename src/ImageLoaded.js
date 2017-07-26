import {IS_IE} from "./consts";
import {utils} from "./utils";

const ImageLoaded = {
	checkImageLoaded(el) {
		return utils.toArray(el.querySelectorAll("img")).filter(v => {
			if (v.nodeType && ([1, 9, 11].indexOf(v.nodeType) !== -1)) {
				return !v.complete;
			} else {
				return false;
			}
		});
	},
	waitImageLoaded(needCheck, callback) {
		let checkCount = needCheck.length;
		const checkImage = function() {
			checkCount--;
			checkCount <= 0 && callback && callback();
		};
		const onCheck = function(e) {
			utils.removeEvent(e.target || e.srcElement, "load", onCheck);
			utils.removeEvent(e.target || e.srcElement, "error", onCheck);
			checkImage();
		};

		// workaround for IE
		IS_IE && needCheck.forEach(v => v.setAttribute("src", v.getAttribute("src")));
		needCheck.forEach(v => {
			if (v.complete) {
				checkImage();
			} else {
				utils.addEvent(v, "load", onCheck);
				utils.addEvent(v, "error", onCheck);
			}
		});
	},
};

export default ImageLoaded;
