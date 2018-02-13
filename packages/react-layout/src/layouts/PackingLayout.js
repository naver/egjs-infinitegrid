import Layout from "../Layout";
import {PackingLayout as LayoutType} from "@egjs/infinitegrid";

import React from "react";

export default class PackingLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={LayoutType}>{this.props.children}</Layout>
    }
}