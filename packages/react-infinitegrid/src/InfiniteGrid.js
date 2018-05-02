import React, {Component} from "react";
import PropTypes from "prop-types";
import {GridLayout, ImageLoaded, DOMRenderer, ItemManager} from "@egjs/infinitegrid";
import ReactInfiniteGrid from "./ReactInfiniteGrid";
import {DONE, APPEND, PREPEND} from "./consts";
import Item from "./Item";

function getItemWrapper(group) {
	const {groupKey, children, items} = group;

	return children.map((component, i) =>
		<Item
			key={component.key}
			groupKey={groupKey}
			itemIndex={i}
			ref={item => (item && (items[i] = item))}
			children={component}/>
	);
}
export default class InfiniteGrid extends Component {
	static propTypes = {
		tag: PropTypes.string,
		type: PropTypes.func,
		options: PropTypes.object,
		margin: PropTypes.number,
		threshold: PropTypes.number,
		isOverflowScroll: PropTypes.bool,
		isEqualSize: PropTypes.bool,
		useRecycle: PropTypes.bool,
		horizontal: PropTypes.bool,
		loading: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		percentage: PropTypes.bool,
		onAppend: PropTypes.func,
		onPrepend: PropTypes.func,
		onLayoutComplete: PropTypes.func,
		onImageError: PropTypes.func,
		onChange: PropTypes.func,
	};
	static defaultProps = {
		tag: "div",
		type: GridLayout,
		options: {},
		margin: 0,
		threshold: 100,
		isOverflowScroll: false,
		isEqualSize: false,
		useRecycle: true,
		horizontal: false,
		loading: false,
		percentage: false,
		onAppend: () => {},
		onPrepend: () => {},
		onLayoutComplete: () => {},
		onImageError: () => {},
		onChange: () => {},
	};
	static layoutProps = {};
	constructor(props) {
		super(props);
		const LayoutType = this.props.type;

		window.a = this;
		this.state = {
			groups: [],
			groupKeys: [],
			startKey: "",
			endKey: "",
			scroll: 0,
			processing: DONE,
		};
		const options = {};
		const layoutProps = this.constructor.layoutProps;

		for (const name in layoutProps) {
			if (name in props) {
				options[name] = props[name];
			}
		}
		this._layout = new LayoutType({
			...options,
			horizontal: this.props.horizontal,
		});
		this._refreshGroups();
	}
	_updateLayout() {
		this._infiniteGrid && this._infiniteGrid.updateLayout(this.props);
	}
	shouldComponentUpdate(props, state) {
		this.state.scroll = null;
		if (this.state.size !== state.size) {
			return true;
		}
		if (state.processing !== DONE) {
			return true;
		}
		this.state.scroll = this._infiniteGrid._watcher.getScrollPos();
		const children = this.props.children;
		const nextChildren = props.children;

		if (children.length !== nextChildren.length ||
			!children.every((component, i) => component === nextChildren[i])) {
			this._refreshGroups(props.children, true);
		} else if (state.startKey !== this.state.startKey ||
				state.endKey !== this.state.endKey) {
			return true;
		} else {
			return false;
		}
		return true;
	}
	render() {
		const attributes = {};
		const layout = this._layout;
		const props = this.props;
		const Tag = props.tag;

		for (const name in props) {
			if (name in InfiniteGrid.propTypes || name in layout.options) {
				continue;
			}
			attributes[name] = props[name];
		}
		return <Tag {...attributes} ref={element => this._mount(element)}>
			{this._getVisibleComponents()}
		</Tag>;
	}
	_getVisibleGroups() {
		const {groups, startIndex, endIndex} = this.state;

		if (!groups.length) {
			return [];
		}
		return groups.slice(startIndex, endIndex + 1);
	}
	_getVisibleComponents() {
		return this._getVisibleGroups().map(group => getItemWrapper(group))
			.reduce((components, children) => components.concat(children), []);
	}
	_getVisibleItems() {
		return ItemManager.pluck(this._getVisibleGroups(), "items");
	}
	_onLayoutComplete({isLayout}) {
		this.props.onLayoutComplete({
			isLayout,
		});
	}
	_isProcessing() {
		return !!this.state.processing;
	}
	_requestAppend = ({cache}) => {
		if (this._isProcessing()) {
			return;
		}
		if (cache) {
			const {groupKey, index} = cache;

			this.setState({processing: APPEND, endKey: groupKey, endIndex: index});
			return;
		}
		this.props.onAppend({
			groupKey: this.state.endKey,
		});
	}
	_requestPrepend = ({cache, fit}) => {
		if (this._isProcessing()) {
			return;
		}
		if (cache) {
			const {groupKey, index} = cache;

			console.log("prepend req", groupKey, index);
			this.setState({processing: PREPEND, startKey: groupKey, startIndex: index});
			return;
		}
		this.props.onPrepend({
			groupKey: this.state.startKey,
		});
	}
	_recycle = ({start, end}) => {
		const {endIndex} = this.state;
		const groups = this.state.groups;

		console.log("recycle", start, end, groups[start].groupKey, groups[end].groupKey);
		if (end < endIndex) {
			this.setState({startIndex: end + 1, startKey: groups[end + 1].groupKey});
		} else {
			this.setState({endIndex: start - 1, endKey: groups[start - 1].groupKey});
		}
	}
	_check = ({scrollPos, isForward}) => {
		this._infinite.scroll(scrollPos, isForward);
	}
	_refreshGroups(propsChildren = this.props.children, isChange) {
		if (!propsChildren || !propsChildren.length) {
			return;
		}
		const state = this.state;
		const prevGroupKeys = state.groupKeys;
		const prevGroups = state.groups;
		const groupKeys = {};
		const groups = [];
		let {startKey, endKey, startIndex, endIndex} = state;

		React.Children.forEach(propsChildren, item => {
			const groupKey = item.props.groupKey || 0;

			if (!groupKeys[groupKey]) {
				const prevGroup = prevGroupKeys[groupKey];
				const outlines = prevGroup ? prevGroup.outlines : {start: [], end: []};
				const items = prevGroup ? prevGroup.items : [];

				groupKeys[groupKey] = {
					groupKey,
					outlines,
					items,
					children: [],
					index: -1,
				};

				groupKeys[groupKey].index = groups.length;
				groups.push(groupKeys[groupKey]);
			}
			groupKeys[groupKey].children.push(item);
		});

		const prevLength = prevGroups.length;
		const prevStartIndex = prevLength ? prevGroupKeys[startKey].index : -1;
		const prevEndIndex = prevLength ? prevGroupKeys[endKey].index : -1;

		startIndex = prevLength && groupKeys[startKey] ? groupKeys[startKey].index : -1;
		endIndex = prevLength && groupKeys[endKey] ? groupKeys[endKey].index : -1;

		if (startIndex === -1) {
			if (!prevLength) {
				if (groups[0]) {
					startKey = groups[0].groupKey;
					startIndex = 0;
				}
			} else {
				prevGroups.slice(0, prevStartIndex).forEach(({groupKey}, i) => {
					if (groupKeys[groupKey]) {
						startKey = groupKey;
						startIndex = groupKeys[groupKey].index;
					}
				});
			}
		}
		if (endIndex === -1) {
			if (!prevLength) {
				if (groups[0]) {
					endKey = groups[0].groupKey;
					endIndex = 0;
				}
			} else {
				prevGroups.slice(prevStartIndex, prevEndIndex + 1)
					.forEach(({groupKey}, i) => {
						if (groupKeys[groupKey]) {
							endKey = groupKey;
							endIndex = groupKeys[groupKey].index;
						}
					});
			}
		}
		state.groupKeys = groupKeys;
		state.groups = groups;
		state.startKey = startKey;
		state.endKey = endKey;
		state.startIndex = startIndex;
		state.endIndex = endIndex;
		this._updateGroups();

		console.log("cursorchange", isChange);
		isChange && this._updateCursor();
	}
	_updateGroups() {
		this._infiniteGrid && this._infiniteGrid.updateGroups(this.state.groups);
	}
	_updateCursor() {
		const {startIndex, endIndex} = this.state;

		console.log("cursorchange", `start: ${startIndex}, end: ${endIndex}`);
		this._infiniteGrid && this._infiniteGrid.updateCursor(startIndex, endIndex);
	}
	_updateSize({
		groups = this._getVisibleGroups(),
		items = this._getVisibleItems(),
	}) {
		if (!groups.length) {
			return;
		}
		const state = this.state;
		const isAppend = state.processing !== PREPEND;

		state.processing = state.processing || APPEND;
		if (!items.length) {
			return;
		}
		const elements = items.map(item => item.el);

		ImageLoaded.check(elements, {
			complete: () => {
				this._infiniteGrid._renderer.updateSize(items);
				let outline = this._infiniteGrid._infinite.getEdgeOutline(isAppend ? "end" : "start");

				groups.forEach(group => {
					const groupOutline = group.outlines[isAppend ? "start" : "end"];
					const isRelayout = outline.length && outline.length === groupOutline.length ?
						!outline.every((v, index) => v === groupOutline[index]) : true;

					if (!isRelayout) {
						return;
					}
					const groupItems = group.items;
					const itemInfos = this._layout[isAppend ? "append" : "prepend"](items, outline);

					itemInfos.items.forEach(item => {
						groupItems[item.itemIndex].rect = item.rect;
					});
					group.outlines = itemInfos.outlines;
					outline = itemInfos.outlines[isAppend ? "end" : "start"];
				});
				this._updateCursor();
				this.setState({processing: DONE});
				this._onLayoutComplete({});

				DOMRenderer.renderItems(items);
			},
			end: () => {
				const scrollPos = this._infiniteGrid._watcher.getScrollPos();

				if (!this._isProcessing() && !this._infiniteGrid.isProcessing() && this.props.useRecycle) {
					this._infiniteGrid._infinite.recycle(scrollPos, isAppend);
				}
			},
		});
	}
	componentDidUpdate(prevProps, prevState) {
		this._infiniteGrid.updateLayout(this.props);
		if (typeof this.state.scroll === "number") {
			this._infiniteGrid._infinite.scroll(this.state.scroll, true);
		}
		const groups = this._getVisibleGroups();
		const newGroups = groups.filter(group => !group.items.every(item => item.mount));
		const isCache = newGroups.every(group => {
			console.log(group.outlines);
			return !group.outlines.start.length || !group.outlines.end.length;
		});
		const items = ItemManager.pluck(newGroups, "items");
		const newItems = items.filter(item => !item.mount);

		newItems.forEach(item => {
			item.mount = true;
		});

		if (!newGroups.length) {
			if (prevState.startKey !== this.state.startKey ||
				prevState.endKey !== this.state.endKey) {
				this._updateCursor();
			}
			return;
		}
		DOMRenderer.renderItems(newItems);
		this._updateSize({groups: newGroups, items: newItems});
	}
	_mount(container) {
		if (!container || this._container) {
			return;
		}
		this._container = container;
		const {isOverflowScroll, isEqualSize, horizontal, useRecycle, threshold} = this.props;

		this._infiniteGrid = new ReactInfiniteGrid(this._container, {
			isOverflowScroll,
			isEqualSize,
			horizontal,
			useRecycle,
			threshold,
		}, {
			_requestAppend: param => this._requestAppend(param),
			_requestPrepend: param => this._requestPrepend(param),
			_recycle: param => this._recycle(param),
		});
		this._infiniteGrid.setLayout(this._layout);
		this._updateLayout();
		this._updateGroups();

		const items = this._getVisibleItems();

		items.forEach(item => {
			item.mount = true;
		});

		DOMRenderer.renderItems(items);
		this._updateSize({items});
	}
}
