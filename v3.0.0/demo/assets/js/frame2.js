function getImage({no}) {
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
	direction: "horizontal",
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 0,
	frame: [
		[0, 0, 0, 0, 2, 2, 0, 0, 0],
		[0, 1, 1, 1, 2, 2, 0, 0, 0],
		[0, 1, 1, 1, 2, 2, 3, 3, 3],
		[0, 0, 4, 4, 0, 0, 3, 3, 3],
		[5, 5, 4, 4, 0, 0, 8, 8, 0],
		[5, 5, 4, 4, 7, 7, 8, 8, 0],
		[5, 5, 6, 6, 7, 7, 8, 8, 0],
		[0, 0, 6, 6, 7, 7, 0, 0, 0],
	],
});
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
			groups[groupKey] = getItems(24);
			return;
		}
		ig.append(groups[groupKey], groupKey);
	},
});

groups[0] = getItems(24);

ig.append(groups[0], 0);
