import { CONTAINER_CLASS_NAME } from "../../src/consts";
import { ScrollManager } from "../../src/ScrollManager";
import { cleanup, sandbox, waitEvent, waitFor } from "./utils/utils";
import * as sinon from "sinon";

describe("test ScrollManager", () => {
  let scrollManager: ScrollManager | null;
  let wrapper: HTMLElement | null;

  beforeEach(() => {
    wrapper = sandbox("")!;
    wrapper!.style.cssText = "position: relative";
  });

  afterEach(() => {
    if (scrollManager) {
      scrollManager.destroy();
    }
    scrollManager = null;
    wrapper = null;
    cleanup();
  });
  it("should check if container is wrapper and scrollContainer is body", () => {
    // Given, When
    scrollManager = new ScrollManager(wrapper!, {});

    // Then
    expect(scrollManager.getWrapper()).to.be.equals(wrapper);
    expect(scrollManager.getContainer()).to.be.equals(wrapper);
    expect(scrollManager.getScrollContainer().style.overflow).to.be.equals("");
    expect(scrollManager.getScrollContainer()).to.be.equals(document.body);
  });

  it("should check if container is virtual container(div) and scrollContainer is wrapper", () => {
    // Given, When
    scrollManager = new ScrollManager(wrapper!, {
      container: true,
    });

    // Then
    const scrollContainer = scrollManager.getScrollContainer();

    expect(scrollManager.getWrapper()).to.be.equals(wrapper);
    expect(scrollManager.getContainer().className).to.be.equals(CONTAINER_CLASS_NAME);
    expect(scrollContainer).to.be.equals(wrapper);
    expect(scrollContainer.style.overflowX).to.be.equals("hidden");
    expect(scrollContainer.style.overflowY).to.be.equals("scroll");
  });
  it("should check if container is virtual container(ul) and scrollContainer is wrapper", () => {
    // Given, When
    scrollManager = new ScrollManager(wrapper!, {
      container: true,
      containerTag: "ul",
    });

    // Then
    expect(scrollManager.getWrapper()).to.be.equals(wrapper);
    expect(scrollManager.getContainer().tagName).to.be.equals("UL");
    expect(scrollManager.getScrollContainer()).to.be.equals(wrapper);
  });
  it("should check if container is external container and scrollContainer is wrapper", () => {
    // Given, When
    const container = document.createElement("div");
    wrapper!.appendChild(container);
    scrollManager = new ScrollManager(wrapper!, {
      container,
      containerTag: "ul",
    });

    // Then
    expect(scrollManager.getWrapper()).to.be.equals(wrapper);
    expect(scrollManager.getContainer()).to.be.equals(container);
    expect(scrollManager.getScrollContainer()).to.be.equals(wrapper);
  });
  it("should check if the original style is restored", () => {
    // Given
    const container = document.createElement("div");

    container.style.overflow = "hidden";
    wrapper!.appendChild(container);
    scrollManager = new ScrollManager(wrapper!, {
      container,
      containerTag: "ul",
    });

    // When
    scrollManager.destroy();
    scrollManager = null;

    // Then
    expect(container.style.overflow).to.be.equals("hidden");
  });
  it(`should check if scrollOffset exists`, () => {
    // Given
    scrollManager = new ScrollManager(wrapper!, {
      container: true,
    });

    // When
    scrollManager.getContainer().style.top = "100px";
    scrollManager.resize();

    // Then
    expect(scrollManager.getScrollOffset()).to.be.equals(100);
  });
  it(`should check if scrollPos has changed`, async () => {
    // Given
    wrapper!.style.height = "300px";
    scrollManager = new ScrollManager(wrapper!, {
      container: true,
    });

    // When
    scrollManager.getContainer().style.cssText = "position:relative; top: 100px; height: 1000px;";
    scrollManager.resize();

    const scrollEvent = waitEvent(scrollManager, "scroll");

    scrollManager.scrollTo(150);

    const eventParam = await scrollEvent;

    // Then
    expect(eventParam.scrollPos).to.be.equals(150);
    expect(eventParam.relativeScrollPos).to.be.equals(50);
    expect(eventParam.direction).to.be.equals("end");
  });
  it(`should check if the 1st scroll is omitted for iOS`, async () => {
    // Given
    const spy = sinon.spy();
    wrapper!.style.height = "300px";
    scrollManager = new ScrollManager(wrapper!, {
      container: true,
    });
    scrollManager.getContainer().style.cssText = "position:relative; top: 100px; height: 1000px;";
    scrollManager.resize();

    // IS_IOS
    (scrollManager as any)._isScrollIssue = true;
    scrollManager.on("scroll", spy);


    // When
    scrollManager.getScrollContainer().dispatchEvent(new Event("scroll"));
    scrollManager.scrollTo(100);
    await waitFor(100);

    // Then
    expect(spy.callCount).to.be.equals(1);
  });
});
