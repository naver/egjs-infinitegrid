import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {JustifiedLayout} from "../index.js";

class Item extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {onDragStart, onDrag, onDrop, onDragEnd} = this.props;
		return (
		<div className="item" draggable={true} onDragStart={e => {
			onDragStart(e, this);
		}} onDrag={e => {
			onDrag(e, this);
		}} onDrop={e => {
			onDrop(e, this);
		}}
		onDragOver={e=>e.preventDefault()}
		onDragEnd={e=>{onDragEnd(e);}}
		
		>
			<div className="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${this.props.image}.jpg`}
				/>
			</div>
		</div>
		);
	}
}

class App extends Component {
  constructor(prop) {
		super(prop);
		this.state = {
			items: [],
			groups: [],
			width: window.innerWidth - 20,
			targetIndex: -1,
			column: [2, 3],
			margin: 10,
		}
		window.app = this;
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		for (let i = 0; i < 5; ++i) {
			this.state.items.push(<Item key={i} image={parseInt(Math.random() * 50) + 1}
			onDragStart={this.onDragStart}
			onDrag={this.onDrag}
			onDrop={this.onDrop}
			onDragEnd={this.onDragEnd}
			/>);
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
		const element = this._children[index];
		const rect = this.wrapper.getBoundingClientRect();

		this.state.targetIndex = index;
		this.state.start = {
			offsetTop: rect.top,
			offsetLeft: rect.left,
		};
		element.className = "item is_drag";
	}
	onDrag(e, target) {
		const index = this.state.targetIndex;
		const items = this.layout.getItems();

		if (index === -1) {
			return;
		}
		const {offsetTop, offsetLeft} = this.state.start;
		const x = e.clientX - offsetLeft;
		const y = e.clientY - offsetTop;
	
		const indicators = items.filter(({state}) => {
			const rect = state.rect;

			if (rect.top <= y && y <= rect.top + rect.height) {
				if (rect.left - this.state.margin <= x && x <= rect.left + rect.width / 3) {
					return true;
				} else if (rect.left + rect.width * 2 / 3 <= x && x <= rect.left + rect.width + this.state.margin) {
					return true;
				}
			}
			return false;
		});
		const indicator = this.indicator;

		if (!indicators.length) {
			this.state.toIndex = -1;
			indicator.className = "indicator";
			return;
		}
		indicator.className = "indicator is_show";
		const {left, top, width, height} =  indicators[0].state.rect;
		const margin = this.state.margin;

		indicator.style.height = `${height}px`;
		indicator.style.top = `${top}px`;

		if (left - margin <= x && x <= left + width / 3) {
			indicator.style.left = `${left - margin}px`;
			this.state.toIndex = items.indexOf(indicators[0]);
		} else if (left + width * 2 / 3 <= x && x <= left + width + margin) {
			indicator.style.left = `${left + width}px`;
			this.state.toIndex = items.indexOf(indicators[0]) + 1;
		}
		
	}
	onDrop(e) {
		const children = this._children;
		const targetIndex = this.state.targetIndex;
		const index = this.state.toIndex;

		
		if (index === -1 || typeof targetIndex === "undefined" || index === targetIndex) {
			this.setState({drag: true});
			return;
		}
		const element = children[targetIndex];

		element.className = "item";
		this._container.insertBefore(element, children[index]);

		setTimeout(() => {
			this.setState({drag: true});
		}, 0);
	}
	onDragEnd(e) {
		const targetIndex = this.state.targetIndex;

		this.state.targetIndex = -1;
		this.indicator.className = "indicator";
		if (targetIndex >= 0) {
			this._children[targetIndex].className = "item";
		}
	}
  render() {
    return (
		<div className="wrapper" ref={l => this.wrapper = l}>
			<JustifiedLayout size={this.state.width} margin={this.state.margin} ref={l => this.layout = l} minSize={300} column={this.state.column}>
				{this.state.items}
			</JustifiedLayout>
			<div className="indicator" draggable="true" ref={indicator => this.indicator = indicator}
			 onDragOver={e=>e.preventDefault()}
			 onDrop={e => this.onDrop(e)}
			 style={{width: `${this.state.margin}px`}}
			></div>
		</div>
    );
	}
	componentDidMount() {
		this._container = ReactDOM.findDOMNode(this.layout);
		this._children = this._container.children;

		const element = ReactDOM.findDOMNode(this);

		window.addEventListener("resize", e => {
			console.log(element.offsetWidth);
			this.setState({width: element.offsetWidth});
		});
	}
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
