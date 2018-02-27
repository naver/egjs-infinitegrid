import Layout from "../Layout";
import {PackingLayout as LayoutType} from "@egjs/infinitegrid";

import React from "react";

export default class PackingLayout extends Layout {
    static defaultProps = {
        ...Layout.defaultProps,
        type: LayoutType,
    };
}
