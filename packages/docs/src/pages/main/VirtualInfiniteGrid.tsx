/* eslint-disable arrow-body-style */
import React from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";

import styles from "./VirtualInfiniteGrid.module.css";

export default () => {
  return <div className="container mb-4">
    <div className={styles.virtualInfiniteGridWrapper}>
      <div className={styles.virtualInfinitegridContainer}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  </div>;
};
