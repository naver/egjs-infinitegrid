import React from 'react';
import './App.css';
import { GridLayout } from '../react-infinitegrid';

class Item extends React.Component<{
  groupKey: any,
  num: number,
  onClick: any,
}> {
  render() {
    const no = this.props.num;
    const text = `egjs ${no}`;

    return (<div className="item" onClick={this.props.onClick}>
      <div className="thumbnail">
        <img src={`https://naver.github.io/egjs-infinitegrid/assets/image/${no % 59}.jpg`} />
      </div>
      <div className="info">
        {text}
      </div>
    </div>);
  }
}

class App extends React.Component<{}, {
  list: any[],
}> {
  public start = 0;
  constructor(prop) {
    super(prop);
    this.state = {
      list: [
        // ...this.loadItems("1", 10),
        // ...this.loadItems("2", 10),
      ],
    };
  }
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(<Item groupKey={groupKey} num={start + i} key={start + i}
        onClick={(itemKey => (e => this.remove(itemKey)))(start + i)} />);
    }
    this.start += num;
    return items;
  }
  remove(itemKey) {
    const list = this.state.list.slice();
    const index = list.map(component => parseFloat(component.key)).indexOf(itemKey);

    list.splice(index, 1);
    this.setState({ list });
  }
  onAppend = ({ currentTarget, groupKey, startLoading }) => {
    if (currentTarget.isLoading()) {
      return;
    }
    startLoading();
    const list = this.state.list;
    const items = this.loadItems(parseFloat(groupKey || 0) + 1, 5);

    this.setState({ list: list.concat(items) });
  }
  onLayoutComplete = ({ isAppend, isLayout, endLoading, fromCache }) => {
    !isLayout && endLoading();
  }
  onImageError = ({ totalIndex }) => {
    this.state.list.splice(totalIndex, 1);
    this.setState({ list: this.state.list });
  }
  render() {
    const { list } = this.state;

    return (
      <GridLayout
        ref={e => {
          (window as any).a = e;
        }}
        options = {{
          transitionDuration: 0,
          isConstantSize: false,
        }}
        layoutOptions={{
          margin: 10,
          align: "center",
        }}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
        onImageError={this.onImageError}
        useFirstRender={true}
        loading={<div className="loading" style={{textAlign: "center", height: "100px", backgroundColor: "#f55", position: "absolute"}}>LOADING</div>}
        // status={status}
      >
        {list}
      </GridLayout>
    );
  }
}


export default App;
