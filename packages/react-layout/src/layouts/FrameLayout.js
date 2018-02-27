import Layout from "../Layout";
import {FrameLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class FrameLayout extends Layout {
    static defaultProps = {
        ...Layout.defaultProps,
        type: LayoutType,
    };
    static layoutProps = {
        frame: [],
    };
}
