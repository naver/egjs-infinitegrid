import { GridLayout } from "../src";
import React, { Component } from "react";

class Item extends Component {
	render() {
		return <div className="item" style={{
			width: "100%",
			height: "30px",
		}}>Test</div>;
	}
}

export default class Exmaple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isRemoved: false,
		};
	}
	renderList() {
		const arr = [];

		// group: 0 key: 0
		// group: 0 key: 1
		// group: 1 key: 2
		// group: 1 key: 3
		for (let i = 0; i < 4; ++i) {
			if (this.state.isRemoved) {
				if (i === 1) {
					// remove group's last item
					// remove group: 0, key: 1 item
					continue;
				}
			}

			arr.push(<Item data-groupkey={Math.floor(i / 2)} key={i} />);
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
