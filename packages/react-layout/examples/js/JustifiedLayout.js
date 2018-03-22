import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {JustifiedLayout} from "../../src/index.js";

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
		<JustifiedLayout size={1000} margin={10}>
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
			
		</JustifiedLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
