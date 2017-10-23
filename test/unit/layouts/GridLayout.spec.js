/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "./data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline, expectSameAppendPrepend, expectAppend } from "./common";
import Layout from "../../../src/layouts/GridLayout";
import {ALIGN} from "../../../src/layouts/Constants";
import {getStyleNames} from "../../../src/layouts/utils";

// ALIGN
const {START, CENTER, END, JUSTIFY} = ALIGN;

describe("GirdLayout Test", function () {
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
					direction: "horizontal",
				});
				expectConnectItems({
					item1: gitems[1],
					item2: gitems[2],
					margin,
					direction: "horizontal",
				});
				for (let i = 1; i < gitems.length; ++i) {
					expect(gitems[i].rect.top).to.be.at.least(gitems[i - 1].rect.top);
				}
			});
		});
	});
	describe("prepend test", function () {
		checkMargin([0, 10, 20], margin => {
			checkDirection(direction => {
				it(`prepend items (margin = ${margin}, direction = ${direction})`, () => {
					// Given
					const layout = new Layout({
						margin,
						direction,
					});
					layout.setSize(direction === "vertical" ?VIEWPORT.width : VIEWPORT.height);
					// When
					const group = layout.prepend(items, []);

					// Then

					const gitems = group.items;
					const pos = direction === "vertical" ? "top" : "left";
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
				checkDirection(direction => {
					it(`test align (margin = ${margin}, direction = ${direction}, align=${align})`, () => {
						// Given
						const layout = new Layout({
							margin,
							direction,
							align,
						});
						layout.setSize(direction === "vertical" ? VIEWPORT.width : VIEWPORT.height);
						// When
						const group = layout.append(direction === "vertical" ? items : items2, []);

						// Then

						const gitems = group.items;
						const pos = direction === "vertical" ? "top" : "left";
						for (let i = 1; i < gitems.length; ++i) {
							expect(gitems[i].rect[pos]).to.be.at.least(gitems[i - 1].rect[pos]);
						}
						const itemLength = parseInt((layout._size + margin) / (100 + margin), 10);
						const style = getStyleNames(direction);
						const {size2, pos2} = style;
						if (align === CENTER) {
							expectConnectItems({
								item1: gitems[0],
								item2: gitems[1],
								margin,
								direction: direction === "vertical" ? "horizontal" : "vertical",
							});
							
							expect(gitems[0].rect[pos2]).to.be.equal(layout._size - (gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2]));
						} else if (align === END) {
							expect((gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2])).to.be.equal(layout._size);
						} else if (align === JUSTIFY) {
							expect(gitems[0].rect[pos2]).to.be.equal(0);
							expect(gitems[itemLength - 1].rect[pos2] + gitems[itemLength - 1].size[size2]).to.be.equal(layout._size);
						}
					});
				});
			});
		});
	});
});
