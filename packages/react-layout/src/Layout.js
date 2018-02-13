import React, {Component} from "react";
import {GridLayout, ImageLoaded} from "@egjs/infinitegrid";
import {CHECK_ONLY_ERROR, CHECK_ALL} from "@egjs/infinitegrid/src/consts";
import ReactDOM from 'react-dom';
import Item from "./Item";
import {NOT_LOADED, LOADING, LOADED} from "./consts";
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
    constructor(props) {
		super(props);
		const {margin, size, type, children} = this.props;

        this.state = {
			children: [],
			items: [],
			size: parseFloat(size),
		};
		this._layout = new type({
			...this.props.options,
			horizontal: this.props.horizontal,
		});
		this.updateLayout();
		this.updateChildren(children);
	}
	resetSize() {
		const items = this.state.items;

		items.forEach(item => {
			item.resetSize();
		});
	}
	updateLayout() {
		const options = this._layout.options;
		const props = this.props;

		this._layout.setSize(this.state.size);
	
		for (const name in options) {
			if (name in props) {
				options[name] = props[name];
			}
		}
	}
	updateGroups() {
		this.state.groups = [];
		this.state.items.forEach(item => this.updateGroup(item));
	}
	updateGroup(item) {
		const groupKey = item.props.groupKey;
		const groups = this.state.groups;
		const length = groups.length;
		let groupIndex = -1;

		for (let i = 0; i < length; ++i) {
			if (groups[i].groupKey === groupKey) {
				groupIndex = i;
				break;
			}
		}
		if (groupIndex === -1) {
			groups.push({
				groupKey,
				items: [item],
			});
		} else {
			groups[groupIndex].items.push(item);
		}
	}
    updateChildren(children = this.props.children) {
		let randomGroupKey = 0;
        const itemChildren = React.Children.map(children, 
            (element, i) => {
				let groupKey = element.props["data-groupkey"] || element.props["groupkey"];

				if (typeof groupKey === "undefined") {
					!randomGroupKey && (randomGroupKey = (new Date().getTime() + Math.floor(Math.random() * 1000)));
					groupKey = randomGroupKey;
				} else {
					randomGroupKey = 0;
				}
				return (<Item groupKey={groupKey} key={i} ref={item => {this.state.items[i] = item}}>{element}</Item>);
			});

        this.state.children = itemChildren;
	}
	layout() {
		this.updateLayout();

		const groups = this.state.groups.map(group => {
			return {
				items: group.items.map(item => item.state),
			};
		});

		this._layout.layout(groups, this.props.outline);
		this.state.groups.forEach(group => {
			group.items.forEach(item => {
				item.renderElement();
			});
		});
	}
	loadImage() {
		let groupIndex = -1;
		const groups = this.state.groups.filter((group, i) => {
			const loaded = group.items.every(item => item.state.loaded !== NOT_LOADED);

			if (!loaded && groupIndex === -1) {
				groupIndex = i;
			}
			return !loaded;
		});
		const items = groups.reduce((a, b) => {
			return a.concat(b.items.filter(item => item.state.loaded === NOT_LOADED))
		}, []);
		if (!items.length) {
			return;
		}
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
			this.resetSize();
		}
		this.updateChildren(props.children);
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
            {this.state.children}
        </Tag>);
    }
    componentDidUpdate() {
		this.updateGroups();
		this.loadImage();
    }
    componentDidMount() {
		this.updateGroups();
		this.loadImage();
		this._container = ReactDOM.findDOMNode(this);
    }
}
