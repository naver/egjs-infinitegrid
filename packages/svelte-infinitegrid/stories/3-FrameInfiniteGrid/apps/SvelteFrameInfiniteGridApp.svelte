<script>
  import { FrameInfiniteGrid } from "../../../src";

  let items = getItems(0, 10);

  function getItems(nextGroupKey, count) {
    const nextItems = [];

    for (let i = 0; i < count; ++i) {
      const nextKey = nextGroupKey * count + i;

      nextItems.push({ groupKey: nextGroupKey, key: nextKey });
    }
    return nextItems;
  }
</script>

<FrameInfiniteGrid
  class="container"
  gap={5}
  frame={[
    [1, 1, 2, 2, 3],
    [1, 1, 4, 5, 5],
  ]}
  {items}
  on:requestAppend={({ detail: e }) => {
    const nextGroupKey = (+e.groupKey || 0) + 1;

    items = [...items, ...getItems(nextGroupKey, 10)];
  }}
  let:visibleItems
>
  {#each visibleItems as item (item.key)}
    <div class="item">
      <img
        src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
          (item.key % 33) + 1
        }.jpg`}
        alt="egjs"
        style="width: 100%; height: 100%"
      />
    </div>
  {/each}
</FrameInfiniteGrid>
