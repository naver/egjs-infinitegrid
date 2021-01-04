<script lang="ts">
  import InfinitGrid from "../index.js";
  let ig;
  let items = [];
  let loading;

  function loadItems(groupKey, nextKey, itemCount) {
    const nextItems = [];

    for (let i = 0; i < itemCount; ++i) {
      nextItems.push({ groupKey, key: nextKey + i });
    }
    return nextItems;
  }
  function onAppend({ detail: { groupKey, startLoading } }) {
    if (ig.isProcessing()) {
      return;
    }
    startLoading();
    const nextGroupKey = (parseFloat(groupKey) || 0) + 1;
    const nextKey = items.length;

    items = [...items, ...loadItems(nextGroupKey, nextKey, 10)];
  }
  function onLayoutComplete({ detail: { isLayout, endLoading } }) {
    !isLayout && endLoading();
  }
</script>

<style>
  .item {
    width: 250px;
    opacity: 1;
  }
  .item .thumbnail {
    max-height: 300px;
    overflow: hidden;
    border-radius: 8px;
  }
  .item .thumbnail img {
    width: 100%;
    border-radius: 8px;
  }
  .item .info {
    margin-top: 10px;
    font-weight: bold;
    color: #777;
  }
  .item.animate {
    transition: opacity ease 1s;
    transition-delay: 0.2s;
    opacity: 1;
  }
  .loading {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
  }
</style>

<InfinitGrid
  bind:this={ig}
  {items}
  {loading}
  itemBy={item => item.key}
  groupBy={item => item.groupKey}
  options={{ isConstantSize: true, transitionDuration: 0.2 }}
  layoutOptions={{ margin: 10, align: 'center' }}
  on:append={onAppend}
  on:layoutComplete={onLayoutComplete}
  let:visibleItems>
  {#each visibleItems as item (item.key)}
    <div class="item">
      <div class="thumbnail">
        <img
          src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(item.key % 59) + 1}.jpg`}
          alt="egjs" />
      </div>
      <div class="info">{`egjs ${item.key}`}</div>
    </div>
  {/each}
  <div bind:this={loading} slot="loading">Loading</div>
</InfinitGrid>
