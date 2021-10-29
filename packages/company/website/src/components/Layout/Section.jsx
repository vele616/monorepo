import React from "react";
import { Link } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Button, Typography } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import styles from "./index.module.scss";
import Head from "../Head";

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
