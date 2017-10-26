/* eslint-disable */
/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "./data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline, expectSameAppendPrepend, expectAppend, expectOutlineIndex, expectConnectGroupsOutline} from "./common";
import Layout from "../../../src/layouts/SquareLayout";
import { getStyleNames } from "../../../src/layouts/utils";


describe("SquareLayout Test", function () {
	const items = makeItems(20);
	const width = 100;

	items[0].column = 2;
	items[2].column = 2;
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
			// Then
			const length = parseInt(VIEWPORT.width / 200);
			expectAppend(layout, items, new Array(length).fill(100));
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
					itemSize: 100,
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
			it(`test outline indicies (margin = ${margin})`, function () {
				// Given
				const layout = new Layout({
					margin,
				});
				layout.setSize(VIEWPORT.width);
				const group = layout.append(items, []);
				const group2 = layout.append(items, [100]);

				// Then
				expectOutlineIndex(layout, group);
				expectOutlineIndex(layout, group2);
			});
		});
	});
	describe("compare group1 and group2", function () {
		const items1 = makeItems(25);
		const items2 = makeItems(15);

		checkDirection(direction => {
			it(`compare group1 and group2 (direction = ${direction})`, () => {
				// Given
				const layout = new Layout({
					direction,
				});

				layout.setSize(direction === "vertical" ? VIEWPORT.width : VIEWPORT.height);
				// When
				const group1 = layout.append(items1, [100]);
				const group2 = layout.append(items2, group1.outlines.end);

				expectConnectGroupsOutline(group1, group2);
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
						itemSize: 100,
					});
					layout.setSize(direction === "vertical" ? VIEWPORT.width : VIEWPORT.height);

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
});
