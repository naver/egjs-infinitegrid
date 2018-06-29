import React, {Component, Children} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {GridLayout, ImageLoaded, DOMRenderer, ItemManager, Infinite, Watcher} from "@egjs/infinitegrid";
import {DONE, APPEND, PREPEND, PROCESS, DUMMY_POSITION, LOADING_APPEND, LOADING_PREPEND} from "./consts";
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
			left: DUMMY_POSITION,
			top: DUMMY_POSITION,
		},
		mount: false,
	};
}
function makeKey(component, groupKey, itemIndex) {
	return component.key || `__egjs_infinitegrid_${groupKey}_${itemIndex}`;
}
function _updateSize(items) {
	// DOMRenderer temporary code
	items.forEach(item => {
		item.size.width = parseInt(item.size.width, 10);
		item.size.height = parseInt(item.size.height, 10);
	});
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
		useFit: PropTypes.bool,
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
		useFit: true,
		horizontal: false,
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
			Object.assign(this.state, status._state);
		}
		this._refreshGroups();
	}
	shouldComponentUpdate(props, nextState) {
		if (nextState.processing & (APPEND | PREPEND) || nextState.layout) {
			return true;
		}
		const children = this.state.children;
		const nextChildren = Children.toArray(props.children);
		const length = children.length;
		const nextLength = nextChildren.length;

		if (length !== nextLength ||
			(length && !children.every((component, i) => {
				const nextComponent = nextChildren[i];
				const key = component.key;
				const nextKey = nextComponent.key;
				const groupKey = component.props.groupKey || component.props["data-groupkey"] || 0;
				const nextGroupKey = nextComponent.props.groupKey || nextComponent.props["data-groupkey"] || 0;

				return component === nextComponent || (key === nextKey && groupKey === nextGroupKey);
			}))) {
			if (length === 0) {
				nextState.processing |= APPEND;
				nextState.requestIndex = 0;
			}
			this._refreshGroups(nextChildren, nextState);
		} else if (length && length === nextLength) {
			this._refreshChildren(nextChildren, nextState);
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
		const {processing, layout, isUpdate, startIndex, startKey} = state;

		this._updateLayout();
		state.isUpdate = false;
		if (processing === DONE) {
			// block processing
			if (layout) {
				this.layout(true);
				return;
			}
			this._setContainerSize();
			state.requestIndex = startIndex;
			state.requestKey = startKey;
			this._insert(isUpdate);
		} else {
			if (!this._isLoading(prevState) && this._isLoading(state)) {
				this._setContainerSize();
			}
			if (processing & (APPEND | PREPEND)) {
				if (!(processing & PROCESS)) {
					// Not PROCESS, only APPEND, PREPEND
					this._insert();
				}
			} else {
				const scrollPos = this._watcher.getScrollPos();

				this._scroll(scrollPos);
			}
		}
	}
	componentDidMount() {
		this._mount(ReactDOM.findDOMNode(this));
	}
	componentWillUnmount() {
		this.clear();
		this._container = null;
		this._watcher && this._watcher.destroy();
		this._items && this._items.clear();
		this._renderer && this._renderer.destroy();
	}
	getStatus(startKey = "", endKey = "") {
		const state = Object.assign({}, this.state);
		const datas = {};
		const groupKeys = {};
		const startGroup = state.groupKeys[startKey];
		const endGroup = state.groupKeys[endKey];
		const startIndex = startGroup ? startGroup.index : -1;
		const endIndex = endGroup ? endGroup.index : -1;
		let groups = state.groups;

		delete state.children;
		delete state.loadingStyle;

		state.groupKeys = groupKeys;
		state.datas = datas;

		if (~startIndex && ~endIndex) {
			groups = groups.slice(startIndex, endIndex + 1);
			if (state.startIndex < startIndex) {
				state.startIndex = startIndex;
				state.startKey = startKey;
			}
			if (state.endIndex > endIndex) {
				state.endIndex = endIndex;
				state.endKey = endKey;
			}
		}
		state.groups = groups.map(group => {
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
			_state: state,
			_infinite: this._infinite.getStatus(),
			_watcher: this._watcher.getStatus(),
			_renderer: this._renderer.getStatus(),
		};
	}
	setStatus(status, applyScrollPos = true) {
		if (!status) {
			return this;
		}
		const {_state, _renderer, _watcher, _infinite} = status;
		const watcher = this._watcher;
		const renderer = this._renderer;
		const state = this.state;

		watcher.detachEvent();
		Object.assign(state, _state);
		state.processing = DONE;
		renderer.setStatus(_renderer);
		this._infinite.setStatus(_infinite);
		this._refreshGroups(Children.toArray(this.props.children));
		const isReLayout = renderer.isNeededResize();

		!isReLayout && DOMRenderer.renderItems(this._getVisibleItems());
		watcher.setStatus(_watcher, applyScrollPos);
		watcher.attachEvent();

		const items = ItemManager.pluck(state.groups, "items");

		items.forEach(item => {
			if (!item.orgSize || item.rect.top < DUMMY_POSITION / 10) {
				item.mount = false;
			}
		});
		if (isReLayout) {
			renderer.resize();
			this._setSize(renderer.getViewportSize());
			if (this.props.isConstantSize) {
				this.layout(true);
			} else {
				this._clearOutlines();
				items.forEach(item => { item.mount = false; });
				state.processing |= APPEND;
				state.requestIndex = Math.max(0, state.startIndex);
				this._insert(true);
			}
		} else {
			this.layout(false);
		}
		return this;
	}
	clear() {
		this.state = {
			groups: [],
			groupKeys: {},
			loadingStyle: {},
			startIndex: -1,
			requestIndex: 0,
			endIndex: -1,
			startKey: "",
			endKey: "",
			processing: DONE,
			layout: false,
			datas: {},
			isUpdate: false,
		};
		if (this._infinite) {
			this._infinite.clear();
			this._setSize();
		}
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
		const components = this._getVisibleGroups().map(group => this._getItemWrapper(group))
			.reduce((arr, children) => arr.concat(children), []);

		const {horizontal, loading} = this.props;
		const {processing, loadingStyle} = this.state;

		components.push(
			<LoadingBar
				key="LOADINGBAR"
				horizontal={horizontal}
				loading={processing & (LOADING_APPEND | LOADING_PREPEND)}
				loadingStyle={loadingStyle}
				ref={bar => { bar && (this._loading = bar); }}
			>
				{loading}
			</LoadingBar>
		);

		return components;
	}
	_getVisibleItems() {
		return ItemManager.pluck(this._getVisibleGroups(), "items");
	}
	_refreshChildren(propsChildren = Children.toArray(this.props.children), state = this.state) {
		const {groupKeys, groups} = state;

		groups.forEach(group => {
			group.children = [];
		});
		propsChildren.forEach(item => {
			const props = item.props;
			const groupKey = props.groupKey || props["data-groupkey"] || 0;
			const group = groupKeys[groupKey];

			if (!group) {
				return;
			}
			group.children.push(item);
		});

		state.children = propsChildren;
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
				const prevGroup = prevGroupKeys[groupKey] ||
					{
						groupKey,
						outlines: {start: [], end: []},
						index: -1,
					};

				prevGroup.index = groups.length;
				prevGroup.items = [];
				prevGroup.children = [];
				groupKeys[groupKey] = prevGroup;
				groups.push(prevGroup);
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
				state.isUpdate = true;
			}
			group.items[itemIndex] = data;
			datas[key] = data;
			group.children.push(item);
		});

		const prevLength = prevGroups.length;
		const prevStartIndex = prevGroupKeys[startKey] ? prevGroupKeys[startKey].index : -1;
		const prevEndIndex = Math.max(prevStartIndex,
			prevGroupKeys[endKey] ? prevGroupKeys[endKey].index : -1);

		startIndex = groupKeys[startKey] ? groupKeys[startKey].index : -1;
		endIndex = groupKeys[endKey] ? groupKeys[endKey].index : -1;

		if (startIndex === -1) {
			startKey = "";
			if (!prevLength || prevStartIndex === -1) {
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
				if (startIndex === -1 && groups[0]) {
					startKey = groups[0].groupKey;
					startIndex = 0;
				}
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
			endIndex = Math.max(startIndex, endIndex);
			endKey = groups[endIndex] ? groups[endIndex].groupKey : "";
		}
		// update group
		if (prevEndIndex - prevStartIndex !== endIndex - startIndex) {
			state.isUpdate = true;
		}
		state.children = propsChildren;
		state.groupKeys = groupKeys;
		state.groups = groups;
		state.startKey = startKey;
		state.endKey = endKey;
		state.startIndex = startIndex;
		state.endIndex = endIndex;
		state.datas = datas;
		// synchronize
		this._updateGroups(groups);
		(!this._isProcessing() || !groups.length) && this._updateCursor(state);
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
		const {isConstantSize} = renderer.options;
		const layoutGroups = groups.filter(group => {
			const item = group.items[0];

			return item.orgSize && item.rect.top > DUMMY_POSITION / 10;
		});

		if (!layoutGroups.length) {
			return [];
		}
		let outline = layoutGroups[0].outlines.start;

		if (isRelayout) {
			outline = [outline.length ? Math.min(...outline) : 0];
			if (!isConstantSize && items.length) {
				renderer.updateSize(items);
				_updateSize(items);
			}
		}
		this._layout.layout(layoutGroups, outline);
		return layoutGroups;
	}
	_clearOutlines(startCursor = -1, endCursor = -1) {
		const datas = this._items.get();

		datas.forEach((group, cursor) => {
			if (startCursor <= cursor && cursor <= endCursor) {
				return;
			}
			group.items.forEach(item => {
				item.rect.top = DUMMY_POSITION;
				item.rect.left = DUMMY_POSITION;
			});
			group.outlines.start = [];
			group.outlines.end = [];
		});
	}
	resize() {
		this._watcher.resize();
		if (this._renderer.isNeededResize()) {
			this.layout(true);
		}
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
		const startCursor = infinite.getCursor("start");
		const endCursor = infinite.getCursor("end");
		const data = isLayoutAll || !(isRelayout && isResize) ? itemManager.get() :
			itemManager.get(startCursor, endCursor);

		// LayoutManger interface
		const layoutGroups = this._relayout(isRelayout, data, isResize ? items : []);

		if (!layoutGroups.length) {
			this.state.requestIndex = 0;
			this._insert(true);
			return this;
		}
		if (isLayoutAll) {
			this._fit();
		} else if (isRelayout && isResize) {
			this._clearOutlines(startCursor, endCursor);
		}
		DOMRenderer.renderItems(items);
		isRelayout && this._watcher.setScrollPos();
		this._scroll(this._watcher.getScrollPos());
		this._postLayoutComplete({
			items,
			isAppend: APPEND,
			fromCache: true,
			isTrusted: false,
			useRecycle: false,
			isLayout: true,
		});
		return this;
	}
	_isProcessing() {
		return !!(this.state.processing & (APPEND | PREPEND));
	}
	_isLoading(state = this.state) {
		return !!(state.processing & (LOADING_APPEND | LOADING_PREPEND));
	}
	startLoading(isAppend, loadingStyle = {}) {
		this.setState({
			loadingStyle,
			processing: this.state.processing | (isAppend ? LOADING_APPEND : LOADING_PREPEND),
		});
	}
	endLoading = (loadingStyle = {}) => {
		this.setState({
			loadingStyle,
			processing: this.state.processing & ~(LOADING_APPEND | LOADING_PREPEND),
		});
	};
	_requestAppend = ({cache}) => {
		if (this._isProcessing()) {
			return;
		}
		if (cache && cache.length) {
			const endItem = cache[cache.length - 1];
			const endKey = endItem.groupKey;
			const endIndex = endItem.index;
			const state = this.state;
			const requestKey = cache[0].groupKey;
			const requestIndex = cache[0].index;
			// not in cursor
			const startIndex = requestIndex > state.endIndex + 1 ? requestIndex : state.startIndex;
			const startKey = state.groups[startIndex].groupKey;

			this.setState({
				processing: state.processing | APPEND,
				endKey,
				endIndex,
				startIndex,
				startKey,
				requestKey,
				requestIndex,
			});
			return;
		}
		if (this._isLoading()) {
			return;
		}
		this.props.onAppend({
			groupKey: this.state.endKey,
			startLoading: loadingStyle => {
				this.startLoading(true, loadingStyle);
			},
			endLoading: this.endLoading,
		});
	}
	_requestPrepend = ({cache, fit = true}) => {
		if (fit) {
			this._fit();
		}
		if (this._isProcessing()) {
			return;
		}
		if (cache && cache.length) {
			const startItem = cache[0];
			const startKey = startItem.groupKey;
			const startIndex = startItem.index;

			const state = this.state;
			const length = cache.length;
			const requestKey = cache[length - 1].groupKey;
			const requestIndex = cache[length - 1].index;
			// not in cursor
			const endIndex = requestIndex < state.startIndex - 1 ? requestIndex : state.endIndex;
			const endKey = state.groups[endIndex].groupKey;

			this.setState({
				processing: state.processing | PREPEND,
				startKey,
				startIndex,
				endKey,
				endIndex,
				requestKey,
				requestIndex,
			});
			return;
		}
		if (this._isLoading()) {
			return;
		}
		if (!this.props.useFit) {
			this._fit(true);
		}
		this.props.onPrepend({
			groupKey: this.state.startKey,
			startLoading: loadingStyle => {
				this.startLoading(false, loadingStyle);
			},
			endLoading: this.endLoading,
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
		this._setContainerSize(false);
		base < 0 && this._watcher.scrollBy(-base);
	}
	// called by visible
	_fit(isForce) {
		let base = this._getEdgeValue("start");
		const margin = (this._loading && this._loading.getSize(false)) || 0;
		const {isConstantSize, isEqualSize, useRecycle, useFit} = this.props;

		if (!isForce && (!useRecycle || !useFit || isConstantSize || isEqualSize)) {
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
	_updateGroups(groups = this.state.groups) {
		this._items && (this._items._data = groups);
	}
	_updateCursor(state = this.state) {
		if (!this._infinite) {
			return;
		}
		const {startIndex, endIndex} = state;

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
		const isEqualSize = this.props.isEqualSize;
		let elements = items.map(item => item.el);

		isEqualSize && (elements = this._renderer._size.item ? [] : elements.slice(0, 1));
		ImageLoaded.check(elements, {
			complete: () => {
				if (!this._container) {
					return;
				}
				this._renderer.updateSize(items);
				_updateSize(items);
				const cursor = isAppend ? "end" : "start";
				const prevGroup = state.groups[groups[0].index + (isAppend ? -1 : 1)];
				let outline = prevGroup ? prevGroup.outlines[cursor] : [0];

				groups.forEach(group => {
					const groupOutline = group.outlines[isAppend ? "start" : "end"];
					const isRelayout = isUpdate || !outline.length || (outline.length === groupOutline.length ?
						!outline.every((v, index) => v === groupOutline[index]) : true);

					if (!isRelayout) {
						outline = group.outlines[isAppend ? "end" : "start"];
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
					fromCache: !items.length,
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
		this._scroll(scrollPos);
	}
	// Infinite interface for isEqualSize or isConstantSize
	_scroll(scrollPos) {
		const startCursor = this._infinite.getCursor("start");
		const endCursor = this._infinite.getCursor("end");

		if (typeof scrollPos !== "number") {
			return;
		}
		if (startCursor === -1 || endCursor === -1) {
			return;
		}
		const items = this._items;

		if (!items.size()) {
			return;
		}
		const size = this._renderer.getViewSize();
		const threshold = this.props.threshold;
		const append = this._requestAppend;
		const prepend = this._requestPrepend;
		const datas = items.get();
		const endScrollPos = Math.max(scrollPos, 0) + size;
		const startItem = datas[startCursor];
		const endItem = datas[endCursor];

		if (!startItem || !endItem) {
			return;
		}
		const startEdgePos = Math.max(...datas[startCursor].outlines.start);
		const endEdgePos = Math.min(...datas[endCursor].outlines.end);
		const visibles = datas.map((group, i) => {
			const {start, end} = group.outlines;

			if (!start.length || !end.length) {
				if (i === startCursor - 1) {
					if (scrollPos <= startEdgePos + threshold) {
						return true;
					}
				} else if (i === endCursor + 1) {
					if (endScrollPos >= endEdgePos - threshold) {
						return true;
					}
				}
				return false;
			}
			const startPos = Math.min(...start);
			const endPos = Math.max(...end);

			if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
				return true;
			}
			return false;
		});


		const start = visibles.indexOf(true);
		const end = visibles.lastIndexOf(true);

		if (~start && start < startCursor) {
			prepend({cache: datas.slice(start, Math.min(startCursor, end + 1))});
		} else if (endCursor < end) {
			append({cache: datas.slice(Math.max(start, endCursor + 1), end + 1)});
		} else if (endScrollPos >= endEdgePos - threshold) {
			append({cache: datas.slice(endCursor + 1, endCursor + 2)});
		} else if (scrollPos <= startEdgePos + threshold) {
			prepend({cache: datas.slice(startCursor - 1, startCursor)});
		}
	}
	_setSize(size) {
		this._infinite.setSize(this._renderer.getViewSize());
		size && this._layout.setSize(size);
	}
	_updateContainerSize(size) {
		const state = this.state;
		const groups = state.groups;
		const containerSize = !groups.length ? size : this._getMaxEdgeValue(size);

		this._renderer.setContainerSize(containerSize);
	}
	_getMaxEdgeValue(endPos) {
		const groups = this.state.groups;
		const length = groups.length;

		for (let i = length - 1; i >= 0; --i) {
			const end = groups[i].outlines.end;

			if (!end.length) {
				continue;
			}
			const pos = Math.max(...end);

			return Math.max(pos, endPos);
		}
		return endPos;
	}
	_setContainerSize(useFit = true) {
		const processing = this.state.processing;
		const loading = this._loading;
		const isAppend = processing & LOADING_APPEND;
		const size = loading && loading.getSize(isAppend);
		const endPos = this._getEdgeValue("end");

		if (!loading || !size) {
			this._updateContainerSize(endPos);
			return false;
		}
		const startPos = this._getEdgeValue("start");
		const pos = isAppend ? endPos : Math.max(startPos - size, 0);

		useFit && !isAppend && this._fit();
		loading.setPosition(pos);
		this._updateContainerSize((endPos + (isAppend ? size : 0)) || size);
		return true;
	}
	_postLayoutComplete({
		groups,
		items = ItemManager.pluck(groups, "items"),
		isAppend,
		isTrusted,
		fromCache,
		isLayout = false,
	}) {
		!isLayout && this._updateCursor();
		const viewSize = this._renderer.getViewSize();
		const size = this._getEdgeValue("end");
		const {useRecycle} = this.props;
		const watcher = this._watcher;
		const scrollPos = watcher.getScrollPos();

		if (!isAppend) {
			if (!this._fit()) {
				DOMRenderer.renderItems(items);
			}
		} else {
			DOMRenderer.renderItems(items);
			this._setContainerSize();
		}
		if (useRecycle) {
			this._infinite.recycle(scrollPos, isAppend);
		}
		this.props.onLayoutComplete({
			target: items,
			fromCache,
			isAppend,
			isTrusted,
			isLayout,
			isScroll: viewSize < watcher.getContainerOffset() + size,
			scrollPos,
			orgScrollPos: watcher.getOrgScrollPos(),
			size,
			endLoading: this.endLoading,
		});
		this.setState(isLayout ? {layout: false} : {
			processing: this.state.processing & ~(APPEND | PREPEND | PROCESS),
		});
	}
	_insert(isUpdate) {
		const isConstantSize = this.props.isConstantSize;
		const state = this.state;
		const {processing, requestIndex, startIndex, endIndex, groups} = state;
		const isAppend = !(processing & PREPEND);
		const isProcessing = this._isProcessing();
		const start = (isAppend ? requestIndex : startIndex) || 0;
		const end = (isAppend ? endIndex : requestIndex) || 0;
		let updateGroups = state.groups.slice(start, end + 1);

		updateGroups = isUpdate ? updateGroups :
			updateGroups.filter(group => !group.items.every(item => item.mount));
		const items = ItemManager.pluck(updateGroups, "items");
		const newItems = items.filter(item => !item.mount &&
			(!item.orgSize || (!isConstantSize && item.rect.top < DUMMY_POSITION / 10)));
		let isRelayout = false;

		items.forEach(item => {
			!item.orgSize && (isRelayout = true);
			item.mount = true;
		});

		if (updateGroups.length) {
			if (isProcessing || newItems.length) {
				state.processing |= (isAppend ? APPEND : PREPEND) | PROCESS;

				!isAppend && updateGroups.reverse();
				this._updateSize({groups: updateGroups, items: newItems, isUpdate: isUpdate || isRelayout});
				DOMRenderer.renderItems(items);
			} else {
				this.layout(false);
			}
			return;
		}
		if (groups.length) {
			const scrollPos = this._watcher.getScrollPos();

			this._scroll(scrollPos);
		} else {
			this._requestAppend({});
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
			this.state.processing |= APPEND;
			this.state.requestIndex = 0;
			this._insert();
		} else {
			this._requestAppend({});
		}
	}
}
