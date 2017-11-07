function getImage({ no, text }) {
	return `<div class="item">
		<div class="thumbnail">
			<img src="../image/${no % 60 + 1}.jpg">
		</div>
		<div class="info">
			${text}
		</div>
	</div>`;
}
function getItems(length) {
	const arr = [];

	for (let i = 0; i < length; ++i) {
		arr.push(getImage({ no: i , text: `egjs post ${i}`}));
	}
	return arr;
}

const ig = new eg.InfiniteGrid(document.querySelector(".container"), {
	direction: "vertical",
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 30,
	align: "center",
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
	"layoutComplete": e => {
		e.target.forEach(item => {
			if (!item.el) {
				return;
			}
			item.el.classList.add("animate");
		})
	},
});

groups[0] = getItems(num * 2);

ig.append(groups[0], 0);
