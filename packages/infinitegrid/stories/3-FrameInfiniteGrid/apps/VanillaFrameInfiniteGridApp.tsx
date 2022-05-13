import { FrameInfiniteGrid } from "../../../src";

export default function App() {
  function getItems(nextGroupKey, count) {
    const nextItems: string[] = [];

    for (let i = 0; i < count; ++i) {
      const num = nextGroupKey * count + i;
      nextItems.push(`<div class="item">
  <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg" alt="egjs" style="width: 100%; height: 100%"/>
</div>`);
    }
    return nextItems;
  }

  const ig = new FrameInfiniteGrid(".container", {
    gap: 5,
    frame: [
      [1, 1, 2, 2, 3],
      [1, 1, 4, 5, 5],
    ],
  });

  ig.on("requestAppend", (e) => {
    const nextGroupKey = +(e.groupKey || 0) + 1;

    ig.append(getItems(nextGroupKey, 10), nextGroupKey);
  });

  ig.renderItems();

  return ig;
}
