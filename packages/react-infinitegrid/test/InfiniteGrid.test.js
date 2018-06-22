/* eslint-disable */
import React from 'react';
import ReactDOM from "react-dom";
import {GridLayout} from "../src/index";
import {use, expect, assert} from "chai";
import { matchSnapshot } from "chai-karma-snapshot";
import {cleanHTML, concatItems, wait} from "./TestHelper";
import Example from "./Example";
import NoItemExample from "./NoItemExample";
import EqualSizeExample from "./EqualSizeExample";
import OneGroupExample from "./OneGroupExample";
use(matchSnapshot);


describe(`test layout`, function () {
	beforeEach(() => {
		document.body.style.margin = "0px";
		document.body.style.padding = "0px";
		cleanup();
		this.el = sandbox({
			id: "__react-content",
			style: "width: 500px",
		});
	});
	afterEach(() => {
		//cleanup();
	});
	it (`should check fixed size`, done => {
		const rendered = ReactDOM.render(<GridLayout className="test1">
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
			<div style={{width: "100px", height: "100px"}}></div>
		</GridLayout>, this.el);
		expect(cleanHTML(this.el.innerHTML)).to.matchSnapshot();
		setTimeout(() => {
			expect(cleanHTML(this.el.innerHTML)).to.matchSnapshot();
			done();
		}, 100);
	});
	it (`should check align center`, done => {
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<GridLayout className="test1" align="center">
			<div style={{width: "120px", height: "100px"}}></div>
			<div style={{width: "120px", height: "200px"}}></div>
			<div style={{width: "120px", height: "100px"}}></div>
			<div style={{width: "120px", height: "400px"}}></div>
			<div style={{width: "120px", height: "100px"}}></div>
		</GridLayout>, this.el);
		expect(cleanHTML(this.el.innerHTML)).to.matchSnapshot();
		setTimeout(() => {
			expect(cleanHTML(this.el.innerHTML)).to.matchSnapshot();
			done();
		}, 100);
	});
	it (`should check getStatus and setStatus`, done => {
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<GridLayout className="test1" align="center" isOverflowScroll={true} style={{height: "500px"}}>
			<div style={{width: "120px", height: "100px"}}></div>
			<div style={{width: "120px", height: "200px"}}></div>
			<div style={{width: "120px", height: "100px"}}></div>
			<div style={{width: "120px", height: "400px"}}></div>
			<div style={{width: "120px", height: "440px"}}></div>
			<div style={{width: "120px", height: "130px"}}></div>
			<div style={{width: "120px", height: "100px"}}></div>
		</GridLayout>, this.el);
		setTimeout(() => {
			const status = rendered.getStatus();
			const html = this.el.innerHTML;

			expect(status).to.matchSnapshot();
			expect(cleanHTML(html)).to.matchSnapshot();
			
			this.el = sandbox({
				id: "__react-content",
				style: "width: 300px",
			});

			const rendered2 = ReactDOM.render(<GridLayout className="test1" align="center" status={status} isOverflowScroll={true} style={{height: "500px"}}>
				<div style={{width: "120px", height: "100px"}}></div>
				<div style={{width: "120px", height: "200px"}}></div>
				<div style={{width: "120px", height: "100px"}}></div>
				<div style={{width: "120px", height: "400px"}}></div>
				<div style={{width: "120px", height: "440px"}}></div>
				<div style={{width: "120px", height: "130px"}}></div>
				<div style={{width: "120px", height: "100px"}}></div>
			</GridLayout>, this.el);

			setTimeout(() => {
				expect(html).to.be.equals(this.el.innerHTML);
				done();
			});
		}, 100);
	});
	it (`should check getStatus(startKey, endKey)`, async () => {
		// Given
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<GridLayout className="test1" align="center" isOverflowScroll={true} style={{height: "500px"}}>
			<div data-groupkey="1" key={0} style={{width: "120px", height: "100px"}}></div>
			<div data-groupkey="1" key={1} style={{width: "120px", height: "200px"}}></div>
			<div data-groupkey="2" key={2} style={{width: "120px", height: "100px"}}></div>
			<div data-groupkey="2" key={3} style={{width: "120px", height: "400px"}}></div>
			<div data-groupkey="3" key={4} style={{width: "120px", height: "440px"}}></div>
			<div data-groupkey="3" key={5} style={{width: "120px", height: "130px"}}></div>
			<div data-groupkey="4" key={6} style={{width: "120px", height: "100px"}}></div>
		</GridLayout>, this.el);

		// When
		await wait();
		const status = rendered.getStatus("2", "3");
		const html = cleanHTML(this.el.innerHTML);
		

		this.el = sandbox({
			id: "__react-content",
			style: "width: 300px",
		});
		const rendered2 = ReactDOM.render(<GridLayout className="test2" align="center" isOverflowScroll={true} style={{height: "500px"}} status={status}>
			<div data-groupkey="0" key={0} style={{width: "120px", height: "100px"}}></div>
			<div data-groupkey="0" key={1} style={{width: "120px", height: "200px"}}></div>
			<div data-groupkey="2" key={2} style={{width: "120px", height: "100px"}}></div>
			<div data-groupkey="2" key={3} style={{width: "120px", height: "400px"}}></div>
			<div data-groupkey="3" key={4} style={{width: "120px", height: "440px"}}></div>
			<div data-groupkey="3" key={5} style={{width: "120px", height: "130px"}}></div>
			<div data-groupkey="4" key={6} style={{width: "120px", height: "100px"}}></div>
		</GridLayout>, this.el);

		await wait();
		const status2 = rendered2.getStatus("2", "3");
		const html2 = cleanHTML(this.el.innerHTML);

		this.el = sandbox({
			id: "__react-content",
			style: "width: 300px",
		});
		const rendered3 = ReactDOM.render(<GridLayout className="test3" align="center" isOverflowScroll={true} style={{height: "500px"}} status={status2}>
			<div data-groupkey="2" key={2} style={{width: "120px", height: "100px"}}></div>
			<div data-groupkey="2" key={3} style={{width: "120px", height: "400px"}}></div>
			<div data-groupkey="3" key={4} style={{width: "120px", height: "440px"}}></div>
			<div data-groupkey="3" key={5} style={{width: "120px", height: "130px"}}></div>
		</GridLayout>, this.el);

		await wait();
		const status3 = rendered3.getStatus("2", "3");
		const html3 = cleanHTML(this.el.innerHTML);

		// Then
		try {
			expect(html).to.matchSnapshot();
			expect(html2).to.matchSnapshot();
			expect(html3).to.matchSnapshot();
			expect(status._state.groups.length).to.be.equals(2);
			expect(status2._state.groups.length).to.be.equals(2);
			expect(status3._state.groups.length).to.be.equals(2);
			expect(status._state.groups[0].groupKey).to.be.equals("2");
			expect(status._state.groups[1].groupKey).to.be.equals("3");
			expect(status2._state.groups[0].groupKey).to.be.equals("2");
			expect(status2._state.groups[1].groupKey).to.be.equals("3");
			expect(status3._state.groups[0].groupKey).to.be.equals("2");
			expect(status3._state.groups[1].groupKey).to.be.equals("3");
			expect(concatItems(status._state.groups[0].items)).to.be.deep.equals(concatItems(status2._state.groups[0].items));
			expect(concatItems(status2._state.groups[0].items)).to.be.deep.equals(concatItems(status3._state.groups[0].items));
			expect(concatItems(status._state.groups[1].items)).to.be.deep.equals(concatItems(status2._state.groups[1].items));
			expect(concatItems(status2._state.groups[1].items)).to.be.deep.equals(concatItems(status3._state.groups[1].items));
		} catch(e) {
			console.error(e);
		}
	});
	it (`should check scroll`, async() => {
		this.el.style.width = "300px";

		const rendered = ReactDOM.render(<Example/>, this.el);

		rendered.grid._container.scrollTop = 0;

		await wait();
		const html = cleanHTML(this.el.innerHTML);
		const groups = rendered.grid.state.groups.length;
		const startIndex = rendered.grid.state.startIndex;
		const endIndex = rendered.grid.state.endIndex;
	

		rendered.grid._container.scrollTop = 1000;
		await wait(600);
		const html2 = cleanHTML(this.el.innerHTML);

		expect(groups).to.be.equals(5);
		expect(startIndex).to.be.equals(0);
		expect(endIndex).to.be.equals(4);
		expect(html).to.matchSnapshot();
		expect(html2).to.matchSnapshot();
	});
	it ("should check layout method and event", done => {
		// Given
		this.el.style.width = "300px";
		let html1;
		let html2;
		const rendered = ReactDOM.render(<GridLayout
			className="test1" align="center"
			onLayoutComplete = {e => {
				// Then
				if (e.isLayout) {
					html2 = cleanHTML(this.el.innerHTML); 
					expect(html2).to.matchSnapshot();
					expect(html1).to.be.equals(html2);
					done();
				}
			}}
			>
		<div style={{width: "120px", height: "100px"}}></div>
		<div style={{width: "120px", height: "200px"}}></div>
		<div style={{width: "120px", height: "100px"}}></div>
		<div style={{width: "120px", height: "400px"}}></div>
		<div style={{width: "120px", height: "440px"}}></div>
		<div style={{width: "120px", height: "130px"}}></div>
		<div style={{width: "120px", height: "100px"}}></div>
		</GridLayout>, this.el);

		setTimeout(() => {
			html1 = cleanHTML(this.el.innerHTML);
			expect(html1).to.matchSnapshot();
			// When
			rendered.layout(true);
		}, 200);
	});
	it ("should check test no item", async() => {
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<NoItemExample mount={false}/>, this.el);


		// When
		const html = cleanHTML(this.el.innerHTML);

		const state1 = Object.assign({}, rendered.grid.state);

		rendered.setState({mount: true});

		await wait();
		const html2 = cleanHTML(this.el.innerHTML);
		const state2 = Object.assign({}, rendered.grid.state);

		rendered.setState({mount: false});

		await wait();
		const html3 = cleanHTML(this.el.innerHTML);
		const state3 = Object.assign({}, rendered.grid.state);

		// Then
		expect(html).to.matchSnapshot();
		expect(html2).to.matchSnapshot();
		expect(html3).to.matchSnapshot();

		expect(state1.groups.length).to.be.equals(0);
		expect(state1.startKey).to.be.equals("");
		expect(state1.endKey).to.be.equals("");
		expect(state1.startIndex).to.be.equals(-1);
		expect(state1.endIndex).to.be.equals(-1);

		expect(state2.groups.length).to.be.equals(2);
		expect(state2.startKey).to.be.equals("1");
		expect(state2.endKey).to.be.equals("2");
		expect(state2.startIndex).to.be.equals(0);
		expect(state2.endIndex).to.be.equals(1);

		expect(state3.groups.length).to.be.equals(0);
		expect(state3.startKey).to.be.equals("");
		expect(state3.endKey).to.be.equals("");
		expect(state3.startIndex).to.be.equals(-1);
		expect(state3.endIndex).to.be.equals(-1);
		expect(html).to.be.equals(html3);
	});
	it ("should check test one item", async () => {
		// Given
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<GridLayout>
			<div style={{width: "200px", height: "200px"}} data-groupkey="1">1</div>
		</GridLayout>, this.el);
		const html = cleanHTML(this.el.innerHTML);
		const state = Object.assign({}, rendered.state);

		// Then
		await wait();
		expect(html).to.matchSnapshot();
		expect(this.el.innerHTML).to.matchSnapshot();
		expect(state.groups.length).to.be.equals(1);
		expect(state.startKey).to.be.equals("1");
		expect(state.endKey).to.be.equals("1");
		expect(state.startIndex).to.be.equals(0);
		expect(state.endIndex).to.be.equals(0);
	});
	it ("should check test no item and onAppend", async() => {
		const onAppend = sinon.spy();
		const rendered = ReactDOM.render(<Example onAppend={onAppend}/>, this.el);

		const callCount = onAppend.callCount;
		const html = cleanHTML(this.el.innerHTML);

		await wait();
		const callCount2 = onAppend.callCount;
		const html2 = cleanHTML(this.el.innerHTML);
		rendered.setState({list: []});

		await wait();
		const callCount3 = onAppend.callCount;
		const html3 = cleanHTML(this.el.innerHTML);

		expect(callCount < callCount2).to.be.true;
		expect(callCount2 < callCount3).to.be.true;
		expect(html).to.matchSnapshot();
		expect(html2).to.matchSnapshot();
		expect(html3).to.matchSnapshot();
		expect(html2).to.be.equals(html3);
	});
	it ("should check layout with resize", done => {
		const onLayoutComplete = sinon.spy(e => {
			// Then
			if (e.isLayout) {
				// layout(true);
				expect(onLayoutComplete.callCount).to.be.equals(2);
				done();
			} else {
				// no layout
				expect(onLayoutComplete.callCount).to.be.equals(1);
			}
		});
		// Given
		const rendered = ReactDOM.render(<GridLayout onLayoutComplete={onLayoutComplete}>
			<div style={{width: "200px", height: "200px"}} data-groupkey="1">1</div>
		</GridLayout>, this.el);

		// When
		rendered.setState({layout: true});
	});
	it ("should check isEqaulSize option", async() => {
		// Given
		const rendered = ReactDOM.render(<EqualSizeExample/>, this.el);

		await wait();
		
		const html = cleanHTML(this.el.innerHTML);
		const sizes = rendered.grid.state.groups[0].items.map(item => Object.assign({}, item.size));
		// When
		rendered.setState({mount: true});
		--rendered.grid._renderer._size.viewport;
		rendered.grid.layout(true);

		await wait();
		const sizes2 = rendered.grid.state.groups[0].items.map(item => Object.assign({}, item.size));
		const html2 = cleanHTML(this.el.innerHTML);


		expect(html).to.matchSnapshot();
		expect(html2).to.matchSnapshot();
		sizes.forEach(size => {
			expect(size).to.be.deep.equals({width: 150, height: 120});
		});
		sizes2.forEach(size => {
			expect(size).to.be.deep.equals({width: 100, height: 100});
		});
	});
	it("should check one groupKey", async () => {
		const rendered = ReactDOM.render(<OneGroupExample/>, this.el);
		const html = cleanHTML(this.el.innerHTML);


		// when
		const height = 0;
		rendered.append();
		await wait();
		const html2 = cleanHTML(this.el.innerHTML);
		const height2 = Math.max(...rendered.grid.state.groups[0].outlines.end);
		rendered.append();
		await wait();
		const html3 = cleanHTML(this.el.innerHTML);
		const height3 = Math.max(...rendered.grid.state.groups[0].outlines.end);
		rendered.append();
		await wait();
		const html4 = cleanHTML(this.el.innerHTML);
		const height4 = Math.max(...rendered.grid.state.groups[0].outlines.end);

		// then
		console.log(height2, height3, height4);
		expect(html).to.matchSnapshot();
		expect(html2).to.matchSnapshot();
		expect(html3).to.matchSnapshot();
		expect(html4).to.matchSnapshot();

		
		expect(height2).to.be.above(height);
		expect(height3).to.be.above(height2);
		expect(height4).to.be.above(height3);
	});
	it("should check watcher offset", async () => {
		// Given
		let grid;
		const rendered = ReactDOM.render(
		<div style={{position: "relative", top: "400px"}}>
			<GridLayout ref={e => (grid = e)}>
				<div style={{width: "200px", height: "200px"}} data-groupkey="1">1</div>
			</GridLayout>
		</div>, this.el);

		await wait();

		// When
		const offset1 = grid._watcher.getContainerOffset();

		rendered.style.top = "200px";
		const offset2 = grid._watcher.getContainerOffset();

		grid.resize();
		const offset3 = grid._watcher.getContainerOffset();

		// Then
		expect(offset1).to.be.equals(400);
		expect(offset2).to.be.equals(400);
		expect(offset3).to.be.equals(200);
	});
});