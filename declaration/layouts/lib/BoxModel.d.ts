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
    originWidth: number;
    originHeight: number;
    width: number;
    height: number;
    left: number;
    top: number;
    items: BoxModel[];
    constructor(options: Partial<BoxModel>);
    scaleTo(width: number, height: number): void;
    push(item: BoxModel): void;
    getOriginSize(): number;
    getSize(): number;
    getOriginRatio(): number;
    getRatio(): number;
}
export {};
