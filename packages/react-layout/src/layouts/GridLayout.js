import Layout from "../Layout";
import {GridLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class GridLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={LayoutType}>{this.props.children}</Layout>
    }
}