/* eslint-disable */
import React from 'react';
import ReactDOM from "react-dom";
import {GridLayout} from "../src/index";
import {use, expect, assert} from "chai";
import { matchSnapshot } from "chai-karma-snapshot";
import {cleanHTML} from "./TestHelper";
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
				style: "width: 500px",
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
	it (`should check scroll`, done => {
		this.el.style.width = "300px";

		const rendered = ReactDOM.render(<Example/>, this.el);

		rendered.grid._container.scrollTop = 0;

		setTimeout(() => {
			const html = cleanHTML(this.el.innerHTML);
			const groups = rendered.grid.state.groups.length;
			const startIndex = rendered.grid.state.startIndex;
			const endIndex = rendered.grid.state.endIndex;
		

			rendered.grid._container.scrollTop = 1000;
			setTimeout(() => {
				const html2 = cleanHTML(this.el.innerHTML);

				expect(groups).to.be.equals(5);
				expect(startIndex).to.be.equals(0);
				expect(endIndex).to.be.equals(4);
				expect(html).to.matchSnapshot();
				expect(html2).to.matchSnapshot();

				done();
			}, 600);
		}, 100);
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
	it ("should check test no item", done => {
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<NoItemExample mount={false}/>, this.el);


		// When
		const html = cleanHTML(this.el.innerHTML);

		const state1 = Object.assign({}, rendered.grid.state);

		rendered.setState({mount: true});

		setTimeout(() => {
			const html2 = cleanHTML(this.el.innerHTML);
			const state2 = Object.assign({}, rendered.grid.state);

			rendered.setState({mount: false});
			setTimeout(() => {
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
				done();
			}, 100);
		}, 100);
	});
	it ("should check test one item", done => {
		// Given
		this.el.style.width = "300px";
		const rendered = ReactDOM.render(<GridLayout>
			<div style={{width: "200px", height: "200px"}} data-groupkey="1">1</div>
		</GridLayout>, this.el);
		const html = cleanHTML(this.el.innerHTML);
		const state = Object.assign({}, rendered.state);

		// Then
		setTimeout(() => {
			expect(html).to.matchSnapshot();
			expect(this.el.innerHTML).to.matchSnapshot();
			expect(state.groups.length).to.be.equals(1);
			expect(state.startKey).to.be.equals("1");
			expect(state.endKey).to.be.equals("1");
			expect(state.startIndex).to.be.equals(0);
			expect(state.endIndex).to.be.equals(0);
			done();
		}, 100);
	});
	it ("should check test no item and onAppend", done => {
		const onAppend = sinon.spy();
		const rendered = ReactDOM.render(<Example onAppend={onAppend}/>, this.el);

		const callCount = onAppend.callCount;
		const html = cleanHTML(this.el.innerHTML);

		setTimeout(() => {
			const callCount2 = onAppend.callCount;
			const html2 = cleanHTML(this.el.innerHTML);
			rendered.setState({list: []});

			setTimeout(() => {
				const callCount3 = onAppend.callCount;
				const html3 = cleanHTML(this.el.innerHTML);

				expect(callCount < callCount2).to.be.true;
				expect(callCount2 < callCount3).to.be.true;
				expect(html).to.matchSnapshot();
				expect(html2).to.matchSnapshot();
				expect(html3).to.matchSnapshot();
				expect(html2).to.be.equals(html3);
				done();
			}, 100);

		}, 100);
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
	it ("should check isEqaulSize option", done => {
		// Given
		const rendered = ReactDOM.render(<EqualSizeExample/>, this.el);

		setTimeout(() => {
			const html = cleanHTML(this.el.innerHTML);
			const sizes = rendered.grid.state.groups[0].items.map(item => Object.assign({}, item.size));
			// When
			rendered.setState({mount: true});
			--rendered.grid._renderer._size.viewport;
			rendered.grid.layout(true);

			setTimeout(() => {
				const sizes2 = rendered.grid.state.groups[0].items.map(item => Object.assign({}, item.size));
				const html2 = cleanHTML(this.el.innerHTML);


				expect(html).to.matchSnapshot();
				expect(html2).to.matchSnapshot();
				sizes.forEach(size => {
					expect(size).to.be.deep.equals({width: 150, height: 120});
				});
				sizes2.forEach(size => {
					expect(size).to.be.deep.equals({width: 100, height: 100});
				})
				done();
			}, 100)
		}, 100);
	});
	it("should check one groupKey", done => {
		const rendered = ReactDOM.render(<OneGroupExample/>, this.el);
		const html = cleanHTML(this.el.innerHTML);


		let html2;
		let html3;
		let html4;
		

		// when
		const height = 0;
		let height2;
		let height3;
		let height4;
		rendered.append();
		new Promise(resolve => {
			setTimeout(() => {
				html2 = cleanHTML(this.el.innerHTML);
				height2 = Math.max(...rendered.grid.state.groups[0].outlines.end);
				rendered.append();
				resolve();
			}, 100);
		}).then(() => new Promise(resolve => {
			setTimeout(() => {
				html3 = cleanHTML(this.el.innerHTML);
				height3 = Math.max(...rendered.grid.state.groups[0].outlines.end);
				rendered.append();
				resolve();
			}, 100);
		})).then(() => new Promise(resolve => {
			setTimeout(() => {
				html4 = cleanHTML(this.el.innerHTML);
				height4 = Math.max(...rendered.grid.state.groups[0].outlines.end);
				resolve();
			}, 100);
		})).then(e => {
			// then
			expect(html).to.matchSnapshot();
			expect(html2).to.matchSnapshot();
			expect(html3).to.matchSnapshot();
			expect(html4).to.matchSnapshot();

			expect(height2).to.be.above(height);
			expect(height3).to.be.above(height2);
			expect(height4).to.be.above(height3);

			
			done();
		});
	});
});
