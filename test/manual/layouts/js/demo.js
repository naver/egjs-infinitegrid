const images = {
	1: [518, 517],
	2: [550, 825],
	3: [640, 640],
	4: [364, 520],
	5: [710, 1020],
	6: [600, 819],
	7: [486, 729],
	8: [544, 784],
	9: [720, 720],
	10: [381, 555],
	11: [521, 775],
}

function imgSrc(n) {
	return "../../../demo/assets/image/" + n + ".jpg";
}
function getWidth(n) {
	return images[n][0];
}
function getHeight(n) {
	return images[n][1];
}
function makeElement(item) {
	const dummy = document.createElement("div");

	dummy.innerHTML = item.html;
	item.el = dummy.children[0];
	item.el.style.width = item.size.width + "px";
	item.el.style.height = item.size.height + "px";
	document.querySelector("#grid").appendChild(item.el);
}
function getItem(i) {
	const item = {
		html: '<div class="item" data-item='+i+'><div class="thumbnail"><img src="' + imgSrc(i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>',
		size: {
			width: getWidth(i),
			height: getHeight(i),
		},
		rect: {

		}
	};
	makeElement(item);

	return item;
}
function getItems(num) {
	const items = [];
	for (i = 0; i < num; ++i) {
		items.push(getItem(i % 11 + 1));
	}
	return items;
}

function getTopline(defaultOutline = [0]) {
	if (!_items.length) {
		return defaultOutline;
	}
	return _items[0].outlines.start;
}
function getBottomline(defaultOutline = [0]) {
	if (!_items.length) {
		return defaultOutline;
	}
	return _items[_items.length - 1].outlines.end;
}

let _items = [];
let _group = 0;
function append(line, num = 22) {
	const group = ++_group;
	const items = getItems(num);
	const result = a.append(items, getBottomline(line));


	result.items.forEach((item, i) => {
		item.el = items[i].el;
		item.groupKey = group;
		item.el.dataset.group = group;
	});
	result.groupKey = result.items[0].groupKey;
	_items.push(result);
	render(result.items);
}
function prepend(line, num = 22) {
	const group = ++_group;
	const items = getItems(num);
	const result = a.prepend(items, getTopline(line));
	result.items.forEach((item, i) => {
		item.el = items[i].el;
		item.groupKey = group;
		item.el.dataset.group = group;
	});
	result.groupKey = result.items[0].groupKey;
	_items.splice(0, 0, result);
	render(result.items);
}
function _remove(index) {
	const removed = _items[0].items.splice(index, 1);
	removed[0].el.remove();
}
function remove(index) {
	console.log(_items);
	_remove(index);
	a.layout(_items, getTopline());
	_items.forEach(group => {
		render(group.items);
	})
}

function layout() {
	a.layout(_items, [400]);
	_items.forEach(group => {
		render(group.items);
	})

}
