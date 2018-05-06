import ConstsInjector from "inject-loader!../../src/consts";

const UA = {
    "android2": "Mozilla/5.0 (Linux;U;Android 2.1;ko-kr;SHW-M110S Build/ÉCLAIR) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17",
    "android": "Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G935L Build/MMB29K) AppleWebkit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36",
    "ios": "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B440",
    "ie": "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
    "chrome": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36",
    "firefox": "Mozilla/5.0 (Windows NT 6.1; rv:36.0) Gecko/20100101 Firefox/36.0",
    "safari": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18",
};

describe("Const Test", function() {
    for(let p in UA) {
        // Given
        // When
        let MockConsts = ConstsInjector({
            "./browser": {
                window: {
                    navigator: {
                        userAgent: UA[p]
                    },
                },
                document: {},
            }
        });
        it("should check IS_IE property", () => {
            // Then
            expect(MockConsts.IS_IE).to.be[p === "ie"];
        });
        it("should check IS_IOS property", () => {
            // Then
            expect(MockConsts.IS_IOS).to.be[p === "ios"];
        });
        it("should check IS_ANDROID2 property", () => {
            // Then
            expect(MockConsts.IS_ANDROID2).to.be[p === "android2"];
        });
    }
});
