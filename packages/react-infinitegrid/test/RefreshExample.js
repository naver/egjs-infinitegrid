import {GridLayout} from "../src";
import React, {Component} from "react";

function renderItem(i) {
	return <div key={i} data-groupkey={i} className="item" style={{width: "100%", height: "100px"}}>item{i}</div>;
}
function renderSpec() {
	return <div key={100} data-groupkey="100" className="item itemsp" style={{style: "100%", height: "300px"}}>itemSP</div>;
}
function renderItems(count, j) {
	const arr = [];

	for (let i = 0; i < count; ++i) {
		arr[i] = renderItem(i);
	}

	arr.splice(j, 0, renderSpec());

	return arr;
}

export default class Exmaple extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 30,
			j: 5,
		};
	}


	render() {
		return (<GridLayout className="wrapper">
			{renderItems(this.state.count, this.state.j)}
		</GridLayout>);
	}
}
