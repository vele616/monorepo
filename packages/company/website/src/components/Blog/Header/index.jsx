import React from "react";
import styles from "./index.module.scss";
import { Section, Typography } from "@crocoder-dev/components";

const BlogHeader = ({}) => {
  return (
    <Section>
      <Typography
        className={styles.title}
        element="h1"
        fontSize={50}
        fontWeight={700}
        color="gray_2"
      >
        <span className={styles.green}>Cro</span>
        Coder Blog
      </Typography>
      <p>Tips and ideas to help you learn, build and maintain your projects.</p>
    </Section>
  );
};

export default BlogHeader;
