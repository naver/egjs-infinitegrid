import React, {Component} from "react";
import {GridLayout, ImageLoaded} from "@egjs/infinitegrid";
import ReactDOM from 'react-dom';
import Item from "./Item";
import {NOT_LOADED, LOADING, LOADED, LAYOUT_ID, NOT_RENDER, REQUEST_RENDER, RENDERED, CHECK_ONLY_ERROR, CHECK_ALL} from "./consts";
import PropTypes from 'prop-types';


function render(rect, name, style, size, percentage) {
	if (!(name in rect)) {
		return;
	}
	if (percentage) {
		style.push(`${name}:${rect[name] / size * 100}%;`);
	} else {
		style.push(`${name}:${rect[name]}px;`);
	}
}
export default class Layout extends Component {
	static propTypes = {
		tag: PropTypes.string,
		type: PropTypes.func,
		size: PropTypes.number,
		outline: PropTypes.array,
		options: PropTypes.object,
		horizontal: PropTypes.bool,
		isEqualSize: PropTypes.bool,
		onLayoutComplete: PropTypes.func,
		onImageError: PropTypes.func,
		percentage: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
	};
	static defaultProps = {
		tag: "div",
		type: GridLayout,
		options: {},
		margin: 0,
		size: 0,
		horizontal: false,
		outline: [],
		isEqualSize: false,
		percentage: false,
		onLayoutComplete: () => {},
		onImageError: () => {},
	};
	static layoutProps = {};
    constructor(props) {
		super(props);
		const {margin, size, type, children} = this.props;

        this.state = {
			datas: {},
			items: [],
			outline: this.props.outline,
			size: parseFloat(size),
			render: NOT_RENDER,
			outlines: {
				start: [],
				end: [],
			},
		};
		const options = {};
		const layoutProps = this.constructor.layoutProps;

		for (const name in layoutProps) {
			if (name in props) {
				options[name] = props[name];
			}
		}
		this._layout = new type({
			...options,
			horizontal: this.props.horizontal,
		});
		this._updateLayout();
	}
	getItems() {
		return this.state.items;
	}
	_render(item) {
		const element = item.el;

		if (!element) {
			return;
		}
		const rect = item.rect || {left: DUMMY_POSITION, top: DUMMY_POSITION};
		const style = ["position:absolute;"];
		const size = this.state.size;
		const {horizontal, percentage} = this.props;
		const isArray = Array.isArray()
		const percentagePosition = percentage ? percentage === true || ~percentage.indexOf("position") : false;
		const percentageSize = percentage ? percentage === true || ~percentage.indexOf("size") : false;

		render(rect, "left", style, size, !horizontal && percentagePosition);
		render(rect, "top", style, size, horizontal && percentagePosition);
		render(rect, "width", style, size, !horizontal && percentageSize);
		render(rect, "height", style, size, horizontal && percentageSize);

		const cssText = style.join("");

		item.cssText = cssText;

		element.style.cssText += cssText;
	}
	_setSize(isResize) {
		if (!this._container) {
			return;
		}
		const horizontal = this._layout.options.horizontal;
		const size = this._container[horizontal ? "clientHeight" : "clientWidth"];;

		if (isResize) {
			this.setState({size, render: NOT_RENDER});
		} else {
			this.state.size = size;
		}
	}
	_resetSize() {
		const items = this.state.items;

		items.forEach(item => {
			item.resetSize();
		});
	}
	_updateLayout() {
		const options = this._layout.options;
		const props = this.props;

		this._layout.setSize(this.state.size);
		for (const name in options) {
			if (name in props) {
				options[name] = props[name];
			}
		}
	}
	_newItem(element) {
		const id = `${new Date().getTime()}.${Math.floor(Math.random() * 1000000)}`;

		element[LAYOUT_ID] = id;

		const item = new Item(element);

		this._render(item);
		this.state.render = NOT_RENDER;
		return item;
	}
	_searchItem(element) {
		const datas = this.state.datas;
		const id = element[LAYOUT_ID];

		if (id && id in datas) {
			const item = datas[id];

			item.el = element;
			return item;
		}
		return this._newItem(element);
	}
	_updateItems() {
		const ids = this.state.items.map(item => item.id);
		const datas = {};
		const elements = Array.prototype.slice.call(this._container.children, 0);
		let loaded = true;

		const items = elements.map(element => {
			const item = this._searchItem(element);

			item.update() && (loaded = false);
			datas[item.id] = item;

			return item;
		});

		this.state.items = items;
		if (!loaded || ids.length !== items.length || !ids.every((id, index) => items[index] && id === items[index].id)) {
			this.state.render = NOT_RENDER;
		}
		this.state.datas = datas;
	}
	layout(outline) {
		if (!this._container) {
			return;
		}
		this._updateLayout();
		const items = this.state.items;

		if (!items.length) {
			return;
		}
		const group = {
			items,
			outlines: {start: [], end: []},
		};

		outline && (this.state.outline = outline.slice());
		this._layout.layout([group], this.state.outline);
		this.state.items.forEach((item, index) => {
			this._render(item);
		});


		const max = Math.max(...group.outlines.end);
		const horizontal = this._layout.options.horizontal;

		this._container.style[horizontal ? "width" : "height"] = `${max}px`;
		this.props.onLayoutComplete({
			target: items,
			size: max - Math.min(...group.outlines.start)
		});
		this.state.render = RENDERED;
	}
	_loadImage() {
		const items = this.state.items.filter(item => {
			const loaded = item.loaded !== NOT_LOADED;

			return !loaded;
		});
		if (!items.length) {
			this.state.render = REQUEST_RENDER;
			this.layout();
			return;
		}
		const elements = items.map(item => item.el);

		items.forEach(item => item.loaded = LOADING);
        ImageLoaded.check(elements, {
			type: this.props.isEqualSize && this.state.items[0].size.width ? CHECK_ONLY_ERROR : CHECK_ALL,
            complete: () => {
				if (!this._container) {
					return;
				}
				let size;
                items.forEach(item => {
					item.loaded = LOADED;
					item.updateSize(size);
					if (this.props.isEqualSize && !size) {
						size = {...this.state.items[0].size};
					}
				});
				this.state.render = REQUEST_RENDER;
				this.layout();
			},
			error: ({target, itemIndex}) => {
				const item = items[itemIndex];

				this.props.onImageError({
					target,
					element: item.el,
					item,
					itemIndex,	
				});
			},
        });
	}
    shouldComponentUpdate(props, state) {
		const size = parseFloat(props.size);

		if (!this._container) {
			return false;
		}
		if (this.props.outline.length !== props.outline.length ||
			!this.props.outline.every((v, index) => v === props.outline[index])) {
			this.state.render = REQUEST_RENDER;
			this.state.outline = props.outline;
		}
		if (size !==0 && this.state.size !== size && size !== state.size) {
			clearTimeout(this._timer);
			this._timer = setTimeout(() => {
				this.setState({size, render: NOT_RENDER});
			}, 100);
			return false;
		} else if (this.state.size !== state.size) {
			this._resetSize();
		}
        return true;
    }
    render () {
		const attributes = {};
		const layout = this._layout;
		const props = this.props;
        const Tag = props.tag;

		for (const name in props) {
			if (name in Layout.propTypes || name in layout.options) {
				continue;
			}
			attributes[name] = props[name];
		}
        return (<Tag {...attributes} ref={(container) => {this._setContainer(container);}}>
            {this.props.children}
        </Tag>);
	}
	componentDidMount() {
		this._setContainer(ReactDOM.findDOMNode(this));
	}
    componentDidUpdate(prevProps) {
		if (!this._container) {
			return;
		}
		const state = this.state;
	
		!state.size && this._setSize();

		this._updateItems();
		if (state.render === REQUEST_RENDER) {
			this.layout();
		} else {
			this._loadImage();
		}
	}
	_onResize = () => {
		clearTimeout(this._timer);
		this._timer = setTimeout(() => {
			this._setSize(true);
		}, 100);
	}
	_setContainer(container) {
		if (!container || this._container) {
			return;
		}
		this._container = container;

		if (this.props.size === 0) {
			this._setSize();

			window.addEventListener("resize", this._onResize);
		}
		this._updateItems();
		this._loadImage();
	}
	componentWillUnmount() {
		const datas = this.state.datas;

		if (!datas) {
			return;
		}
		for (const id in datas) {
			datas[id].el = null;
		}
		this._container = null;
		window.removeEventListener("resize", this._onResize);
		this.state.datas = {};
		this.state.items = [];
	}
}
