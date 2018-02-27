import React, {Component} from "react";
import {GridLayout, ImageLoaded} from "@egjs/infinitegrid";
import {CHECK_ONLY_ERROR, CHECK_ALL} from "@egjs/infinitegrid/src/consts";
import ReactDOM from 'react-dom';
import Item from "./Item";
import {NOT_LOADED, LOADING, LOADED, LAYOUT_ID} from "./consts";
import PropTypes from 'prop-types';

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
	};
	static layoutProps = {};
    constructor(props) {
		super(props);
		const {margin, size, type, children} = this.props;

        this.state = {
			datas: {},
			items: [],
			size: parseFloat(size),
			loaded: NOT_LOADED,
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
		const id = (new Date().getTime() + Math.floor(Math.random() * 1000));

		element[LAYOUT_ID] = id;

		const item = new Item(element);

		item.renderElement();
		return item;
	}
	_searchItem(element) {
		const datas = this.state.datas;
		const id = element[LAYOUT_ID];

		if (id && id in datas) {
			return datas[id];
		}
		return this._newItem(element);
	}
	_updateItems() {
		this.state.items = [];

		const datas = {};
		const items = this.state.items;
		const elements = Array.prototype.slice.call(this._container.children, 0);
		
		elements.forEach(element => {
			const item = this._searchItem(element);

			item.update();
			items.push(item);
			datas[item.state.id]  = item;
		});
		this.state.datas = datas;
	}
	layout() {
		this._updateLayout();
		const items = this.state.items;
		const group = {
			items: items.map(item => item.state),
			outlines: {
				start: [],
				end: [],
			},
		};
		this._layout.layout([group], this.props.outline);
		this.state.items.forEach((item, index) => {
			item.renderElement();
		});
		this.props.onLayoutComplete && this.props.onLayoutComplete({
			target: items,
		});
	}
	_loadImage() {
		const items = this.state.items.filter(item => {
			const loaded = item.state.loaded !== NOT_LOADED;

			return !loaded;
		});
		if (!items.length) {
			this.layout();
			return;
		}
		this.state.loaded = NOT_LOADED;		
		const elements = items.map(item => item.state.el);

		items.forEach(item => item.state.loaded = LOADING);
        ImageLoaded.check(elements, {
			type: this.props.isEqualSize && this.state.items[0].state.size.width ? CHECK_ONLY_ERROR : CHECK_ALL,
            complete: () => {
				let size;
                items.forEach(item => {
					item.state.loaded = LOADED;
					item.updateSize(size);
					if (this.props.isEqualSize && !size) {
						size = {...this.state.items[0].state.size};
					}
				});
				this.state.loaded = LOADED;
				this.layout();
            }
        });
	}
    shouldComponentUpdate(props, state) {
		const size = parseFloat(props.size);

		if (this.state.size !== props.size && props.size !== state.size) {
			clearTimeout(this._timer);
			this._timer = setTimeout(() => {
				this.setState({size: props.size});
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
        return (<Tag {...attributes}>
            {this.props.children}
        </Tag>);
    }
    componentDidUpdate() {
		this._updateItems();
		this._loadImage();
    }
    componentDidMount() {
		this._container = ReactDOM.findDOMNode(this);
		this._updateItems();
		this._loadImage();
    }
}
