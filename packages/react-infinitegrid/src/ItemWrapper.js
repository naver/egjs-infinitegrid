import React, {Component} from "react";
import ReactDOM from "react-dom";


export default class Item extends Component {
	render() {
		return this.props.children;
	}
	updateElement(component) {
		const item = this.props.item;

		if (!component || item.el) {
			return;
		}
		const el = ReactDOM.findDOMNode(component);

		el && (item.el = el);
	}
	componentDidMount() {
		this.updateElement(this);
	}
	componentWillUnmount() {
		const item = this.props.item;

		item.el = null;
		item.mount = false;
	}
}
