import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {
	search = () => {
		const query = this.input.value;

		if (!query) {
			this.input.focus();
			return;
		}
		this.input.blur();
		this.props.onSearch(query);
	};
	render() {
		return (
			<header className="header">
				<div className="search">
					<div className="search-input">
						<input
							type="text"
							className="query"
							placeholder="Search..."
							ref={e => {
								e && (this.input = e);
							}}
							onKeyUp={e => {
								if (!this.input || e.keyCode !== 13) {
									return;
								}
								this.search();
							}}
						/>
					</div>
					<button className="submit" onClick={this.search} />
				</div>
				<div className="menu">
					<a href="https://github.com/naver/egjs-infinitegrid/tree/master/packages/react-infinitegrid" target="_blank">Github</a>
					<a href="https://codesandbox.io/s/935xz7zy8r" target="_blank">Code</a>
					<a href="https://github.com/naver/egjs-infinitegrid/wiki/react-infinitegrid-API-documentation" target="_blank">API</a>
				</div>
			</header>
		);
	}
	componentDidMount() {
		const header = ReactDOM.findDOMNode(this);
		const search = header.querySelector(".search");
		const menu = header.querySelector(".menu");
		const scroll = e => {
			const scrollTop =
				window.pageYOffset ||
				document.body.scrollTop ||
				document.documentElement.scrollTop;
			const height = 300 - Math.min(scrollTop, 220);
			const scale = (Math.min(130, height) + 70) / 200;
			const opacity = Math.max(0, 220 - scrollTop) / 220;

			header.style.height = `${height}px`;
			search.style.transform = `scale(${scale})`;
			menu.style.opacity = opacity;
			menu.style.display = opacity ? "block" : "none";
		};

		window.addEventListener("scroll", scroll);
		scroll();
	}
}
