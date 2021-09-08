<script>
  import { JustifiedInfiniteGrid } from "../../../src";

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

<JustifiedInfiniteGrid
  class="container"
  gap={5}
  {items}
  on:requestAppend={({ detail: e }) => {
    const nextGroupKey = (+e.groupKey || 0) + 1;

    items = [...items, ...getItems(nextGroupKey, 10)];
  }}
  let:visibleItems
>
  {#each visibleItems as item (item.key)}
    <div class="item">
      <div class="thumbnail">
        <img
          src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
            (item.key % 33) + 1
          }.jpg`}
          alt="egjs"
          data-grid-maintained-target="true"
        />
      </div>
      <div class="info">{`egjs ${item.key}`}</div>
    </div>
  {/each}
</JustifiedInfiniteGrid>
