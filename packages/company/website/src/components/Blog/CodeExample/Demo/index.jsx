import React from "react";
import styles from "./index.module.scss";
import DemoIcon from "../../../../images/icons/demo.svg";

const Demo = ({ children }) => (
  <div className={styles.demo}>
    <DemoIcon className={styles.icon} />
    <div className={styles.content}>{children}</div>
  </div>
);

export default Demo;
