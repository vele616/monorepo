import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import renderAst from "./renderAst";

const Body = ({ html, htmlAst }) => {
  return (
    <Section className={styles.body}>
      <div className="markdown-body okaidia">{renderAst(htmlAst)}</div>
    </Section>
  );
};

export default Body;
