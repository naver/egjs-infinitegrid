<script>
  import { ITEM_TYPE } from "@egjs/infinitegrid";
  import { MasonryInfiniteGrid } from "../../../src";
import { LoadingTemplate } from "../3-Loading.stories";

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

<MasonryInfiniteGrid
  class="container"
  gap={5}
  useLoading={true}
  {items}
  on:requestAppend={({ detail: e }) => {
    const nextGroupKey = (+e.groupKey || 0) + 1;

    e.wait();

    setTimeout(() => {
      e.ready();
      items = [...items, ...getItems(nextGroupKey, 10)];
    }, 200);
  }}
  let:visibleItems
>
  {#each visibleItems as item (item.key)}
    {#if item.type === ITEM_TYPE.NORMAL}
      <div class="item">
        <div class="thumbnail">
          <img
            src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
              (item.key % 33) + 1
            }.jpg`}
            alt="egjs"
          />
        </div>
        <div class="info">{`egjs ${item.key}`}</div>
      </div>
    {:else if item.type === ITEM_TYPE.LOADING}
      <div class="loading">Loading...</div>
    {/if}
  {/each}
</MasonryInfiniteGrid>
