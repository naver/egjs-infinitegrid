import { cleanup, createElement, sandbox } from "./utils/utils";
import { Renderer } from "../../src/Renderer/Renderer";
import { VanillaRenderer } from "../../src/Renderer/VanillaRenderer";
import * as sinon from "sinon";
import { toArray } from "../../src/utils";

describe("test VanillaRenderer", () => {
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
  it("should check if elements are added to the container when items are added", () => {
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
    renderer = new VanillaRenderer();
    renderer.setContainer(container!);
    const updatedSpy = sinon.spy();
    renderer.on("updated", updatedSpy);

    // When
    renderer.render(items.map((item) => ({ ...item })));


    // Then
    const elements = toArray(container!.children);
    expect(items.map(({ key }) => key)).to.be.deep.equals([1, 2, 3]);
    items.forEach((item, i) => {
      expect(item.element).to.be.equals(elements[i]);
    });
    expect(updatedSpy.callCount).to.be.equals(1);
    expect(updatedSpy.args[0][0].isChanged).to.be.equals(true);
  });
  it("should check if the order of elements changes when the order of items changes", () => {
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
    renderer = new VanillaRenderer();
    renderer.setContainer(container!);
    const updatedSpy = sinon.spy();
    renderer.on("updated", updatedSpy);

    // When
    renderer.render(items.map((item) => ({ ...item })));

    // 1 3 2
    [items[1], items[2]] = [items[2], items[1]];
    renderer.render(items.map((item) => ({ ...item })));


    // Then
    const elements = toArray(container!.children);

    expect(items.map(({ key }) => key)).to.be.deep.equals([1, 3, 2]);
    items.forEach((item, i) => {
      expect(item.element).to.be.equals(elements[i]);
    });
    expect(updatedSpy.callCount).to.be.equals(2);
    expect(updatedSpy.args[1][0].isChanged).to.be.equals(true);
  });
  it("should check if the order of elements not changes when the order of items not changes", () => {
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
    renderer = new VanillaRenderer();
    renderer.setContainer(container!);
    const updatedSpy = sinon.spy();
    renderer.on("updated", updatedSpy);

    // When
    renderer.render(items.map((item) => ({ ...item })));

    // 1 2 3
    renderer.render(items.map((item) => ({ ...item })));


    // Then
    const elements = toArray(container!.children);

    expect(items.map(({ key }) => key)).to.be.deep.equals([1, 2, 3]);
    items.forEach((item, i) => {
      expect(item.element).to.be.equals(elements[i]);
    });
    expect(updatedSpy.callCount).to.be.equals(2);
    expect(updatedSpy.args[1][0].isChanged).to.be.equals(false);
  });
  it("should check if elements are removed when items are removed", () => {
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
    renderer = new VanillaRenderer();
    renderer.setContainer(container!);
    const updatedSpy = sinon.spy();
    renderer.on("updated", updatedSpy);

    // When
    renderer.render(items.map((item) => ({ ...item })));

    // 1 3
    items.splice(1, 1);
    renderer.render(items.map((item) => ({ ...item })));


    // Then
    const elements = toArray(container!.children);

    expect(items.map(({ key }) => key)).to.be.deep.equals([1, 3]);
    items.forEach((item, i) => {
      expect(item.element).to.be.equals(elements[i]);
    });
    expect(updatedSpy.callCount).to.be.equals(2);
    expect(updatedSpy.args[1][0].isChanged).to.be.equals(true);
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
    renderer = new VanillaRenderer();
    renderer.setContainer(container!);
    const updateSpy = sinon.spy();
    renderer.on("update", updateSpy);
    renderer.render(items.map((item) => ({ ...item })));

    // When
    renderer.update();


    // Then
    expect(updateSpy.callCount).to.be.equals(1);
  });
});
