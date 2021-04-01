import React from "react";
import styles from "./index.module.scss";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";
import { Link } from "gatsby";

export const Post = ({ image, category, title, slug }) => {
  console.log(slug);
  return (
    <Link className={styles.post} to={slug}>
      <figure>
        <Img
          fadeIn={false}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={title}
          style={{}}
        />
      </figure>
      <Typography className={styles.text} element="h5">
        <Typography
          fontSize={12}
          fontWeight={500}
          className={styles.category}
          element="div"
          color="gray_11"
          fontFamily="rubik"
        >
          {category}
        </Typography>
        <Typography
          color="gray_2"
          fontSize={24}
          className={styles.title}
          fontWeight={700}
          fontFamily="rubik"
        >
          {title}
        </Typography>
      </Typography>
    </Link>
  );
};

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <Section>
      <div className={styles.wrapper}>
        {posts.map((p) => (
          <Post key={p.id} {...p} />
        ))}
      </div>
    </Section>
  );
};

export default Posts;
