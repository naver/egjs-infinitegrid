import LayoutManager from "../../src/layoutManager";
import {utils} from "../../src/utils";

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
});
