import Layout from "../Layout";
import * as InfiniteGrid from "@egjs/infinitegrid";
import React from "react";

export default class JustifiedLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={InfiniteGrid.JustifiedLayout}>{this.props.children}</Layout>
    }
}