/* eslint-disable */
/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "../helper/data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline, expectSameAppendPrepend, expectAppend, expectOutlineIndex, expectConnectGroupsOutline} from "../helper/common";
import Layout from "../../../src/layouts/PackingLayout";
import { getStyleNames } from "../../../src/utils";


describe("PackingLayout Test", function () {
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
			expectAppend(layout, items, [100]);
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
	function chaseItem(items, item, checks, margin) {
		items.forEach((item1, i) => {
			if (checks[i] > 0) {
				return;
			}
			if (item.rect.left + item.rect.width + margin === item1.rect.left) {
				checks[i] = 1;
				chaseItem(items, item1, checks, margin);
			} else if (item.rect.top + item.rect.height + margin === item1.rect.top) {
				checks[i] = 1;
				chaseItem(items, item1, checks, margin);
			} else if (item.rect.left === item1.rect.left + item1.rect.width + margin) {
				checks[i] = 1;
				chaseItem(items, item1, checks, margin);
			} else if (item.rect.top === item1.rect.top + item1.rect.height + margin) {
				checks[i] = 1;
				chaseItem(items, item1, checks, margin);
			}
		});
	} 
	describe("append test", function () {
		checkMargin([0, 10, 20], margin => {
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
			checkDirection(direction => {
				it(`test match items (margin = ${margin}, direction = ${direction})`, function() {
					// Given
					const aspectRatio = 1.4;
					const layout = new Layout({
						margin,
						aspectRatio,
						direction,
					});
					layout.setSize(VIEWPORT.width);
					
					const group = layout.append(items, []);
					const gitems = group.items;
					const checks = new Array(gitems.length).fill(0);
					const results = new Array(gitems.length).fill(1);

					checks[0] = 1;
					chaseItem(gitems, gitems[0], checks, margin);

					expect(checks.every(chk => chk > 0)).to.be.true;
					expect(Math.max(...gitems.map(item => item.rect.left + item.rect.width))).to.be.closeTo(VIEWPORT.width * (direction === "vertical" ? 1 : aspectRatio), 0.000001);
					expect(Math.max(...gitems.map(item => item.rect.top + item.rect.height))).to.be.closeTo(VIEWPORT.width / (direction === "vertical" ? aspectRatio : 1), 0.000001);
				});
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
});
