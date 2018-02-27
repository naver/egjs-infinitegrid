import Layout from "../Layout";
import {JustifiedLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class JustifiedLayout extends Layout {
    static defaultProps = {
        ...Layout.defaultProps,
        type: LayoutType,
    };
}
