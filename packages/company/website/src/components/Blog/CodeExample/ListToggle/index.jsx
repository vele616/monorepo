import React from "react";
import { Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const ListToggle = ({ children, title }) => {
  return (
    <div className={styles.listToggle}>
      <details className={styles.details}>
        <summary>
          <Typography
            style={{ display: "inline-block" }}
            element="h4"
            fontFamily="rubik"
          >
            {title}
          </Typography>
          <Typography
            style={{ display: "inline-block", marginLeft: "5px" }}
            color="gray_11"
            fontFamily="rubik"
          >
            (click to show)
          </Typography>
        </summary>
        <div className={styles.content}>{children}</div>
      </details>
    </div>
  );
};

export default ListToggle;
