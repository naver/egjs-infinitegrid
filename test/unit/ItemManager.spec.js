import ItemManager from "../../src/ItemManager";

function initItems() {
  return [
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
  ];
}

describe("ItemManager Test", function() {
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
});
