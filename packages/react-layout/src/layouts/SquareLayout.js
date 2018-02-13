import Layout from "../Layout";
import {SquareLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class SquareLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={LayoutType}>{this.props.children}</Layout>
    }
}