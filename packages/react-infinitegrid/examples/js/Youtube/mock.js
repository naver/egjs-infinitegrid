function item(i) {
	return {
		id: {
			videoId: "ZAkWbrHdjtg",
		},
		snippet: {
			title: `mock ${i}`,
			channelTitle: `Naver`,
			channelId: `UCjyYouHWnID_L4QaQ6U4voQ`,
			thumbnails: {medium: {width: 320, height: 200, url: "./thumb.png"}},
		},
	};
}
function json() {
	return Promise.resolve({
		nextPageToken: 1,
		items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => item(i)),
	});
}

export default function fetch(url) {
	return Promise.resolve({json});
}
