import * as React from "react";
import { MasonryInfiniteGrid } from "../../../src";


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
      alt="egjs"
    />
  </div>
  <div className="info">{`egjs ${num}`}</div>
</div>;

export default function App() {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return <MasonryInfiniteGrid
    className="container"
    gap={5}
    align={"justify"}
    placeholder={<div className="placeholder"></div>}
    onRequestAppend={(e) => {
      const nextGroupKey = (+e.groupKey! || 0) + 1;

      e.wait();
      e.currentTarget.appendPlaceholders(10, nextGroupKey);

      setTimeout(() => {
        e.ready();
        setItems([
          ...items,
          ...getItems(nextGroupKey, 10),
        ]);
      }, 2000);
    }}
  >
    {items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />)}
  </MasonryInfiniteGrid>;
}
