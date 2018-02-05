import Layout from "../Layout";
import * as InfiniteGrid from "@egjs/infinitegrid";
import React from "react";

export default class GridLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={InfiniteGrid.GridLayout}>{this.props.children}</Layout>
    }
}