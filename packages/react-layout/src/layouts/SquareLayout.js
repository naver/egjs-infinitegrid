import Layout from "../Layout";
import {SquareLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class SquareLayout extends Layout {
    static defaultProps = {
        ...Layout.defaultProps,
        type: LayoutType,
    };
}
