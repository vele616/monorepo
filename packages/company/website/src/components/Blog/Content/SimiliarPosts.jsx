import React from "react";
import { Section } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Posts from "../Posts";

const SimiliarPosts = ({ posts }) => {
  // id, image, category, title, slug
  return (
    <Section className={styles.similar}>
      <Posts posts={posts} />
    </Section>
  );
};

export default SimiliarPosts;
