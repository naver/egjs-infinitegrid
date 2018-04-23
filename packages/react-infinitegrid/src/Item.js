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
		this.groupKey = this.props.groupKey;
		this.itemIndex = this.props.itemIndex;
	}
	resetSize() {
		this.orgSize = null;
		this.size = {};
	}
	render() {
		return this.props.children;
	}
	updateElement() {
		const el = ReactDOM.findDOMNode(this);

		this.el = el;
	}
	componentDidUpdate() {

	}
	componentWillUnmount() {
		this.el = null;
	}
}
