import { Infinite } from "../../src/Infinite";
import { cleanup } from "./utils/utils";
import * as sinon from "sinon";

describe("test Infinite", () => {
  let infinite: Infinite | null;

  afterEach(() => {
    if (infinite) {
      infinite.destroy();
    }
    infinite = null;
    cleanup();
  });
  it("should check whether visible items change according to cursor", () => {
    infinite = new Infinite({});
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [300],
      },
      {
        key: 2,
        startOutline: [300],
        endOutline: [600],
      },
      {
        key: 3,
        startOutline: [600],
        endOutline: [900],
      },
    ]);

    // When
    infinite.setCursors(0, 0);
    const items1 = infinite.getVisibleItems();

    infinite.setCursors(0, 1);
    const items2 = infinite.getVisibleItems();

    infinite.setCursors(1, 2);
    const items3 = infinite.getVisibleItems();

    // Then
    expect(items1.map((item) => item.key)).to.be.deep.equals([1]);
    expect(items2.map((item) => item.key)).to.be.deep.equals([1, 2]);
    expect(items3.map((item) => item.key)).to.be.deep.equals([2, 3]);
  });
  it("should check if outline is empty but arbitrary outline and size are calculated", () => {
    // Given, When
    infinite = new Infinite({});
    infinite.syncItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [300],
      },
      {
        key: 2,
        startOutline: [],
        endOutline: [],
      },
      {
        key: 3,
        startOutline: [],
        endOutline: [],
      },
    ]);

    // Then
    expect(infinite.getScrollSize()).to.be.deep.equals(300);
    expect(infinite.getItems()[1].startOutline).to.be.deep.equals([300]);
    expect(infinite.getItems()[1].endOutline).to.be.deep.equals([300]);
    expect(infinite.getItems()[2].startOutline).to.be.deep.equals([300]);
    expect(infinite.getItems()[2].endOutline).to.be.deep.equals([300]);
  });
  it("should check whether rendered visible items change according to scroll pos", () => {
    infinite = new Infinite({});
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [300],
        parts: [
          {
            key: 1,
            pos: 0,
            size: 1,
          },
          {
            key: 2,
            pos: 100,
            size: 1,
          },
          {
            key: 3,
            pos: 200,
            size: 1,
          },
        ],
      },
      {
        key: 2,
        startOutline: [300],
        endOutline: [600],
        parts: [
          {
            key: 4,
            pos: 300,
            size: 1,
          },
          {
            key: 5,
            pos: 400,
            size: 1,
          },
          {
            key: 6,
            pos: 500,
            size: 1,
          },
        ],
      },
      {
        key: 3,
        startOutline: [600],
        endOutline: [900],
        parts: [
          {
            key: 7,
            pos: 600,
            size: 1,
          },
          {
            key: 8,
            pos: 700,
            size: 1,
          },
          {
            key: 9,
            pos: 800,
            size: 1,
          },
        ],
      },
    ]);
    infinite.setSize(400);

    // When
    infinite.setCursors(0, 0);
    const area1 = infinite.getVisibleArea(100);
    const area2 = infinite.getVisibleArea(250);

    infinite.setCursors(0, 1);
    const area3 = infinite.getVisibleArea(100);
    const area4 = infinite.getVisibleArea(250);
    const area5 = infinite.getVisibleArea(400);
    const area6 = infinite.getVisibleArea(550);

    infinite.setCursors(1, 2);
    const area7 = infinite.getVisibleArea(0);
    const area8 = infinite.getVisibleArea(200);
    const area9 = infinite.getVisibleArea(400);
    const area10 = infinite.getVisibleArea(550);
    const area11 = infinite.getVisibleArea(600);
    const area12 = infinite.getVisibleArea(800);


    // Then
    expect(area1!.item.key).to.be.deep.equals(1);
    expect(area1!.part.key).to.be.deep.equals(2);

    expect(area2!.item.key).to.be.deep.equals(1);
    expect(area2!.part.key).to.be.deep.equals(3);

    expect(area3!.item.key).to.be.deep.equals(1);
    expect(area3!.part.key).to.be.deep.equals(2);

    expect(area4!.item.key).to.be.deep.equals(1);
    expect(area4!.part.key).to.be.deep.equals(3);

    expect(area5!.item.key).to.be.deep.equals(1);
    expect(area5!.part.key).to.be.deep.equals(5);

    expect(area6!.item.key).to.be.deep.equals(1);
    expect(area6!.part.key).to.be.deep.equals(6);

    expect(area7!.item.key).to.be.deep.equals(2);
    expect(area7!.part).to.be.not.ok;

    expect(area8!.item.key).to.be.deep.equals(2);
    expect(area8!.part).to.be.not.ok;

    expect(area9!.item.key).to.be.deep.equals(2);
    expect(area9!.part.key).to.be.deep.equals(5);

    expect(area10!.item.key).to.be.deep.equals(2);
    expect(area10!.part.key).to.be.deep.equals(6);

    expect(area11!.item.key).to.be.deep.equals(2);
    expect(area11!.part.key).to.be.deep.equals(7);

    expect(area12!.item.key).to.be.deep.equals(2);
    expect(area12!.part.key).to.be.deep.equals(9);
  });
  it("should check if the cursor changes when you sync items", () => {
    infinite = new Infinite({});
    infinite.setItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
    ]);
    infinite.setCursors(0, 0);

    // When
    // 0 => 1
    infinite.syncItems([
      { key: 2, startOutline: [], endOutline: [] },
      { key: 1, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
    ]);


    const cursors1 = [infinite.getStartCursor(), infinite.getEndCursor()];

    // When
    infinite.setCursors(0, 1);
    // [0, 1] => [0, 2]
    infinite.syncItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
    ]);

    const cursors2 = [infinite.getStartCursor(), infinite.getEndCursor()];


    // Then
    expect(cursors1).to.be.deep.equals([1, 1]);
    expect(cursors2).to.be.deep.equals([0, 2]);
  });
  it("should check if change is true when visible items change", () => {
    infinite = new Infinite({});
    infinite.setItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
      { key: 4, startOutline: [], endOutline: [] },
    ]);
    infinite.setCursors(0, 2);

    // When
    // (0, 2) 1 2 3 => (0, 3) 1 2 4 3
    const isChange1 = infinite.syncItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 4, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
    ]);
    // (0, 3) 1 2 4 3 => (0, 3) 1 4 2 3
    const isChange2 = infinite.syncItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 4, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
    ]);
    // (0, 3)1 4 2 3 => (0, 3)1 4 2 3 5
    const isChange3 = infinite.syncItems([
      { key: 1, startOutline: [], endOutline: [] },
      { key: 4, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
      { key: 5, startOutline: [], endOutline: [] },
    ]);
    // (0, 3) 1 4 2 3 5 => (1, 4) 5 1 4 2 3
    const isChange4 = infinite.syncItems([
      { key: 5, startOutline: [], endOutline: [] },
      { key: 1, startOutline: [], endOutline: [] },
      { key: 4, startOutline: [], endOutline: [] },
      { key: 2, startOutline: [], endOutline: [] },
      { key: 3, startOutline: [], endOutline: [] },
    ]);

    // Then
    expect(isChange1).to.be.true;
    expect(isChange2).to.be.true;
    expect(isChange3).to.be.false;
    expect(isChange4).to.be.false;
  });
  it("should check if the next cursor is [0, 1] when scroll 250, [1, 2] when scroll 550 ", () => {
    // Given
    const changeSpy = sinon.spy();

    infinite = new Infinite({});
    infinite.on("change", changeSpy);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [300],
      },
      {
        key: 2,
        startOutline: [300],
        endOutline: [600],
      },
      {
        key: 3,
        startOutline: [600],
        endOutline: [900],
      },
    ]);
    infinite.setCursors(0, 0);
    infinite.setSize(100);

    // When
    infinite.scroll(250);
    infinite.scroll(550);

    // Then
    const ev1 = changeSpy.args[0][0];
    const ev2 = changeSpy.args[1][0];

    expect(ev1.prevStartCursor).to.be.equals(0);
    expect(ev1.prevEndCursor).to.be.equals(0);
    expect(ev1.nextStartCursor).to.be.equals(0);
    expect(ev1.nextEndCursor).to.be.equals(1);

    expect(ev2.prevStartCursor).to.be.equals(0);
    expect(ev2.prevEndCursor).to.be.equals(0);
    expect(ev2.nextStartCursor).to.be.equals(1);
    expect(ev2.nextEndCursor).to.be.equals(2);
  });
  it("should check whether newly added items are included", () => {
    // Given
    const changeSpy = sinon.spy();

    infinite = new Infinite({});
    infinite.on("change", changeSpy);
    infinite.setItems([
      {
        key: 1,
        startOutline: [],
        endOutline: [],
      },
      {
        key: 2,
        startOutline: [0],
        endOutline: [400],
      },
      {
        key: 3,
        startOutline: [400],
        endOutline: [800],
      },
      {
        key: 4,
        startOutline: [],
        endOutline: [],
      },
    ]);
    infinite.setCursors(1, 2);
    infinite.setSize(300);

    // When
    infinite.scroll(0);
    infinite.scroll(600);

    // Then
    const ev1 = changeSpy.args[0][0];
    const ev2 = changeSpy.args[1][0];

    expect(ev1.prevStartCursor).to.be.equals(1);
    expect(ev1.prevEndCursor).to.be.equals(2);
    expect(ev1.nextStartCursor).to.be.equals(0);
    expect(ev1.nextEndCursor).to.be.equals(1);

    expect(ev2.prevStartCursor).to.be.equals(1);
    expect(ev2.prevEndCursor).to.be.equals(2);
    expect(ev2.nextStartCursor).to.be.equals(2);
    expect(ev2.nextEndCursor).to.be.equals(3);
  });
  it("should checks whether requestAppend event is called when the end of the item is reached", () => {
    // Given
    const requestAppendEvent = sinon.spy();

    infinite = new Infinite({});
    infinite.on("requestAppend", requestAppendEvent);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [400],
      },
      {
        key: 2,
        startOutline: [400],
        endOutline: [800],
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    // not triggered
    infinite.scroll(200);
    // triggered
    infinite.scroll(400);

    // Then
    const ev1 = requestAppendEvent.args[0][0];

    expect(requestAppendEvent.callCount).to.be.equals(1);
    expect(ev1.key).to.be.equals(2);
  });
  it("should checks whether requestPrepend event is called when the start of the item is reached", () => {
    // Given
    const requestPrependEvent = sinon.spy();

    infinite = new Infinite({});
    infinite.on("requestPrepend", requestPrependEvent);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [400],
      },
      {
        key: 2,
        startOutline: [400],
        endOutline: [800],
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    // not triggered
    infinite.scroll(300);
    // triggered
    infinite.scroll(0);

    // Then
    const ev1 = requestPrependEvent.args[0][0];

    expect(requestPrependEvent.callCount).to.be.equals(1);
    expect(ev1.key).to.be.equals(1);
  });
  it(`should check if requestAppend event is called if defaultDirection is end when both start and end are reached`, () => {
    // Given
    const requestPrependEvent = sinon.spy();
    const requestAppendEvent = sinon.spy();

    infinite = new Infinite({
      defaultDirection: "end",
    });
    infinite.on("requestPrepend", requestPrependEvent);
    infinite.on("requestAppend", requestAppendEvent);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [200],
      },
      {
        key: 2,
        startOutline: [200],
        endOutline: [400],
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    infinite.scroll(0);

    // Then
    const ev1 = requestAppendEvent.args[0][0];

    expect(requestAppendEvent.callCount).to.be.equals(1);
    expect(requestPrependEvent.callCount).to.be.equals(0);
    expect(ev1.key).to.be.equals(2);
  });
  it(`should check if requestPrepend event is called if defaultDirection is start when both start and end are reached`, () => {
    // Given
    const requestPrependEvent = sinon.spy();
    const requestAppendEvent = sinon.spy();

    infinite = new Infinite({
      defaultDirection: "start",
    });
    infinite.on("requestPrepend", requestPrependEvent);
    infinite.on("requestAppend", requestAppendEvent);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [200],
      },
      {
        key: 2,
        startOutline: [200],
        endOutline: [400],
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    infinite.scroll(0);

    // Then
    const ev1 = requestPrependEvent.args[0][0];

    expect(requestAppendEvent.callCount).to.be.equals(0);
    expect(requestPrependEvent.callCount).to.be.equals(1);
    expect(ev1.key).to.be.equals(1);
  });
  it(`should check if a virtual group is requested when it exists`, () => {
    // Given
    const requestAppendEvent = sinon.spy();

    infinite = new Infinite({
      defaultDirection: "end",
    });
    infinite.on("requestAppend", requestAppendEvent);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [200],
      },
      {
        key: 2,
        startOutline: [200],
        endOutline: [400],
        isVirtual: true,
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    infinite.scroll(200);

    // Then
    const ev1 = requestAppendEvent.args[0][0];

    expect(requestAppendEvent.callCount).to.be.equals(1);
    expect(ev1.nextKey).to.be.equals(2);
    expect(ev1.isVirtual).to.be.equals(true);
  });
  it(`should check if requestAppend occurs with change event including virtual group`, () => {
    // Given
    const changeSpy = sinon.spy();
    const requestAppendSpy = sinon.spy();

    infinite = new Infinite({
      defaultDirection: "end",
    });
    infinite.on("change", changeSpy);
    infinite.on("requestAppend", requestAppendSpy);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [200],
      },
      {
        key: 2,
        startOutline: [200],
        endOutline: [400],
        isVirtual: true,
      },
      {
        key: 3,
        startOutline: [400],
        endOutline: [600],
        isVirtual: true,
      },
      {
        key: 4,
        startOutline: [600],
        endOutline: [800],
        isVirtual: true,
      },
    ]);
    infinite.setCursors(0, 2);
    infinite.setSize(400);

    // When
    infinite.scroll(600);

    // Then
    const changeEvent = changeSpy.args[0][0];
    const requestAppendEvent = requestAppendSpy.args[0][0];

    expect(changeSpy.callCount).to.be.equals(1);
    expect(requestAppendSpy.callCount).to.be.equals(1);
    expect(changeEvent.nextStartCursor).to.be.equals(0);
    expect(changeEvent.nextEndCursor).to.be.equals(3);
    expect(requestAppendEvent.nextKey).to.be.equals(2);
    expect(requestAppendEvent.nextKeys).to.be.deep.equals([2, 3, 4]);
  });
  it(`should check whether the minimum and maximum cursors are maintained when useRecycle is false.`, () => {
    // Given
    const changeEventSpy = sinon.spy();

    infinite = new Infinite({
      defaultDirection: "end",
      useRecycle: false,
    });
    infinite.on("change", changeEventSpy);
    infinite.setItems([
      {
        key: 1,
        startOutline: [0],
        endOutline: [200],
      },
      {
        key: 2,
        startOutline: [200],
        endOutline: [400],
      },
      {
        key: 3,
        startOutline: [400],
        endOutline: [600],
      },
      {
        key: 4,
        startOutline: [600],
        endOutline: [800],
      },
    ]);
    infinite.setCursors(0, 1);
    infinite.setSize(400);

    // When
    infinite.scroll(400);

    // Then
    const ev = changeEventSpy.args[0][0];

    expect(ev.prevStartCursor).to.be.equals(0);
    expect(ev.prevEndCursor).to.be.equals(1);
    expect(ev.nextStartCursor).to.be.equals(0);
    expect(ev.nextEndCursor).to.be.equals(3);
  });
});
