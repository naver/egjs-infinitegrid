import InfiniteGrid from "../../src/infiniteGrid";
import {Content} from "../content";
import {window} from "../../src/browser";
import {utils} from "../../src/utils";

describe("InfiniteGrid eventHandler Test", function() {
	beforeEach(() => {
        this.inst = null;
        this.el = sandbox();
        this.el.innerHTML = `<ul id="grid">
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
			<li style="width:50%"><div>test</div></li>
		</ul>`;
        this.inst = new InfiniteGrid("#grid");
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

    it("should check a clear after scrolling", done => {
        // Given
        // When
        this.inst.on("layoutComplete", function(e) {
            // Then
            expect(e.target.length).to.be.equal(6);
            expect(this.layoutManager.items.length).to.be.equal(6);
            expect(this.el.children.length).to.be.equal(6);

            // When
            this.clear();

            // Then
            expect(this.layoutManager.items.length).to.be.equal(0);
            expect(this.el.children.length).to.be.equal(0);
            expect(this.isRecycling()).to.be.false;
            expect(this.isProcessing()).to.be.false;

            window.dispatchEvent(new Event("scroll"));
            done();
        });
    });

    it("should check if width is not changed, layout should be not called on resize event.", done => {
        // Given
        var self = this;
        utils.addEvent(window, "resize", this.resizeHandler);
        this.inst.once("layoutComplete", function (e) {
            this.on("layoutComplete", function (e) {
                throw new Error("layoutComplete event should not be called");
            });

            // When
            window.dispatchEvent(new Event("resize"));

            // Then
            expect(self.resizeHandler.callCount).to.be.equal(1);
            expect(utils.innerWidth(this.el)).to.be.equal(this.layoutManager.size.containerWidth);
            done();
        });
    });    
});


// describe("InfiniteGrid scroll eventHandler Test", function() {
// 	beforeEach(() => {
//         this.el = sandbox();
// 		this.el.innerHTML = `<ul id="grid"></ul>`;
//         this.scrollHandler = sinon.spy();
//         this.inst = new eg.InfiniteGrid("#grid", {
// 			"count": 20,
// 			"threshold": 100
// 		});
// 	});
// 	afterEach(() => {
//         if(this.inst) {
// 			this.inst.destroy();
// 			this.inst = null;
// 		}
//         this.scrollHandler.reset();
//         cleanup();
// 	});

// 	it("should", () => {
//         var rect = {
//             top : 0
//         };

//         this.inst.getBottomElement = function() {
//             return {
//                 getBoundingClientRect : function() {
//                     return rect;
//                 }
//             };
//         };
 
// 	});
// });
