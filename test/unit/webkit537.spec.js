import "./helper/AgentInjection";
import {WEBKIT_VERSION, DEFENSE_BROWSER} from "../../src/consts";

describe("InfiniteGrid Agent test", function (e) {
    it("should check defense browser in applewebkit/534", function() {
        expect(WEBKIT_VERSION).to.be.equal(534);
        expect(DEFENSE_BROWSER).to.be.true;
    });
});