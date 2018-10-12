import { APPEND, PREPEND, ALIGN } from "../consts";
import { getStyleNames, assignOptions, fill, cloneItems } from "../utils"; // ALIGN

var START = ALIGN.START,
    CENTER = ALIGN.CENTER,
    END = ALIGN.END,
    JUSTIFY = ALIGN.JUSTIFY;
/**
 * @classdesc The GridLayout is a layout that stacks cards with the same width as a stack of bricks. Adjust the width of all images to the same size, find the lowest height column, and insert a new card.
 * @ko GridLayout는 벽돌을 쌓아 올린 모양처럼 동일한 너비를 가진 카드를 쌓는 레이아웃이다. 모든 이미지의 너비를 동일한 크기로 조정하고, 가장 높이가 낮은 열을 찾아 새로운 이미지를 삽입한다. 따라서 배치된 카드 사이에 빈 공간이 생기지는 않지만 배치된 레이아웃의 아래쪽은 울퉁불퉁해진다.
 * @class eg.InfiniteGrid.GridLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.GridLayout module <ko>eg.InfiniteGrid.GridLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.align=START] Align of the position of the items (START, CENTER, END, JUSTIFY) <ko>아이템들의 위치의 정렬 (START, CENTER, END, JUSTIFY)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.GridLayout, {
	margin: 10,
	align: "start",
	itemSize: 200
});

// or

var layout = new eg.InfiniteGrid.GridLayout({
	margin: 10,
	align: "center",
	itemSize: 200,
	horizontal: true,
});

</script>
```
 **/

var GridLayout =
/*#__PURE__*/
function () {
  function GridLayout(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = assignOptions({
      margin: 0,
      horizontal: false,
      align: START,
      itemSize: 0
    }, options);
    this._size = 0;
    this._columnSize = 0;
    this._columnLength = 0;
    this._style = getStyleNames(this.options.horizontal);
  }

  var _proto = GridLayout.prototype;

  _proto.checkColumn = function checkColumn(item) {
    var _this$options = this.options,
        itemSize = _this$options.itemSize,
        margin = _this$options.margin,
        horizontal = _this$options.horizontal;
    var sizeName = horizontal ? "height" : "width";
    var columnSize = parseInt(itemSize || item && item.size[sizeName], 10) || 0;
    this._columnSize = columnSize;

    if (!columnSize) {
      this._columnLength = 1;
      return;
    }

    this._columnLength = Math.max(parseInt((this._size + margin) / (columnSize + margin), 10), 1);
  };

  _proto._layout = function _layout(items, outline, isAppend) {
    var length = items.length;
    var margin = this.options.margin;
    var align = this.options.align;
    var style = this._style;
    var size1Name = style.size1;
    var size2Name = style.size2;
    var pos1Name = style.pos1;
    var pos2Name = style.pos2;
    var columnSize = this._columnSize;
    var columnLength = this._columnLength;
    var size = this._size;
    var viewDist = size - (columnSize + margin) * columnLength + margin;
    var pointCaculateName = isAppend ? "min" : "max";
    var startOutline = outline.slice();
    var endOutline = outline.slice();

    for (var i = 0; i < length; ++i) {
      var _item$rect;

      var point = Math[pointCaculateName].apply(Math, endOutline) || 0;
      var index = endOutline.indexOf(point);
      var item = items[isAppend ? i : length - 1 - i];
      var size1 = item.size[size1Name];
      var size2 = item.size[size2Name];
      var pos1 = isAppend ? point : point - margin - size1;
      var endPos1 = pos1 + size1 + margin;

      if (index === -1) {
        index = 0;
      }

      var pos2 = (columnSize + margin) * index; // ALIGN

      if (align === CENTER) {
        pos2 += viewDist / 2;
      } else if (align === END) {
        pos2 += viewDist + columnSize - size2;
      } else if (align === JUSTIFY) {
        if (columnLength <= 1) {
          pos2 += viewDist / 2;
        } else {
          pos2 = (size - columnSize) / (columnLength - 1) * index;
        }
      } // tetris


      item.rect = (_item$rect = {}, _item$rect[pos1Name] = pos1, _item$rect[pos2Name] = pos2, _item$rect);
      item.column = index;
      endOutline[index] = isAppend ? endPos1 : pos1;
    }

    if (!isAppend) {
      items.sort(function (a, b) {
        var item1pos1 = a.rect[pos1Name];
        var item1pos2 = a.rect[pos2Name];
        var item2pos1 = b.rect[pos1Name];
        var item2pos2 = b.rect[pos2Name];

        if (item1pos1 - item2pos1) {
          return item1pos1 - item2pos1;
        }

        return item1pos2 - item2pos2;
      });
    } // if append items, startOutline is low, endOutline is high
    // if prepend items, startOutline is high, endOutline is low


    return {
      start: isAppend ? startOutline : endOutline,
      end: isAppend ? endOutline : startOutline
    };
  };

  _proto._insert = function _insert(items, outline, type, cache) {
    if (items === void 0) {
      items = [];
    }

    if (outline === void 0) {
      outline = [];
    }

    var clone = cache ? items : cloneItems(items);
    var startOutline = outline;

    if (!this._columnLength) {
      this.checkColumn(items[0]);
    }

    if (outline.length !== this._columnLength) {
      startOutline = fill(new Array(this._columnLength), outline.length === 0 ? 0 : Math[type === APPEND ? "min" : "max"].apply(Math, outline) || 0);
    }

    var result = this._layout(clone, startOutline, type);

    return {
      items: clone,
      outlines: result
    };
  };
  /**
   * Adds items at the bottom of a outline.
   * @ko 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.GridLayout#append
   * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
   * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
   * @example
   * layout.prepend(items, [100, 200, 300, 400]);
   */


  _proto.append = function append(items, outline, cache) {
    return this._insert(items, outline, APPEND, cache);
  };
  /**
   * Adds items at the top of a outline.
   * @ko 아이템을 아웃라인 위에 추가한다.
   * @method eg.InfiniteGrid.GridLayout#prepend
   * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
   * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
   * @example
   * layout.prepend(items, [100, 200, 300, 400]);
   */


  _proto.prepend = function prepend(items, outline, cache) {
    return this._insert(items, outline, PREPEND, cache);
  };
  /**
   * Adds items of groups at the bottom of a outline.
   * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.GridLayout#layout
   * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
   * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * layout.layout(groups, [100, 200, 300, 400]);
   */


  _proto.layout = function layout(groups, outline) {
    var _this = this;

    if (groups === void 0) {
      groups = [];
    }

    if (outline === void 0) {
      outline = [];
    }

    var firstItem = groups.length && groups[0].items.length && groups[0].items[0] || 0;
    this.checkColumn(firstItem); // if outlines' length and columns' length are now same, re-caculate outlines.

    var startOutline;

    if (outline.length !== this._columnLength) {
      var pos = outline.length === 0 ? 0 : Math.min.apply(Math, outline); // re-layout items.

      startOutline = fill(new Array(this._columnLength), pos);
    } else {
      startOutline = outline.slice();
    }

    groups.forEach(function (group) {
      var items = group.items;

      var result = _this._layout(items, startOutline, APPEND);

      group.outlines = result;
      startOutline = result.end;
    });
    return this;
  };
  /**
   * Set the viewport size of the layout.
   * @ko 레이아웃의 가시 사이즈를 설정한다.
   * @method eg.InfiniteGrid.GridLayout#setSize
   * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
   * @return {eg.InfiniteGrid.GridLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * layout.setSize(800);
   */


  _proto.setSize = function setSize(size) {
    this._size = size;
    return this;
  };

  return GridLayout;
}();

export default GridLayout;