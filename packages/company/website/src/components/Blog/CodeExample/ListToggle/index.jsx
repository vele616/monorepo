import React, { useState, useCallback } from "react";
import { Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const ListToggle = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((t) => !t);
  });

  const arrowOrientation = isOpen ? styles.arrowDown : styles.arrowRight;

  const visible = isOpen ? styles.visible : styles.invisible;

  return (
    <div className={styles.listToggle}>
      <div className={styles.clickable} onClick={toggle}>
        <Typography
          style={{ display: "inline-block" }}
          element="h4"
          fontFamily="rubik"
        >
          <div className={`${styles.arrow} ${arrowOrientation}`} />
          {title}
        </Typography>
        <Typography
          style={{ display: "inline-block", marginLeft: "5px" }}
          color="gray_11"
          fontFamily="rubik"
        >
          (click to show)
        </Typography>
      </div>
      <div className={`${styles.content} ${visible}`}>{children}</div>
    </div>
  );
};

export default ListToggle;
