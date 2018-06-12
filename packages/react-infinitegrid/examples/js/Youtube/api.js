import fetch from "./mock";

function getItems(items) {
	return items.filter(item => item.id && item.id.videoId).map(item => {
		const {id, snippet} = item;
		const {title, thumbnails, channelTitle, channelId} = snippet;
		const {width, height, url} = thumbnails.medium;
		const link = `https://www.youtube.com/watch?v=${id.videoId}`;
		const channelLink = `https://www.youtube.com/channel/${channelId}`;

		return {
			link,
			width,
			height,
			url,
			title,
			channelLink,
			channelTitle,
		};
	});
}
// https://developers.google.com/youtube/v3/
// This key is only allowed on naver.github.io, 935xz7zy8r.codesandbox.io/
// use mock.js
const key = "";

export default function getNextPage(query, pageToken) {
	const urls = [
		"https://www.googleapis.com/youtube/v3/search?part=snippet",
		`q=${query}`,
		`key=${key}`,
		`maxResults=30`,
	];

	pageToken && urls.push(`pageToken=${pageToken}`);

	return fetch(urls.join("&"))
		.then(e => e.json())
		.then(e => (e.error ? Promise.reject({error: e.error.message}) : e))
		.then(({nextPageToken, items}) => ({
			nextPageToken,
			items: getItems(items),
		}))
		.catch(e => ({error: e.error || "ERR", nextPageToken: -1, items: []}));
}
