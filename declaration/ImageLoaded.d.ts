export declare type CHECK_ALL = 1;
export declare type CHECK_ONLY_ERROR = 2;
export interface IImageLoadedOptions {
    prefix?: string;
    length?: number;
    type?: CHECK_ALL | CHECK_ONLY_ERROR;
    complete?: () => void;
    end?: () => void;
    error?: (e: {
        target: LoadingImageElement;
        itemIndex: number;
    }) => void;
}
export declare const CHECK_ALL: CHECK_ALL;
export declare const CHECK_ONLY_ERROR: CHECK_ONLY_ERROR;
interface LoadingImageElement extends HTMLImageElement {
    __ITEM_INDEX__?: number;
}
declare class ImageLoaded {
    static CHECK_ALL: number;
    static CHECK_ONLY_ERROR: number;
    static waitImageLoaded(checklist: LoadingImageElement[][], { prefix, length, type, complete, error, end }: IImageLoadedOptions): void;
    static checkImageLoaded(el: HTMLElement): HTMLImageElement[];
    static check(elements: HTMLElement[], { prefix, type, complete, error, end }: IImageLoadedOptions): void;
}
export default ImageLoaded;
