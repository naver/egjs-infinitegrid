import Layout from "../Layout";
import {FrameLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class FrameLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={LayoutType} options={{
            frame: this.props.frame,
        }}>{this.props.children}</Layout>
    }
}