import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Posts from "../Posts";

const SimiliarPosts = ({ posts }) => {
  // id, image, category, title, slug
  return (
    <Section className={styles.similiar}>
      <Posts posts={posts} />
    </Section>
  );
};

export default SimiliarPosts;
