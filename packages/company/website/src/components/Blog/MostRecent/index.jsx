import React from "react";
import styles from "./index.module.scss";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Post } from "../Posts";

const MostRecent = ({ featuredPost = {}, post1 = {}, post2 = {} }) => {
  return (
    <Section className={styles.whiteBackground}>
      <div className={styles.titleWrapper}>
        <Typography
          className={styles.title}
          element="h2"
          fontSize={36}
          fontWeight={700}
          color="gray_2"
        >
          Most recent posts
        </Typography>
      </div>
      <div className={styles.wrapper}>
        <Link to={featuredPost.slug} className={styles.featured_post}>
          <figure>
            <Img
              fadeIn={false}
              fluid={
                featuredPost.image
                  ? featuredPost.image.childImageSharp.fluid
                  : {}
              }
              alt={featuredPost.title}
            />
          </figure>
          <Typography className={styles.text} element="h5">
            <Typography
              fontSize={14}
              fontWeight={500}
              className={styles.category}
              element="div"
              color="gray_11"
              fontFamily="rubik"
            >
              {featuredPost.category}
            </Typography>
            <Typography
              fontSize={24}
              className={styles.title}
              color="gray_2"
              fontWeight={700}
              fontFamily="rubik"
            >
              {featuredPost.title}
            </Typography>
          </Typography>
          <Typography
            fontSize={18}
            className={styles.subtitle}
            color="gray_11"
            fontFamily="rubik"
          >
            {featuredPost.description}
          </Typography>
        </Link>
        <Post
          slug={post1.slug}
          image={post1.image}
          title={post1.title}
          category={post1.category}
        />
        <Post
          slug={post2.slug}
          image={post2.image}
          title={post2.title}
          category={post2.category}
        />
      </div>
    </Section>
  );
};

export default MostRecent;
