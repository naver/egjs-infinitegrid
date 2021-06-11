import { IAlign, IJQuery, PositionType, SizeType, IInfiniteGridItem } from "./types";
export interface IParallaxStyle {
    position: PositionType;
    size: SizeType;
    cammelSize: string;
    coordinate: string;
}
declare class Parallax {
    options: {
        container: HTMLElement;
        selector: string;
        strength: number;
        center: number;
        range: number[];
        align: IAlign[keyof IAlign];
        horizontal: boolean;
    };
    private _root;
    private _container;
    private _rootSize;
    private _containerPosition;
    private _style;
    constructor(root?: Window | HTMLElement | IJQuery | string, options?: Partial<Parallax["options"]>);
    resize(items?: IInfiniteGridItem[]): this;
    refresh(items?: IInfiniteGridItem[], scrollPositionStart?: number): this;
    private _checkParallaxItem;
}
export default Parallax;
