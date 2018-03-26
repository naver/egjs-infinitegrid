declare class AutoSizer {
	static add(element: Element, prefix?: string): void;
	static resize(element: Element, prefix?: boolean): void;
	static remove(element: Element, isFixed?: boolean): void;
	static resizeAll(): void;
}

export default AutoSizer;