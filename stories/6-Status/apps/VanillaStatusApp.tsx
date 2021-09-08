import { InfiniteGridStatus, MasonryInfiniteGrid, STATUS_TYPE } from "../../../src";

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
  ig.on("requestPrepend", (e) => {
    if (e.isVirtual) {
      e.wait();
      ig.prepend(getItems(e.nextGroupKey, 10), e.nextGroupKey);
      return;
    }
  });
  ig.on("requestAppend", (e) => {
    if (e.isVirtual) {
      ig.append(getItems(e.nextGroupKey, 10), e.nextGroupKey);
      return;
    }
    const nextGroupKey = +(e.groupKey || 0) + 1;

    e.wait();
    e.currentTarget.appendPlaceholders(5, nextGroupKey);
    setTimeout(() => {
      e.ready();
      ig.append(getItems(nextGroupKey, 10), nextGroupKey);
    }, 1000);
  });

  ig.renderItems();

  let status: InfiniteGridStatus;

  document.querySelector(".save")!.addEventListener("click", () => {
    status = ig.getStatus(STATUS_TYPE.MINIMIZE_INVISIBLE_ITEMS);
  });
  document.querySelector(".restore")!.addEventListener("click", () => {
    ig.setStatus(status!);
  });


  return ig;
}
