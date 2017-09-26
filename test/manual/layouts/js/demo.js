function imgSrc(v) {
	return "../../../demo/assets/image/" + (((v + 1) % 60) + 1) + ".jpg";
}
<<<<<<< HEAD
function getWidth() {
	return  parseInt(Math.random() * 200 + 300, 10);
}
function getHeight() {
	return  parseInt(Math.random() * 200 + 300, 10);
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
			width: getWidth(),
			height: getHeight()
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
		items.push(getItem(i));
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
=======
function getItems(groupNo) {
groupNo *= 30;
var items = [];

for (var i = 0; i < 30; i++) {
  items.push('<div class="item"><div class="thumbnail"><img src="' + imgSrc(groupNo + i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>');
}
return items;
}

var timer;
var grid = document.getElementById("grid");
var ig = new eg.InfiniteGrid("#grid", {
		count: 4000,
  defaultGroupKey: 0
	});


ig.once("layoutComplete", function (e) {
	grid.style.opacity = 1;
});
ig.append(getItems(0), 0);
>>>>>>> c26076b... test(Layout): test GoogleLayout  - remove Item
