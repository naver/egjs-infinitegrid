import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {PackingLayout} from "../../src/index.js";

class Item extends Component {
	render() {
		return (
		<div className="item">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${parseInt(Math.random() * 59 + 1)}.jpg`} />
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
		<PackingLayout size={1000} margin={10} aspectRatio={1.5}>
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
		</PackingLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
