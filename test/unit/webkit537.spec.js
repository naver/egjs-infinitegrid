import AgentInjection from "./helper/AgentInjection";
import a from "./InfiniteGrid.spec.js";
import {WEBKIT_VERSION, DEFENSE_BROWSER} from "../../src/consts";

describe("InfiniteGrid Agent test", function (e) {
    it("should check defense browser in applewebkit/534", function() {
        console.log("agent", navigator.userAgent);
        expect(WEBKIT_VERSION).to.be.equal(534);
        expect(DEFENSE_BROWSER).to.be.true;
    });
});