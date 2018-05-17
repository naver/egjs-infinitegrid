/* eslint-disable */
import enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';
import ReactDOM from "react-dom";
import {GridLayout} from "../src/index";
import Example from "./Example";
import ImageExample from "./ImageExample";
import MountExample from "./MountExample";
import PercentageExample from "./PercentageExample";
import {use, expect, assert} from "chai";
import { matchSnapshot } from "chai-karma-snapshot";

enzyme.configure({ adapter: new Adapter() });
use(matchSnapshot);


describe(`test layout`, function () {
	beforeEach(() => {
		this.el = sandbox({
			id: "__react-content",
			style: "width: 500px",
		});
	});
	afterEach(() => {
		cleanup();
	});
	it (`should check fixed size`, done => {
		const rendered = ReactDOM.render(<GridLayout className="1" size={300}>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
		</GridLayout>, this.el);
		setTimeout(() => {
			expect(this.el.innerHTML).to.matchSnapshot();
			done();
		}, 100);
	});
	it (`should check variable size`, done => {
		const rendered = ReactDOM.render(<GridLayout className="1" size={0}>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "400px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "200px"}}></div>
			<div style={{width: "100px", height: "300px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
		</GridLayout>, this.el);

		setTimeout(() => {
			const html1 = this.el.innerHTML;
			expect(html1).to.matchSnapshot();

			setTimeout(() => {
				done();
			}, 100);
		}, 100);
	});

	it (`should check display change none to block`, done => {
		const rendered = ReactDOM.render(<Example/>, this.el);
		setTimeout(() => {
			expect(rendered.grid.state.size).to.be.equals(0);
			expect(this.el.innerHTML).to.matchSnapshot();

			rendered.setState({display: "block"});
			setTimeout(() => {
				expect(rendered.grid.state.size).to.be.not.equals(0);
				expect(rendered.grid.state.size).to.be.equals(500);
				expect(this.el.innerHTML).to.matchSnapshot();
				done();
			}, 100);
		}, 100);
	});

	it (`should check componentWillUnmount`, done => {
		const rendered = ReactDOM.render(<ImageExample/>, this.el);

		rendered.setState({unmount: true});
		setTimeout(() => {
			done();
		}, 1000);
	});
	it (`should check no children`, done => {
		// Given
		const rendered = ReactDOM.render(<MountExample/>, this.el);

		expect(this.el.innerHTML).to.matchSnapshot();

		// When
		rendered.setState({mount: true});

		setTimeout(() => {
			// Then
			expect(this.el.innerHTML).to.matchSnapshot();
			done();
		}, 1000);
	});

	[true, false].forEach(horizontal => {
		it (`should check percentage(horizontal=${horizontal})`, done => {
			// Given
			const rendered = ReactDOM.render(<PercentageExample horizontal={horizontal}/>, this.el);

			setTimeout(() => {
				expect(this.el.innerHTML).to.matchSnapshot();

				// When
				rendered.setState({percentage: ["position"]});
				const percentagePositionHTML = this.el.innerHTML;
				rendered.setState({percentage: ["size"]});
				const percentageSizeHTML = this.el.innerHTML;
				rendered.setState({percentage: ["position", "size"]});
				const percentagePositionAndSizeHTML = this.el.innerHTML;
				rendered.setState({percentage: true});
				const percentageTrueHTML = this.el.innerHTML;


				// Then
				expect(percentagePositionHTML).to.matchSnapshot();
				expect(percentageSizeHTML).to.matchSnapshot();
				expect(percentagePositionAndSizeHTML).to.matchSnapshot();
				expect(percentageTrueHTML).to.matchSnapshot();
				expect(percentagePositionAndSizeHTML).to.be.equals(percentageTrueHTML);

				done();
			}, 500);
		});
	});
});
