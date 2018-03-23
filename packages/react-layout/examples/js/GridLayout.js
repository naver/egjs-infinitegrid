import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {GridLayout} from "../../src/index.js";

class Item extends Component {
	render() {
		return (
		<div className="item">
			<div className="thumbnail">
				<img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${parseInt(Math.random() * 59 + 1)}.jpg`} />
			</div>
			<div className="info">egjs post</div>
		</div>
		);
	}
}

class App extends Component {
  constructor(prop) {
		super(prop);

		this.onLayoutComplete = this.onLayoutComplete.bind(this);
	}
	onLayoutComplete(e) {
		console.log(e.target);
	}
  render() {
    return (
		<GridLayout margin={10} onLayoutComplete={this.onLayoutComplete} align={"center"}>
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
		</GridLayout>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
