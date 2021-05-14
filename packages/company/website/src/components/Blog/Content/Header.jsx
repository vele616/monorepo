import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import Img from "gatsby-image";
import styles from "./index.module.scss";

const Header = ({ image, title, author }) => {
  return (
    <Section className={styles.header}>
      <Img
        fadeIn={false}
        fluid={image ? image.childImageSharp.fluid : {}}
        alt={title}
      />
      <Typography
        element="h1"
        fontSize={50}
        fontWeight={700}
        fontFamily="rubik"
        color="gray_2"
      >
        {title}
      </Typography>
      <div className={styles.authorHeaderWrapper}>
        <div className={styles.avatarHeaderWrapper}>
          <Img
            fadeIn={false}
            style={{}}
            fluid={author.image ? author.image.childImageSharp.fluid : {}}
            alt={author.name}
          />
        </div>
        <Typography
          fontFamily="rubik"
          color="gray_11"
          className={styles.authorWrittenBy}
        >
          Written by {author.name}
        </Typography>
      </div>
    </Section>
  );
};

export default Header;
