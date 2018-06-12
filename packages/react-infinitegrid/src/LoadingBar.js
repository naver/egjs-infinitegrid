import React, {Component} from "react";
import ReactDOM from "react-dom";
import {outerWidth, outerHeight} from "./utils";
import {LOADING_APPEND, LOADING_PREPEND} from "./consts";

export default class LoadingBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 0,
		};
	}
	render() {
		return this.props.children || null;
	}
	updateElement() {
		const el = ReactDOM.findDOMNode(this);

		if (el && el !== this.el) {
			this.el = el;
			this.updateSize();
			return true;
		}
		return false;
	}
	updateSize() {
		const el = this.el;

		if (!el) {
			return;
		}
		const {loading, horizontal, loadingStyle} = this.props;
		let size = -1;

		if (!loading || ("position" in loadingStyle && loadingStyle.position !== "absolute") ||
			(horizontal && "left" in loadingStyle) || (!horizontal && "top" in loadingStyle)) {
			size = 0;
		}
		const style = Object.assign({
			position: "absolute",
			display: loading ? "block" : "none",
		}, loadingStyle);
		const styles = [];

		for (const name in style) {
			styles.push(`${name}:${style[name]};`);
		}
		el.style.cssText += styles.join("");
		size && (size = horizontal ? outerWidth(el) : outerHeight(el));
		this.state.size = size;
	}
	getSize(isAppend) {
		const loading = this.props.loading;

		if ((isAppend && (loading & LOADING_APPEND)) || (!isAppend && (loading & LOADING_PREPEND))) {
			return this.state.size;
		}
		return 0;
	}
	setPosition(pos) {
		const el = this.el;

		if (!el) {
			return;
		}
		this.state.size && (el.style[this.props.horizontal ? "left" : "top"] = `${pos}px`);
	}
	componentDidMount() {
		this.updateElement();
	}
	componentDidUpdate(prevProps) {
		if (!this.updateElement() && prevProps.loading !== this.props.loading) {
			this.updateSize();
		}
	}
	componentWillUnmount() {
		this.el = null;
	}
}
