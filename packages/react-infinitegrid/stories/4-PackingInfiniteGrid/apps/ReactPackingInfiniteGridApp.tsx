import * as React from "react";
import { PackingInfiniteGrid } from "../../../src";


function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

const Item = ({ num }: any) => <div className="item">
  <img
    src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
    style={{
      width: "100%",
      height: "100%",
    }}
    alt="egjs"
  />
</div>;

export default function App() {
  const [items, setItems] = React.useState(() => getItems(0, 10));

  return <PackingInfiniteGrid
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
  </PackingInfiniteGrid>;
}
