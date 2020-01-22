import { number, object, radios, boolean, array } from "@storybook/addon-knobs";

export const GRIDLAYOUT_OPTIONS = ["margin", "align"];
export const JUSTIFIEDLAYOUT_OPTIONS = ["margin", "column", "minSize", "maxSize"];
export const FRAMELAYOUT_OPTIONS = ["margin", "itemSize", "frame", "frameFill"];
export const SQUARELAYOUT_OPTIONS = ["margin", "itemSize", "column"];
export const PACKINGLAYOUT_OPTIONS = ["margin", "horizontal", "aspectRatio", "sizeWeight", "ratioWeight"];

export function getDefaultOptionKeys({
    useVirtualScroll,
    useHorizontal,
    useIsConstantSize,
    useIsEqualSize,
}: {
    useVirtualScroll?: boolean,
    useHorizontal?: boolean,
    useIsConstantSize?: boolean,
    useIsEqualSize?: boolean,
}) {
    const options = ["isOverflowScroll"];

    if (useVirtualScroll) {
        options.push("useFit", "useRecycle");
    }
    if (useHorizontal) {
        options.push("horizontal");
    }
    if (useIsConstantSize) {
        options.push("isConstantSize");
    }
    if (useIsEqualSize) {
        options.push("isEqualSize");
    }
    return options;
}
export function getDefaultOptions({
    useVirtualScroll,
    useHorizontal,
    useIsConstantSize,
    useIsEqualSize,
}: {
    useVirtualScroll?: boolean,
    useHorizontal?: boolean,
    useIsConstantSize?: boolean,
    useIsEqualSize?: boolean,
}) {
    const horizontal = useHorizontal ? boolean("horizontal", false) : false;
    const isOverflowScroll = boolean("isOverflowScroll", false);
    const useFit = useVirtualScroll ? boolean("useFit", true) : true;
    const useRecycle = useVirtualScroll ? boolean("useRecycle", true) : true;
    const isConstantSize = useIsConstantSize ? boolean("isConstantSize", true) : false;
    const isEqualSize = useIsEqualSize ? boolean("isEqualSize", true) : false;

    return {
        horizontal,
        isOverflowScroll,
        useFit,
        useRecycle,
        isConstantSize,
        isEqualSize,
    };
}
export function getSquareLayoutKnobs() {
    const margin = number("margin", 5);
    const itemSize = number("itemSize", 0);
    const column = number("column", 5);

    return {
        margin,
        itemSize,
        column,
    };
}
export function getJustifiedLayoutKnobs() {
    const margin = number("margin", 5);
    const column = object("column", [1, 8]);
    const minSize = number("minSize", 0);
    const maxSize = number("maxSize", 0);

    return {
        margin,
        column,
        minSize,
        maxSize,
    };
}

export function getGridLayoutKnobs() {
    const margin = number("margin", 5);
    const align = radios("align", {
        start: "start",
        center: "center",
        end: "end",
        justify: "justify",
    }, "center");

    return {
        margin,
        align,
    };
}

export function getPackingLayoutKnobs() {
    const margin = number("margin", 5);
    const aspectRatio = number("aspectRatio", 1);
    const sizeWeight = number("sizeWeight", 1);
    const ratioWeight = number("ratioWeight", 1);

    return {
        margin,
        aspectRatio,
        sizeWeight,
        ratioWeight,
    };
}
export function getFrameLayoutKnobs() {
    const margin = number("margin", 5);
    const frame = object("frame", [
        [1, 1, 2, 3, 4, 4],
        [5, 5, 6, 7, 4, 4],
        [5, 5, 8, 9, 9, 10],
    ]);
    const itemSize = number("itemSize", 0);
    const frameFill = boolean("frameFill", false);

    return {
        margin,
        frame,
        itemSize,
        frameFill,
    };
}
