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
	onAppend = e => {
		if (this.props.onAppend) {
			this.props.onAppend(e);
		}
		const groupKey = e.groupKey ? e.groupKey + 1 : 1;

		this.state.list = this.state.list.concat([
			<Item height = "100px" key={groupKey * 3 + 1} groupKey={groupKey}/>,
			<Item height = "200px" key={groupKey * 3 + 2} groupKey={groupKey}/>,
			<Item height = "300px" key={groupKey * 3 + 3} groupKey={groupKey}/>
		]);

		this.setState({list: this.state.list});
	}
	onChange = e => {

	}
	onLayoutComplete = e => {
		
	}
	render() {
		return <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll = {true}
			onAppend = {this.onAppend}
			onChange = {this.onChange}
			onLayoutComplete = {this.onLayoutComplete}
			style={{height: "600px"}}
		>
			{this.state.list}
		</GridLayout>;
	}

}
