import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Typography, Flexbox, Button } from "@crocoder-dev/components";
import styles from "./index.module.scss";
import Section from "../Layout/Section";
import Img from "gatsby-image";

const Hero = ({
  imageAlt,
  title,
  text,
  action,
  image,
  scrollToContactUs,
  topRef,
}) => (
  <Section as="header" className={styles.section}>
    <Flexbox className={styles.flex} alignItems="center">
      <div className={styles.text}>
        <Typography
          className={styles.title}
          element="h1"
          fontSize={34}
          dangerouslySetInnerHTML={{ __html: title }}
          fontWeight={400}
          color="gray_2"
        />
        <Typography
          className={styles.paragraph}
          element="p"
          fontSize={22}
          dangerouslySetInnerHTML={{ __html: text }}
          fontWeight={400}
          color="gray_2"
        />
        <Button
          className={styles.button}
          onClick={() => {
            scrollToContactUs && scrollToContactUs();
          }}
          variant="primary"
        >
          {action}
        </Button>
      </div>
      <Img
        fadeIn={false}
        fluid={image ? image.childImageSharp.fluid : {}}
        alt={imageAlt}
        className={styles.image}
      />
    </Flexbox>
  </Section>
);

const HeroWithQuery = ({ scrollToContactUs, scrollToHowWeWork, topRef }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          hero {
            title
            text
            action
            imageAlt
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <Hero
        topRef={topRef}
        scrollToContactUs={scrollToContactUs}
        {...data.homeJson.hero}
      />
    )}
  />
);

export default HeroWithQuery;
