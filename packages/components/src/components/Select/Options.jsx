import React from "react";
import Listbox from "../Listbox";
import styles from "./index.module.scss";

const Option = (props) => (
  <Listbox.Option className={styles.option} {...props} />
);

export default Option;
