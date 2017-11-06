function getItem({no = 0, title = "egjs post", writer = "egjs", date = "10.30 16:28"}) {
	return `<div class="post">
		<span class="opts"></span>
		<span class="no">${no + 1}</span>
		<span class="date">${date}</span>
		<span class="writer">${writer}</span>
		<span class="title">${title + no}</span>
	</div>`;
}
function getItems(no, length) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem({
			no: i + no,
			title: "egjs post",
		}));
	}
	return arr;
}

const REQUEST_CHANGE = 0;
const REQUEST_APPEND = 1;
const REQUEST_PREPEND = 2;
const REQUEST_ANIMATE = 3;
const groups = {};
const deltaPull = 10;
const container = document.querySelector(".container");
const contents = document.querySelector(".contents");
const ig = new eg.InfiniteGrid(contents, {
	isOverflowScroll: true,
});
let prevScrollPosition = 0;
let pullScrollPosition = 0;
let isRequestPull = REQUEST_PREPEND;

ig.setLayout(eg.InfiniteGrid.GridLayout);


ig.on({
	"change": e => {
		const scrollPosition = e.orgScrollPos;

		prevScrollPosition = scrollPosition;

		if ((isRequestPull === REQUEST_ANIMATE) ||
			(isRequestPull > 0 && Math.abs(scrollPosition - pullScrollPosition) < deltaPull)) {
			return;
		}

		isRequestPull = REQUEST_CHANGE;
	},
	"prepend": e => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			isRequestPull = REQUEST_PREPEND;
			pullScrollPosition = prevScrollPosition;
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": e => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		if (!(groupKey in groups)) {
			isRequestPull = REQUEST_APPEND;
			pullScrollPosition = prevScrollPosition;
			return;
		}
		ig.append(groups[groupKey], groupKey);
	},
	"layoutComplete": e => {
		if (ig.getGroupKeys().length === 1) {
			return;
		}
		isRequestPull = REQUEST_ANIMATE;
	},
});
groups[0] = getItems(0, 30);
ig.append(groups[0], 0);

const axes = new eg.Axes({
	scroll: {
		range: [0, 0],
		bounce: 100,
	},
});

container.insertAdjacentHTML("beforeend", `<div id="prepend"></div><div id="append"></div>`);
const prepend = document.getElementById("prepend");
const append = document.getElementById("append");
const innerContents = contents.querySelector("._eg-infinitegrid-container_");

let isLoading = false;

function requestInsert(isAppend) {
	container.classList.add("pull");
	setTimeout(() => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = isAppend ? (groupKeys[groupKeys.length - 1] || 0) + 1 :
			(groupKeys[0] || 0) - 1;

		groups[groupKey] = getItems(groupKey * 30, 30);
		ig[isAppend ? "append" : "prepend"](groups[groupKey], groupKey);
		isLoading = false;
		axes.am.axm._pos.scroll = isAppend ? 100 : -100;
		axes.setTo({scroll: 0}, 500);
		container.classList.remove("pull");
	}, 1000);
}
axes.on({
	"change": ({pos}) => {
		if (!isRequestPull || isLoading || !axes.isBounceArea()) {
			return;
		}
		const scroll = pos.scroll;
		const height = Math.abs(scroll);

		innerContents.style.transition = "";
		innerContents.style.transform = `translateY(${-scroll}px)`;

		const isAppend = scroll > 0;


		if ((isRequestPull === REQUEST_PREPEND && isAppend) ||
			(isRequestPull === REQUEST_APPEND && !isAppend)) {
			return;
		}
		const element = isAppend ? append : prepend;

		element.style.height = `${height}px`;
		if (height < 80) {
			element.innerHTML = `Pull to ${isAppend ? "append" : "prepend"}`;
		} else {
			element.innerHTML = `Release to ${isAppend ? "append" : "prepend"}`;
		}
	},
	"release": ({depaPos}) => {
		if (!isRequestPull || isLoading || !axes.isBounceArea() || !depaPos) {
			return;
		}
		const scroll = depaPos.scroll;
		const height = Math.abs(scroll);
		const isAppend = scroll > 0;

		if ((isRequestPull === REQUEST_PREPEND && isAppend) ||
			(isRequestPull === REQUEST_APPEND && !isAppend)) {
			return;
		}
		if (height < 80) {
			return;
		}
		isLoading = true;
		(isAppend ? append : prepend).innerHTML = "Loading...";
		requestInsert(isAppend);
	},
	"animationEnd": e => {
		if (isRequestPull === REQUEST_ANIMATE) {
			isRequestPull = REQUEST_CHANGE;
		}
	},
});


axes.connect(["", "scroll"], new eg.Axes.PanInput(container, {scale: [0, -1]}));
