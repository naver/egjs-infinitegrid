import React, { Component } from 'react';
import {GridLayout} from "../src/index";

class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "none",
		};
	}
	render() {
		return (
			<GridLayout ref={r => this.grid = r} className="1" size={0} style={{display: this.state.display}}>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "400px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "200px"}}></div>
				<div style={{width: "100px", height: "300px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
				<div style={{width: "100px", height: "100px"}}></div>
			</GridLayout>
		);
	}
}

export default Example;