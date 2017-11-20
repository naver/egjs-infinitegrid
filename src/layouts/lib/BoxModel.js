class BoxModel {
	constructor(option) {
		this._originWidth = option.originWidth || 0;
		this._originHeight = option.originHeight || 0;
		this._width = option.width || 0;
		this._height = option.height || 0;
		this._left = option.left || 0;
		this._top = option.top || 0;
		this._item = option.item;
		this._innerItem = option.innerItem || [];
	}

	getOriginWidth() {
		return this._originWidth;
	}

	setOriginWidth(width) {
		this._originWidth = width;
	}

	getOriginHeight() {
		return this._originHeight;
	}

	setOriginHeight(height) {
		this._originHeight = height;
	}

	getWidth() {
		return this._width;
	}

	setWidth(width) {
		this._width = width;
	}

	getHeight() {
		return this._height;
	}

	setHeight(height) {
		this._height = height;
	}

	getLeft() {
		return this._left;
	}

	setLeft(left) {
		this._left = left;
	}

	getTop() {
		return this._top;
	}

	setTop(top) {
		this._top = top;
	}

	innerItem() {
		return this._innerItem;
	}

	scaleTo(width, height) {
		const scaleX = (this._width === 0) ? 0 : width / this._width;
		const scaleY = (this._height === 0) ? 0 : height / this._height;

		this._innerItem.forEach(v => {
			if (scaleX !== 0) {
				v._left *= scaleX;
				v._width *= scaleX;
			}
			if (scaleY !== 0) {
				v._top *= scaleY;
				v._height *= scaleY;
			}
		});

		this._width = width;
		this._height = height;
	}

	pushItem(item) {
		this._innerItem.push(item);
	}

	getOriginSize() {
		return this._originWidth * this._originHeight;
	}

	getSize() {
		return this._width * this._height;
	}

	getOriginRatio() {
		return (this._originHeight === 0) ? 0 : this._originWidth / this._originHeight;
	}

	getRatio() {
		return (this._height === 0) ? 0 : this._width / this._height;
	}

	isSmallerThen(box) {
		return (this._width <= box._width && this._height <= box._height);
	}

	isEqual(box) {
		return (this._left === box._left &&
		this._top === box._top &&
		this._width === box._width &&
		this._height === box._height);
	}
}

module.exports = BoxModel;
