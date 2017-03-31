import InfiniteGrid from "../../src/infiniteGrid";
import {Content} from "../content";
import {window} from "../../src/browser";
import {utils} from "../../src/utils";

describe("InfiniteGrid eventHandler Test", function() {
	beforeEach(() => {
        this.inst = null;
        this.el = sandbox();
		this.el.innerHTML = `<ul id="grid"></ul>`;
        this.resizeHandler = sinon.spy();
        this.scrollHandler = sinon.spy();
	});
	afterEach(() => {
        if(this.inst) {
			this.inst.destroy();
			this.inst = null;
		}
        this.resizeHandler.reset();
        this.scrollHandler.reset();
        cleanup();
	});

	it("should check release event handler after destroy", () => {
        // Given
        utils.addEvent(window, "scroll", this.scrollHandler);
        utils.addEvent(window, "resize", this.resizeHandler);
        this.inst = new InfiniteGrid("#grid");
        
        // When
        this.inst.destroy();
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));

        // Then
        expect(this.scrollHandler.calledOnce).to.be.true;
        expect(this.resizeHandler.calledOnce).to.be.true;

        utils.removeEvent(window, "scroll", this.scrollHandler);
        utils.removeEvent(window, "resize", this.resizeHandler);

        // When
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));

        // Then
        expect(this.scrollHandler.calledOnce).to.be.true;
        expect(this.resizeHandler.calledOnce).to.be.true;
	});


    it("should check status._prevScrollTop after resize event.", done => {
        // Given
        this.inst = new InfiniteGrid("#grid");
        const initValue = this.inst._status.prevScrollTop;
        utils.addEvent(window, "resize", this.resizeHandler);

        // When
        window.dispatchEvent(new Event("resize"));

        // Then
        setTimeout(() => {
            expect(this.resizeHandler.calledOnce).to.be.true;
            expect(initValue).to.be.equal(0);
            expect(this.inst._status.prevScrollTop).to.be.equal(-1);
            utils.removeEvent(window, "resize", this.resizeHandler);
            done();
        }, 200);
    });
});
