function getItem(options) {
	var no = (options.no || 0) + 1;
	var title = options.title || "egjs post";
	var writer = options.writer || "egjs";
	var date = options.date || "10.30 16:28";

	var item = `<div class="post">
			<span class="opts"></span>
			<span class="no">${no}</span>
			<span class="date">${date}</span>
			<span class="writer">${writer}</span>
			<span class="title">${title + no}</span>
		</div>`;
	return item;
}
function getItems(no, length) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getItem({ no: i + no, title: "egjs post" }))
	}
	return arr;
}

const container = document.querySelector(".container");
const contents = document.querySelector(".contents");
const ig = new eg.InfiniteGrid(contents, {
	isOverflowScroll: true,
});
ig.setLayout(eg.InfiniteGrid.GridLayout);

const groups = {};

ig.on("prepend", e => {
	const groupKeys = ig.getGroupKeys(true);
	const groupKey = (groupKeys[0] || 0) - 1;

	if (!(groupKey in groups)) {
		return;
	}
	ig.prepend(groups[groupKey], groupKey);
});
ig.on("append", e => {
	const groupKeys = ig.getGroupKeys(true);
	const groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

	if (!(groupKey in groups)) {
		return;
	}
	ig.append(groups[groupKey], groupKey);
});
var items = getItems(0, 30);
ig.append(items, 1);

ig.on("change", function (e) {
	console.log(e);
});

const axes = new eg.Axes({
	scroll: {
		range: [0, 0],
		bounce: 100
	}
});
container.insertAdjacentHTML("beforeend", `<div id="prepend"></div><div id="append"></div>`);

const prepend = document.getElementById("prepend");
const append = document.getElementById("append");
const innerContents = contents.querySelector("._eg-infinitegrid-container_");

let isLoading = false;

function requestAppend() {
	setTimeout(() => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		ig.append(getItems((groupKey - 1) * 30, 30), groupKey);
		isLoading = false;
		innerContents.style.transition = "all ease 0.5s";
		innerContents.style.transform = `translateY(0px)`;
		append.style.transition = "all ease 0.5s";
		append.style.height = "0px";
	}, 2000);
}
axes.on({
	"change": ({pos}) => {
		console.log(pos);
		if (!axes.isBounceArea()) {
			return;
		}
		if (isLoading) {
			return;
		}
		const scroll = pos.scroll;
		const height = Math.abs(scroll);

		innerContents.style.transition = "";
		innerContents.style.transform = `translateY(${-scroll}px)`;
		if (scroll < 0) {
			// PREPEND
			prepend.style.transition = "";
			prepend.style.height = `${height}px`;
			if (height < 80) {
				prepend.innerHTML = "Pull to prepend";
			} else {
				prepend.innerHTML = "Release to prepend";
			}
		} else {
			// APPEND
			append.style.transition = "";
			append.style.height = `${height}px`;
			if (height < 80) {
				append.innerHTML = "Pull to append";
			} else {
				append.innerHTML = "Release to append";
			}
		}
	},
	"release": ({depaPos}) => {
		if (isLoading) {
			return;
		}
		if (!axes.isBounceArea()) {
			return;
		}
		if (!depaPos) {
			return;
		}
		const scroll = depaPos.scroll;
		const height = Math.abs(scroll);

		if (height < 80) {
			return;
		}
		isLoading = true;
		const isAppend = scroll > 0;

		if (isAppend) {
			requestAppend();
		}
	},
});

// 3. Initialize inputTypes and connect it
axes.connect(["", "scroll"], new eg.Axes.PanInput(container, {scale:[0, -1]}));