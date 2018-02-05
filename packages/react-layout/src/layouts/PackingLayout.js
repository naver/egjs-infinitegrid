import Layout from "../Layout";
import * as InfiniteGrid from "@egjs/infinitegrid";
import React from "react";

export default class PackingLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={InfiniteGrid.PackingLayout}>{this.props.children}</Layout>
    }
}