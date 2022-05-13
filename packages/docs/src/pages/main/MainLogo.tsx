/* eslint-disable arrow-body-style */
import React from "react";

import styles from "./MainLogo.module.css";

export default () => {
  return <div className="container main-logo-container mb-4">
    <div className={styles.mainLogoWrapper}>
      <img className={styles.mainLogoRing} alt="logo-ring" src="./img/ring.svg" />
      <div className={styles.mainLogo}>
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
    <h1 className={styles.title}>InfiniteGrid</h1>
  </div>;
};
