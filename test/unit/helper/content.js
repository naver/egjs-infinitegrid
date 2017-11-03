import {utils} from "../src/utils.js";

const IMG_LIST = [
	"http://thumb.comic.naver.net/webtoon/25455/thumbnail/title_thumbnail_20100614120245_t125x101.jpg", "http://thumb.comic.naver.net/webtoon/25455/369/inst_thumbnail_20150824151122.jpg", "http://thumb.comic.naver.net/webtoon/25455/368/inst_thumbnail_20150817151137.jpg", "http://thumb.comic.naver.net/webtoon/25455/367/inst_thumbnail_20150810145539.jpg", "http://thumb.comic.naver.net/webtoon/25455/366/inst_thumbnail_20150803143116.jpg", "http://thumb.comic.naver.net/webtoon/25455/365/inst_thumbnail_20150727120816.jpg", "http://thumb.comic.naver.net/webtoon/25455/364/inst_thumbnail_20150720184900.jpg", "http://thumb.comic.naver.net/webtoon/25455/363/inst_thumbnail_20150713114138.jpg", "http://thumb.comic.naver.net/webtoon/25455/362/inst_thumbnail_20150706133629.jpg", "http://thumb.comic.naver.net/webtoon/25455/361/inst_thumbnail_20150624164209.jpg", "http://thumb.comic.naver.net/webtoon/25455/360/inst_thumbnail_20150622152654.jpg", "http://thumb.comic.naver.net/webtoon/25455/359/inst_thumbnail_20150615141213.jpg", "http://thumb.comic.naver.net/webtoon/25455/358/inst_thumbnail_20150608135433.jpg", "http://thumb.comic.naver.net/webtoon/25455/357/inst_thumbnail_20150601135204.jpg", "http://thumb.comic.naver.net/webtoon/25455/356/inst_thumbnail_20150522121047.jpg", "http://thumb.comic.naver.net/webtoon/25455/355/inst_thumbnail_20150518120949.jpg", "http://thumb.comic.naver.net/webtoon/25455/354/inst_thumbnail_20150511150235.jpg", "http://thumb.comic.naver.net/webtoon/25455/353/inst_thumbnail_20150504122037.jpg", "http://thumb.comic.naver.net/webtoon/25455/352/inst_thumbnail_20150106004005.jpg", "http://thumb.comic.naver.net/webtoon/25455/351/inst_thumbnail_20141229145942.jpg", "http://thumb.comic.naver.net/webtoon/25455/350/inst_thumbnail_20141222155245.jpg", "http://thumb.comic.naver.net/webtoon/25455/349/inst_thumbnail_20141212180336.jpg", "http://thumb.comic.naver.net/webtoon/25455/348/inst_thumbnail_20141201141813.jpg", "http://thumb.comic.naver.net/webtoon/25455/347/inst_thumbnail_20141124135647.jpg", "http://thumb.comic.naver.net/webtoon/25455/346/inst_thumbnail_20141117150140.jpg", "http://thumb.comic.naver.net/webtoon/25455/345/inst_thumbnail_20141110153559.jpg", "http://thumb.comic.naver.net/webtoon/25455/344/inst_thumbnail_20141103144248.jpg", "http://thumb.comic.naver.net/webtoon/25455/343/inst_thumbnail_20141027162333.jpg", "http://thumb.comic.naver.net/webtoon/25455/342/inst_thumbnail_20141020122337.jpg", "http://thumb.comic.naver.net/webtoon/25455/341/inst_thumbnail_20141013122602.jpg", "http://thumb.comic.naver.net/webtoon/25455/340/inst_thumbnail_20141006142907.jpg",
];

// create content
function getContent(className, x, hasImage = false) {
	let s = "";
	const num = x || ((parseInt(Math.random() * 100, 10) % 10) + 1);

	for (let i = 0; i < num; i++) {
		s += hasImage ? '<li class="item"><div><img></img></div></li>' : '<li class="item"><div></div></li>';
	}
	const elements = utils.$(s, true);
	let val;
	let r;

	elements.forEach(e => {
		e.className = className;
		if (hasImage) {
			Array.prototype.slice.call(e.querySelectorAll("img"))
				.forEach(v => {
					val = parseInt(Math.random() * 100, 10);
					r = parseInt(Math.random() * 100, 10) % IMG_LIST.length;
					v.setAttribute("src", IMG_LIST[r]);
					v.style.height = val < 40 ? 40 : val;
				});
		} else {
			val = parseInt(Math.random() * 100, 10);
			e.style.height = val < 40 ? 40 : val;
		}
	});
	return elements;
}

const Content = {
    append(num, hasImage = false) {
        return getContent("append", num, hasImage);
    },
    prepend(num, hasImage = false) {
        return getContent("prepnd", num, hasImage);
    }
};

export {Content};
