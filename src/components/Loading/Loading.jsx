import React from "react";

import styles from "./Loading.module.css";
import loadingGif from "/loading.gif";

const Loading = () => {
  return (
    <div className={styles.center}>
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
