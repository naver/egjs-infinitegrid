class BoxModel {
	constructor(options) {
		Object.assign(this, {
			originWidth: 0,
			originHeight: 0,
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			items: [],
		}, options);
	}
	scaleTo(width, height) {
		const scaleX = this.width ? width / this.width : 0;
		const scaleY = this.height ? height / this.height : 0;

		this.items.forEach(v => {
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
	push(item) {
		this.items.push(item);
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
}

module.exports = BoxModel;
