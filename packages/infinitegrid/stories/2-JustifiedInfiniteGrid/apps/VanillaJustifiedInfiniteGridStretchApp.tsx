import { JustifiedInfiniteGrid } from "../../../src";

export default function App() {
  function getItems(nextGroupKey, count) {
    const nextItems: string[] = [];

    for (let i = 0; i < count; ++i) {
      const num = nextGroupKey * count + i;
      nextItems.push(`<div class="item">
    <div class="thumbnail">
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg" alt="egjs" data-grid-maintained-target="true"/>
    </div>
    <div class="info">egjs ${num}</div>
</div>`);
    }
    return nextItems;
  }

  const ig = new JustifiedInfiniteGrid(".container", {
    gap: 5,
    stretch: true,
    passUnstretchRow: true,
    sizeRange: [228, 228],
    stretchRange: [144, 320],
  });

  ig.on("requestAppend", (e) => {
    const nextGroupKey = +(e.groupKey || 0) + 1;

    ig.append(getItems(nextGroupKey, 10), nextGroupKey);
  });

  ig.renderItems();

  return ig;
}
