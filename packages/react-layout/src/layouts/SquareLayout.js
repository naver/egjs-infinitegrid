import Layout from "../Layout";
import * as InfiniteGrid from "@egjs/infinitegrid";
import React from "react";

export default class SquareLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={InfiniteGrid.SquareLayout}>{this.props.children}</Layout>
    }
}