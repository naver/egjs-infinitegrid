function getImage({ no }) {
	return `<div class="item">
		<img src="../image/${no % 60 + 1}.jpg">
	</div>`;
}
function getItems(length) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getImage({no: i}));
	}
	return arr;
}

const ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "vertical",
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 30,
	frameFill: false,
	frame: [
		[1, 0, 2, 0, 3, 0, 4],
		[0, 5, 0, 6, 0, 7, 0]
	],
});
const num = 21;
const groups = {};

ig.on({
	"prepend": e => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = (groupKeys[0] || 0) - 1;

		if (!(groupKey in groups)) {
			return;
		}
		ig.prepend(groups[groupKey], groupKey);
	},
	"append": e => {
		const groupKeys = ig.getGroupKeys(true);
		const groupKey = (groupKeys[groupKeys.length - 1] || 0) + 1;

		if (!(groupKey in groups)) {
			// allow append
			groups[groupKey] = getItems(num);
			return;
		}
		ig.append(groups[groupKey], groupKey);
	},
});

groups[0] = getItems(num * 2);

ig.append(groups[0], 0);
