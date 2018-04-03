import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {JustifiedLayout} from "../../src/index.js";

class Item extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div className="item"
		ref = {l => this._element = l}
		onMouseDown={e => this.props.onDragStart(e, this._element)}
		onTouchStart={e => this.props.onDragStart(e, this._element)}
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
			drag: false,
		}
		window.app = this;
		this.onDragStart = this.onDragStart.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);

		for (let i = 0; i < 5; ++i) {
			const image = i === 1 ? -1 : parseInt(Math.random() * 50) + 1;

			this.state.items.push(<Item key={i} image={image} onDragStart={this.onDragStart}/>);
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
		this.state.isDrag = true;
		const index = this.indexOfTarget(target);

		if (index === -1) {
			return;
		}
		const element = this._children[index];
		const rect = this.wrapper.getBoundingClientRect();
		const {clientX, clientY} = e.touches && e.touches.length ? e.touches[0] : e;
		const item = this.layout.getItems()[index];
		const {width, height, left, top} = item.rect;

		this.state.toIndex = -1;
		this.state.targetIndex = index;
		this.state.start = {
			startLeft: clientX - left,
			startTop: clientY - top,
			offsetTop: rect.top,
			offsetLeft: rect.left,
		};
		element.className = "item is_drag";
		this._ghotstImage.style.cssText = `display:block;width:${width}px;height:${height}px;left:${left}px;top:${top}px`;
		this._ghotstImage.innerHTML = element.innerHTML;
	}
	onDrag(e) {
		if (!this.state.isDrag) {
			return;
		}
		e.preventDefault();
		const index = this.state.targetIndex;
		const items = this.layout.getItems();

		if (index === -1) {
			return;
		}
		const item = items[index];
		const {offsetTop, offsetLeft, startTop, startLeft} = this.state.start;
		const {clientX, clientY} = e.touches && e.touches.length ? e.touches[0] : e;
		const x = clientX - offsetLeft;
		const y = clientY - offsetTop;


		this._ghotstImage.style.cssText += `left:${clientX - startLeft}px;top:${clientY - startTop}px;`;
		const indicators = items.filter(({rect}) => {
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
		const {left, top, width, height} = indicators[0].rect;
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
		if (!this.state.isDrag) {
			return;
		}
		const children = this._children;
		const targetIndex = this.state.targetIndex;
		const index = this.state.toIndex;

		this.onDragEnd(e);
		
		if (index === -1 || typeof targetIndex === "undefined" || index === targetIndex || targetIndex === -1) {
			this.setState({drag: true});
			return;
		}
		const element = children[targetIndex];

		element.className = "item";
		this._container.insertBefore(element, children[index]);

		setTimeout(() => {
			this.setState({drag: true});
		}, 100);
	}
	onDragEnd(e) {
		if (!this.state.isDrag) {
			return;
		}
		this._ghotstImage.style.display = "none";
		this.state.isDrag = false;
		const targetIndex = this.state.targetIndex;

		if (targetIndex === -1) {
			return;
		}
		this.state.targetIndex = -1;
		this.indicator.className = "indicator";
		if (targetIndex >= 0) {
			this._children[targetIndex].className = "item";
		}
	}
  render() {
    return (
		<div className="wrapper" ref={l => this.wrapper = l}
			onMouseMove={this.onDrag}
			onTouchMove={this.onDrag}
			onMouseUp={this.onDrop}
			onTouchEnd={this.onDrop}
			onMouseLeave={this.onDragEnd}
			>
			<JustifiedLayout percentage={true} margin={this.state.margin} ref={l => this.layout = l} minSize={300}
			column={this.state.column}
			onImageError={e => {
				console.log(e);
				this.state.items.splice(e.itemIndex, 1);
				this.setState({items: this.state.items});
			}}
			>
				{this.state.items}
			</JustifiedLayout>
			<div className="indicator" ref={indicator => this.indicator = indicator}
			 onDragOver={e=>e.preventDefault()}
			 onDrop={e => this.onDrop(e)}
			 style={{width: `${this.state.margin}px`}}
			></div>
			<div className="ghostImage" ref={l => this._ghotstImage = l}>
				<img/>
			</div>
		</div>
    );
	}
	componentDidMount() {
		this._container = ReactDOM.findDOMNode(this.layout);
		this._children = this._container.children;
	}
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
