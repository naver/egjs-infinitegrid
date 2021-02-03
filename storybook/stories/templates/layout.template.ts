const MARGIN_DESCRIPTION = "Margin used to create space around items";
export const GRIDLAYOUT_OPTIONS = ["margin", "align"];
export const JUSTIFIEDLAYOUT_OPTIONS = ["margin", "column", "row", "minSize", "maxSize"];
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
    return {
        horizontal: {
            type: "boolean", default: false, disable: !useHorizontal,
            description: "Whether to scroll horizontally",
        },
        isOverflowScroll: {
            type: "boolean", default: false,
            description: "Indicates whether overflow:scroll is applied",
        },
        useFit: {
            type: "boolean", default: true, disable: !useVirtualScroll,
            description: "The useFit option scrolls upwards so that no space is visible until an item is added",
        },
        useRecycle: {
            type: "boolean", default: true, disable: !useVirtualScroll,
            description: "Indicates whether keep the number of DOMs is maintained.",
        },
        isConstantSize: {
            type: "boolean", default: !!useIsConstantSize, disable: !useIsConstantSize,
            description: "Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved.",
        },
        isEqualSize: {
            type: "boolean", default: !!useIsEqualSize, disable: !useIsEqualSize,
            description: "Indicates whether sizes of all card elements are equal to one another.",
        },
    };
}
export function getSquareLayoutArgs() {
    return {
        margin: {
            type: "number", default: 5,
            description: MARGIN_DESCRIPTION,
        },
        itemSize: {
            type: "number", default: 0,
            description: "The size of the items. If it is 0, it is calculated as the size of the first item in items. (priority: column > itemSize > element's size)",
        },
        column: {
            type: "number", default: 5,
            description: "The number of columns in the layout. If it is 0, the column is returned by itemSize. (priority: column > itemSize > element's size)",
        },
    };
}
export function getJustifiedLayoutArgs() {
    return {
        margin: {
            type: "number", default: 5,
            description: MARGIN_DESCRIPTION,
        },
        column: {
            type: "object", default: [1, 8],
            description: "The number of items in a line",
        },
        row: {
            type: "object", default: 0,
            description: "The number of rows in a group",
        },
        minSize: {
            type: "number", default: 0,
            description: "Minimum size of item to be resized",
        },
        maxSize: {
            type: "number", default: 0,
            description: "Maximum size of item to be resized",
        },
    };
}

export function getGridLayoutArgs() {
    return {
        margin: {
            type: "number", default: 5,
            description: MARGIN_DESCRIPTION,
        },
        align: {
            type: "inline-radio", options: ["start", "center", "end", "justify"], default: "justify",
            description: "Align of the position of the items (start, center, end, justify)",
        },
    };
}

export function getPackingLayoutArgs() {
    return {
        margin: {
            type: "number", default: 5,
            description: MARGIN_DESCRIPTION,
        },
        aspectRatio: {
            type: "number", default: 1,
            description: "The aspect ratio of the group",
        },
        sizeWeight: {
            type: "number", default: 1,
            description: "The size weight when placing an image",
        },
        ratioWeight: {
            type: "number", default: 1,
            description: "The ratio weight when placing an image",
        },
    };
}
export function getFrameLayoutArgs() {
    return {
        margin: {
            type: "number", default: 5,
            description: MARGIN_DESCRIPTION,
        },
        frame: {
            type: "object", default: [
                [1, 1, 2, 3, 4, 4],
                [5, 5, 6, 7, 4, 4],
                [5, 5, 8, 9, 9, 10],
            ],
            description: "The size of the items. If it is 0, it is calculated as the size of the first item in items.",
        },
        itemSize: {
            type: "number", default: 0,
            description: "The size of the items. If it is 0, it is calculated as the size of the first item in items.",
        },
        frameFill: {
            type: "boolean", default: false,
            description: "Make sure that the frame can be attached after the previous frame.",
        },
    };
}
