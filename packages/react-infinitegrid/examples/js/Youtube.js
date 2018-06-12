import React from "react";
import ReactDOM from "react-dom";
// import { GridLayout } from "@egjs/react-infinitegrid";
import { GridLayout } from "../../src/index";
import getNextPage from "./Youtube/api";
import Header from "./Youtube/Header";
import Item from "./Youtube/Item";
import "./Youtube/index.css";

function getItems(items, groupKey, start) {
	return items.map((props, i) => (
		<Item groupKey={groupKey} key={`item${start + i}`} {...props} />
	));
}
const Message = ({ message }) => (message ? <div className="nomore">{message}</div> : null);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			nextPageToken: "",
			query: "",
			message: "",
		};
	}
	onSearch = query => {
		document.body.scrollTop = 0;
		this.setState({query, list: [], nextPageToken: "", message: ""});
	};
	onAppend = e => {
		const groupKey = parseFloat(e.groupKey || 0) + 1;
		const pageToken = this.state.nextPageToken;

		if (pageToken === -1) {
			return;
		}
		e.startLoading();
		getNextPage(this.state.query, pageToken).then(result => {
			const {nextPageToken, items, error} = result;
			const list = this.state.list;
			const length = items.length;
			const message =
				error ||
				(!nextPageToken &&
					!list.length &&
					`No results found for ${this.state.query}`);

			this.setState({
				message,
				nextPageToken: (length && nextPageToken) || -1,
				list: error ? [] : list.concat(getItems(items, groupKey, list.length))
			});
			(message || !length) && e.endLoading();
		});
	};
	onLayoutComplete = e => {
		!e.isLayout && e.endLoading();
	};
	render() {
		return (
			<div>
				<Header onSearch={this.onSearch} />
				<GridLayout
					id="grid"
					isEqualSize={true}
					align="center"
					onAppend={this.onAppend}
					loading={<div className="loading">LOADING...</div>}
					onLayoutComplete={this.onLayoutComplete}
				>
					{this.state.list}
				</GridLayout>
				<Message message={this.state.message} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
