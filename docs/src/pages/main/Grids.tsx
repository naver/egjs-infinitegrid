/* eslint-disable arrow-body-style */
import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./Grids.module.css";

export default () => {
  return (<div className={`columns ${styles.gridContainer}`}>
    <div className="column">
      <div className={styles.grid}>
        <img src="./img/MasonryGrid.png" alt="MasonryInfiniteGrid"/>
        <p><Link to={useBaseUrl("Guides#masonryinfinitegrid")}>MasonryInfiniteGrid</Link></p>
      </div>
    </div>
    <div className="column">
      <div className={styles.grid}>
        <img src="./img/JustifiedGrid.png" alt="JustifiedInfiniteGrid" />
        <p><Link to={useBaseUrl("Guides#justifiedinfinitegrid")}>JustifiedInfiniteGrid</Link></p>
      </div>
    </div>
    <div className="column">
      <div className={styles.grid}>
        <img src="./img/FrameGrid.png" alt="FrameInfiniteGrid" />
        <p><Link to={useBaseUrl("Guides#frameinfinitegrid")}>FrameInfiniteGrid</Link></p>
      </div>
    </div>
    <div className="column">
      <div className={styles.grid}>
        <img src="./img/PackingGrid.png" alt="PackingInfiniteGrid" />
        <p><Link to={useBaseUrl("Guides#packinginfinitegrid")}>PackingInfiniteGrid</Link></p>
      </div>
    </div>
  </div>);
};
