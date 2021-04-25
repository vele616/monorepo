import React from "react";
import { Section, Typography } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Img from "gatsby-image";

const About = ({ author }) => {
  return (
    <Section className={styles.about}>
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutAvatarWrapper}>
          <Img
            fadeIn={false}
            style={{}}
            fluid={author.image ? author.image.childImageSharp.fluid : {}}
            alt={author.name}
          />
        </div>
        <div className={styles.aboutName}>
          <Typography
            element="div"
            fontFamily="rubik"
            color="gray_2"
            fontWeight={700}
          >
            {author.name}
          </Typography>
          <Typography fontFamily="rubik" color="gray_11">
            {author.description}
          </Typography>{" "}
          {author.twitter && author.linkedin ? (
            <Typography fontFamily="rubik" color="gray_11">
              Connect with him on{" "}
              <a
                rel="nofollow noopener noreferrer"
                className="link"
                target="_blank"
                href={author.twitter}
              >
                Twitter
              </a>{" "}
              and{" "}
              <a
                rel="nofollow noopener noreferrer"
                className="link"
                target="_blank"
                href={author.linkedin}
              >
                LinkedIn
              </a>
            </Typography>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default About;
