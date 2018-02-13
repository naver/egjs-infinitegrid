import Layout from "../Layout";
import {JustifiedLayout as LayoutType} from "@egjs/infinitegrid";
import React from "react";

export default class JustifiedLayout extends React.Component {
    render() {
        return <Layout {...this.props} type={LayoutType}>{this.props.children}</Layout>
    }
}