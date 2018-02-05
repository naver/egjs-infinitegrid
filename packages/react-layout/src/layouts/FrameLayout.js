import Layout from "../Layout";
import * as InfiniteGrid from "@egjs/infinitegrid";
import React from "react";

export default class FrameLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={InfiniteGrid.FrameLayout} options={{
            frame: this.props.frame,
        }}>{this.props.children}</Layout>
    }
}