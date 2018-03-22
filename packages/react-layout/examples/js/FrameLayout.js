import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FrameLayout} from "../../src/index.js";

class Item extends Component {
	render() {
		return (
		<div className="item">
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
		<FrameLayout size={1000} margin={10} frame={[
			[1, 1, 2, 2],
			[3, 4, 4, 5],
			[3, 4, 4, 5]
		]}>
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
			<Item/>
		</FrameLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
