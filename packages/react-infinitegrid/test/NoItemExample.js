import {GridLayout} from "../src/";
import React, {Component} from "react";


export default class Exmaple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mount: !!this.props.mount,
		};
	}
	render() {
		return this.state.mount ? <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll = {true}
			style={{height: "600px"}}>
				<div className="item" data-groupkey="1" key="1" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="1" key="2" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="1" key="3" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="2" key="4" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="2" key="5" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="2" key="6" style={{width: "100px", height: "100px"}}></div>
		</GridLayout> : <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll = {true}
			style={{height: "600px"}} />;
	}
}
