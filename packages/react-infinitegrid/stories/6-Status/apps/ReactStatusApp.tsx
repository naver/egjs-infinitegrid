import { InfiniteGridStatus, STATUS_TYPE } from "@egjs/infinitegrid";
import * as React from "react";
import { MasonryInfiniteGrid } from "../../../src";


function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];

  for (let i = 0; i < count; ++i) {
    const nextKey = nextGroupKey * count + i;

    nextItems.push({ groupKey: nextGroupKey, key: nextKey });
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
  const gridRef = React.useRef<MasonryInfiniteGrid>(null);
  const [items, setItems] = React.useState(() => getItems(0, 10));
  const [key, setKey] = React.useState<number>(0);
  const [status, setStatus] = React.useState<InfiniteGridStatus>();
  const [itemStatus, setItemStatus] = React.useState<any[]>([]);

  return <div className="wrapper">
    <div className="button-area">
      <button  className="save" onClick={() => {
        const status = gridRef.current!.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS);
        const [startCursor, endCursor] = status.groupManager.itemCursors;

        setItemStatus(items.slice(startCursor, endCursor + 1));
        setStatus(status);
      }}>Save Status</button>
      <button className="restore" onClick={() => {
        if (!status) {
          return;
        }
        setKey(key + 1);
        setItems(itemStatus);
      }}>Restore Status</button>
    </div>
    <MasonryInfiniteGrid
      key={key}
      ref={gridRef}
      className="container"
      gap={5}
      align={"justify"}
      placeholder={<div className="placeholder"></div>}
      status={status}
      onRequestPrepend={(e) => {
        if (e.isVirtual) {
          e.wait();
          setTimeout(() => {
            e.ready();
            setItems([
              ...getItems(+e.nextGroupKey!, 10),
              ...items,
            ]);
          }, 1000);
          return;
        }
      }}
      onRequestAppend={(e) => {
        if (e.isVirtual) {
          setItems([
            ...items,
            ...getItems(+e.nextGroupKey!, 10),
          ]);
          return;
        }
        const nextGroupKey = (+e.groupKey! || 0) + 1;

        e.wait();
        e.currentTarget.appendPlaceholders(10, nextGroupKey);

        setTimeout(() => {
          e.ready();
          setItems([
            ...items,
            ...getItems(nextGroupKey, 10),
          ]);
        }, 100);
      }}
    >
      {items.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />)}
    </MasonryInfiniteGrid>
  </div>;
}
