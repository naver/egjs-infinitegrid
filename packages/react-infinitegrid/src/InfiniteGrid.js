import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {GridLayout, ImageLoaded, DOMRenderer, ItemManager, Infinite} from "@egjs/infinitegrid";
import {DONE, APPEND, PREPEND} from "./consts";
import ItemWrapper from "./ItemWrapper";
import LoadingBar from "./LoadingBar";
import Watcher from "../../../src/Watcher";

function newItem() {
	return {
		el: null,
		orgSize: null,
		size: {},
		groupKey: 0,
		itemIndex: -1,
		rect: {
			left: -999999,
			top: -99999,
		},
		mount: false,
	};
}

function getItemWrapper(datas, group) {
	const {groupKey, children, items} = group;

	return children.map((component, i) => {
		const key = component.key;

		!datas[key] && (datas[key] = newItem());
		const data = datas[key];

		data.groupKey = groupKey;
		data.itemIndex = i;
		return <ItemWrapper
			key={key}
			item={datas[key]}
			ref={item => (item && (items[i] = datas[key]))}
		>{component}</ItemWrapper>;
	}
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
		isConstantSize: PropTypes.bool,
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
		isConstantSize: false,
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
			layout: false,
			datas: {},
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
	shouldComponentUpdate(props, state) {
		this.state.scroll = null;
		!props.loading && (this._bar = false);
		if (this.state.size !== state.size) {
			return true;
		}
		if (state.processing !== DONE || state.layout) {
			return true;
		}
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
	componentDidUpdate(prevProps, prevState) {
		const state = this.state;
		const {processing, layout} = state;

		this._updateLayout();
		if (layout) {
			this.layout(true);
		} else if (processing === DONE) {
			const scrollPos = this._watcher.getScrollPos();

			this._infinite.scroll(scrollPos, true);
		} else {
			this._renderLoading(processing !== PREPEND);
			// APPEND, PREPEND
			this._insert();
		}
	}
	componentDidMount() {
		this._mount(ReactDOM.findDOMNode(this));
	}
	_getVisibleGroups() {
		const {groups, startIndex, endIndex} = this.state;

		if (!groups.length) {
			return [];
		}
		return groups.slice(startIndex, endIndex + 1);
	}
	_getVisibleComponents() {
		const datas = this.state.datas;
		const loadingBar = this.props.loading;
		const components = this._getVisibleGroups().map(group => getItemWrapper(datas, group))
			.reduce((arr, children) => arr.concat(children), []);

		typeof loadingBar === "object" && components.push(
			<LoadingBar key="LOADINGBAR" horizontal={this.props.horizontal} ref={bar => { this._bar = bar; }}>
				{loadingBar}
			</LoadingBar>
		);

		return components;
	}
	_getVisibleItems() {
		return ItemManager.pluck(this._getVisibleGroups(), "items");
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

		isChange && this._updateCursor();
	}
	_updateLayout() {
		const props = this.props;
		const options = this._layout.options;

		for (const name in options) {
			if (name in props) {
				options[name] = props[name];
			}
		}
	}
	layout(isRelayout = true) {
		if (!this._layout) {
			return this;
		}
		const renderer = this._renderer;
		const itemManager = this._items;
		const isResize = renderer.resize();

		if (isRelayout && isResize) {
			this._setSize(renderer.getViewportSize());
		}
		// check childElement
		if (!this._items.size()) {
			return this;
		}
		let data;
		let outline;

		const infinite = this._infinite;
		const items = this._getVisibleItems();
		const isEqualSize = this.props.isEqualSize;

		if (!items.length) {
			return this;
		}
		if (isRelayout) { // remove cache
			if (isEqualSize) {
				renderer.updateSize([items[0]]);
				data = itemManager.get();
				outline = itemManager.getOutline(0, "start");
			} else {
				data = infinite.getVisibleData();
			}
			if (isResize) {
				data.forEach(v => {
					data.items = renderer.updateSize(v.items);
				});
			}
		} else {
			data = infinite.getVisibleData();
			outline = infinite.getEdgeOutline("start");
		}
		if (!data.length) {
			return this;
		}
		this._layout.layout(data, outline);

		if (isRelayout) {
			if (isEqualSize) {
				this._fit();
			} else {
				const startCursor = infinite.getCursor("start");
				const endCursor = infinite.getCursor("end");

				itemManager._data.forEach((group, cursor) => {
					if (startCursor <= cursor && cursor <= endCursor) {
						return;
					}
					group.outlines.start = [];
					group.outlines.end = [];
				});
			}
		}
		this._postLayoutComplete({
			items,
			isAppend: APPEND,
			fromCache: true,
			isTrusted: false,
			useRecycle: false,
			isLayout: true,
		});
		DOMRenderer.renderItems(items);
		isRelayout && this._watcher.setScrollPos();

		return this;
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
		if (this.props.loading) {
			return;
		}
		this.props.onAppend({
			groupKey: this.state.endKey,
		});
	}
	_requestPrepend = ({cache, fit}) => {
		if (fit) {
			this._fit();
		}
		if (this._isProcessing()) {
			return;
		}
		if (cache) {
			const {groupKey, index} = cache;

			this.setState({processing: PREPEND, startKey: groupKey, startIndex: index});
			return;
		}
		if (this.props.loading) {
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
	_fitItems(base, margin = 0) {
		base > 0 && this._watcher.scrollBy(-base);
		this._items.fit(base, this.props.horizontal);
		DOMRenderer.renderItems(this._getVisibleItems());
		this._renderer.setContainerSize(this._getEdgeValue("end") || margin);
		base < 0 && this._watcher.scrollBy(-base);
	}
	// called by visible
	_fit() {
		let base = this._getEdgeValue("start");
		const margin = (this._bar && this._bar.getSize()) || 0;

		if (!this.props.useRecycle) {
			if (base < margin) {
				this._fitItems(base - margin, margin);
			}
			base = 0;
		} else if (base !== 0 || margin) {
			this._fitItems(base - margin, margin);
		} else {
			return 0;
		}
		return base;
	}
	_getEdgeValue(cursor) {
		return this._infinite.getEdgeValue(cursor);
	}
	_updateGroups() {
		this._items && (this._items._data = this.state.groups);
	}
	_updateCursor() {
		const {startIndex, endIndex} = this.state;

		this._infinite.setCursor("start", startIndex);
		this._infinite.setCursor("end", endIndex);
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

		if (!items.length) {
			return;
		}
		const elements = items.map(item => item.el);

		ImageLoaded.check(elements, {
			complete: () => {
				this._renderer.updateSize(items);
				let outline = this._infinite.getEdgeOutline(isAppend ? "end" : "start");

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
				this._postLayoutComplete({
					groups,
					isAppend,
					isTrusted: true,
					fromCache: false,
				});
			},
		});
	}
	_onCheck({isForward, scrollPos, horizontal, orgScrollPos}) {
		this.props.onChange({isForward, horizontal, scrollPos, orgScrollPos});
		this._infinite.scroll(scrollPos, isForward);
	}
	_setSize(size) {
		this._infinite.setSize(this._renderer.getViewSize());
		this._layout.setSize(size);
	}
	_renderLoading(isAppend) {
		if (!this._bar) {
			return;
		}
		const pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._bar.getSize();

		this._bar.setPosition(pos);
	}
	_postLayoutComplete({
		groups,
		items = ItemManager.pluck(groups, "items"),
		isAppend,
		isTrusted,
		fromCache,
		isLayout = false,
	}) {
		const viewSize = this._renderer.getViewSize();

		this._updateCursor();
		if (!isAppend) {
			this._fit();
		} else {
			DOMRenderer.renderItems(items);
			this._renderLoading(isAppend);
		}
		const {useRecycle} = this.props;
		const watcher = this._watcher;
		const scrollPos = watcher.getScrollPos();

		if (useRecycle) {
			this._infinite.recycle(scrollPos, isAppend);
		}
		const size = this._getEdgeValue("end");
		const loadingSize = (this._bar && this._bar.getSize()) || 0;

		isAppend && this._renderer.setContainerSize(size + loadingSize); //  + this._status.loadingSize || 0

		this.props.onLayoutComplete({
			target: items,
			isAppend,
			isTrusted,
			isLayout,
			isScroll: viewSize < watcher.getContainerOffset() + size,
			scrollPos,
			orgScrollPos: watcher.getOrgScrollPos(),
			size,
		});
		this.setState(isLayout ? {layout: false} : {processing: DONE});
	}
	_insert() {
		const state = this.state;
		const groups = this._getVisibleGroups();
		const newGroups = groups.filter(group => !group.items.every(item => item.mount));
		const isCache = !newGroups.length || newGroups.every(group =>
			group.outlines.start.length && group.outlines.end.length);
		const items = ItemManager.pluck(newGroups, "items");
		const newItems = items.filter(item => !item.mount);

		newItems.forEach(item => {
			item.mount = true;
		});
		if (!newGroups.length) {
			this._updateCursor();
			return;
		}
		DOMRenderer.renderItems(newItems);
		if (!isCache) {
			this._updateSize({groups: newGroups, items: newItems});
		} else {
			this._postLayoutComplete({
				groups: newGroups,
				isAppend: state.processing === APPEND,
				fromCache: true,
				isTrusted: true,
			});
		}
	}
	_mount(container) {
		if (!container || this._container) {
			return;
		}
		this._container = container;
		const {
			isOverflowScroll,
			isEqualSize,
			isConstantSize,
			horizontal,
			useRecycle,
			threshold,
		} = this.props;

		this._items = new ItemManager();
		this._renderer = new DOMRenderer(container, {
			isOverflowScroll,
			isEqualSize,
			isConstantSize,
			horizontal,
		});
		this._watcher = new Watcher(
			this._renderer.view,
			{
				isOverflowScroll,
				horizontal,
				container: this._renderer.container,
				resize: () => this.setState({layout: true}),
				check: param => this._onCheck(param),
			});
		this._infinite = new Infinite(this._items, {
			horizontal,
			useRecycle,
			threshold,
			append: param => this._requestAppend(param),
			prepend: param => this._requestPrepend(param),
			recycle: param => this._recycle(param),
		});
		this._updateLayout();
		this._setSize(this._renderer.getViewportSize());
		this._updateGroups();

		const items = this._getVisibleItems();

		items.forEach(item => {
			item.mount = true;
		});

		DOMRenderer.renderItems(items);
		this._updateSize({items});
	}
}
