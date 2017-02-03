import Component from "eg.component";
import HammerManager from "./hammerManager";
import EventHandler from "./eventHandler";
import AnimationHandler from "./animationHandler";
import {DIRECTION} from "./consts";
import {Mixin} from "./utils";

/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.InfiniteGrid module, see demos.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치로 전달 받은 사용자의 동작을 가상 좌표계의 논리적 좌표로 변경하는 모듈. 사용자의 동작으로 애니메이션이 일어나면 시간순으로 변경되는 좌표 정보도 제공한다. 변경된 논리적 좌표를 반영해 UI를 구현할 수 있다. eg.InfiniteGrid 모듈의 자세한 작동 방식은 데모를 참고한다.
 * @class
 * @name eg.InfiniteGrid
 * @extends eg.Component
 *
 * @param {Object} options The option object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
 * @param {Array} options.min The minimum value of X and Y coordinates <ko>좌표계의 최솟값</ko>
 * @param {Number} [options.min.0=0] The X coordinate of the minimum <ko>최소 x좌표</ko>
 * @param {Number} [options.min.1=0] The Y coordinate of the minimum <ko>최소 y좌표</ko>
 *
 * @param {Array} options.max The maximum value of X and Y coordinates <ko>좌표계의 최댓값</ko>
 * @param {Number} [options.max.0=100] The X coordinate of the maximum<ko>최대 x좌표</ko>
 * @param {Number} [options.max.1=100] The Y coordinate of the maximum<ko>최대 y좌표</ko>
 *
 * @param {Array} options.bounce The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
 * @param {Boolean} [options.bounce.0=10] The size of top area <ko>위쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.1=10] The size of right area <ko>오른쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.2=10] The size of bottom area <ko>아래쪽 바운스 영역의 크기</ko>
 * @param {Boolean} [options.bounce.3=10] The size of left area <ko>왼쪽 바운스 영역의 크기</ko>
 *
 * @param {Array} options.margin The size of accessible space outside the coordinate area. If an element is dragged outside the coordinate area and then dropped, the coordinates of the element are returned back into the coordinate area. The size of margins that can be exceeded <ko>−	좌표 영역을 넘어 이동할 수 있는 바깥 영역의 크기. 사용자가 좌표를 바깥 영역까지 끌었다가 놓으면 좌표가 좌표 영역 안으로 들어온다.</ko>
 * @param {Boolean} [options.margin.0=0] The size of top margin <ko>위쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.1=0] The size of right margin <ko>오른쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.2=0] The size of bottom margin <ko>아래쪽 바깥 영역의 크기</ko>
 * @param {Boolean} [options.margin.3=0] The size of left margin <ko>왼쪽 바깥 영역의 크기</ko>
 * @param {Array} options.circular Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
 * @param {Boolean} [options.circular.0=false] Indicates whether to circulate to top <ko>위로 순환 여부</ko>
 * @param {Boolean} [options.circular.1=false] Indicates whether to circulate to right <ko>오른쪽으로 순환 여부</ko>
 * @param {Boolean} [options.circular.2=false] Indicates whether to circulate to bottom  <ko>아래로 순환 여부</ko>
 * @param {Boolean} [options.circular.3=false] Indicates whether to circulate to left  <ko>왼쪽으로 순환 여부</ko>
 *
 * @param {Function} [options.easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [options.maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @see HammerJS {@link http://hammerjs.github.io}
 * @see • Hammer.JS applies specific CSS properties by default when creating an instance (See {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). The eg.InfiniteGrid module removes all default CSS properties provided by Hammer.JS <ko>Hammer.JS는 인스턴스를 생성할 때 기본으로 특정 CSS 속성을 적용한다(참고: @link{http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html}). 특정한 상황에서는 Hammer.JS의 속성 때문에 사용성에 문제가 있을 수 있다. eg.InfiniteGrid 모듈은 Hammer.JS의 기본 CSS 속성을 모두 제거했다</ko>
 *
 * @codepen {"id":"jPPqeR", "ko":"MovableCoord Cube 예제", "en":"MovableCoord Cube example", "collectionId":"AKpkGW", "height": 403}
 *
 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}) <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@lin https://jqueryui.com/easing})를 사용한다</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
const MovableCoord = class MovableCoord
extends Mixin(Component).with(EventHandler, AnimationHandler) {
	constructor(options) {
		super();
		Object.assign(this.options = {
			min: [0, 0],
			max: [100, 100],
			bounce: [10, 10, 10, 10],
			margin: [0, 0, 0, 0],
			circular: [false, false, false, false],
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			maximumDuration: Infinity,
			deceleration: 0.0006
		}, options);
		this._reviseOptions();
		this._hammerManager = new HammerManager();
		this._pos = this.options.min.concat();
	}

	/**
	 * Registers an element to use the eg.InfiniteGrid module.
	 * @ko eg.InfiniteGrid 모듈을 사용할 엘리먼트를 등록한다
	 * @method eg.InfiniteGrid#bind
	 * @param {HTMLElement|String|jQuery} element An element to use the eg.InfiniteGrid module<ko>−	eg.InfiniteGrid 모듈을 사용할 엘리먼트</ko>
	 * @param {Object} options The option object of the bind() method <ko>bind() 메서드의 옵션 객체</ko>
	 * @param {Number} [options.direction=eg.InfiniteGrid.DIRECTION_ALL] Coordinate direction that a user can move<br>- eg.InfiniteGrid.DIRECTION_ALL: All directions available.<br>- eg.InfiniteGrid.DIRECTION_HORIZONTAL: Horizontal direction only.<br>- eg.InfiniteGrid.DIRECTION_VERTICAL: Vertical direction only<ko>사용자의 동작으로 움직일 수 있는 좌표의 방향.<br>- eg.InfiniteGrid.DIRECTION_ALL: 모든 방향으로 움직일 수 있다.<br>- eg.InfiniteGrid.DIRECTION_HORIZONTAL: 가로 방향으로만 움직일 수 있다.<br>- eg.InfiniteGrid.DIRECTION_VERTICAL: 세로 방향으로만 움직일 수 있다.</ko>
	 * @param {Array} options.scale Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
	 * @param {Number} [options.scale.0=1] X-axis scale <ko>x축 배율</ko>
	 * @param {Number} [options.scale.1=1] Y-axis scale <ko>y축 배율</ko>
	 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
	 * @param {Number} [options.interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
	 * @param {Array} [options.inputType] Types of input devices. (default: ["touch", "mouse"])<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.(기본값: ["touch", "mouse"])<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
	 *
	 * @return {eg.InfiniteGrid} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	bind(element, options) {
		this._hammerManager.add(element, options, this);
		return this;
	}
	/**
	 * Detaches an element using the eg.InfiniteGrid module.
	 * @ko eg.InfiniteGrid 모듈을 사용하는 엘리먼트를 해제한다
	 * @method eg.InfiniteGrid#unbind
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.InfiniteGrid module is detached<ko>eg.InfiniteGrid 모듈을 해제할 엘리먼트</ko>
	 * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	unbind(element) {
		this._hammerManager.remove(element);
		return this;
	}

	/**
	 * get a hammer instance from elements using the eg.InfiniteGrid module.
	 * @ko eg.InfiniteGrid 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
	 * @method eg.InfiniteGrid#getHammer
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.InfiniteGrid module is using<ko>eg.InfiniteGrid 모듈을 사용하는 엘리먼트</ko>
	 * @return {Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
	 */
	getHammer(element) {
		return this._hammerManager.getHammer(element);
	}

	// set up 'css' expression
	_reviseOptions() {
		let key;

		["bounce", "margin", "circular"].forEach(v => {
			key = this.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					this.options[v] = key.length === 2 ?
						key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key)) {
					this.options[v] = [key, key, key, key];
				} else {
					this.options[v] = null;
				}
			}
		});
	}

	/**
	 * Returns the current position of the logical coordinates.
	 * @ko 논리적 좌표의 현재 위치를 반환한다
	 * @method eg.InfiniteGrid#get
	 * @return {Array} pos <ko>좌표</ko>
	 * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
	 * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
	 */
	get() {
		return this._pos.concat();
	}

	/**
	 * Destroys elements, properties, and events used in a module.
	 * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	 * @method eg.InfiniteGrid#destroy
	 */
	destroy() {
		this.off();
		this._hammerManager.destroy();
	}
};

Object.assign(MovableCoord, DIRECTION);
MovableCoord.VERSION = "#__VERSION__#";
export default MovableCoord;
