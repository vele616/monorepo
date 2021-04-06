import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";
import styles from "./index.module.scss";

const Body = ({ html }) => {
  return (
    <Section className={styles.body}>
      <div
        className={"markdown-body okaidia"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Section>
  );
};

export default Body;
