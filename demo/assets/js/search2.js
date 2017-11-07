function getItem({ no = 0, title = "egjs post"}) {
	return `<div class="item">
		<img src="../image/${no % 60 + 1}.jpg">
		<div class="info">
			<div class="bg"></div>
			<div class="title">${title + no}</div>
		</div>
	</div>`;
}
function getItems(no, length, isAppend) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem({
			no: i,
			title: `egjs post${no}`,
		}));
	}
	return arr;
}

const REQUEST_CHANGE = 0;
const REQUEST_APPEND = 1;
const REQUEST_PREPEND = 2;
const REQUEST_APPEND_ANIMATE = 3;
const REQUEST_PREPEND_ANIMATE = 4;
const groups = {};
const deltaPull = 10;
const container = document.querySelector(".container");
const contents = document.querySelector(".contents");
const ig = new eg.InfiniteGrid(contents, {
});
let prevScrollPosition = 0;
let pullScrollPosition = 0;
let isRequestPull = REQUEST_PREPEND;
let isLoading = false;

ig.setLayout(eg.InfiniteGrid.JustifiedLayout, {
	minSize: 100,
	maxSize: 300,
	margin: 10,
});


ig.on({
	"change": e => {
		const scrollPosition = e.orgScrollPos;

		prevScrollPosition = scrollPosition;

		if (isLoading || isRequestPull >= REQUEST_APPEND_ANIMATE ||
			(isRequestPull >= REQUEST_APPEND_ANIMATE) ||
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
		if (isRequestPull === REQUEST_APPEND) {
			contents.scrollTop += 20;
			isRequestPull = REQUEST_APPEND_ANIMATE;
		} else if (isRequestPull === REQUEST_PREPEND) {
			contents.scrollTop -= 20;
			isRequestPull = REQUEST_PREPEND_ANIMATE;
		}
	},
});
groups[0] = getItems(0, 60, true);
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



function requestInsert(isAppend) {
	setTimeout(() => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = isAppend ? (groupKeys[groupKeys.length - 1] || 0) + 1 :
			(groupKeys[0] || 0) - 1;

		groups[groupKey] = getItems(groupKey, 30, isAppend);
		ig[isAppend ? "append" : "prepend"](groups[groupKey], groupKey);
		isLoading = false;
		axes.setTo({scroll: 0}, 500);
	}, 1000);
}
axes.on({
	"change": ({pos}) => {
		if (!isRequestPull || isLoading || !axes.isBounceArea()) {
			return;
		}
		const scroll = pos.scroll;
		const height = Math.abs(scroll);
		const isAppend = scroll > 0;


		if (isAppend &&
			(isRequestPull !== REQUEST_APPEND && isRequestPull !== REQUEST_APPEND_ANIMATE)) {
			return;
		}
		if (!isAppend &&
			(isRequestPull !== REQUEST_PREPEND && isRequestPull !== REQUEST_PREPEND_ANIMATE)) {
			return;
		}

		contents.style.transition = "";
		contents.style.transform = `translateY(${-scroll}px)`;

		const element = isAppend ? append : prepend;

		element.style.height = `${height}px`;
		if (height < 80) {
			element.innerHTML = `Pull to ${isAppend ? "append" : "prepend"}`;
		} else {
			element.innerHTML = `Release to ${isAppend ? "append" : "prepend"}`;
		}
	},
	"release": e => {
		const depaPos = e.depaPos;

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
	"animationStart": e => {
		if (isLoading) {
			e.stop();
		}
	},
	"animationEnd": e => {
		if (isRequestPull >= REQUEST_APPEND_ANIMATE) {
			isRequestPull = REQUEST_CHANGE;
		}
	},
});


axes.connect(["", "scroll"], new eg.Axes.PanInput(container, { scale: [0, -1] }));
