import InfiniteGrid, { InfiniteGridMethods } from "@egjs/infinitegrid";


interface ComponentOptions {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: {};
    hydrate?: boolean;
    intro?: boolean;
}

interface InfiniteGridComponent extends InfiniteGridMethods {
    new(options: ComponentOptions): any;
    // client-side methods
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;
    // server-side methods
    render(props?: {}): {
        html: string;
        css: { code: string; map: string | null };
        head?: string;
    };
}


export default InfiniteGridComponent;

export interface GridLayout extends InfiniteGridComponent {}
export interface JustifiedLayout extends InfiniteGridComponent {}
export interface SquareLayout extends InfiniteGridComponent {}
export interface FrameLayout extends InfiniteGridComponent {}
export interface PackingLayout extends InfiniteGridComponent {}
