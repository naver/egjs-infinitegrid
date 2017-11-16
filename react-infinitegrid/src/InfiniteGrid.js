import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import NativeInfiniteGrid from "./native/InfiniteGrid";

class InfiniteGrid extends Component {
  static options = PropTypes.shape({
    itemSelector: PropTypes.string,
    isOverflowScroll: PropTypes.bool,
    threshold: PropTypes.string,
    isEqualSize: PropTypes.bool,
    useRecycle: PropTypes.bool,
    horizontal: PropTypes.bool,
  });
  static setLayout = PropTypes.shape({
    class: PropTypes.func.isRequired,
    options: PropTypes.object,
  }).isRequired;
  static items = PropTypes.shape({
    isAppend: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
  });
  static onAppend = PropTypes.func;
  static onPrepend = PropTypes.func;
  static onChange = PropTypes.func;
  static onLayoutComplete = PropTypes.func;  
  _attachEvent(type, eventHandler) {
    eventHandler && this._instance.on(type, param => eventHandler(param));
  }
  componentWillReceiveProps({layout, options, action}) {
    this._instance.setLayout(layout.class, layout.options);

    for(let method in action) {
      const args = action[method].concat();

      switch(method) {
        case "append":
        case "prepend": {
          const elements = args[0].map(v => ReactDOMServer.renderToStaticMarkup(v));
          this._instance[method](elements, args[1]);
          break;
        }
        default: {
          this._instance[method](...args);
        }
      }
    }
  }
  shouldComponentUpdate() {
    return false;
  }
  render(args) {
    const events = {}
    for(let key in this.props) {
      if (/^on/.test(key) && !(key in InfiniteGrid)) {
        events[key] = (e) => this.props[key](e, this._instance);
      }
    }
    return (
      <div className={this.props.className} 
        {...events}
      >{ this.props.action.setStatus ? "" : this.props.children}</div>
    );
  }
  
  componentDidMount() {
    this._instance = new NativeInfiniteGrid(
      ReactDOM.findDOMNode(this),
      this.props.options,
    );
    this._attachEvent("append", this.props.onAppend);
    this._attachEvent("prepend", this.props.onPrepend);
    this._attachEvent("change", this.props.onChange);
    this._attachEvent("layoutComplete", this.props.onLayoutComplete);
    
    if (this.props.action.setStatus) {
      this._instance.setStatus(this.props.action.setStatus);
    } else {
      this._instance.setLayout(this.props.layout.class, this.props.layout.options);
      this._instance.layout();
    }
  }
  componentWillUnmount() {
    this._instance.destroy();
  }
}

export default InfiniteGrid;