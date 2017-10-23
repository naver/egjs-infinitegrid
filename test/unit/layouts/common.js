export function checkMargin(margins, callback) {
	margins.forEach(margin => callback(margin));
}
export function checkDirection(callback, callback2 = callback) {
	callback("vertical");
	callback2("horizontal");
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
	const group1 = layout.append(items, [0]);
	const group2 = layout.prepend(items, group1.outlines.end);

	const group3 = layout.prepend(items, [0]);
	const group4 = layout.append(group3.items, group3.outlines.start);

	// Then
	expect(group1.items.map(item => item.rect)).to.deep.equal(group2.items.map(item => item.rect));
	expect(group3.items.map(item => item.rect)).to.deep.equal(group4.items.map(item => item.rect));
	
	
}
export function expectNoOutline(layout, items) {
	// When
	const group1 = layout.append(items);
	const group2 = layout.append(items, []);
	const group3 = layout.append(items, [0]);
	const group4 = layout.prepend(items);
	const group5 = layout.prepend(items, []);
	const group6 = layout.prepend(items, [0]);

	//Then
	expect(group1.outlines.start).to.deep.equal(group3.outlines.start);
	expect(group1.outlines.start).to.deep.equal(group2.outlines.start);

	expect(group4.outlines.end[0]).to.be.equal(0);
	expect(group4.outlines.end).to.deep.equal(group5.outlines.end);
	expect(group6.outlines.end).to.deep.equal(group6.outlines.end);
}
export function expectConnectItems({item1, item2, margin = 0, direction = "vertical"}) {
	if (direction === "vertical") {
		expect(item1.rect.top + (item1.rect.height || item1.size.height) + margin).to.be.equal(item2.rect.top);
	} else {
		expect(item1.rect.left + (item1.rect.width || item1.size.width) + margin).to.be.equal(item2.rect.left);
	}
}
export function expectConnectGroups({group1, items1, group2, items2, margin = 0, isConnect = true, direction = "vertical"}) {
	const end = group1.outlines.end;
	const start = group2.outlines.start;
	const length = end.length;

	expect(end.length).to.be.equal(start.length);

	for (let i = 0; i < length; ++i) {
		const item = items1[i];

		if (direction === "vertical") {
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