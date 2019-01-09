import { WindowMockType } from "./browser";
import { DEFAULT_OPTIONS } from "./consts";
import { IJQuery, IRectlProperties } from "./types";
export declare function toArray(nodes: HTMLCollection): HTMLElement[];
export declare function toArray<T extends Node>(nodes: T[] | NodeListOf<T>): T[];
export declare function matchHTML(html: string): RegExpMatchArray;
export declare function $(param: WindowMockType, multi?: false): WindowMockType;
export declare function $(param: string | HTMLElement | Array<string | HTMLElement> | IJQuery, multi: true): HTMLElement[];
export declare function $(param: string | HTMLElement | Array<string | HTMLElement> | IJQuery, multi?: false): HTMLElement;
export declare function addEvent(element: Element | WindowMockType, type: string, handler: (...args: any[]) => any, eventListenerOptions?: boolean | {
    [key: string]: any;
}): void;
export declare function removeEvent(element: Element | WindowMockType, type: string, handler: (...args: any[]) => any): void;
export declare function addOnceEvent(element: Element, type: string, handler: (...args: any[]) => any, eventListenerOptions?: boolean | {
    [key: string]: any;
}): void;
export declare function scroll(el: HTMLElement | WindowMockType, horizontal?: boolean): number;
export declare function scrollTo(el: WindowMockType | Element, x: number, y: number): void;
export declare function scrollBy(el: WindowMockType | Element, x: number, y: number): void;
export declare function getStyles(el: Element): any;
export declare function innerWidth(el: WindowMockType | Document | HTMLElement): number;
export declare function innerHeight(el: WindowMockType | Document | HTMLElement): number;
export declare function outerWidth(el: WindowMockType | Document | HTMLElement): number;
export declare function outerHeight(el: WindowMockType | Document | HTMLElement): number;
export declare function getSize(el: HTMLElement): {
    width: number;
    height: number;
};
export declare const STYLE: {
    vertical: IRectlProperties;
    horizontal: IRectlProperties;
};
export declare function getStyleNames(isHorizontal: boolean): IRectlProperties;
export declare function assign<A, B>(target: A, source: B): A & B;
export declare function assign<A, B, C>(target: A, source1: B, source2: C): A & B & C;
export declare function assign<A, B, C, D>(target: A, source1: B, source2: C, source3: D): A & B & C & D;
export declare function assign(target: {
    [key: string]: any;
}, ...sources: Array<{
    [key: string]: any;
}>): {
    [key: string]: any;
};
export declare function assignOptions<A extends {
    [key: string]: any;
}, B extends {
    [key: string]: any;
}>(defaultOptions: A, options: B): typeof DEFAULT_OPTIONS & A & B;
export declare function toZeroArray(outline?: number[]): number[];
export declare function cloneItems<T extends {
    [key: string]: any;
}>(items: T[]): ({} & T)[];
export declare function isJQuery(el: any): el is IJQuery;
export declare function isWindow(el: any): el is WindowMockType;
export declare function isDocument(el: Node): el is Document;
export declare function fill<T>(arr: T[], value: T): T[];
export declare function isUndefined(target: any): target is undefined;
