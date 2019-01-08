import { assign } from "../../utils";

interface IBoxModel {
	originWidth: number;
	originHeight: number;
	width: number;
	height: number;
	left: number;
	top: number;
	items: BoxModel[];
}

export default class BoxModel implements IBoxModel {
	public originWidth: number;
	public originHeight: number;
	public width: number;
	public height: number;
	public left: number;
	public top: number;
	public items: BoxModel[];
	constructor(options: Partial<BoxModel>) {
		assign(this, {
			originWidth: 0,
			originHeight: 0,
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			items: [],
		}, options);
	}
	public scaleTo(width: number, height: number) {
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
	public push(item: BoxModel) {
		this.items.push(item);
	}
	public getOriginSize() {
		return this.originWidth * this.originHeight;
	}
	public getSize() {
		return this.width * this.height;
	}
	public getOriginRatio() {
		return (this.originHeight === 0) ? 0 : this.originWidth / this.originHeight;
	}
	public getRatio() {
		return (this.height === 0) ? 0 : this.width / this.height;
	}
}
