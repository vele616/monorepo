import React from "react";
import "@crocoder-dev/components/lib/main.css";
import styles from "./index.module.scss";

const Section = ({ children, as, className, styleChild, ...other }) => {
  return React.createElement(
    as,
    {
      className: `${className} ${styles.section} ${
        styleChild ? styles.styleChild : ""
      }`,
      ...other,
    },
    children
  );
};

export default Section;
