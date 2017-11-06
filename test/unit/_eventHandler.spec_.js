import InfiniteGrid from "../../src/InfiniteGrid";
import InfiniteGridInjector from "inject-loader!../../src/InfiniteGrid";
import {Content} from "../content";
import {window} from "../../src/browser";
import {utils, Mixin} from "../../src/utils";

describe("EventHandler Test", function() {
    describe("Event Test", function() {
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
            utils.removeEvent(window, "resize", this.resizeHandler);

            // Then
            setTimeout(() => {
                expect(this.resizeHandler.calledOnce).to.be.true;
                expect(initValue).to.be.equal(0);
                expect(this.inst._status.prevScrollTop).to.be.equal(-1);
                done();
            }, 500);
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

        it("should check if isTrusted, layoutComplete is called by resize event.", done => {
            // Given
            var self = this;
            utils.addEvent(window, "resize", this.resizeHandler);
            this.inst.once("layoutComplete", function (e) {
                this.on("layoutComplete", function (e) {
                    // Then
                    expect(e.isTrusted).to.be.true;
                    done();
                });
                
                this.layoutManager.size.containerWidth = this.layoutManager.size.containerWidth - 1;
                
                // When
                window.dispatchEvent(new Event("resize"));
                
                // Then
                expect(e.isTrusted).to.be.false;
                expect(self.resizeHandler.callCount).to.be.equal(1);
            });
        });
    });

    describe("Scroll Event Test", function() {
        beforeEach(() => {
            this.el = sandbox();
            this.el.innerHTML = `<ul id="grid"></ul>`;
            
            var self = this;
            this.scrollPos = { x: 0, y: 0 };
            this.rect = {
                top: 0,
                bottom: 0,
            };
            const MockInfiniteGrid = InfiniteGridInjector({
                "./utils": {
                    "utils": Object.assign(utils, {
                        "scrollTop": function() {
                            return self.scrollPos.y;
                        },
                    }),
                    "Mixin": Mixin,
                }
            });
            this.inst = new MockInfiniteGrid("#grid", {
                "count": 20,
                "threshold": 100
            });
            this.inst.getBottomElement = function() {
                return {
                    getBoundingClientRect : function() {
                        return self.rect;
                    }
                };
            };
            this.inst.getTopElement = function() {
                return {
                    getBoundingClientRect : function() {
                        return self.rect;
                    }
                };
            };

            this.scrollHandler = sinon.spy();
            this.itemHandler = sinon.spy();
            utils.addEvent(window, "scroll", this.scrollHandler);
        });
        afterEach(() => {
            if(this.inst) {
                this.inst.destroy();
                this.inst = null;
            }
            utils.removeEvent(window, "scroll", this.scrollHandler);
            this.scrollHandler.reset();
            this.itemHandler.reset();
            cleanup();
        });

        it("should append on scroll", done => {
            // Given
            const self = this;
            this.inst.on({
                "layoutComplete": function(e) {
                    self.rect.top = this._status.clientHeight + this.options.threshold;
                    // When
                    self.scrollPos.y = 100;
                    window.dispatchEvent(new Event("scroll"));

                    // When
                    self.rect.top += 1;
                    self.scrollPos.y = 110;
                    window.dispatchEvent(new Event("scroll"));

                    // Then
                    expect(self.scrollHandler.callCount).to.be.equal(2);
                    expect(self.itemHandler.calledOnce).to.be.true;
                    expect(self.itemHandler.getCall(0).args[0].isTrusted).to.be.true; // isTrusted: true
                    expect(e.isTrusted).to.be.false; // isTrusted: false
                    done();
                },
                "append": self.itemHandler
            });
            // When
            this.inst.append(Content.append(200));
        });

        it("should prepend on scroll", done => {
            // Given
            const self = this;
            this.inst.on({
                "layoutComplete": function(e) {
                    // Then
                    expect(self.inst.isRecycling()).to.be.true;
                    expect(e.croppedCount).to.be.equal(200 - self.inst.options.count);

                    // When
                    this._status.prevScrollTop = 300;
                    self.rect.bottom -= self.inst.options.threshold;
                    self.scrollPos.y = 100;
                    window.dispatchEvent(new Event("scroll"));

                    // When 
                    self.rect.bottom -= 1;
                    self.scrollPos.y = 90;
                    window.dispatchEvent(new Event("scroll"));

                    // Then
                    expect(self.scrollHandler.callCount).to.be.equal(2);
                    expect(self.itemHandler.calledOnce).to.be.true;
                    expect(self.itemHandler.getCall(0).args[0].isTrusted).to.be.true; // isTrusted: true
                    expect(e.isTrusted).to.be.false; // isTrusted: false
                    done();
                },
                "prepend": self.itemHandler
            });
            // When
            this.inst.prepend(Content.prepend(200));
        });
    });
});
