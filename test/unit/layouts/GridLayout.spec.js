/* global describe, beforeEach, afterEach, it, expect */
import { makeItems, VIEWPORT } from "./data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline, expectSameAppendPrepend, expectAppend } from "./common";
import Layout from "../../../src/layouts/GridLayout";


describe("GirdLayout Test", function () {
	describe("layout common test", function () {
		it("no outline test", () => {
			const items = makeItems(20);
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
			const items = makeItems(24);

			layout.setSize(VIEWPORT.width);
			// Then
			expectAppend(layout, items, [100, 100, 100, 100]);
		});
		it("test prepend from end outline and append from start outline are the same", function () {
			// Given
			const layout = new Layout({

			});
			const items = makeItems(24);

			layout.setSize(VIEWPORT.width);

			// Then
			expectSameAppendPrepend(layout, items);
		});
	});
	describe("append test", function () {
		checkMargin([0, 10, 20], margin => {
			it(`append items (margin = ${margin})`, () => {
				// Given
				const items = makeItems(20);
				
				items.forEach(item => {
					const ratio = item.size.height / item.size.width;
					item.size.width = items[0].size.width;
					item.size.height = item.size.widht * ratio;
				});

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
			});
		});
	});
	describe("compare group1 and group2", function () {
		const frame = [
			["A", "A", "E", "D"],
			["A", "A", "B", "C"],
		];
		const items1 = makeItems(25);
		const items2 = makeItems(15);

		checkDirection(direction => {
			it(`compare group1 and group2 (direction = ${direction})`, () => {
				// Given
				const layout = new Layout({
					frame,
					direction,
				});

				layout.setSize(direction === "vertical" ? VIEWPORT.width : VIEWPORT.height);
				// When
				const group1 = layout.append(items1, [100]);
				const group2 = layout.append(items2, group1.outlines.end);
				const gitems1 = group1.items;
				const gitems2 = group2.items;

				let bottom;
				let top;

				if (direction === "vertical") {
					bottom = [gitems1[20], gitems1[20], gitems1[21], gitems1[22]];
					top = [gitems2[0], gitems2[0], gitems2[4], gitems2[3]];
				} else {
					bottom = [gitems1[23], gitems1[22]];
					top = [gitems2[0], gitems2[0]];
				}
				// Then
				// bottom is outline.end, top is outline.start
				// outline.end === outline.start
				expectConnectGroups({
					group1,
					items1: bottom,
					group2,
					items2: top,
					direction,
				});
			});
		});
	});
	describe("tooth frame test", function () {
		const frame = [
			["A", "", "B", "", "C"],
			["", "D", "", "E", ""],
		];
		const items1 = makeItems(15);
		const items2 = makeItems(15);

		beforeEach(() => {
			this.layout = new Layout({
				frame,
				margin: 30,
			});
			this.layout.setSize(VIEWPORT.width);
		});
		afterEach(() => {
			this.layout = null;
		})
		it("append test", () => {
			// Given
			const layout = this.layout;
			// When
			const group1 = layout.append(items1, [300]);
			const group2 = layout.append(items2, group1.outlines.end);

			const gitems1 = group1.items;
			const gitems2 = group2.items;

			const bottom = [gitems1[10], gitems1[13], gitems1[11], gitems1[14], gitems1[12]]
			const top = [gitems2[0], gitems2[3], gitems2[1], gitems2[4], gitems2[2]];

			// Then
			expectConnectGroups({
				group1: group1,
				items1: bottom,
				group2: group2,
				items2: top,
				margin: 30,
			});
		});
		it("prepend test", () => {
			// Given
			const layout = this.layout;

			// When
			const group2 = layout.append(items1, [300]);
			const group1 = layout.prepend(items2, group2.outlines.start);

			const gitems1 = group1.items;
			const gitems2 = group2.items;

			const bottom = [gitems1[10], gitems1[13], gitems1[11], gitems1[14], gitems1[12]]
			const top = [gitems2[0], gitems2[3], gitems2[1], gitems2[4], gitems2[2]];

			// Then
			expectConnectGroups({
				group1: group1,
				items1: bottom,
				group2: group2,
				items2: top,
				margin: 30,
			});
		});
	});
});
