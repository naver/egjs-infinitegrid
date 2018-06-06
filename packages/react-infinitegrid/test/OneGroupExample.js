import {GridLayout} from "../src/";
import React, {Component} from "react";

class Item extends Component {
	render() {
		const height = this.props.height;

		return <div className="item" style={{
			width: "100px",
			height,
		}}>{`item${this.props.groupKey}`}</div>;
	}
}

export default class Exmaple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
		};
	}
	append = () => {
		const groupKey = 1;
		const list = this.state.list;
		const length = list.length;

		this.setState({list: list.concat([
			<Item height = "100px" key={length} groupKey={groupKey}/>,
			<Item height = "200px" key={length + 1} groupKey={groupKey}/>,
			<Item height = "300px" key={length + 2} groupKey={groupKey}/>
		])});

		
	}
	render() {
		return <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll = {true}
			style={{height: "600px"}}
		>
			{this.state.list}
		</GridLayout>;
	}

}
