/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "../helper/data";
import { checkMargin, checkDirection, expectConnectItems, expectOutlineIndex, expectNoOutline, expectSameAppendPrepend, expectAppend} from "../helper/common";
import Layout from "../../../src/layouts/GridLayout";
import {ALIGN} from "../../../src/consts";
import {getStyleNames} from "../../../src/utils";

// ALIGN
const {START, CENTER, END, JUSTIFY} = ALIGN;

describe("GridLayout Test", function () {
	const items = makeItems(20);
	const width = 100;

	items.forEach(item => {
		const ratio = item.size.height / item.size.width;
		item.size.width = width;
		item.size.height = width * ratio;
	});
	const items2 = makeItems(20);
	items2.forEach(item => {
		const ratio = item.size.height / item.size.width;
		item.size.width = width / ratio;
		item.size.height = width
	});
	describe("layout common test", function () {
		it("no outline test", () => {
			// When
			const layout = new Layout({
				itemSize: 200,
				margin: 10,
			});

			layout.setSize(VIEWPORT.width);

			// Then
			expectNoOutline(layout, items);

		});
		it("test append", function () {
			// Given
			const layout = new Layout({
				itemSize: 200,
			});

			layout.setSize(VIEWPORT.width);
			// Then
			expectAppend(layout, items, [100, 100, 100, 100]);
			
		});
		it("test outline indicies", function () {
			// Given
			const layout = new Layout({
				itemSize: 200,
			});
			layout.setSize(VIEWPORT.width);
			const group = layout.append(items, []);
			const group2 = layout.append(items, [-1, 1, 2, -2]);
			// Then
			expectOutlineIndex(layout, group);
			expectOutlineIndex(layout, group2);
		});
		it("test prepend from end outline and append from start outline are the same", function () {
			// Given
			const layout = new Layout({

			});
			layout.setSize(VIEWPORT.width);

			// Then
			expectSameAppendPrepend(layout, items);
		});
	});
	describe("append test", function () {
		checkMargin([0, 10, 20], margin => {
			it(`append items (margin = ${margin})`, () => {
				// Given
				const layout = new Layout({
					margin,
				});
				layout.setSize(VIEWPORT.width);
				// When
				const group = layout.append(items, []);

				// Then
				const itemSize = (VIEWPORT.width + margin) / 4 - margin;
				const gitems = group.items;

				expectConnectItems({
					item1: gitems[0],
					item2: gitems[1],
					margin,
					horizontal: true,
				});
				expectConnectItems({
					item1: gitems[1],
					item2: gitems[2],
					margin,
					horizontal: true,
				});
				for (let i = 1; i < gitems.length; ++i) {
					expect(gitems[i].rect.top).to.be.at.least(gitems[i - 1].rect.top);
				}
			});
		});
	});
	describe("prepend test", function () {
		checkMargin([0, 10, 20], margin => {
			checkDirection(horizontal => {
				it(`prepend items (margin = ${margin}, horizontal = ${horizontal})`, () => {
					// Given
					const layout = new Layout({
						margin,
						horizontal,
					});
					layout.setSize(horizontal ? VIEWPORT.height : VIEWPORT.width);
					// When
					const group = layout.prepend(items, []);

					// Then

					const gitems = group.items;
					const pos = horizontal ? "left" : "top";
					for (let i = 1; i < gitems.length; ++i) {
						expect(gitems[i].rect[pos]).to.be.at.least(gitems[i - 1].rect[pos]);
					}
				});
			});
		});
	});
	describe("align test", function () {
		checkMargin([0, 10, 20], margin => {
			[CENTER, END, JUSTIFY].forEach(align => {
				checkDirection(horizontal => {
					it(`test align (margin = ${margin}, horizontal = ${horizontal}, align=${align})`, () => {
						// Given
						const layout = new Layout({
							margin,
							horizontal,
							align,
						});
						layout.setSize(!horizontal ? VIEWPORT.width : VIEWPORT.height);
						// When
						const group = layout.append(!horizontal ? items : items2, []);

						// Then

						let gitems = group.items;
						const pos = !horizontal ? "top" : "left";
						for (let i = 1; i < gitems.length; ++i) {
							expect(gitems[i].rect[pos]).to.be.at.least(gitems[i - 1].rect[pos]);
						}
						const itemLength = parseInt((layout._size + margin) / (100 + margin), 10);
						const style = getStyleNames(horizontal);
						const {size1, size2, pos1, pos2} = style;
						if (align === CENTER) {
							expectConnectItems({
								item1: gitems[0],
								item2: gitems[1],
								margin,
								horizontal: !horizontal
							});
							
							expect(gitems[0].rect[pos2]).to.be.equal(layout._size - (gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2]));
						} else if (align === END) {
							expect((gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2])).to.be.equal(layout._size);
						} else if (align === JUSTIFY) {
							expect(gitems[0].rect[pos2]).to.be.equal(0);
							expect(gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2]).to.be.equal(layout._size);


							layout.setSize(50);
							layout.layout([group]);
							gitems.forEach((item, i) => {
								if (i === 0) {
									return;
								}
								expect(item.rect[pos1]).to.be.closeTo(gitems[i - 1].rect[pos1] + gitems[i - 1].size[size1] + margin, 1);
							});
							
						}
					});
				});
			});
		});
	});
});
