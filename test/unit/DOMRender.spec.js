import DOMRenderer from '../../src/DOMRenderer';
import {getItems} from './helper/TestHelper';

describe("DOMRender Test", function() {
  describe("updateSize method", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.el.innerHTML = getItems(10).join("");
      this.items = Array.from(this.el.children).map(el => ({el}));
      this.inst = new DOMRenderer(this.el);
    });
    afterEach(() => {
      if(this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it(`should equal size updated when 'isEqualSize' option is true`, () => {
      // Given
      this.inst.options.isEqualSize = true;
      expect(this.items.every(v => !v.size)).to.be.true;
      expect(this.items.every(v => !v.orgSize)).to.be.true;

      // When
      const items = this.inst.updateSize(this.items);
      
      // Then
      const baseSize = items[0].size;
      expect(items.every(v => v.size.height == baseSize.height && v.size.width == baseSize.width)).to.be.true;
      expect(items.every(v => v.orgSize)).to.be.true;
    });
    it(`should equal size updated when 'isEqualSize' option is false`, () => {
      // Given
      this.inst.options.isEqualSize = false;
      expect(this.items.every(v => !v.size)).to.be.true;
      expect(this.items.every(v => !v.orgSize)).to.be.true;

      // When
      const items = this.inst.updateSize(this.items);
      
      // Then
      const baseSize = items[0].size;
      expect(items.every(v => v.size.height == baseSize.height && v.size.width == baseSize.width)).to.be.false;
      expect(items.every(v => v.orgSize)).to.be.true;
    });    
  });
});
