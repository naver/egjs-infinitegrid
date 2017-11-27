/* eslint-disable */
/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "../helper/data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline, expectSameAppendPrepend, expectAppend, expectOutlineIndex, expectConnectGroupsOutline} from "../helper/common";
import Layout from "../../../src/layouts/JustifiedLayout";
import { getStyleNames } from "../../../src/utils";


describe("JustifiedLayout Test", function () {
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
			});
			it(`test items' size (margin = ${margin})`, () => {
				// Given
				const layout = new Layout({
					margin,
				});
				layout.setSize(VIEWPORT.width);
				const group = layout.append(items, [1]);


				const lines = [];
				let top = 0;
				group.items.forEach(item => {
					if (item.rect.top !== top) {
						lines.push([]);
					}
					lines[lines.length - 1].push(item);
					top = item.rect.top;
				});
				
				lines.forEach(line => {
					expect(line.every(item => item.rect.top === line[0].rect.top)).to.be.true;
					expect(line[0].rect.left).to.be.equal(0);
					expect(line[line.length - 1].rect.left + line[line.length - 1].rect.width).to.be.closeTo(VIEWPORT.width, 0.000000000001);
					for (let i = 1; i < line.length; ++i) {
						expect(line[i].rect.left).to.be.equal(line[i - 1].rect.left + line[i - 1].rect.width + margin);
					}
				});
				for (let j = 1; j < lines.length; ++j) {
					expect(lines[j][0].rect.top).to.be.equal(lines[j - 1][0].rect.top + lines[j - 1][0].rect.height + margin);
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
			it(`test min size (margin = ${margin})`, function() {
				// Given
				const layout = new Layout({
					margin,
					minSize: 200,
				});
				layout.setSize(VIEWPORT.width);

				// When
				const group = layout.append(items, []);
				
				// Then
				group.items.forEach(item => {
					expect(item.rect.height).to.at.least(200);
				});
			});
			it (`test max size (margin = ${margin})`, function () {
				// Given
				const layout = new Layout({
					margin,
					maxSize: 300,
				});
				layout.setSize(VIEWPORT.width);

				// When
				const group = layout.append(items, []);

				// Then
				group.items.forEach(item => {
					expect(item.rect.height).to.be.below(300);
				});
			});
			it (`test min & max size (margin = ${margin})`, function () {
				// Given
				const layout = new Layout({
					margin,
					minSize: 200,
					maxSize: 300,
				});
				layout.setSize(VIEWPORT.width);

				// When
				const group = layout.append(items, []);

				// Then
				group.items.forEach(item => {
					expect(item.rect.height).to.at.least(200);
					expect(item.rect.height).to.below(300);
				});
			});
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
					});
					layout.setSize(!horizontal ? VIEWPORT.width : VIEWPORT.height);
					// When
					const group = layout.prepend(items, []);
					const group2 = layout.prepend(items, group.outlines.start);

					// Then
					const gitems = group.items;
					const pos = !horizontal ? "top" : "left";
					for (let i = 1; i < gitems.length; ++i) {
						expect(gitems[i].rect[pos]).to.be.at.least(gitems[i - 1].rect[pos]);
					}
					expectConnectGroupsOutline(group2, group);
				});
			});
		});
	});
});
