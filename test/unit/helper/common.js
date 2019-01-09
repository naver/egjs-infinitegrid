import {getStyleNames} from "../../../src/utils";

/* global expect */
function approximate(obj) {
	const o = {};

	for (const name in obj) {
		o[name] = parseInt(obj[name] * 10000, 10);
	}
	return 0;
}
export function checkMargin(margins, callback) {
	margins.forEach(margin => callback(margin));
}
export function checkDirection(callback, callback2 = callback) {
	callback(false);
	callback2(true);
}
export function expectOutlineIndex(layout, group) {
	const {start, end} = group.outlines;
	const {margin, direction} = layout.options;
	const {startPos1, size1} = getStyleNames(direction);
	const minPos = Math.min(...group.items.map(item => item.rect[startPos1]));
	const maxPos = Math.min(...group.items.map(item => (item.rect[size1] || item.size[size1]) + item.rect[startPos1]));

	expect(approximate(minPos)).to.be.equal(approximate(Math.min(...start)));
	expect(approximate(maxPos + margin)).to.be.equal(approximate((Math.max(...end))));
}
export function expectAppend(layout, items, outline) {
	// When
	const group1 = layout.append(items, outline);
	const group2 = layout.append(items, [outline[0]]);

	// Then
	expect(group1.outlines.start).to.deep.equal(outline);
	expect(group2.outlines.start[0]).to.deep.equal(outline[0]);
}
export function expectSameAppendPrepend(layout, items) {
	// When
	const group1 = layout.prepend(items, [0]);
	const group2 = layout.append(group1.items, group1.outlines.start);

	// Then
	const rect1 = group1.items.map(item => approximate(item.rect));
	const rect2 = group2.items.map(item => approximate(item.rect));

	expect(rect1).to.deep.equal(rect2);
}
export function expectNoOutline(layout, items) {
	// When
	const group1 = layout.append(items);
	const group2 = layout.append(items, []);
	const group3 = layout.append(items, [0]);
	const group4 = layout.prepend(items);
	const group5 = layout.prepend(items, []);
	const group6 = layout.prepend(items, [0]);

	// Then
	expect(group1.outlines.start).to.deep.equal(group3.outlines.start);
	expect(group1.outlines.start).to.deep.equal(group2.outlines.start);

	expect(group4.outlines.end[0]).to.be.equal(0);
	expect(group4.outlines.end).to.deep.equal(group5.outlines.end);
	expect(group6.outlines.end).to.deep.equal(group6.outlines.end);
}
export function expectConnectItems({item1, item2, margin = 0, horizontal = false}) {
	if (horizontal === false) {
		expect(item1.rect.top + (item1.rect.height || item1.size.height) + margin).to.be.equal(item2.rect.top);
	} else {
		expect(item1.rect.left + (item1.rect.width || item1.size.width) + margin).to.be.equal(item2.rect.left);
	}
}
export function expectConnectGroupsOutline(group1, group2) {
	expect(group1.outlines.end.length).to.be.equal(group2.outlines.start.length);
	expect(group1.outlines.end).to.deep.equal(group2.outlines.start);
}
export function expectConnectGroups({group1, items1, group2, items2, margin = 0, isConnect = true, horizontal = false}) {
	const end = group1.outlines.end;
	const start = group2.outlines.start;
	const length = end.length;

	expect(end.length).to.be.equal(start.length);

	for (let i = 0; i < length; ++i) {
		const item = items1[i];

		if (!horizontal) {
			expect(item.rect.top + (item.rect.height || item.size.height) + margin).to.be.equal(end[i]);
			expect(start[i]).to.be.equal(items2[i].rect.top);
		} else {
			expect(item.rect.left + (item.rect.width || item.size.width) + margin).to.be.equal(end[i]);
			expect(start[i]).to.be.equal(items2[i].rect.left);
		}
		if (isConnect) {
			expect(end[i]).to.be.equal(start[i]);
		} else {
			expect(start[i]).to.be.at.least(end[i]);
		}		
	}
}