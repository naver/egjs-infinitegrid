import React, { Component } from 'react';
import {JustifiedLayout} from "../src/index";

class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: false,
		};
	}
	render() {
		return (
			<JustifiedLayout horizontal={this.props.horizontal} percentage={this.state.percentage} minSize={200}>
				<div style={{width: "100px", height: "100px"}}><img src="https://naver.github.io/egjs-infinitegrid/assets/image/4.jpg" /></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "400px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "400px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "400px"}}></div>
			</JustifiedLayout>
		);
	}
	componentDidMount() {
		console.log("mount");
	}
}

export default Example;