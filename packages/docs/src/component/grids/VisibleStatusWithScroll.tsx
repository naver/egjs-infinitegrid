import * as React from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { STATUS_TYPE } from "@egjs/infinitegrid";

function getItems(nextGroupKey: number, count: number) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; ++i) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

const Item = ({ num }: any) => <div className="item" style={{
  width: "250px",
}}>
  <div className="thumbnail">
    <img
      src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
      alt="egjs"
    />
  </div>
  <div className="info">{`egjs ${num}`}</div>
</div>;

export default function App() {
  const igRef = React.useRef<MasonryInfiniteGrid>();
  const igRef2 = React.useRef<MasonryInfiniteGrid>();
  const [items, setItems] = React.useState(() => getItems(0, 10));
  const [items2, setItems2] = React.useState([]);
  const [status, saveStatus] = React.useState(null);
  const [itemsStatus, saveItemsStatus] = React.useState([]);

  return <div className="root">
    <div style={{ textAlign: "center", padding: "10px" }}>
      <button className="button" onClick={() => {
        const igStatus = igRef.current.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS);
        const [startCursor, endCursor] = igStatus.groupManager.itemCursors;

        saveStatus(igStatus);
        saveItemsStatus(items.slice(startCursor, endCursor + 1));
      }}>Get Status</button>
    </div>
    <MasonryInfiniteGrid
      ref={igRef}
      className="container"
      style={{
        height: "500px",
      }}
      container={true}
      gap={5}
      align={"center"}
      onRequestAppend={(e) => {
        const nextGroupKey = (+e.groupKey! || 0) + 1;

        e.wait();

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
    <div style={{ textAlign: "center", padding: "10px" }}>
      <button className="button" onClick={() => {
        setItems2(itemsStatus);
        setTimeout(() => {
          if (!status) {
            return;
          }
          igRef2.current.setStatus(status);
        });
      }}>Restore Status</button>&nbsp;<button className="button" onClick={() => {
        igRef2.current.getScrollContainerElement().scrollTop = 0;
      }}>Scroll 0</button>
    </div>
    <MasonryInfiniteGrid
      className="container"
      style={{
        height: "500px",
      }}
      container={true}
      gap={5}
      align={"center"}
      ref={igRef2}
      placeholder={<div className="placeholder"></div>}
      onRequestPrepend={(e) => {
        if (e.isVirtual) {
          e.wait();
          setTimeout(() => {
            e.ready();

            setItems2([
              ...e.nextGroupKeys.map(key => getItems(key as number, 10)).flat(),
              ...items2,
            ]);
          }, 200);
        }
      }}
      onRequestAppend={(e) => {
        if (e.isVirtual) {
          e.wait();
          setTimeout(() => {
            e.ready();
            setItems2([
              ...items2,
              ...e.nextGroupKeys.map(key => getItems(key as number, 10)).flat(),
            ]);
          }, 200);
        }
      }}
    >
      {items2.map((item) => <Item data-grid-groupkey={item.groupKey} key={item.key} num={item.key} />)}
    </MasonryInfiniteGrid>
  </div>;
}
