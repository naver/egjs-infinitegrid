import { MasonryInfiniteGrid } from "../../../src";

export default function App() {
  function getItems(nextGroupKey, count) {
    const nextItems: string[] = [];

    for (let i = 0; i < count; ++i) {
      const num = nextGroupKey * count + i;
      nextItems.push(`<div class="item">
    <div class="thumbnail">
        <img src="https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg" alt="egjs" />
    </div>
    <div class="info">egjs ${num}</div>
</div>`);
    }
    return nextItems;
  }

  const ig = new MasonryInfiniteGrid(".container", {
    gap: 5,
  });

  ig.setPlaceholder({
    html: `<div class="placeholder"></div>`,
  });

  ig.on("requestAppend", (e) => {
    const nextGroupKey = +(e.groupKey || 0) + 1;

    e.wait();
    e.currentTarget.appendPlaceholders(5, nextGroupKey);
    setTimeout(() => {
      e.ready();
      ig.append(getItems(nextGroupKey, 10), nextGroupKey);
    }, 1000);
  });

  ig.renderItems();

  return ig;
}
