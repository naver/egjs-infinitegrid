import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {JustifiedLayout} from "../index.js";

class Item extends Component {
	constructor(props) {
		super(props);

		this.image = parseInt(Math.random() * 50) + 1;
	}
	render() {
		const {onDragStart, onDrop} = this.props;
		return (
		<div className="item" draggable={true} onDragStart={e => {
			onDragStart(e, this);
		}} onDrop={e => {
			onDrop(e, this);
		}} onDragOver={e=>e.preventDefault()}>
			<div className="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${this.image}.jpg`}
				/>
			</div>
		</div>
		);
	}
}

class App extends Component {
  constructor(prop) {
		super(prop);
		window.a = this;
		this.state = {
			items: [],
			width: window.innerWidth
		}
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrop = this.onDrop.bind(this);

		for (let i = 0; i < 5; ++i) {
			this.state.items.push(<Item key={i} onDragStart={this.onDragStart} onDrop={this.onDrop}/>);
		}
	}
	indexOfTarget(target) {
		const children = this._children;
		const element = ReactDOM.findDOMNode(target);

		const length = children.length;

		for (let i = 0; i < length; ++i) {
			if (children[i] === element) {
				return i;
			}
		}
		return -1;
	}
	onDragStart(e, target) {
		const index = this.indexOfTarget(target);

		if (index === -1) {
			return;
		}
		e.dataTransfer.setData("index", index);
	}
	onDrop(e, target) {
		const children = this._children;
		const index = this.indexOfTarget(target);

		if (index === -1) {
			return;
		}
		const targetIndex = e.dataTransfer.getData("index");
		if (typeof targetIndex === "undefined" || index === targetIndex) {
			return;
		}
		const contents1 = children[index].innerHTML;
		const contents2 = children[targetIndex].innerHTML;

		children[index].innerHTML = contents2;
		children[targetIndex].innerHTML = contents1;
		this.setState({drag: true});
	}
  render() {
    return (
		<JustifiedLayout size={this.state.width} margin={10} ref={l => this.layout = l} minSize={300} column={[3,4]}>
		{this.state.items}
		</JustifiedLayout>
    );
	}
	componentDidMount() {
		this._children = ReactDOM.findDOMNode(this.layout).children;

		window.addEventListener("resize", e => {
			this.setState({width: window.innerWidth});
		});
	}
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
