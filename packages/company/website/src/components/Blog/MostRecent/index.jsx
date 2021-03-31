import React from "react";
import styles from "./index.module.scss";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";
import { Link } from "gatsby";

const MostRecent = ({ featured, post1, post2 }) => {
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
        <Link to="/blog">
          <Typography color="gray_2">View All Posts</Typography>
        </Link>
      </div>
      <div className={styles.wrapper}>
        <Link to="/blog" className={styles.featured_post}>
          <figure>
            <Img
              fadeIn={false}
              fluid={featured ? featured.childImageSharp.fluid : {}}
              alt={"big"}
              style={{}}
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
              growth
            </Typography>
            <Typography
              fontSize={24}
              className={styles.title}
              color="gray_2"
              fontWeight={700}
              fontFamily="rubik"
            >
              Lorem ipsum dolor sit amet, consectetur cras amet.
            </Typography>
          </Typography>
          <Typography
            fontSize={18}
            className={styles.subtitle}
            color="gray_11"
            fontFamily="rubik"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            sagittis, orci id iaculis rhoncus, lorem lacus sollicitudin sapien,
            vitae ac.
          </Typography>
        </Link>
        <Link to="/blog">
          <figure>
            <Img
              fadeIn={false}
              fluid={post1 ? post1.childImageSharp.fluid : {}}
              alt={"big"}
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
              growth
            </Typography>
            <Typography
              color="gray_2"
              fontSize={24}
              className={styles.title}
              fontWeight={700}
              fontFamily="rubik"
            >
              Proin vestibulum justo vel nisl ornare, nec varius eu.
            </Typography>
          </Typography>
        </Link>
        <Link to="/blog">
          <figure>
            <Img
              fadeIn={false}
              fluid={post2 ? post2.childImageSharp.fluid : {}}
              alt={"big"}
              style={{}}
            />
          </figure>
          <Typography className={styles.text} element="h5">
            <Typography
              fontSize={12}
              fontWeight={1100}
              className={styles.category}
              element="div"
              color="gray_11"
              fontFamily="rubik"
            >
              product
            </Typography>
            <Typography
              color="gray_2"
              fontSize={24}
              className={styles.title}
              fontWeight={700}
              fontFamily="rubik"
            >
              Proin at suscipit elit. Donec hendrerit magna quam.
            </Typography>
          </Typography>
        </Link>
      </div>
    </Section>
  );
};

export default MostRecent;
