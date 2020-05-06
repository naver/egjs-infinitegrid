/* eslint-disable */
/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "../helper/data";
import { checkMargin, checkDirection, expectConnectItems, expectNoOutline, expectSameAppendPrepend, expectAppend, expectOutlineIndex, expectConnectGroupsOutline } from "../helper/common";
import Layout from "../../../src/layouts/SquareLayout";

function getMockItems(column) {
	return [
		{
			size: { width: 100, height: 100 },
			el: {
				getAttribute: () => column,
			},
		},
		{
			size: { width: 100, height: 100 },
			el: {
				getAttribute: () => 1,
			},
		},
	];
}

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
	describe("check itemSize in SquareLayout", function () {
		[
			{
				column: 1,
				dataColumn: 1,
				expectSize1: 800,
				expectSize2: 800,
			},
			{
				column: 1,
				dataColumn: 2,
				expectSize1: 800,
				expectSize2: 800,
			},
			{
				column: 2,
				dataColumn: 1,
				// (800 - 5) / 2
				expectSize1: 397.5,
				expectSize2: 397.5,
			},
			{
				column: 2,
				dataColumn: 2,
				expectSize1: 800,
				expectSize2: 397.5,
			},
		].forEach(({ column, dataColumn, expectSize1, expectSize2 }) => {
			it(`test itemSize when column is ${column} and data-column is ${dataColumn}`, function () {
				// Given
				// VIEWPORT.width = 800
				const layout = new Layout({
					column: column,
					margin: 5,
				}).setSize(VIEWPORT.width);

				// When
				const { items } = layout.append(getMockItems(dataColumn), []);

				// Then
				expect(items[0].rect.width).to.be.equals(expectSize1);
				expect(items[1].rect.width).to.be.equals(expectSize2);
			});
		});
		[
			{
				// column 7
				itemSize: 100,
				dataColumn: 1,
				expectSize1: 100,
				expectSize2: 100,
			},
			{
				// column 3
				itemSize: 200,
				dataColumn: 2,
				expectSize1: 405,
				expectSize2: 200,
			},
			{
				// column 3
				itemSize: 200,
				dataColumn: 1,
				expectSize1: 200,
				expectSize2: 200,
			},
			{
				// column 7
				itemSize: 100,
				dataColumn: 2,
				expectSize1: 205,
				expectSize2: 100,
			},
		].forEach(({ itemSize, dataColumn, expectSize1, expectSize2 }) => {
			it(`test itemSize when itemSize is ${itemSize} and data-column is ${dataColumn}`, function () {
				// Given
				// VIEWPORT.width = 800
				const layout = new Layout({
					itemSize,
					margin: 5,
				}).setSize(VIEWPORT.width);

				// When
				const { items } = layout.append(getMockItems(dataColumn), []);

				// Then
				expect(items[0].rect.width).to.be.equals(expectSize1);
				expect(items[1].rect.width).to.be.equals(expectSize2);
			});
		});
		[
			{
				// column 7
				dataColumn: 1,
				expectSize1: 110,
				expectSize2: 110,
			},
			{
				// column 3
				dataColumn: 2,
				expectSize1: (800 + 5) / 3 * 2 - 5,
				expectSize2: (800 + 5) / 3 - 5,
			},
		].forEach(({ itemSize, dataColumn, expectSize1, expectSize2 }) => {
			it(`test itemSize when only data-column is ${dataColumn}`, function () {
				// Given
				// VIEWPORT.width = 800
				const layout = new Layout({
					itemSize,
					margin: 5,
				}).setSize(VIEWPORT.width);

				// When
				const { items } = layout.append(getMockItems(dataColumn), []);

				// Then
				expect(items[0].rect.width).to.be.equals(expectSize1);
				expect(items[1].rect.width).to.be.equals(expectSize2);
			});
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
			it(`The outline is arranged by finding the next block. (margin = ${margin})`, function () {
				// Given
				const layout = new Layout({
					margin,
					column: 6, // 800 / 6 = 1.33333
				});
				layout.setSize(VIEWPORT.width);

				// When
				// 0 1 2 3 4 (X)
				const group1 = layout.append(items.slice(0, 5), []);

				// 0 1 2 3 4 (5)
				// 6 7 8 9 X  X
				const group2 = layout.append(items.slice(5, 10), group1.outlines.end);

				// Then
				expect(group2.items[0].rect.left).to.be.not.equal(0);
			});
			it
		});
	});
	describe("compare group1 and group2", function () {
		const items1 = makeItems(25);
		const items2 = makeItems(15);

		checkDirection(horizontal => {
			it(`compare group1 and group2 (horizontal = ${horizontal})`, () => {
				// Given
				const layout = new Layout({
					horizontal,
				});

				layout.setSize(!horizontal ? VIEWPORT.width : VIEWPORT.height);
				// When
				const group1 = layout.append(items1, [100]);
				const group2 = layout.append(items2, group1.outlines.end);

				expectConnectGroupsOutline(group1, group2);
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
						itemSize: 100,
					});
					layout.setSize(!horizontal ? VIEWPORT.width : VIEWPORT.height);

					// When
					const group = layout.prepend(items, []);

					// Then
					const gitems = group.items;
					const pos = !horizontal ? "top" : "left";
					for (let i = 1; i < gitems.length; ++i) {
						expect(gitems[i].rect[pos]).to.be.at.least(gitems[i - 1].rect[pos]);
					}
				});
			});
		});
	});
});
