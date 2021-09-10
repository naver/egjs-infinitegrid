/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import useBaseUrl from "@docusaurus/useBaseUrl";

export default () => <div className="columns">
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/typescript.svg" />
        </figure>
        <span className="subtitle has-text-black">Typescript</span>
      </div>
      <div className="block">
        <p>InfiniteGrid is fully written in <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, and every classes, properties, and events are correctly typed and exported.</p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/infinity.svg" />
        </figure>
        <span className="subtitle has-text-black">Insert Infinite Items</span>
      </div>
      <div className="block">
      Numerous items can be added by scrolling. Also, performance can be improved by showing only the DOM of the visible area.
      </div>
    </div>
  </div>
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/books.svg" />
        </figure>
        <span className="subtitle has-text-black">Rich API</span>
      </div>
      <div className="block">
        <p>InfiniteGrid comes with a rich API. You can use it to create your own customized InfiniteGrid & Plugins.</p>
        <p>
          Check our <Link to={useBaseUrl("docs/api/InfiniteGrid")}>API Docs</Link>
        </p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/loading.svg" />
        </figure>
        <span className="subtitle has-text-black">Wait Data Loading</span>
      </div>
      <div className="block">
        <p>All operations operate asynchronously, data can be added asynchronously, and are rendered sequentially.</p>
      </div>
    </div>
  </div>
  <div className="column">
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/internetexplorer.svg" />
        </figure>
        <span className="subtitle has-text-black">Supports IE9+ (With polyfills)</span>
      </div>
      <div>
        <p>InfiniteGrid can support Internet Explorer 9+</p>
        <p>⚠️ IE 11+ for Angular & Svelte</p>
      </div>
    </div>
    <div className="box">
      <div className="block is-flex is-flex-direction-row is-align-items-center">
        <figure className="image is-32x32 mx-5">
          <img src="img/icons/placeholder.svg" />
        </figure>
        <span className="subtitle has-text-black">Placeholder</span>
      </div>
      <div className="block">
        <p>You can add placeholders that can be displayed instead while waiting for data or restoring status.</p>
      </div>
    </div>
  </div>
</div>;
