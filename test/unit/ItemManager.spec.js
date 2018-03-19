import ItemManager from "../../src/ItemManager";
import {IGNORE_CLASSNAME} from "../../src/consts";

/* eslint-disable */
function initItems() {
  return {
    groupKey: 1,
    outlines: {start:[], end: []},
    items:[
    {
      size: {
        width: 100,
        height: 50
      },
      type: 1,
      rect: {
        top: 0,
        left: 0,
        width: 200,
        height: 100
      }
    },
    {
      size: {
        width: 100,
        height: 50
      },
      type: 1,
      rect: {
        top: 0,
        left: 200,
        width: 200,
        height: 100
      }
    },
    {
      size: {
        width: 100,
        height: 50
      },
      type: 2,
      rect: {
        top: 100,
        left: 0,
        width: 200,
        height: 100
      }
    },
    {
      size: {
        width: 100,
        height: 50
      },
      type: 3,
      rect: {
        top: 100,
        left: 200,
        width: 200,
        height: 100
      }
    },
    {
      size: {
        width: 100,
        height: 50
      },
      type: 3,
      rect: {
        top: 200,
        left: 0,
        width: 200,
        height: 100
      }
    }
  ]};
}

describe("ItemManager Test", function() {
  describe("from Test", function() {
    beforeEach(() => {
      this.inst = new ItemManager({
      });
    });
    afterEach(() => {
      if (this.inst) {
        this.inst = null;
      }
    });
    it("sholud have IGNORE CLASS ITEM", () => {
      // Given
      const elements = `<div></div><div class="${IGNORE_CLASSNAME}"></div><div></div>`;

      // When
      const items = ItemManager.from(elements, "*", {groupKey: 10, isAppend: true});

      // Then
      expect(items).to.have.lengthOf(2);
      expect(items[0].groupKey).to.be.equals(10);
    });
    it("sholud have item selector", () => {
      // Given
      const elements = `<div class="item"></div><div class="item item2"></div><div class="item2"></div><div class="${IGNORE_CLASSNAME}"></div><div></div>`;

      // When
      const items = ItemManager.from(elements, "item", {groupKey: 10, isAppend: true});

      // Then
      expect(items).to.have.lengthOf(2);
      expect(items[0].groupKey).to.be.equals(10);
    });
  });
  describe("append/prepend Test", function() {
    beforeEach(() => {
      this.inst = new ItemManager({
      });
    });
    afterEach(() => {
      if (this.inst) {
        this.inst = null;
      }
    });
    it("should have a groupKey all items", () => {
      // Given
      // When
      this.inst.append(initItems());

      // Then
      const items = this.inst.get(true);
      items.forEach(v => {
        expect(v.groupKey).to.be.exist;
      });
    });
  });
  [true, false].forEach(horizontal => {
    describe(`fit Test(horizontal: ${horizontal})`, function() {
      beforeEach(() => {
        this.inst = new ItemManager({
        });
      });
      afterEach(() => {
        if (this.inst) {
          this.inst = null;
        }
      });
      it("should check position.", () => {
        // Given
        const vertical = [0, 0, 100, 100, 200];
        const horizontal = [0, 200, 0, 200, 0];
        // When
        this.inst.append(initItems());
        this.inst.fit(100, horizontal);
        // Then
        this.inst._data[0].items.forEach((item, i) => {
          expect(item.rect[horizontal ? "left" : "top"]).to.be.equals((horizontal ? horizontal[i] : vertical[i]) - 100);
        });
      });
    });
  });
});
