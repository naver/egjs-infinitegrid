import {IS_IOS} from "./consts";
import {utils} from "./utils";
import {window} from "./browser";

export default superclass => class extends superclass {
	constructor(el, options) {
		super();
		this.view = window;
		this._onScroll = this._onScroll.bind(this);
		this._onResize = this._onResize.bind(this);
		this._attachEvent();
	}
	_attachEvent() {
		utils.addEvent(this.view, "scroll", this._onScroll);
		utils.addEvent(this.view, "resize", this._onResize);
	}
	_onScroll() {
		if (this.isProcessing()) {
			return;
		}
		let scrollTop = utils.scrollTop();
		const prevScrollTop = this._prevScrollTop;

		if ((IS_IOS && scrollTop === 0) || prevScrollTop === scrollTop) {
			return;
		}
		let ele;
		let rect;

		if (prevScrollTop < scrollTop) {
			if (utils.isEmptyObject(this._bottomElement)) {
				this._bottomElement = this.getBottomElement();
				if (this._bottomElement == null) {
					return;
				}
			}
			ele = this._bottomElement;
			rect = ele.getBoundingClientRect();
			if (rect.top <= this._clientHeight + this.options.threshold) {
				/**
				 * This event is fired when a card element must be added at the bottom of a grid layout because there is no card to be displayed on screen when a user scrolls near bottom.
				 * @ko 카드 엘리먼트가 그리드 레이아웃의 아래에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
				 * @name eg.InfiniteGrid#append
				 * @event
				 *
				 * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>현재 스크롤의 y 좌표 값</ko>
				 */
				this.trigger("append", {
					scrollTop
				});
			}
		} else {
			if (utils.isEmptyObject(this._topElement)) {
				this._topElement = this.getTopElement();
				if (this._topElement == null) {
					return;
				}
			}
			ele = this._topElement;
			rect = ele.getBoundingClientRect();
			if (rect.bottom >= -this.options.threshold) {
				/**
				 * This event is fired when a card element must be added at the top of a grid layout because there is no card to be displayed on screen when a user scrolls near top. This event is available only if the isRecycling() method returns true.
				 * @ko 카드가 그리드 레이아웃의 위에 추가돼야 할 때 발생하는 이벤트. 사용자가 위로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다. 이 이벤트는 isRecycling() 메서드의 반환값이 'true'일 때만 발생한다
				 * @name eg.InfiniteGrid#prepend
				 * @event
				 *
				 * @param {Object} param The object of data to be sent to an event<ko>이벤트에 전달되는 데이터 객체</ko>
				 * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>현재 스크롤의 y 좌표 값</ko>
				 */
				const croppedDistance = this.fit();

				if (croppedDistance > 0) {
					scrollTop -= croppedDistance;
					this.view.scrollTo(0, scrollTop);
				}
				this.trigger("prepend", {
					scrollTop
				});
			}
		}
		this._prevScrollTop = scrollTop;
	}

	_onResize() {
		if (this._resizeTimeout) {
			clearTimeout(this._resizeTimeout);
		}
		this._resizeTimeout = setTimeout(() => {
			this._refreshViewport();
			(utils.innerWidth(this.el) !== this._containerWidth) &&
				this.layout(this.items, true);
			this._resizeTimeout = null;
			this._prevScrollTop = -1;
		}, 100);
	}

	_detachEvent() {
		utils.removeEvent(this.view, "scroll", this._onScroll);
		utils.removeEvent(this.view, "resize", this._onResize);
	}
};
