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
			isEqualSize = {true}
			style={{height: "600px"}}>
				<div className="item" data-groupkey="1" key="1" style={{width: "100px", height: "100px"}}></div>
				<div className="item" data-groupkey="1" key="2" style={{width: "100px", height: "190px"}}></div>
				<div className="item" data-groupkey="1" key="3" style={{width: "140px", height: "180px"}}></div>
				<div className="item" data-groupkey="2" key="4" style={{width: "150px", height: "170px"}}></div>
				<div className="item" data-groupkey="2" key="5" style={{width: "100px", height: "160px"}}></div>
				<div className="item" data-groupkey="2" key="6" style={{width: "110px", height: "150px"}}></div>
		</GridLayout> : <GridLayout ref={e => e && (this.grid = e)}
			isOverflowScroll = {true}
			isEqualSize = {true}
			style={{height: "600px"}}>
			<div className="item" data-groupkey="1" key="1" style={{width: "150px", height: "120px"}}></div>
				<div className="item" data-groupkey="1" key="2" style={{width: "130px", height: "170px"}}></div>
				<div className="item" data-groupkey="1" key="3" style={{width: "160px", height: "140px"}}></div>
				<div className="item" data-groupkey="2" key="4" style={{width: "160px", height: "150px"}}></div>
				<div className="item" data-groupkey="2" key="5" style={{width: "140px", height: "160px"}}></div>
				<div className="item" data-groupkey="2" key="6" style={{width: "130px", height: "170px"}}></div>
			</GridLayout>;
	}
}
