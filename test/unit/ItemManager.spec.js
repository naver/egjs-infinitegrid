import ItemManager from "../../src/ItemManager";
import {IGNORE_CLASSNAME} from "../../src/consts";

/* eslint-disable */
function initItems(groupKey = 1) {
  return {
    groupKey,
    outlines: {start:[100], end: []},
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
    it("should check outline", () => {
      // Given
      // When
      const outline = this.inst.getOutline(0, "start");
      const edge = this.inst.getEdgeValue("start", 0, 1);
      this.inst.append(initItems());
      const outline2 = this.inst.getOutline(0, "start");
      const edge2 = this.inst.getEdgeValue("start", 0, 1);

      // Then
      expect(outline).to.be.deep.equals([]);
      expect(edge).to.be.deep.equals(0);
      expect(outline2).to.be.deep.equals([100]);
      expect(edge2).to.be.deep.equals(100);
    });
    it("should check indexOf", () => {
      // Given
      const item = initItems(1);
      const item2 = initItems(2);
      // When
      
      const index = this.inst.indexOf(item);

      this.inst.append(item);
      this.inst.append(item2);

      const index2 = this.inst.indexOf({});
      const index3 = this.inst.indexOf(item);
      const index4 = this.inst.indexOf(item.groupKey);
      const index5 = this.inst.indexOf(item2);
      const index6 = this.inst.indexOf(item2.groupKey);

      // Then
      expect(index).to.be.equals(-1);
      expect(index2).to.be.equals(-1);
      expect(index3).to.be.equals(0);
      expect(index4).to.be.equals(0);
      expect(index5).to.be.equals(1);
      expect(index6).to.be.equals(1);      
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
