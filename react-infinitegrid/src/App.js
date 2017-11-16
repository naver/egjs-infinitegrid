import React, { Component } from 'react';
import InfiniteGrid from "./InfiniteGrid"
import Item from './Item';
import './App.css';
import Persist from '@egjs/persist';
import GridLayout from "./native/layouts/GridLayout";

class App extends Component {
  constructor(prop) {
    super(prop);
    this._persist = new Persist("INFINITE");

    const status = this._persist.get("");

    this.state = status ? {
      action: {
        "setStatus": status
      }
    } : {
      action: {}
    }
  }
  onClick(event, instance) {
    this._persist.set("", instance.getStatus());
  }
  onAppend(param, instance) {
    console.log("append", param, instance);
    
    this.setState({
      action: {
        "append": [
          [
            <Item text={ `테스트 ${parseInt(Math.random() * 1000, 10)}` } image={parseInt(Math.random() * 60, 10) + 1}/>,
            <Item text={ `테스트 ${parseInt(Math.random() * 1000, 10)}` } image={parseInt(Math.random() * 60, 10) + 1}/>
          ]
        ]
      },
    });
  }
  render() {
    return (
      <div>
        <h2>Hello</h2>
        <InfiniteGrid 
          className="view"
          layout = { {class:GridLayout, options: {margin:10}} }
          options = { { isOverflowScroll: true } }
          onClick = { this.onClick.bind(this) }
          onAppend = { this.onAppend.bind(this) }
          action = { this.state.action }
        >
          <Item text={ "테스트1 "} image={1}/>
          <Item text={ "테스트2 "} image={2}/>
          <Item text={ "테스트3 "} image={3}/>
          <Item text={ "테스트4 "} image={4}/>
          <Item text={ "테스트5 "} image={5}/>
          <Item text={ "테스트6 "} image={6}/>
        </InfiniteGrid>
      </div>
    );
  }
}

export default App;