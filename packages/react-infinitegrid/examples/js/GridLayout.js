import React, {Component} from "react";
import ReactDOM from "react-dom";
import {GridLayout} from "../../src/index.js";

class Item {
	render() {
		const no = this.props.num;
		const text = `egjs ${no}`;

		return (<div class="item">
			<div class="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${no}.jpg`}/>
			</div>
			<div class="info">
				{text}
			</div>
		</div>);
	}
}

class App extends Component {
	constructor(prop) {
		super(prop);
		this.loading = (<div class="loading" append>Loading...</div>);
		this.state = {
			loading: null,
			list: [],
		};
		this.onAppend = this.onAppend.bind(this);
		this.onLayoutComplete = this.onLayoutComplete.bind(this);
	}
	loadItems(groupKey, start = this.state.list.length) {
		const items = [];

		for (let i = 0; i < 20; ++i) {
			items.push(<Item groupKey={groupKey} num={start + i} key={start + i} />);
		}
		return items;
	}
	onAppend({groupKey}) {
		if (this.state.loading) {
			return;
		}
		const list = this.state.list;
		const start = list.length;
		const items = this.loadItems(groupKey + 1, start);

		this.setState({loading: this.loading, list: list.concat(items)});
	}
	onLayoutComplete(e) {
		this.setState({loading: false});
	}
	render() {
		const {list} = this.state;

		return (
			<GridLayout margin={10}
				align={"center"}
				onAppend={this.onAppend}
				onLayoutComplete={this.onLayoutComplete}
			>
				{list}
			</GridLayout>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("__react-content"));

