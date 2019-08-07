import { GridLayout } from "../src";
import React, { Component } from "react";

class Item extends Component {
	render() {
		const height = this.props.height;

		return <div className="item" style={{
			width: "100px",
			height,
		}}>{this.props.isCached ? "cached" : "no"}</div>;
	}
}

export default class Exmaple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
		};
	}
	renderList() {
		const arr = [];

		for (let i = 0; i < 5; ++i) {
			const isCached = this.grid && this.grid.isCached({ itemKey: i });

			arr.push(<Item isCached={isCached} key={i} />);
		}
		return arr;
	}
	render() {
		return <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll={true}
			style={{ height: "600px" }}
		>
			{this.renderList()}
		</GridLayout>;
	}

}
