import React, {Component} from "react";
import ReactDOM from "react-dom";
import {outerWidth, outerHeight} from "./utils";

export default class LoadingBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 0,
		};
	}
	render() {
		return this.props.children;
	}
	updateElement(component) {
		if (!component || this.el) {
			return;
		}
		const el = ReactDOM.findDOMNode(component);

		el && (this.el = el);
	}
	updateSize() {
		const el = this.el;

		if (!el) {
			return;
		}
		this.state.size = this.props.horizontal ? outerWidth(el) : outerHeight(el);
	}
	getSize() {
		return this.state.size;
	}
	setPosition(pos) {
		const el = this.el;

		if (!el) {
			return;
		}
		el.style[this.props.horizontal ? "left" : "top"] = `${pos}px`;
	}
	componentDidMount() {
		this.updateElement(this);
		this.updateSize();
	}
	componentDidUpdate() {
		this.updateSize();
	}
	componentWillUnmount() {
		this.el = null;
	}
}
