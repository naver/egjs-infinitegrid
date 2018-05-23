/* eslint-disable */
import GridLayout from "../../../src/layouts/GridLayout";
import JustifiedLayout from "../../../src/layouts/JustifiedLayout";
import FrameLayout from "../../../src/layouts/FrameLayout";
import SquareLayout from "../../../src/layouts/SquareLayout";
import PackingLayout from "../../../src/layouts/PackingLayout";
import { makeItems, VIEWPORT } from "../helper/data";

const frameOptions = {
	frame: [
	[0, 1, 0, 1],
	[1, 0, 0, 1]
]
};
const layoutOptions = {
	FrameLayout : frameOptions,
};


describe(`test layout's outline`, function() {
	[GridLayout, JustifiedLayout, FrameLayout, SquareLayout, PackingLayout].forEach(Layout => {
		it (`should check layout - ${Layout.name}`, () => {
			// Given
			const options = layoutOptions[Layout.name];
			const layout = new Layout(options);

			layout.setSize(VIEWPORT.width);

			// When
			const appendItems = layout.append(makeItems(20));
			const appendItems2 = layout.append(makeItems(20), []);
			const appendItems3 = layout.append(makeItems(20), [0]);

			const prependItems = layout.prepend(makeItems(20));
			const prependItems2 = layout.prepend(makeItems(20), []);
			const prependItems3 = layout.prepend(makeItems(20), [0]);

			const layoutItems = layout.append(makeItems(20));
			const layoutItems2 = layout.append(makeItems(20), []);
			const layoutItems3 = layout.append(makeItems(20), [0]);

			layout.layout();
			layout.layout([]);
			layout.layout([layoutItems]);
			layout.layout([layoutItems2], []);
			layout.layout([layoutItems3], [0]);

			// Then
			expect(appendItems).to.be.deep.equals(appendItems2);
			expect(appendItems2).to.be.deep.equals(appendItems3);

			expect(prependItems).to.be.deep.equals(prependItems2);
			expect(prependItems2).to.be.deep.equals(prependItems3);

			expect(layoutItems).to.be.deep.equals(layoutItems2);
			expect(layoutItems2).to.be.deep.equals(layoutItems3);
		});
	});
});