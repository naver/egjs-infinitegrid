import BoxModel from "./lib/BoxModel.js";
import { APPEND, PREPEND } from "../consts";
import { getStyleNames, assignOptions, toZeroArray, cloneItems } from "../utils";

function getCost(originLength, length) {
  var cost = originLength / length;

  if (cost < 1) {
    cost = 1 / cost;
  }

  return cost - 1;
}

function fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical) {
  item.height = itemFitSize.height;
  item.width = itemFitSize.width;
  bestFitArea.height = containerFitSize.height;
  bestFitArea.width = containerFitSize.width;

  if (layoutVertical) {
    item.top = bestFitArea.top + bestFitArea.height;
    item.left = bestFitArea.left;
  } else {
    item.left = bestFitArea.left + bestFitArea.width;
    item.top = bestFitArea.top;
  }
}
/**
 * @classdesc The PackingLayout is a layout that shows the important cards bigger without sacrificing the weight of the cards. Rows and columns are separated so that cards are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
 * @ko PackingLayout은 카드의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다. 행과 열이 구분돼 이미지를 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 카드를 배치한다.
 * @class eg.InfiniteGrid.PackingLayout
 * @param {Object} [options] The option object of eg.InfiniteGrid.PackingLayout module <ko>eg.InfiniteGrid.PackingLayout 모듈의 옵션 객체</ko>
 * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
 * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
 * @param {Boolean} [options.aspectRatio=1] The aspect ratio of the group <ko> 그룹의 가로 세로 비 </ko>
 * @param {Boolean} [options.sizeWeight=1] The size weight when placing an image <ko> 이미지를 배치할 때 사이즈 가중치 </ko>
 * @param {Boolean} [options.ratioWeight=1] The ratio weight when placing an image <ko> 이미지를 배치할 때 비율 가중치 </ko>
 * @example
```
<script>
var ig = new eg.InfiniteGrid("#grid". {
	horizontal: true,
});

ig.setLayout(eg.InfiniteGrid.PackingLayout, {
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

// or

var layout = new eg.InfiniteGrid.PackingLayout({
	horizontal: true,
	margin: 10,
	aspectRatio: 1,
	sizeWeight: 1,
	ratioWeight: 2,
});

</script>
```
 **/


var PackingLayout =
/*#__PURE__*/
function () {
  function PackingLayout(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = assignOptions({
      margin: 0,
      horizontal: false,
      aspectRatio: 1,
      sizeWeight: 1,
      ratioWeight: 1
    }, options);
    this._size = 0;
    this._style = getStyleNames(this.options.horizontal);
  }

  var _proto = PackingLayout.prototype;

  _proto._findBestFitArea = function _findBestFitArea(container, item) {
    if (container.getRatio() === 0) {
      // 아이템 최초 삽입시 전체영역 지정
      container.originWidth = item.width;
      container.originHeight = item.height;
      container.width = item.width;
      container.height = item.height;
      return;
    }

    var bestFitArea = null;
    var minCost = 10000000;
    var layoutVertical = false;
    var itemFitSize = {
      width: 0,
      height: 0
    };
    var containerFitSize = {
      width: 0,
      height: 0
    };
    var _this$options = this.options,
        sizeWeight = _this$options.sizeWeight,
        ratioWeight = _this$options.ratioWeight;
    container.items.forEach(function (v) {
      var containerSizeCost = getCost(v.getOriginSize(), v.getSize()) * sizeWeight;
      var containerRatioCost = getCost(v.getOriginRatio(), v.getRatio()) * ratioWeight;
      var width = v.width;
      var height = v.height;
      var cost;

      for (var i = 0; i < 2; ++i) {
        var itemWidth = void 0;
        var itemHeight = void 0;
        var containerWidth = void 0;
        var containerHeight = void 0;

        if (i === 0) {
          // 상하에 아이템 추가
          itemWidth = width;
          itemHeight = height * (item.height / (v.originHeight + item.height));
          containerWidth = width;
          containerHeight = height - itemHeight;
        } else {
          // 좌우에 아이템 추가
          itemHeight = height;
          itemWidth = width * (item.width / (v.originWidth + item.width));
          containerHeight = height;
          containerWidth = width - itemWidth;
        }

        var itemSize = itemWidth * itemHeight;
        var itemRatio = itemWidth / itemHeight;
        var containerSize = containerWidth * containerHeight;
        var containerRatio = containerHeight / containerHeight;
        cost = getCost(item.getSize(), itemSize) * sizeWeight;
        cost += getCost(item.getRatio(), itemRatio) * ratioWeight;
        cost += getCost(v.getOriginSize(), containerSize) * sizeWeight - containerSizeCost;
        cost += getCost(v.getOriginRatio(), containerRatio) * ratioWeight - containerRatioCost;

        if (cost === Math.min(cost, minCost)) {
          minCost = cost;
          bestFitArea = v;
          layoutVertical = i === 0;
          itemFitSize.width = itemWidth;
          itemFitSize.height = itemHeight;
          containerFitSize.width = containerWidth;
          containerFitSize.height = containerHeight;
        }
      }
    });
    fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical);
  };

  _proto._layout = function _layout(items, outline, isAppend) {
    var _this = this;

    if (outline === void 0) {
      outline = [];
    }

    var style = this._style;
    var _this$options2 = this.options,
        horizontal = _this$options2.horizontal,
        aspectRatio = _this$options2.aspectRatio,
        margin = _this$options2.margin;
    var pos1Name = style.pos1;
    var containerWidth = this._size * (horizontal ? aspectRatio : 1);
    var containerHeight = this._size / (horizontal ? 1 : aspectRatio);
    var containerSize1 = horizontal ? containerWidth : containerHeight;
    var prevOutline = toZeroArray(outline);
    var start = isAppend ? Math.max.apply(Math, prevOutline) : Math.min.apply(Math, prevOutline) - containerSize1 - margin;
    var end = start + containerSize1 + margin;
    var container = new BoxModel({});
    items.forEach(function (item) {
      var _item$orgSize = item.orgSize,
          width = _item$orgSize.width,
          height = _item$orgSize.height;
      var model = new BoxModel({
        width: width,
        height: height,
        originWidth: width,
        originHeight: height
      });

      _this._findBestFitArea(container, model);

      container.push(model);
      container.scaleTo(containerWidth + margin, containerHeight + margin);
    });
    items.forEach(function (item, i) {
      var boxItem = container.items[i];
      var width = boxItem.width;
      var height = boxItem.height;
      var top = boxItem.top;
      var left = boxItem.left;
      item.rect = {
        top: top,
        left: left,
        width: width - margin,
        height: height - margin
      };
      item.rect[pos1Name] += start;
    });
    return {
      start: [start],
      end: [end]
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
   * Adds items at the bottom of a outline.
   * @ko 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.PackingLayout#append
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
   * @method eg.InfiniteGrid.PackingLayout#prepend
   * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
   * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
   * @example
   * layout.prepend(items, [100]);
   */


  _proto.prepend = function prepend(items, outline, cache) {
    return this._insert(items, outline, PREPEND, cache);
  };
  /**
   * Adds items of groups at the bottom of a outline.
   * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
   * @method eg.InfiniteGrid.PackingLayout#layout
   * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
   * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
   * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
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
   * @method eg.InfiniteGrid.PackingLayout#setSize
   * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
   * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
   * @example
   * layout.setSize(800);
   */


  _proto.setSize = function setSize(size) {
    this._size = size;
    return this;
  };

  return PackingLayout;
}();

export default PackingLayout;