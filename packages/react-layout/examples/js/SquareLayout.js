import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {SquareLayout} from "../../src/index.js";

class Item extends Component {
	render() {
		return (
		<div className="item" data-column={this.props["data-column"] || 1}>
			<div className="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${parseInt(Math.random() * 59 + 1)}.jpg`} />
			</div>
		</div>
		);
	}
}

class App extends Component {
  constructor(prop) {
		super(prop);
  }
  render() {
    return (
		<SquareLayout size={1000} margin={10} itemSize={200}>
			<Item data-column="2"/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			
		</SquareLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
