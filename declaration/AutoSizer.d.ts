interface IAutoSizierElemenet extends HTMLElement {
    __PREFIX__?: string;
}
export default class AutoSizer {
    static add(element: IAutoSizierElemenet, prefix?: string): void;
    static remove(element: IAutoSizierElemenet, isFixed?: boolean): void;
    static resize(element: IAutoSizierElemenet, prefix?: string): void;
    static resizeAll(): void;
}
export {};
