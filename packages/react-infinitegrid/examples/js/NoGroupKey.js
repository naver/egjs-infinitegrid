import React from "react";
import ReactDOM from "react-dom";
// import "./styles.css";
import { GridLayout } from "../../src";

const Item = ({ num }) => (
  <div className="item">
    <div className="thumbnail">
      <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num %
          59)}.jpg`}
        alt="egjs"
      />
    </div>
    <div className="info">{`egjs ${num}`}</div>
  </div>
);

class App extends React.Component {
  state = { list: [] };
  loadItems(groupKey, num) {
    const items = [];
    const start = this.start || 0;

    for (let i = 0; i < num; ++i) {
      items.push(<Item groupKey={1} num={start + i} key={start + i} />);
    }
    this.start = start + num;
    return items;
  }
  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    const list = this.state.list;
    const items = this.loadItems(parseFloat(groupKey) + 1, 5);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };
  onImageError = ({item, itemIndex}) => {
    this.state.list.splice(itemIndex, 1);
    this.setState({list: this.state.list});
  }
  render() {
    return (
      <GridLayout
        margin={10}
        align="center"
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
        onImageError={this.onImageError}
        transitionDuration={0.2}
        isConstantSize={true}
        ref={e => (window.e = e)}
      >
        {this.state.list}
      </GridLayout>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
