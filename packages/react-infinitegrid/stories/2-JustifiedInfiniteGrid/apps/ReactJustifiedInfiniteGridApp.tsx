import * as React from "react";
import { JustifiedInfiniteGrid } from "../../../src";


function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

const Item = ({ num }: any) => <div className="item">
  <div className="thumbnail">
    <img
      src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
      data-grid-maintained-target="true"
      alt="egjs"
    />
  </div>
  <div className="info">{`egjs ${num}`}</div>
</div>;

export default function App() {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return <JustifiedInfiniteGrid
    className="container"
    gap={5}
    onRequestAppend={(e) => {
      const nextGroupKey = (+e.groupKey! || 0) + 1;

      setItems([
        ...items,
        ...getItems(nextGroupKey, 10),
      ]);
    }}
    onRenderComplete={(e) => {
      console.log(e);
    }}
  >
    {items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />)}
  </JustifiedInfiniteGrid>;
}
