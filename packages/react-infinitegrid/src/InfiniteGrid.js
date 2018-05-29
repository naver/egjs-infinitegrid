import React, {Component, Children} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {GridLayout, ImageLoaded, DOMRenderer, ItemManager, Infinite, Watcher} from "@egjs/infinitegrid";
import {DONE, APPEND, PREPEND, PROCESS} from "./consts";
import ItemWrapper from "./ItemWrapper";
import LoadingBar from "./LoadingBar";

function newItem(groupKey, key, itemIndex) {
	return {
		el: null,
		orgSize: null,
		size: {},
		key,
		groupKey,
		itemIndex,
		rect: {
			left: -999999,
			top: -99999,
		},
		mount: false,
	};
}
function makeKey(component, groupKey, itemIndex) {
	return component.key || `__egjs_infinitegrid_${groupKey}_${itemIndex}`;
}
export default class InfiniteGrid extends Component {
	static propTypes = {
		tag: PropTypes.string,
		type: PropTypes.func,
		options: PropTypes.object,
		status: PropTypes.object,
		margin: PropTypes.number,
		threshold: PropTypes.number,
		isOverflowScroll: PropTypes.bool,
		isEqualSize: PropTypes.bool,
		useRecycle: PropTypes.bool,
		isConstantSize: PropTypes.bool,
		horizontal: PropTypes.bool,
		loading: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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

		this.clear();
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
		const status = this.props.status;

		if (status) {
			Object.assign(this.state, status.state);
		}
		this._refreshGroups();
	}
	shouldComponentUpdate(props, nextState) {
		if (nextState.processing !== DONE || nextState.layout) {
			return true;
		}
		const children = Children.toArray(this.props.children);
		const nextChildren = Children.toArray(props.children);

		if (children.length !== nextChildren.length ||
			!children.every((component, i) => component === nextChildren[i])) {
			this._refreshGroups(nextChildren, nextState);
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
		const {processing, isUpdate, layout} = state;

		this._updateLayout();
		this.state.isUpdate = false;
		if (!this.props.loading && this._bar) {
			this._endLoading();
		}
		if (layout) {
			this.layout(true);
		} else if (processing === DONE) {
			const isConstantSize = this.props.isConstantSize;
			const groups = this._getVisibleGroups();
			const updateGroups = isUpdate ? groups :
				groups.filter(group => !group.items.every(item => item.mount));
			const newItems = ItemManager.pluck(updateGroups, "items").filter(item => !item.mount && (!item.orgSize || !isConstantSize));

			newItems.forEach(item => { item.mount = true; });

			if (updateGroups.length) {
				if (newItems.length) {
					this._updateSize({groups, items: newItems, isUpdate});
				} else {
					this.layout(false);
				}
				return;
			}
			const scrollPos = this._watcher.getScrollPos();

			this._infinite.scroll(scrollPos, true);
		} else if (!(processing & PROCESS)) {
			// APPEND, PREPEND
			this._insert();
		}
		this._renderLoading();
	}
	componentDidMount() {
		this._mount(ReactDOM.findDOMNode(this));
	}
	componentWillUnmount() {
		this.clear();
		this._container = null;
		this._infinite && this._infinite.clear();
		this._watcher && this._watcher.destroy();
		this._items && this._items.clear();
		this._renderer && this._renderer.destroy();
	}
	getStatus() {
		const state = Object.assign(this.state);
		const datas = {};
		const groupKeys = {};


		state.groupKeys = groupKeys;
		state.datas = datas;
		state.groups = state.groups.map(group => {
			const groupInfo = Object.assign({}, group);

			groupKeys[groupInfo.groupKey] = groupInfo;
			groupInfo.children = [];
			groupInfo.items = groupInfo.items.map(item => {
				const itemInfo = Object.assign({}, item);

				datas[itemInfo.key] = itemInfo;
				itemInfo.el = null;
				return itemInfo;
			});

			return groupInfo;
		});
		return {
			state,
			_infinite: this._infinite.getStatus(),
			_watcher: this._watcher.getStatus(),
			_renderer: this._renderer.getStatus(),
		};
	}
	setStatus(status, applyScrollPos = true) {
		if (!status) {
			return this;
		}
		const {state, _renderer, _watcher, _infinite} = status;

		this._watcher.detachEvent();
		Object.assign(this.state, state);
		this.state.processing = DONE;
		this._renderer.setStatus(_renderer);
		this._infinite.setStatus(_infinite);
		this._refreshGroups(Children.toArray(this.props.children));
		DOMRenderer.renderItems(this._getVisibleItems());
		this._watcher.setStatus(_watcher, applyScrollPos);
		this._watcher.attachEvent();
		return this;
	}
	clear() {
		this.state = {
			groups: [],
			groupKeys: {},
			startIndex: -1,
			endIndex: -1,
			startKey: "",
			endKey: "",
			processing: DONE,
			layout: false,
			datas: {},
			isUpdate: false,
		};
		return this;
	}
	_mountElement = (itemKey, element) => {
		const item = this.state.datas[itemKey];

		if (!item) {
			return;
		}
		item.el = element;
	}
	_unmountElement = itemKey => {
		const item = this.state.datas[itemKey];

		if (!item) {
			return;
		}
		item.el = null;
		item.mount = false;
	}
	_getItemWrapper(group) {
		const datas = this.state.datas;
		const {groupKey, children, items} = group;

		return children.map((component, i) => {
			const key = makeKey(component, groupKey, i);

			!datas[key] && (datas[key] = newItem(groupKey, key, i));
			items[i] = datas[key];

			return <ItemWrapper
				key={key}
				itemKey={key}
				mount={this._mountElement}
				unmount={this._unmountElement}
			>{component}</ItemWrapper>;
		}
		);
	}
	_getVisibleGroups() {
		const {groups, startIndex, endIndex} = this.state;

		if (!groups.length) {
			return [];
		}
		return groups.slice(startIndex, endIndex + 1);
	}
	_getVisibleComponents() {
		const loadingBar = this.props.loading;
		const components = this._getVisibleGroups().map(group => this._getItemWrapper(group))
			.reduce((arr, children) => arr.concat(children), []);

		typeof loadingBar === "object" && components.push(
			<LoadingBar key="LOADINGBAR" horizontal={this.props.horizontal} ref={bar => { bar && (this._bar = bar); }}>
				{loadingBar}
			</LoadingBar>
		);

		return components;
	}
	_getVisibleItems() {
		return ItemManager.pluck(this._getVisibleGroups(), "items");
	}
	_refreshGroups(propsChildren = Children.toArray(this.props.children), state = this.state) {
		if (!propsChildren) {
			return;
		}
		const prevGroupKeys = state.groupKeys;
		const prevGroups = state.groups;
		const prevDatas = state.datas;
		const datas = {};
		const groupKeys = {};
		const groups = [];
		let {startKey, endKey, startIndex, endIndex} = state;

		propsChildren.forEach(item => {
			const props = item.props;
			const groupKey = props.groupKey || props["data-groupkey"] || 0;

			if (!groupKeys[groupKey]) {
				const prevGroup = prevGroupKeys[groupKey];
				const outlines = prevGroup ? prevGroup.outlines : {start: [], end: []};
				const items = [];

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
			const group = groupKeys[groupKey];
			const itemIndex = group.children.length;
			const key = makeKey(item, groupKey, itemIndex);
			let data = prevDatas[key];

			if (!data) {
				data = newItem(groupKey, key, itemIndex);
			} else if (
				data.groupKey !== groupKey ||
				data.itemIndex !== itemIndex
			) {
				data.groupKey = groupKey;
				data.itemIndex = itemIndex;
				this.state.isUpdate = true;
			}
			group.items[itemIndex] = data;
			datas[key] = data;
			group.children.push(item);
		});

		const prevLength = prevGroups.length;
		const prevStartIndex = prevGroupKeys[startKey] ? prevGroupKeys[startKey].index : -1;
		const prevEndIndex = prevGroupKeys[endKey] ? prevGroupKeys[endKey].index : -1;

		startIndex = groupKeys[startKey] ? groupKeys[startKey].index : -1;
		endIndex = groupKeys[endKey] ? groupKeys[endKey].index : -1;

		if (startIndex === -1) {
			startKey = "";
			if (!prevLength) {
				if (groups[0]) {
					startKey = groups[0].groupKey;
					startIndex = 0;
				}
			} else {
				prevGroups.slice(0, prevStartIndex + 1).forEach(({groupKey}, i) => {
					if (groupKeys[groupKey]) {
						startKey = groupKey;
						startIndex = groupKeys[groupKey].index;
					}
				});
			}
		}
		if (endIndex === -1) {
			endKey = "";
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
		// update group
		if (prevEndIndex - prevStartIndex !== endIndex - startIndex) {
			state.isUpdate = true;
		}
		state.groupKeys = groupKeys;
		state.groups = groups;
		state.startKey = startKey;
		state.endKey = endKey;
		state.startIndex = startIndex;
		state.endIndex = endIndex;
		state.datas = datas;
		this._updateGroups();

		!this.state.processing && this._updateCursor();
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
	_relayout(isRelayout, groups, items) {
		const renderer = this._renderer;
		const {isEqualSize, isConstantSize} = renderer.options;
		let outline = groups[0].outlines.start;

		if (isRelayout) {
			if (isEqualSize || isConstantSize) {
				outline = [outline.length ? Math.min(...outline) : 0];
			}
			if (!isConstantSize && items.length) {
				renderer.updateSize(items);
			}
		}
		this._layout.layout(groups, outline);
		return this;
	}
	layout(isRelayout = true) {
		if (!this._layout) {
			return this;
		}
		const renderer = this._renderer;
		const itemManager = this._items;
		const infinite = this._infinite;
		const isResize = renderer.resize();
		const items = this._getVisibleItems();
		const {isEqualSize, isConstantSize} = renderer.options;
		const isLayoutAll = isRelayout && (isEqualSize || isConstantSize);

		if (isRelayout && isResize) {
			this._setSize(renderer.getViewportSize());
		}
		// check items
		if (!items.length) {
			return this;
		}
		// layout datas
		const data = isLayoutAll ? itemManager.get() : infinite.getVisibleData();

		// LayoutManger interface
		this._relayout(isRelayout, data, isResize ? items : []);
		if (isLayoutAll) {
			this._fit();
			infinite.scroll(this._watcher.getScrollPos(), false);
		} else if (isRelayout) {
			const startCursor = infinite.getCursor("start");
			const endCursor = infinite.getCursor("end");
			const datas = itemManager.get();

			datas.forEach((group, cursor) => {
				if (startCursor <= cursor && cursor <= endCursor) {
					return;
				}
				group.outlines.start = [];
				group.outlines.end = [];
			});
		}
		DOMRenderer.renderItems(items);
		this._postLayoutComplete({
			items,
			isAppend: APPEND,
			fromCache: true,
			isTrusted: false,
			useRecycle: false,
			isLayout: true,
		});
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

		if (end < endIndex) {
			this.setState({startIndex: end + 1, startKey: groups[end + 1].groupKey});
		} else {
			this.setState({endIndex: start - 1, endKey: groups[start - 1].groupKey});
		}
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
		if (!this._infinite) {
			return;
		}
		const {startIndex, endIndex} = this.state;

		this._infinite.setCursor("start", startIndex);
		this._infinite.setCursor("end", endIndex);
	}
	_updateSize({
		groups = this._getVisibleGroups(),
		items = this._getVisibleItems(),
		isUpdate,
	}) {
		if (!groups.length) {
			return;
		}
		const state = this.state;
		const isAppend = !(state.processing & PREPEND);

		if (!items.length) {
			return;
		}
		const elements = items.map(item => item.el);

		ImageLoaded.check(elements, {
			complete: () => {
				if (!this._container) {
					return;
				}
				this._renderer.updateSize(items);

				const cursor = isAppend ? "end" : "start";
				const prevGroup = state.groups[groups[0].index + (isAppend ? -1 : 1)];
				let outline = prevGroup ? prevGroup.outlines[cursor] : [0];

				groups.forEach(group => {
					const groupOutline = group.outlines[isAppend ? "start" : "end"];
					const isRelayout = isUpdate || (outline.length && outline.length === groupOutline.length ?
						!outline.every((v, index) => v === groupOutline[index]) : true);

					if (!isRelayout) {
						return;
					}
					const groupItems = group.items;
					const itemInfos = this._layout[isAppend ? "append" : "prepend"](groupItems, outline);

					itemInfos.items.forEach(item => {
						Object.assign(groupItems[item.itemIndex], item);
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
			error: ({target, itemIndex}) => {
				const item = items[itemIndex];
				const element = item.el;
				const group = this.state.groupKeys[item.groupKey];
				const index = (group && group.items.indexOf(item)) || -1;

				this.props.onImageError({target, element, item, itemIndex: index});
			},
		});
	}
	_onCheck({isForward, scrollPos, horizontal, orgScrollPos}) {
		this.props.onChange({isForward, horizontal, scrollPos, orgScrollPos});
		this._infinite.scroll(scrollPos, isForward);
	}
	_setSize(size) {
		this._infinite.setSize(this._renderer.getViewSize());
		size && this._layout.setSize(size);
	}
	_renderLoading(isAppend = true) {
		if (!this._bar) {
			return;
		}
		const pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._bar.getSize();

		this._bar.setPosition(pos);
	}
	_endLoading() {
		this._bar = false;
		const size = this._getEdgeValue("end");

		this._renderer.setContainerSize(size);
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
			this._renderLoading();
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
		const isConstantSize = this.props.isConstantSize;
		const state = this.state;
		const {processing, startKey, endKey} = state;
		const isAppend = processing !== PREPEND;
		const group = state.groupKeys[isAppend ? endKey : startKey];
		const isCache = group.outlines.start.length && group.outlines.end.length;
		const items = group.items;
		const newItems = items.filter(item => !item.mount && (!item.orgSize || !isConstantSize));

		items.forEach(item => { item.mount = true; });
		DOMRenderer.renderItems(items);

		state.processing |= PROCESS;
		if (!isCache) {
			this._updateSize({groups: [group], items: newItems});
		} else {
			this._postLayoutComplete({
				isAppend,
				groups: [group],
				fromCache: true,
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
			threshold,
			useRecycle: true,
			append: param => this._requestAppend(param),
			prepend: param => this._requestPrepend(param),
			recycle: param => this._recycle(param),
		});
		this._updateLayout();
		this._setSize(this._renderer.getViewportSize());
		this._updateGroups();
		this._watcher.setScrollPos();

		const items = this._getVisibleItems();
		const status = this.props.status;

		if (status) {
			this.setStatus(status);
		} else if (items.length) {
			items.forEach(item => {
				item.mount = true;
			});
			DOMRenderer.renderItems(items);
			this.state.processing = APPEND | PROCESS;

			this._updateSize({items});
		} else {
			this._requestAppend({});
		}
	}
}
