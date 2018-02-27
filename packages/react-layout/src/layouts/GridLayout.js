import Layout from "../Layout";
import {GridLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class GridLayout extends Layout {
    static defaultProps = {
        ...Layout.defaultProps,
        type: LayoutType,
    };
}
