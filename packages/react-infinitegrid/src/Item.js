import React, {Component} from "react";
import ReactDOM from "react-dom";


export default class Item extends Component {
	constructor(props) {
		super(props);
		this.rect = {
			left: -999999,
			top: -99999,
		};
		this.size = {};
		this.el = null;
		this.mount = false;
		this.groupKey = this.props.groupKey;
		this.itemIndex = this.props.itemIndex;

		console.log("NEW");
	}
	resetSize() {
		this.orgSize = null;
		this.size = {};
	}
	render() {
		return this.props.children;
	}
	updateElement(item) {
		if (!item || this.el) {
			return;
		}
		const el = ReactDOM.findDOMNode(item);

		el && (this.el = ReactDOM.findDOMNode(el));
	}
	componentDidMount() {
		this.updateElement(this);
	}
	componentWillUnmount() {
		this.el = null;
		this.mount = false;
		console.log("unmount", this.groupKey);
	}
}
