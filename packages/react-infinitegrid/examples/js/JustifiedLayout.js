import React, {Component} from "react";
import ReactDOM from "react-dom";
import {JustifiedLayout} from "../../src/index";


class Item extends Component {
	render() {
		const no = this.props.num;
		const text = `egjs ${no}`;

		return (<div className="item" onClick={this.props.onClick}>
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
		this.loading = (<div className="loading">Loading...</div>);
		this.start = 0;
		this.state = {
			loading: null,
			list: [],
		};
	}
	loadItems(groupKey, num) {
		const items = [];
		const start = this.start || 0;

		for (let i = 0; i < num; ++i) {
			items.push(<Item groupKey={groupKey} num={1 + start + i} key={start + i}
				onClick={(itemKey => (e => this.remove(itemKey)))(start + i)}/>);
		}
		this.start = start + num;
		return items;
	}
	remove(itemKey) {
		const list = this.state.list.slice();
		const index = list.map(component => parseFloat(component.key)).indexOf(itemKey);

		// console.log(itemKey, index);
		list.splice(index, 1);
		this.setState({list});
	}
	onAppend = ({groupKey, startLoading}) => {
		const list = this.state.list;
		const items = this.loadItems(parseFloat(groupKey) + 1, 10);

		startLoading();
		this.setState({list: list.concat(items)});
	}
	onLayoutComplete = ({isLayout, endLoading}) => {
		window.b = this;
		!isLayout && endLoading();
	}
	render() {
		const {list} = this.state;

		return (
			<JustifiedLayout margin={10}
				onAppend={this.onAppend}
				onLayoutComplete={this.onLayoutComplete}
				loading = {this.state.loading}
				isConstantSize = {true}
				isOverflowScroll = {true}
				transitionDuration = {0.2}
				ref = {e => {window.e = e;}}
				style = {{height: "500px"}}
			>
				{list}
			</JustifiedLayout>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("__react-content"));

