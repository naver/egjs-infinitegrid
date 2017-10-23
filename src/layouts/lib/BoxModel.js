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

	get item() {
		return this._item;
	}

	get originWidth() {
		return this._originWidth;
	}

	set originWidth(width) {
		this._originWidth = width;
	}

	get originHeight() {
		return this._originHeight;
	}

	set originHeight(height) {
		this._originHeight = height;
	}

	get width() {
		return this._width;
	}

	set width(width) {
		this._width = width;
	}

	get height() {
		return this._height;
	}

	set height(height) {
		this._height = height;
	}

	get left() {
		return this._left;
	}

	set left(left) {
		this._left = left;
	}

	get top() {
		return this._top;
	}

	set top(top) {
		this._top = top;
	}

	get innerItem() {
		return this._innerItem;
	}

	scaleTo(width, height) {
		const scaleX = (this._width === 0) ? 0 : width / this._width;
		const scaleY = (this._height === 0) ? 0 : height / this._height;

		this._innerItem.forEach(v => {
			if (scaleX !== 0) {
				v.left *= scaleX;
				v.width *= scaleX;
			}
			if (scaleY !== 0) {
				v.top *= scaleY;
				v.height *= scaleY;
			}
		});

		this.width = width;
		this.height = height;
	}

	pushItem(item) {
		this._innerItem.push(item);
	}

	getOriginSize() {
		return this.originWidth * this.originHeight;
	}

	getSize() {
		return this.width * this.height;
	}

	getOriginRatio() {
		return (this.originHeight === 0) ? 0 : this.originWidth / this.originHeight;
	}

	getRatio() {
		return (this.height === 0) ? 0 : this.width / this.height;
	}

	isSmallerThen(box) {
		return (this.width <= box.width && this.height <= box.height);
	}

	isEqual(box) {
		return (this.left === box.left &&
		this.top === box.top &&
		this.width === box.width &&
		this.height === box.height);
	}
}

module.exports = BoxModel;
