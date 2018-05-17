import React, { Component } from 'react';
import {GridLayout} from "../src/index";

class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mount: false,
		};
	}
	render() {
		return (
			this.state.mount ? <GridLayout>
				<div style={{width: "100px", height: "100px"}}><img src="https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg" /></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "400px"}}></div>
			</GridLayout> : <GridLayout></GridLayout>
		);
	}
	componentDidMount() {
		console.log("mount");
	}
}

export default Example;