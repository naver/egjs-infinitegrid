import React, {Component} from "react";
import ReactDOM from "react-dom";
import InfiniteGrid, {GridLayout} from "../../src/index";


class Item extends Component {
	render() {
		const no = this.props.num;
		const text = `egjs ${no}`;

		return (<div className="item">
			<div className="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${no % 59 + 1}.jpg`}/>
			</div>
			<div className="info">
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
			list: this.loadItems(1, 0),
		};
		this.onAppend = this.onAppend.bind(this);
		this.onLayoutComplete = this.onLayoutComplete.bind(this);
	}
	loadItems(groupKey, start = this.state.list.length) {
		const items = [];

		for (let i = 0; i < 20; ++i) {
			items.push(<Item groupKey={groupKey} num={1 + start + i} key={start + i} />);
		}
		return items;
	}
	onAppend({groupKey}) {
		if (this.state.loading) {
			return;
		}
		console.log("onAppend");
		const list = this.state.list;
		const start = list.length;
		const items = this.loadItems(groupKey + 1, start);

		this.setState({loading: true, list: list.concat(items)});
	}
	onLayoutComplete({isLayout}) {
		console.log(isLayout);
		window.b = this;
		!isLayout && this.setState({loading: false});
	}
	render() {
		const {list} = this.state;

		return (
			<InfiniteGrid margin={10}
				align={"center"}
				onAppend={this.onAppend}
				onLayoutComplete={this.onLayoutComplete}
			>
				{list}
			</InfiniteGrid>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("__react-content"));

