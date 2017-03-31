import LayoutManager from "../../src/layoutManager";
import {utils} from "../../src/utils";
// import {Content} from "../content.js";
// import $ from "jquery";

describe("LayoutManager Unit method Test", function() {
	beforeEach(() => {
		this.inst = null;
        this.el = sandbox();
		this.el.innerHTML = `<ul id="nochildren_grid"></ul>`;
	});
	afterEach(() => {
		if (this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
        cleanup();
	});

	// it("should check a syncCols", () => {
    //     this.inst = new LayoutManager(utils.$("#nochildren_grid"), {
    //         isEqualSize: false
    //     });
    //     this.inst.appendCols = [0, 0, 0];
    //     this.inst.prependCols = [0, 0, 0];


	// 	// Given
	// 	const layoutCompleteHandler = sinon.spy();

	// 	// When

	// 	// Then
	// 	expect(this.inst.isProcessing()).to.be.false;
	// 	expect(layoutCompleteHandler.calledOnce).to.be.false;
	// 	layoutCompleteHandler.reset();
	// });
});
