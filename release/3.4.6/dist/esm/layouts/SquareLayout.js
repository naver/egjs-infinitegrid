function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import FrameLayout from "./FrameLayout";
import { fill } from "../utils";

function makeShapeOutline(outline, itemSize, columnLength, isAppend) {
  var point = Math[isAppend ? "min" : "max"].apply(Math, outline) || 0;

  if (outline.length !== columnLength) {
    return fill(new Array(columnLength), 0);
  }

  return outline.map(function (l) {
    return parseInt((l - point) / itemSize, 10);
  });
}

function getColumn(item) {
  if (item.column) {
    return item.column;
  }

  var column = 0;

  if (item.el) {
    var dataset = item.el.dataset;

    if (dataset) {
      column = dataset.column || 1;
    } else {
      column = item.el.getAttribute("column") || 1;
    }
  } else {
    column = 1;
  }

  item.column = column;
  return column;
}
/**
 * @classdesc SquareLayout is a layout that places all cards like squares on a checkerboard, and important cards are n times larger. The main card can be enlarged, and then a small card can be placed to naturally show the relationship of the card.
 * @ko SquareLayout은 바둑판처럼 모든 카드를 정사각형으로 배치하고 중요한 카드는 크기를 N배로 키워서 보여주는 레이아웃이다. 주요 카드를 크게 표시하고, 그 다음에 작은 카드를 배치해 자연스럽게 카드의 관계를 나타낼 수 있습니다.
 * @class eg.InfiniteGrid.SquareLayout
 * @extends eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.SquareLayout module <ko>eg.InfiniteGrid.SquareLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.SquareLayout, {
	margin: 10,
	itemSize: 200,
});

// or

var layout = new eg.InfiniteGrid.SquareLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
});


var item1 = '<div data-column="2"></div>';
var item2 = "<div></div>"
layout.append([item1, item2]);
</script>
```
 **/


var SquareLayout =
/*#__PURE__*/
function (_FrameLayout) {
  _inheritsLoose(SquareLayout, _FrameLayout);

  function SquareLayout() {
    return _FrameLayout.apply(this, arguments) || this;
  }

  var _proto = SquareLayout.prototype;

  _proto._checkItemSize = function _checkItemSize() {
    var column = this.options.column;

    if (!column) {
      _FrameLayout.prototype._checkItemSize.call(this);

      return;
    }

    var margin = this.options.margin; // if itemSize is not in options, caculate itemSize from size.

    this._itemSize = (this._size + margin) / column - margin;
  };

  _proto._layout = function _layout(items, outline, isAppend) {
    var _this$_shapes;

    if (outline === void 0) {
      outline = [];
    }

    var itemSize = this._getItemSize();

    var margin = this.options.margin;
    var columnLength = this.options.column || parseInt((this._size + margin) / (itemSize + margin), 10) || 1;
    var length = items.length;
    var endOutline = makeShapeOutline(outline, itemSize, columnLength, isAppend);
    var pointCaculateName = isAppend ? "min" : "max";
    var shapes = [];
    var sign = isAppend ? 1 : -1;
    var style = this._style;
    var pos1Name = style.pos1;
    var pos2Name = style.pos2;

    for (var i = 0; i < length; ++i) {
      var _shapes$push;

      var point = Math[pointCaculateName].apply(Math, endOutline);
      var index = endOutline[isAppend ? "indexOf" : "lastIndexOf"](point);
      var item = items[i];
      var columnWidth = item.columnWidth;
      var column = columnWidth && columnWidth[0] === columnLength && columnWidth[1] || getColumn(item);
      var columnCount = 1;

      if (column > 1) {
        for (var j = 1; j < column && (isAppend && index + j < columnLength || !isAppend && index - j >= 0); ++j) {
          if (isAppend && endOutline[index + sign * j] <= point || !isAppend && endOutline[index + sign * j] >= point) {
            ++columnCount;
            continue;
          }

          break;
        }

        if (!isAppend) {
          index -= columnCount - 1;
        }
      }

      item.columnWidth = [columnLength, columnCount];
      shapes.push((_shapes$push = {
        width: columnCount,
        height: columnCount
      }, _shapes$push[pos1Name] = point - (!isAppend ? columnCount : 0), _shapes$push[pos2Name] = index, _shapes$push.index = i, _shapes$push));

      for (var _j = 0; _j < columnCount; ++_j) {
        endOutline[index + _j] = point + sign * columnCount;
      }
    }

    this._shapes = (_this$_shapes = {
      shapes: shapes
    }, _this$_shapes[style.size2] = columnLength, _this$_shapes);

    var result = _FrameLayout.prototype._layout.call(this, items, outline, isAppend);

    if (!isAppend) {
      shapes.sort(function (shape1, shape2) {
        var item1pos1 = shape1[pos1Name];
        var item1pos2 = shape1[pos2Name];
        var item2pos1 = shape2[pos1Name];
        var item2pos2 = shape2[pos2Name];

        if (item1pos1 - item2pos1) {
          return item1pos1 - item2pos1;
        }

        return item1pos2 - item2pos2;
      });
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
    }

    return result;
  };

  return SquareLayout;
}(FrameLayout);

export default SquareLayout;