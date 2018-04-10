import {Component} from "react";
import {GridLayout, Infinite, ImageLoaded, ItemManager} from "@egjs/infinitegrid";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


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
		loading: PropTypes.onefOfType([PropTypes.object, PropTypes.bool]),
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

		this.state = {
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
		this._updateLayout();
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
}
