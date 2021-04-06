import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Img from "gatsby-image";

const About = ({ author }) => {
  return (
    <Section className={styles.about}>
      <Img
        fadeIn={false}
        style={{}}
        fluid={author.image ? author.image.childImageSharp.fluid : {}}
        alt={author.name}
      />
      {author.name}
      {author.description}
      Connect with him on
      <a
        rel="nofollow noopener noreferrer"
        className="link"
        target="_blank"
        href={author.twitter}
      >
        Twitter
      </a>
      and{" "}
      <a
        rel="nofollow noopener noreferrer"
        className="link"
        target="_blank"
        href={author.linkedin}
      >
        LinkedIn
      </a>
    </Section>
  );
};

export default About;
