import React from "react";
import styles from "./index.module.scss";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";

const BlogHeader = ({ featured, post1, post2 }) => {
  return (
    <Section>
      <div className={styles.wrapper}>
        <a className={styles.featured_post}>
          <figure>
            <Img
              fadeIn={false}
              fluid={featured ? featured.childImageSharp.fluid : {}}
              alt={"big"}
              style={{}}
            />
          </figure>
          <Typography element="h5">
            <Typography
              fontSize={14}
              fontWeight={500}
              className={styles.category}
              element="div"
            >
              growth
            </Typography>
            Lorem ipsum dolor sit amet, consectetur cras amet.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            sagittis, orci id iaculis rhoncus, lorem lacus sollicitudin sapien,
            vitae ac.
          </Typography>
        </a>
        <a>
          <figure>
            <Img
              fadeIn={false}
              fluid={post1 ? post1.childImageSharp.fluid : {}}
              alt={"big"}
              style={{}}
            />
          </figure>
          <Typography element="h5">
            <Typography
              fontSize={12}
              fontWeight={500}
              className={styles.category}
              element="div"
            >
              growth
            </Typography>
            Proin vestibulum justo vel nisl ornare, nec varius eu.
          </Typography>
        </a>
        <a>
          <figure>
            <Img
              fadeIn={false}
              fluid={post2 ? post2.childImageSharp.fluid : {}}
              alt={"big"}
              style={{}}
            />
          </figure>
          <Typography element="h5">
            <Typography
              fontSize={12}
              fontWeight={500}
              className={styles.category}
              element="div"
            >
              product
            </Typography>
            Proin at suscipit elit. Donec hendrerit magna quam.
          </Typography>
        </a>
      </div>
    </Section>
  );
};

export default BlogHeader;
