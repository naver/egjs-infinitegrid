import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {innerWidth, innerHeight} from "@egjs/infinitegrid/src/utils";
import {NOT_LOADED, LOADING, LOADED} from "./consts";
import { DUMMY_POSITION } from "@egjs/infinitegrid/src/consts";

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orgSize: {},
            size: {},
            rect: 0,
            cssText: "",
            contents: "",
            loaded: NOT_LOADED,
        };
    }
    resetSize() {
        this.state.size = {};
        this.state.loaded = NOT_LOADED;
    }
    reset() {
        const el = this.state.el;

        if (el) {
            el.style.width = "";
            el.style.height = "";
        }
        this.state.orgSize = {};
        this.resetSize();
    }
    updateSize(size) {
        const state = this.state;
        const element = state.el;

        state.size = size || {
            width: innerWidth(element),
            height: innerHeight(element),
        };
        if (!state.orgSize || !state.orgSize.width) {
            state.orgSize = {
                width: state.size.width,
                height: state.size.height,
            };
        }
    }
    shouldComponentUpdate(props, state) {
        return true;
    }
    render() {
        return this.props.children;
    }
    renderElement() {
        const element = this.state.el;
        const rect = this.state.rect || {left: DUMMY_POSITION, top: DUMMY_POSITION};
        const style = ["position:absolute;"];

        ["left", "top", "width", "height"].forEach(p => {
            (p in rect) && (style.push(`${p}:${rect[p]}px;`));
        });
        const cssText = style.join("");

        this.state.cssText = cssText;
        element.style.cssText += cssText;
    }
    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this);
        const prevEl = this.state.el;
        const contents = this.state.contents;

        this.state.el = el;
        this.state.contents = el.innerHTML;

        if (el !== prevEl || contents !== this.state.contents) {
            this.reset();
        }
    }
    componentDidMount() {
        this.state.el = ReactDOM.findDOMNode(this);
        this.renderElement();
    }
}