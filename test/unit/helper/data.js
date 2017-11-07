export const images = [
	[518, 517],
	[550, 825],
	[640, 640],
	[364, 520],
	[710, 1020],
	[600, 819],
	[486, 729],
	[544, 784],
	[720, 720],
	[381, 555],
	[521, 775],
];
export const VIEWPORT = {
	width: 800,
	height: 600,
};
export const makeItem = i => ({
	size: {
		width: images[i][0],
		height: images[i][1],
	},
	rect: {},
});
export const makeItems = n => {
	const imagesLength = images.length;
	const items = [];

	for (let i = 0; i < n; ++i) {
		items.push(makeItem(i % imagesLength));
	}

	return items;
};

