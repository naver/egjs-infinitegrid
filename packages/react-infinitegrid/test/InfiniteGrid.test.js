/* eslint-disable */
import React from 'react';
import ReactDOM from "react-dom";
import {GridLayout} from "../src/index";
import {use, expect, assert} from "chai";
import { matchSnapshot } from "chai-karma-snapshot";
import {cleanHTML} from "./TestHelper";
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
		const rendered = ReactDOM.render(<GridLayout className="test1" align="center">
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

			expect(JSON.stringify(status)).to.matchSnapshot();
			expect(cleanHTML(html)).to.matchSnapshot();
			

			this.el = sandbox({
				id: "__react-content",
				style: "width: 500px",
			});

			const rendered2 = ReactDOM.render(<GridLayout className="test1" align="center" status={status}>
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
});
