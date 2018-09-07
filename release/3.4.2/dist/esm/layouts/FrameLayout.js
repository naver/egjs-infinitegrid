import { APPEND, PREPEND, DUMMY_POSITION } from "../consts";
import { getStyleNames, assignOptions, fill, cloneItems } from "../utils";
/*
Frame
[
[1, 1, 1, 1, 1],
[0, 0, 2, 2, 2],
[0, 0, 2, 2, 2],
[3, 4, 5, 5, 5],
]
*/

function disableFrame(frame, type, x, y, width, height) {
  for (var i = y; i < y + height; ++i) {
    for (var j = x; j < x + width; ++j) {
      if (type !== frame[i][j]) {
        continue;
      }

      frame[i][j] = 0;
    }
  }
}

function searchShapeInFrame(frame, type, top, left, width, height) {
  var size = {
    left: left,
    top: top,
    type: type,
    width: 1,
    height: 1
  };

  for (var i = left; i < width; ++i) {
    if (frame[top][i] === type) {
      size.width = i - left + 1;
      continue;
    }

    break;
  }

  for (var _i = top; _i < height; ++_i) {
    if (frame[_i][left] === type) {
      size.height = _i - top + 1;
      continue;
    }

    break;
  } // After finding the shape, it will not find again.


  disableFrame(frame, type, left, top, size.width, size.height);
  return size;
}

function getShapes(frame) {
  var height = frame.length;
  var width = height ? frame[0].length : 0;
  var shapes = [];

  for (var i = 0; i < height; ++i) {
    for (var j = 0; j < width; ++j) {
      var type = frame[i][j];

      if (!type) {
        continue;
      } // Separate shapes with other numbers.


      shapes.push(searchShapeInFrame(frame, type, i, j, width, height));
    }
  }

  shapes.sort(function (a, b) {
    return a.type < b.type ? -1 : 1;
  });
  return {
    shapes: shapes,
    width: width,
    height: height
  };
}
/**
 * @classdesc FrameLayout is a layout that allows you to place cards in a given frame. It is a layout that corresponds to a level intermediate between the placement of the image directly by the designer and the layout using the algorithm.
 * @ko FrameLayout은 주어진 프레임에 맞춰 카드를 배치하는 레이아웃입니다. 디자이너가 직접 이미지를 배치하는 것과 알고리즘을 사용한 배치의 중간 정도 수준에 해당하는 레이아웃이다.
 * @class eg.InfiniteGrid.FrameLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.FrameLayout module <ko>eg.InfiniteGrid.FrameLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.itemSize=0] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frame=[]] The size of the items. If it is 0, it is calculated as the size of the first item in items. <ko> 아이템의 사이즈. 만약 아이템 사이즈가 0이면, 아이템들의 첫번째 아이템의 사이즈로 계산이 된다. </ko>
 * @param {Boolean} [options.frameFill=true] Make sure that the frame can be attached after the previous frame. <ko> 다음 프레임이 전 프레임에 이어 붙일 수 있는지 있는지 확인한다. </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.FrameLayout, {
	margin: 10,
	itemSize: 200,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

// or

var layout = new eg.InfiniteGrid.FrameLayout({
	margin: 10,
	itemSize: 200,
	horizontal: true,
	frame: [
		[1, 1, 1, 1, 1],
		[0, 0, 2, 2, 2],
		[0, 0, 2, 2, 2],
		[3, 4, 5, 5, 5],
	],
});

</script>
```
 **/


var FrameLayout =
/*#__PURE__*/
function () {
  function FrameLayout(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = assignOptions({
      margin: 0,
      horizontal: false,
      itemSize: 0,
      frame: [],
      frameFill: true
    }, options);
    var frame = this.options.frame.map(function (row) {
      return row.slice();
    });
    this._itemSize = this.options.itemSize || 0; // divide frame into shapes.

    this._shapes = getShapes(frame);
    this._size = 0;
    this._style = getStyleNames(this.options.horizontal);
  }

  var _proto = FrameLayout.prototype;

  _proto._getItemSize = function _getItemSize() {
    this._checkItemSize();

    return this._itemSize;
  };

  _proto._checkItemSize = function _checkItemSize() {
    if (this.options.itemSize) {
      this._itemSize = this.options.itemSize;
      return;
    }

    var style = this._style;
    var size = style.size2;
    var margin = this.options.margin; // if itemSize is not in options, caculate itemSize from size.

    this._itemSize = (this._size + margin) / this._shapes[size] - margin;
  };

  _proto._layout = function _layout(items, outline, isAppend) {
    if (outline === void 0) {
      outline = [];
    }

    var length = items.length;
    var style = this._style;
    var _this$options = this.options,
        margin = _this$options.margin,
        frameFill = _this$options.frameFill;
    var size1Name = style.size1;
    var size2Name = style.size2;
    var pos1Name = style.pos1;
    var pos2Name = style.pos2;

    var itemSize = this._getItemSize();

    var isItemObject = typeof itemSize === "object";
    var itemSize2 = isItemObject ? itemSize[size2Name] : itemSize;
    var itemSize1 = isItemObject ? itemSize[size1Name] : itemSize;
    var shapesSize = this._shapes[size2Name];
    var shapes = this._shapes.shapes;
    var shapesLength = shapes.length;
    var startOutline = fill(new Array(shapesSize), DUMMY_POSITION);
    var endOutline = fill(new Array(shapesSize), DUMMY_POSITION);
    var dist = 0;
    var end = 0;

    if (!shapesLength) {
      return {
        start: outline,
        end: outline
      };
    }

    for (var i = 0; i < length; i += shapesLength) {
      for (var j = 0; j < shapesLength && i + j < length; ++j) {
        var _item$rect;

        var item = items[i + j];
        var shape = shapes[j];
        var shapePos1 = shape[pos1Name];
        var shapePos2 = shape[pos2Name];
        var shapeSize1 = shape[size1Name];
        var shapeSize2 = shape[size2Name];
        var pos1 = end - dist + shapePos1 * (itemSize1 + margin);
        var pos2 = shapePos2 * (itemSize2 + margin);
        var size1 = shapeSize1 * (itemSize1 + margin) - margin;
        var size2 = shapeSize2 * (itemSize2 + margin) - margin;

        for (var k = shapePos2; k < shapePos2 + shapeSize2 && k < shapesSize; ++k) {
          if (startOutline[k] === DUMMY_POSITION) {
            startOutline[k] = pos1;
          }

          startOutline[k] = Math.min(startOutline[k], pos1);
          endOutline[k] = Math.max(endOutline[k], pos1 + size1 + margin);
        }

        item.rect = (_item$rect = {}, _item$rect[pos1Name] = pos1, _item$rect[pos2Name] = pos2, _item$rect[size1Name] = size1, _item$rect[size2Name] = size2, _item$rect);
      }

      end = Math.max.apply(Math, endOutline); // check dist once

      if (i !== 0) {
        continue;
      } // find & fill empty block


      if (!frameFill) {
        dist = 0;
        continue;
      }

      dist = end;

      for (var _j = 0; _j < shapesSize; ++_j) {
        if (startOutline[_j] === DUMMY_POSITION) {
          continue;
        } // the dist between frame's end outline and next frame's start outline
        // expect that next frame's start outline is startOutline[j] + end


        dist = Math.min(startOutline[_j] + end - endOutline[_j], dist);
      }
    }

    for (var _i2 = 0; _i2 < shapesSize; ++_i2) {
      if (startOutline[_i2] !== DUMMY_POSITION) {
        continue;
      }

      startOutline[_i2] = Math.max.apply(Math, startOutline);
      endOutline[_i2] = startOutline[_i2];
    } // The target outline is start outline when type is APPENDING


    var targetOutline = isAppend ? startOutline : endOutline;
    var prevOutlineEnd = outline.length === 0 ? 0 : Math[isAppend ? "max" : "min"].apply(Math, outline);
    var prevOutlineDist = isAppend ? 0 : end;

    if (frameFill && outline.length === shapesSize) {
      prevOutlineDist = -DUMMY_POSITION;

      for (var _i3 = 0; _i3 < shapesSize; ++_i3) {
        if (startOutline[_i3] === endOutline[_i3]) {
          continue;
        } // if appending type is PREPEND, subtract dist from appending group's height.


        prevOutlineDist = Math.min(targetOutline[_i3] + prevOutlineEnd - outline[_i3], prevOutlineDist);
      }
    }

    for (var _i4 = 0; _i4 < shapesSize; ++_i4) {
      startOutline[_i4] += prevOutlineEnd - prevOutlineDist;
      endOutline[_i4] += prevOutlineEnd - prevOutlineDist;
    }

    items.forEach(function (item) {
      item.rect[pos1Name] += prevOutlineEnd - prevOutlineDist;
    });
    return {
      start: startOutline.map(function (point) {
        return parseInt(point, 10);
      }),
      end: endOutline.map(function (point) {
        return parseInt(point, 10);
      })
    };
  };

  _proto._insert = function _insert(items, outline, type, cache) {
    if (items === void 0) {
      items = [];
    }

    if (outline === void 0) {
      outline = [];
    }

    // this only needs the size of the item.
    var clone = cache ? items : cloneItems(items);
    return {
      items: clone,
      outlines: this._layout(clone, outline, type)
    };
  };
  /**
   * Adds items of groups at the bottom of a outline.
   * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.FrameLayout#layout
   * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
   * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * layout.layout(groups, [100, 200, 300, 400]);
   */


  _proto.layout = function layout(groups, outline) {
    if (groups === void 0) {
      groups = [];
    }

    if (outline === void 0) {
      outline = [];
    }

    var length = groups.length;
    var point = outline;

    for (var i = 0; i < length; ++i) {
      var group = groups[i];
      point = this._layout(group.items, point, APPEND);
      group.outlines = point;
      point = point.end;
    }

    return this;
  };
  /**
   * Set the viewport size of the layout.
   * @ko 레이아웃의 가시 사이즈를 설정한다.
   * @method eg.InfiniteGrid.FrameLayout#setSize
   * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
   * @return {eg.InfiniteGrid.FrameLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * layout.setSize(800);
   */


  _proto.setSize = function setSize(size) {
    this._size = size;
    return this;
  };
  /**
   * Adds items at the bottom of a outline.
   * @ko 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.FrameLayout#append
   * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
   * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
   * @example
   * layout.prepend(items, [100]);
   */


  _proto.append = function append(items, outline, cache) {
    return this._insert(items, outline, APPEND, cache);
  };
  /**
   * Adds items at the top of a outline.
   * @ko 아이템을 아웃라인 위에 추가한다.
   * @method eg.InfiniteGrid.FrameLayout#prepend
   * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
   * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
   * @example
   * layout.prepend(items, [100]);
   */


  _proto.prepend = function prepend(items, outline, cache) {
    return this._insert(items, outline, PREPEND, cache);
  };

  return FrameLayout;
}();

export default FrameLayout;