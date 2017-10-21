/* global describe, beforeEach, afterEach, it, expect */
import {makeItems, VIEWPORT} from "./data";
import { checkMargin, checkDirection, expectConnectItems, expectConnectGroups, expectNoOutline} from "./common";
import Layout from "../../../src/layouts/FrameLayout";


describe("FrameLayout Test", function () {
	describe("frame's shapes test", function () {
		beforeEach(() => {
			this.inst = null;
			this.groups = [];
		});
		afterEach(() => {
		});
		it("sholud check frame's shapes", () => {
			// Given
			const frame = [
				["A", "A", "B", "C", "D"],
				["A", "A", "E", "F", "G"],
				["H", "I", "J", "K", "L"],
			];

			// When
			const layout = new Layout({
				frame,
			});

			// Then
			expect(layout._shapes.width).to.be.equal(5);
			expect(layout._shapes.height).to.be.equal(3);
			layout._shapes.shapes.should.have.lengthOf(12);
		});
	});
	describe("no outline test", function () {
		it("no outline test", () => {
			// Given
			const frame = [
				["A", "A", "B", "C", "D"],
				["A", "A", "E", "F", "G"],
				["H", "I", "J", "K", "L"],
			];
			const items = makeItems(20);
			// When
			const layout = new Layout({
				frame,
			});

			layout.setViewport(VIEWPORT.width, VIEWPORT.height);

			
			// Then
			expectNoOutline(layout, items);
			
		});
	});
	describe("append test", function() {
		const frame = [
			["A", "A", "D", "C"],
			["A", "A", "B", ""],
		];

		checkMargin([0, 10, 20], margin => {
			it(`append items (margin = ${margin})`, () => {
				// Given
				const items = makeItems(20);
				const layout = new Layout({
					frame,
					margin,
				});
				const shapes = layout._shapes.shapes;

				layout.setViewport(VIEWPORT.width, VIEWPORT.height);
				// When
				const group = layout.append(items, []);

				// Then
				const itemSize = (VIEWPORT.width + margin) / 4 - margin;
				const gitems = group.items;
				expect(layout._itemSize).to.be.equal(itemSize);
				expect(gitems.length).to.be.equal(20);
				expect(gitems[0].rect.width).to.be.equal(itemSize * 2 + margin);
				expect(gitems[0].rect.height).to.be.equal(itemSize * 2 + margin);
				expect(shapes[1].type).to.be.equal("B");
				expect(gitems[1].rect.top).to.be.equal(itemSize + margin);
				expect(gitems[1].rect.left).to.be.equal((itemSize + margin) * 2);
				expect(shapes[2].type).to.be.equal("C");
				expect(gitems[2].rect.top).to.be.equal(0);
				expect(gitems[2].rect.left).to.be.equal((itemSize + margin) * 3);
				expect(shapes[3].type).to.be.equal("D");
				expect(gitems[3].rect.top).to.be.equal(0);
				expect(gitems[3].rect.left).to.be.equal((itemSize + margin) * 2);
				
				expect(gitems[4].rect.top).to.be.equal((itemSize + margin) * 2);
				expect(gitems[4].rect.left).to.be.equal(0);

				expectConnectItems({
					item1: gitems[0],
					item2: gitems[1],
					margin,
					direction: "horizontal",
				});
				expectConnectItems({
					item1: gitems[3],
					item2: gitems[1],
					margin,
				});
				expectConnectItems({
					item1: gitems[0],
					item2: gitems[4],
					margin,
				});
				expectConnectItems({
					item1: gitems[1],
					item2: gitems[7],
					margin,
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

				layout.setViewport(VIEWPORT.width, VIEWPORT.height);
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
			this.layout.setViewport(VIEWPORT.width, VIEWPORT.height);
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
