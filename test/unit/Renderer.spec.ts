import { cleanup, createElement, sandbox } from "./utils/utils";
import { Renderer } from "../../src/Renderer/Renderer";
import * as sinon from "sinon";
import { toArray } from "../../src/utils";

describe("test Renderer", () => {
  let renderer: Renderer | null;
  let container: HTMLElement | null;
  beforeEach(() => {
    container = sandbox("")!;
    container!.style.cssText = "position: relative";
  });

  afterEach(() => {
    renderer = null;
    container = null;
    cleanup();
  });
  it("should check if it can be rendered from outside", () => {
    // Given
    const items = [
      {
        key: 1,
        element: createElement("1"),
      },
      {
        key: 2,
        element: createElement("2"),
      },
      {
        key: 3,
        element: createElement("3"),
      },
    ];
    renderer = new Renderer();

    const updatedSpy = sinon.spy();
    renderer.on("updated", updatedSpy);

    // When
    // 1. sync items
    renderer.render(items.map((item) => ({ ...item })));
    // 2. render items
    items.forEach((item) => {
      container!.appendChild(item.element);
    });
    // 3. updated
    renderer.updated(container!.children);


    // Then
    const elements = toArray(container!.children);
    expect(items.map(({ key }) => key)).to.be.deep.equals([1, 2, 3]);
    items.forEach((item, i) => {
      expect(item.element).to.be.equals(elements[i]);
    });
    expect(updatedSpy.callCount).to.be.equals(1);
    expect(updatedSpy.args[0][0].isChanged).to.be.equals(true);
  });
  it("should checks whether the update event does occur.", () => {
    // Given
    const items = [
      {
        key: 1,
        element: createElement("1"),
      },
      {
        key: 2,
        element: createElement("2"),
      },
      {
        key: 3,
        element: createElement("3"),
      },
    ];
    renderer = new Renderer();
    const updateSpy = sinon.spy();
    renderer.on("update", updateSpy);
    renderer.render(items.map((item) => ({ ...item })));

    // When
    renderer.update();


    // Then
    expect(updateSpy.callCount).to.be.equals(1);
  });
});
