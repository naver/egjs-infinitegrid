import React, {Component} from "react";
import ReactDOM from "react-dom";


export default class Item extends Component {
	render() {
		return this.props.children;
	}
	updateElement(component) {
		if (!component) {
			return;
		}
		const el = ReactDOM.findDOMNode(component);

		el && this.props.mount(this.props.itemKey, el);
	}
	componentDidMount() {
		this.updateElement(this);
	}
	componentWillUnmount() {
		this.props.unmount(this.props.itemKey);
	}
}
