function getItem(options) {
	var no = options.no || 1;
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
var no = 1;
function getItems(length) {
	var arr = [];
	for (let i = 0; i < length; ++i) {
		arr.push(getItem({ no: i + no, title: "egjs post" }))
	}
	no += length;

	return arr;
}
const container = document.querySelector(".container");
const ig = new eg.InfiniteGrid(container, {
	isOverflowScroll: true,
});
ig.setLayout(eg.InfiniteGrid.GridLayout);

const groups = {};
let groupKey = 1;

ig.on("prepend", e => {
	--groupKey;
	if (!(groupKey in groups)) {
		no += 30;
		groups[groupKey] = getItems(30);
	}
	ig.prepend(groups[groupKey], groupKey);
});
ig.on("append", function (e) {
	++groupKey;
	if (!(groupKey in groups)) {
		groups[groupKey] = getItems(30);
		no += 30;
	}
	ig.append(groups[groupKey], groupKey);
});
var items = getItems(30);
ig.append(items, ++groupKey);

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
const contents = container.querySelector("._eg-infinitegrid-container_");

axes.on({
	"change": ({pos}) => {
		console.log(pos);
		if (!axes.isBounceArea()) {
			return;
		}
		const scroll = pos.scroll;
		const height = Math.abs(scroll);
		if (scroll < 0) {
			// PREPEND
			contents.style.transform = `translateY(${height}px)`;
		} else {
			
			// APPEND
		}
	},
	"release": ({ depaPos }) => {
		console.log(depaPos, axes.isBounceArea());
	}
});

// 3. Initialize inputTypes and connect it
axes.connect(["", "scroll"], new eg.Axes.PanInput(container, {scale:[0, -1]}));


