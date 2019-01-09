export declare type WindowMockType = {
    [P in keyof Window]?: Window[P] extends (...args: any[]) => any ? Window[P] : Partial<Window[P]>;
};
declare let win: WindowMockType;
export { win as window };
export declare const document: Partial<Document>;
